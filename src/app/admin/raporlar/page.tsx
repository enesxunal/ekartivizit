'use client'
import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { BarChart3, CreditCard, Download, RefreshCw, TrendingUp, ShoppingBag } from 'lucide-react'
import { type Overview, money } from '@/lib/admin-view'

export default function SalesReportsPage() {
  const [days, setDays] = useState(30)
  const [data, setData] = useState<Overview | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const refresh = useCallback(async () => {
    setLoading(true); setError('')
    try {
      const response = await fetch('/api/admin/overview?days=' + days, { cache: 'no-store' })
      const json = await response.json()
      if (!response.ok) throw new Error(json.message || 'Rapor alınamadı.')
      setData(json)
    } catch (e) { setError(e instanceof Error ? e.message : 'Sunucuya bağlanılamadı.') }
    finally { setLoading(false) }
  }, [days])
  useEffect(() => { void refresh() }, [refresh])

  const exportCsv = () => {
    if (!data) return
    const rows = [['Gün', 'Tahsilat (TL)', 'Ödenen sipariş'], ...data.daily.map(p => [p.date, p.total.toFixed(2), String(p.count)])]
    const blob = new Blob(['\ufeff' + rows.map(a => a.join(';')).join('\r\n')], { type: 'text/csv;charset=utf-8' })
    const href = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = href; a.download = 'ekartvizit-tahsilat-' + days + 'gun.csv'; a.click(); URL.revokeObjectURL(href)
  }

  const max = Math.max(1, ...(data?.daily.map(x => x.total) || []))
  return <main className="min-h-screen bg-[#f5f6f4] px-4 py-7 text-[#17221c] sm:px-6 lg:px-10">
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div><Link href="/admin" className="text-xs font-semibold text-[#4c8449]">← YÖNETİM PANELİ</Link><h1 className="mt-3 text-3xl font-bold tracking-tight">Satış ve Tahsilat Raporları</h1><p className="mt-2 text-sm text-[#667367]">Yalnızca ödemesi doğrulanan siparişler gelir olarak hesaplanır.</p></div>
        <div className="flex flex-wrap gap-2">
          <select aria-label="Rapor aralığı" className="rounded-lg border bg-white px-4 py-2 text-sm" value={days} onChange={e => setDays(Number(e.target.value))}><option value={7}>Son 7 gün</option><option value={30}>Son 30 gün</option><option value={90}>Son 90 gün</option></select>
          <button onClick={() => void refresh()} disabled={loading} className="flex items-center gap-2 rounded-lg border bg-white px-3 py-2 text-sm"><RefreshCw size={16}/>Yenile</button>
          <button onClick={exportCsv} disabled={!data} className="flex items-center gap-2 rounded-lg bg-[#1e3522] px-3 py-2 text-sm text-white disabled:opacity-50"><Download size={16}/>CSV</button>
        </div>
      </div>
      {error && <div role="alert" className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">{error}</div>}
      {loading && !data && <p className="mt-8 text-sm">Rapor hazırlanıyor…</p>}
      {data && <>
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {[
            { title: 'Seçili dönem tahsilat', value: money(data.totals.periodRevenue), caption: days + ' gün', icon: TrendingUp },
            { title: 'Ödenen sipariş', value: String(data.totals.periodPaidOrders), caption: 'Başarılı ödeme kaydı', icon: CreditCard },
            { title: 'Ortalama ödeme', value: money(data.totals.periodPaidOrders ? data.totals.periodRevenue / data.totals.periodPaidOrders : 0), caption: 'Ödenen sipariş başına', icon: ShoppingBag },
          ].map(({title,value,caption,icon:Icon}) => <section key={title} className="rounded-2xl border border-[#e0e7de] bg-white p-6"><div className="flex justify-between text-sm text-[#5e6c62]"><span>{title}</span><Icon size={19} className="text-[#45804c]"/></div><p className="mt-4 text-3xl font-bold tabular-nums">{value}</p><p className="mt-2 text-xs text-[#7c887c]">{caption}</p></section>)}
        </div>
        <section className="mt-6 rounded-2xl border border-[#e0e7de] bg-white p-6"><h2 className="flex items-center gap-2 font-semibold"><BarChart3 size={18}/>Günlük tahsilat</h2><div className="mt-7 flex h-56 items-end gap-1 overflow-x-auto border-b border-[#e9eee8]">{data.daily.map(row => <div key={row.date} className="flex min-w-[11px] flex-1 items-end" style={{height:'100%'}} title={row.date + ' · ' + money(row.total)}><div className="w-full rounded-t bg-[#4a8150]" style={{height: Math.max(4,row.total/max*100)+'%'}}/></div>)}{!data.daily.length && <p className="self-center text-sm text-[#7c887c]">Bu dönemde başarılı ödeme bulunamadı.</p>}</div><p className="mt-3 text-xs text-[#7c887c]">Her sütun ödeme tarihi değil, siparişin oluşturulma tarihine göre raporlanır.</p></section>
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <section className="rounded-2xl border border-[#e0e7de] bg-white p-6"><h2 className="font-semibold">Ürün bazında gerçekleşen tahsilatlar</h2><div className="mt-4 divide-y divide-[#edf0ed]">{data.topProducts.length ? data.topProducts.map((item,i) => <div key={i} className="flex items-center justify-between gap-3 py-3"><div className="min-w-0"><p className="truncate text-sm font-medium">{item.name}</p><p className="text-xs text-[#788478]">{item.quantity} paket</p></div><p className="text-sm font-bold">{money(item.revenue)}</p></div>) : <p className="py-4 text-sm text-[#788478]">Veri yok.</p>}</div></section>
          <section className="rounded-2xl border border-[#e0e7de] bg-white p-6"><h2 className="font-semibold">Ödeme takip özeti</h2><dl className="mt-4 divide-y divide-[#edf0ed]">{[['Ödenen sipariş (tüm zamanlar)', data.totals.paidOrders],['Ödeme bekleyen',data.totals.pendingPayments],['Başarısız ödeme',data.totals.failedPayments],['Toplam sipariş',data.totals.allOrders]].map(([label,num]) => <div key={String(label)} className="flex justify-between gap-3 py-4 text-sm"><dt className="text-[#6d796e]">{label}</dt><dd className="font-bold">{num}</dd></div>)}</dl><p className="mt-4 text-xs leading-5 text-[#778376]">Bu rapor banka mutabakatı yerine geçmez. İade işlemleri ödeme sağlayıcısıyla ayrıca karşılaştırılmalıdır.</p></section>
        </div>
        {data.truncated && <p className="mt-4 text-xs text-amber-800">Ürün/gün kırılımları son 3.000 başarılı siparişle sınırlandırıldı.</p>}
      </>}
    </div>
  </main>
}
