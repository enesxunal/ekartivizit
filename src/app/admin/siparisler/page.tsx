'use client'
import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { Download, RefreshCw, Search, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Truck, AlertTriangle } from 'lucide-react'
import BasitKargoControls from '@/components/admin/BasitKargoControls'
import { type AdminOrder, type OrderState, money, dateTime, orderLabels, paymentLabels, paymentClasses } from '@/lib/admin-view'

type OrderResult = { orders: AdminOrder[]; count: number; page: number; totalPages: number }
const nextStates: Partial<Record<OrderState, OrderState>> = {
  pending: 'confirmed', confirmed: 'preparing', preparing: 'printing', printing: 'shipping', shipping: 'delivered',
}

export default function AdminOrdersPage() {
  const [q, setQ] = useState('')
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('')
  const [payment, setPayment] = useState('')
  const [page, setPage] = useState(1)
  const [data, setData] = useState<OrderResult | null>(null)
  const [expanded, setExpanded] = useState('')
  const [busy, setBusy] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const fetchOrders = useCallback(async () => {
    setLoading(true); setError('')
    try {
      const params = new URLSearchParams({ page: String(page), limit: '20' })
      if (query) params.set('q', query)
      if (status) params.set('status', status)
      if (payment) params.set('payment', payment)
      const response = await fetch('/api/admin/orders?' + params, { cache: 'no-store' })
      const body = await response.json()
      if (!response.ok) throw new Error(body.message || 'Siparişler yüklenemedi.')
      setData(body)
    } catch (e) { setError(e instanceof Error ? e.message : 'Bağlantı hatası') }
    finally { setLoading(false) }
  }, [page, query, status, payment])
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.has('q')) { const v = params.get('q') || ''; setQ(v); setQuery(v) }
  }, [])
  useEffect(() => { void fetchOrders() }, [fetchOrders])

  const updateStatus = async (order: AdminOrder, next: OrderState) => {
    if (next === 'cancelled' && !window.confirm(order.id + ' numaralı siparişi iptal etmek istiyor musunuz?')) return
    setBusy(order.id); setError('')
    try {
      const response = await fetch('/api/orders/' + encodeURIComponent(order.id), {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: next }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.message || 'İşlem başarısız.')
      await fetchOrders()
    } catch (e) { setError(e instanceof Error ? e.message : 'Durum güncellenemedi.') }
    finally { setBusy('') }
  }

  const exportCsv = () => {
    if (!data) return
    const safe = (v: unknown) => {
      const raw = String(v ?? '').replace(/\r|\n/g, ' ')
      const clean = /^[=+@-]/.test(raw) ? "'" + raw : raw
      return '"' + clean.replace(/"/g, '""') + '"'
    }
    const rows = [['Sipariş No','Tarih','Müşteri','E-posta','Tutar TL','Ödeme','Sipariş Durumu'],
      ...data.orders.map(o => [o.id, dateTime(o.createdAt), o.customerInfo.name, o.customerInfo.email, o.total.toFixed(2), paymentLabels[o.paymentStatus], orderLabels[o.status]])]
    const blob = new Blob(['\ufeff' + rows.map(row => row.map(safe).join(';')).join('\r\n')], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url; link.download = 'ekartvizit-siparisler-sayfa-' + page + '.csv'; link.click()
    URL.revokeObjectURL(url)
  }

  return <main className="min-h-screen bg-[#f5f6f4] px-4 py-7 text-[#17221c] sm:px-6 lg:px-10">
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div><p className="text-xs font-semibold uppercase tracking-wider text-[#538048]">E Kartvizit / <Link href="/admin" className="underline">Yönetim</Link></p><h1 className="mt-2 text-3xl font-bold tracking-tight">Sipariş Geçmişi</h1><p className="mt-1 text-sm text-[#6b776e]">Gerçek sipariş, ödeme ve kargo durumları</p></div>
        <div className="flex gap-2"><button onClick={() => void fetchOrders()} disabled={loading} className="inline-flex items-center gap-2 rounded-lg border bg-white px-3 py-2 text-sm font-semibold"><RefreshCw size={16}/>Yenile</button><button onClick={exportCsv} disabled={!data?.orders.length} className="inline-flex items-center gap-2 rounded-lg bg-[#18251b] px-3 py-2 text-sm font-semibold text-white disabled:opacity-50"><Download size={16}/>CSV (bu sayfa)</button></div>
      </div>
      <form className="mt-7 flex flex-wrap gap-3 rounded-2xl border border-[#e0e7de] bg-white p-4" onSubmit={e => { e.preventDefault(); setPage(1); setQuery(q.trim()) }}>
        <div className="relative min-w-[220px] flex-1"><Search size={17} className="absolute left-3 top-3 text-[#69776a]"/><input className="w-full rounded-lg border border-[#dce3dc] py-2.5 pl-10 pr-3 text-sm outline-none focus:border-[#579a57]" value={q} onChange={e => setQ(e.target.value)} placeholder="Sipariş no, isim, e-posta, telefon" /></div>
        <select aria-label="Sipariş durumuna göre filtrele" value={status} onChange={e => { setStatus(e.target.value); setPage(1) }} className="rounded-lg border border-[#dce3dc] bg-white px-3 py-2 text-sm"><option value="">Tüm sipariş durumları</option>{Object.entries(orderLabels).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select>
        <select aria-label="Ödeme durumuna göre filtrele" value={payment} onChange={e => { setPayment(e.target.value); setPage(1) }} className="rounded-lg border border-[#dce3dc] bg-white px-3 py-2 text-sm"><option value="">Tüm ödemeler</option>{Object.entries(paymentLabels).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select>
        <button type="submit" className="rounded-lg bg-[#17251b] px-5 py-2.5 text-sm font-semibold text-white">Ara</button>
      </form>
      {error && <div role="alert" className="mt-5 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"><AlertTriangle size={18}/>{error}</div>}
      <div className="mt-5 overflow-hidden rounded-2xl border border-[#e0e7de] bg-white">
        <div className="flex items-center justify-between border-b border-[#e7ebe5] px-5 py-4"><span className="text-sm font-semibold">{data ? data.count + ' sipariş' : 'Siparişler'}</span>{loading && <span className="text-xs text-[#6b776e]">Güncelleniyor…</span>}</div>
        {!data?.orders.length && !loading ? <p className="p-8 text-center text-sm text-[#637066]">Kayıt bulunamadı.</p> : <div className="divide-y divide-[#edf0ed]">
          {data?.orders.map(o => <article key={o.id} className="px-4 py-4 sm:px-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="min-w-0"><p className="break-all text-sm font-bold">{o.id}</p><p className="mt-1 text-sm text-[#4f5e51]">{o.customerInfo.name} · {dateTime(o.createdAt)}</p><p className="mt-1 text-xs text-[#899187]">{o.customerInfo.email}</p></div>
              <div className="flex flex-wrap items-center gap-3"><span className={'rounded-full px-2.5 py-1 text-xs font-semibold ' + paymentClasses[o.paymentStatus]}>{paymentLabels[o.paymentStatus]}</span><span className="rounded-full bg-[#f2f4f0] px-2.5 py-1 text-xs font-medium">{orderLabels[o.status]}</span><span className="font-bold tabular-nums">{money(o.total)}</span><button aria-expanded={expanded === o.id} onClick={() => setExpanded(expanded === o.id ? '' : o.id)} className="rounded-lg border p-2" title="Sipariş detayları">{expanded === o.id ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}</button></div>
            </div>
            {expanded === o.id && <div className="mt-5 grid gap-5 border-t border-[#edf0ed] pt-5 lg:grid-cols-[1.2fr_1fr]">
              <div className="space-y-5">
                <div><h3 className="mb-3 text-sm font-semibold">Sipariş kalemleri</h3>{o.items.map(item => <div key={item.id} className="flex justify-between gap-3 border-b border-[#eef1ed] py-2 text-sm"><div><p>{item.product.name}</p><p className="text-xs text-[#69756b]">{item.cartQuantity} paket · {item.quantity} adet {item.selectedMaterial || ''} {item.selectedSize || ''}</p></div><span>{money(item.price * item.cartQuantity)}</span></div>)}</div>
                <div><h3 className="mb-2 text-sm font-semibold">Müşteri ve teslimat</h3><p className="whitespace-pre-wrap text-sm text-[#5f6c62]">{o.customerInfo.name} · {o.customerInfo.phone}\n{o.customerInfo.email}\n{o.customerInfo.address?.street} {o.customerInfo.address?.district} / {o.customerInfo.address?.city}</p></div>
                <div><h3 className="mb-2 text-sm font-semibold">Ödeme hareketleri</h3>{o.paymentAttempts?.length ? o.paymentAttempts.map((p,i) => <p key={i} className="border-b border-[#eef1ed] py-2 text-xs text-[#5c685e]">{dateTime(p.createdAt)} · {p.provider} · {money(p.amount)} · {paymentLabels[p.status]} {p.lastEvent ? '· ' + p.lastEvent : ''}</p>) : <p className="text-xs text-[#78847a]">Ödeme sağlayıcısı hareketi henüz kaydedilmemiş.</p>}</div>
              </div>
              <div className="space-y-4">
                {o.paymentStatus !== 'paid' && <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900">Bu siparişin tahsilatı doğrulanmadı. Üretim ve sevkiyat işlemleri ödeme sonrası başlatılmalıdır.</div>}
                {nextStates[o.status] && <button onClick={() => void updateStatus(o, nextStates[o.status]!)} disabled={busy === o.id || o.paymentStatus !== 'paid'} className="w-full rounded-lg bg-[#285a31] px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50">Durum: {orderLabels[nextStates[o.status]!]} yap</button>}
                {!['delivered','cancelled'].includes(o.status) && <button onClick={() => void updateStatus(o, 'cancelled')} disabled={busy === o.id} className="w-full rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-700 disabled:opacity-50">Siparişi iptal et</button>}
                <div className="flex items-center gap-2 text-xs font-medium text-[#687568]"><Truck size={15}/> Kargo yönetimi</div>
                <BasitKargoControls orderId={o.id} paymentStatus={o.paymentStatus} trackingNumber={o.trackingNumber}/>
                <Link href={'/siparis/' + encodeURIComponent(o.id)} className="block rounded-lg border bg-white px-4 py-2 text-center text-sm font-medium">Sipariş sayfası</Link>
              </div>
            </div>}
          </article>)}
        </div>}
      </div>
      {data && data.totalPages > 1 && <div className="mt-5 flex items-center justify-end gap-4 text-sm"><button disabled={page <= 1} onClick={() => setPage(page - 1)} className="rounded-lg border bg-white p-2 disabled:opacity-30"><ChevronLeft size={18}/></button><span>{page} / {data.totalPages}</span><button disabled={page >= data.totalPages} onClick={() => setPage(page + 1)} className="rounded-lg border bg-white p-2 disabled:opacity-30"><ChevronRight size={18}/></button></div>}
    </div>
  </main>
}
