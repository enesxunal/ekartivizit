'use client'
import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, BarChart3, CreditCard, Package, RefreshCw, ShoppingBag, Users, AlertTriangle } from 'lucide-react'
import { type Overview, money, dateTime, paymentLabels, paymentClasses } from '@/lib/admin-view'

export default function AdminDashboard() {
  const [data, setData] = useState<Overview | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const refresh = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const response = await fetch('/api/admin/overview?days=30', { cache: 'no-store' })
      const result = await response.json()
      if (!response.ok) throw new Error(result.message || 'İstatistikler alınamadı.')
      setData(result)
    } catch (e) { setError(e instanceof Error ? e.message : 'Bağlantı hatası') }
    finally { setLoading(false) }
  }, [])
  useEffect(() => { void refresh() }, [refresh])

  const figures = data ? [
    { label: 'Tahsil edilen toplam', value: money(data.totals.paidRevenue), note: data.totals.paidOrders + ' başarılı ödeme', icon: CreditCard },
    { label: 'Son 30 gün tahsilat', value: money(data.totals.periodRevenue), note: data.totals.periodPaidOrders + ' başarılı ödeme', icon: BarChart3 },
    { label: 'Toplam sipariş', value: String(data.totals.allOrders), note: 'Tüm zamanlar', icon: ShoppingBag },
    { label: 'Ödeme bekleyenler', value: String(data.totals.pendingPayments), note: data.totals.failedPayments + ' başarısız ödeme', icon: Package },
  ] : []
  const maxRevenue = Math.max(1, ...(data?.daily.map(x => x.total) || []))
  return <main className="min-h-screen bg-[#f5f6f4] px-4 py-7 text-[#17221c] sm:px-6 lg:px-10">
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div><p className="text-xs font-semibold uppercase tracking-[.17em] text-[#54824a]">E Kartvizit / Yönetim</p><h1 className="mt-2 text-3xl font-bold tracking-tight">Genel Bakış</h1><p className="mt-1 text-sm text-[#637166]">Gerçek veritabanından sipariş ve tahsilat istatistikleri</p></div>
        <button onClick={() => void refresh()} disabled={loading} className="flex items-center gap-2 rounded-lg border border-[#dce3dc] bg-white px-4 py-2 text-sm font-semibold hover:bg-[#edf2ea] disabled:opacity-60"><RefreshCw size={16} className={loading ? 'animate-spin' : ''}/>Yenile</button>
      </div>
      <nav aria-label="Yönetim bölümleri" className="mt-7 flex flex-wrap gap-2 text-sm">
        {[['Sipariş geçmişi','/admin/siparisler',ShoppingBag],['Satış raporları','/admin/raporlar',BarChart3],['Ürünler','/admin/urunler',Package],['Müşteriler','/admin/musteriler',Users]].map(([name,href,Icon]) => {
          const ItemIcon = Icon as typeof ShoppingBag
          return <Link key={String(href)} href={String(href)} className="inline-flex items-center gap-2 rounded-xl border border-[#dce3dc] bg-white px-4 py-3 font-semibold hover:border-[#9ab796]"><ItemIcon size={16}/>{String(name)}<ArrowUpRight size={14}/></Link>
        })}
      </nav>
      {error && <div role="alert" className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">{error}</div>}
      {loading && !data ? <p className="mt-8 text-sm text-[#687267]">Raporlar yükleniyor…</p> : null}
      {data && <>
        <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {figures.map(({ label, value, note, icon: Icon }) => <section key={label} className="rounded-2xl border border-[#e0e7de] bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between"><p className="text-sm text-[#647163]">{label}</p><Icon size={19} className="text-[#47793b]"/></div>
            <p className="mt-4 text-2xl font-bold tabular-nums tracking-tight">{value}</p><p className="mt-2 text-xs text-[#758174]">{note}</p>
          </section>)}
        </div>
        <div className="mt-6 grid gap-5 lg:grid-cols-[1.3fr_1fr]">
          <section className="rounded-2xl border border-[#e0e7de] bg-white p-6">
            <div className="flex items-center justify-between gap-3"><h2 className="font-semibold">Günlük tahsilatlar</h2><span className="text-xs text-[#758174]">Son 30 gün · sadece ödenenler</span></div>
            <div className="mt-7 flex h-48 items-end gap-1 overflow-x-auto border-b border-[#e0e7de] pb-1">
              {data.daily.length ? data.daily.map(point => <div key={point.date} title={point.date + ' · ' + money(point.total)} className="flex min-w-[9px] flex-1 flex-col justify-end" style={{ height: '100%' }}><div className="w-full rounded-t bg-[#4d8650]" style={{ height: Math.max(4, point.total / maxRevenue * 100) + '%' }}/></div>) : <div className="self-center text-sm text-[#758174]">Bu dönemde başarılı tahsilat bulunmuyor.</div>}
            </div>
            <div className="mt-3 flex justify-between text-xs text-[#758174]"><span>{data.daily[0]?.date || '—'}</span><span>{data.daily.at(-1)?.date || '—'}</span></div>
          </section>
          <section className="rounded-2xl border border-[#e0e7de] bg-white p-6">
            <h2 className="font-semibold">En çok tahsilat yapılan ürünler</h2>
            <div className="mt-5 space-y-4">{data.topProducts.length ? data.topProducts.slice(0,5).map((p,i) => <div key={p.name + i} className="flex items-center justify-between gap-4 border-b border-[#edf0ed] pb-3"><div className="min-w-0"><p className="truncate text-sm font-medium">{p.name}</p><p className="mt-1 text-xs text-[#758174]">{p.quantity} paket</p></div><span className="shrink-0 text-sm font-semibold tabular-nums">{money(p.revenue)}</span></div>) : <p className="text-sm text-[#758174]">Henüz başarılı ödeme yok.</p>}</div>
          </section>
        </div>
        {data.truncated && <p className="mt-4 flex items-center gap-2 text-xs text-amber-800"><AlertTriangle size={14}/>Grafikler son 3.000 tahsilat üzerinden hesaplandı.</p>}
        <section className="mt-6 overflow-hidden rounded-2xl border border-[#e0e7de] bg-white">
          <div className="flex items-center justify-between border-b border-[#edf0ed] p-5"><h2 className="font-semibold">Son siparişler</h2><Link href="/admin/siparisler" className="text-sm font-semibold text-[#427a3f]">Tümünü görüntüle</Link></div>
          <div className="divide-y divide-[#edf0ed]">{data.recent.length ? data.recent.map(o => <Link key={o.id} href={'/admin/siparisler?q=' + encodeURIComponent(o.id)} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 hover:bg-[#f8faf6]"><div><p className="text-sm font-semibold">{o.id} · {o.customerInfo.name}</p><p className="mt-1 text-xs text-[#7a8579]">{dateTime(o.createdAt)}</p></div><div className="flex items-center gap-3"><span className={'rounded-full px-2.5 py-1 text-xs font-semibold ' + paymentClasses[o.paymentStatus]}>{paymentLabels[o.paymentStatus]}</span><span className="text-sm font-bold tabular-nums">{money(o.total)}</span></div></Link>) : <p className="p-6 text-sm text-[#758174]">Henüz sipariş kaydı yok.</p>}</div>
        </section>
      </>}
    </div>
  </main>
}
