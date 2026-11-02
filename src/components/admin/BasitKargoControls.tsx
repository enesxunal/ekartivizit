'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { RefreshCw, Send } from 'lucide-react'

export default function BasitKargoControls({ orderId, paymentStatus, trackingNumber }: { orderId: string; paymentStatus: string; trackingNumber?: string }) {
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')
  const [height, setHeight] = useState('10')
  const [width, setWidth] = useState('20')
  const [depth, setDepth] = useState('30')
  const [weight, setWeight] = useState('1')

  const run = async (action: 'create' | 'refresh') => {
    setBusy(true)
    setMessage('')
    try {
      const response = await fetch('/api/admin/basitkargo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action,
          orderId,
          handlerCode: 'ECONOMIC',
          package: {
            height: Number(height),
            width: Number(width),
            depth: Number(depth),
            weight: Number(weight),
          },
        }),
      })
      const data = await response.json()
      setMessage(data.message || (response.ok ? 'İşlem tamamlandı.' : 'İşlem başarısız.'))
      if (response.ok) window.setTimeout(() => window.location.reload(), 500)
    } catch {
      setMessage('BasitKargo bağlantısı kurulamadı.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-3">
      <div className="mb-2 flex items-center justify-between gap-2">
        <div className="text-xs font-semibold text-blue-900">BasitKargo</div>
        {trackingNumber && <span className="max-w-[130px] truncate text-[10px] text-blue-700" title={trackingNumber}>{trackingNumber}</span>}
      </div>

      {!trackingNumber ? (
        <>
          <div className="grid grid-cols-2 gap-2">
            <input aria-label="Yükseklik cm" value={height} onChange={(e) => setHeight(e.target.value)} type="number" min="1" step="1" className="h-8 rounded border border-blue-100 bg-white px-2 text-xs" placeholder="Yükseklik" />
            <input aria-label="Genişlik cm" value={width} onChange={(e) => setWidth(e.target.value)} type="number" min="1" step="1" className="h-8 rounded border border-blue-100 bg-white px-2 text-xs" placeholder="Genişlik" />
            <input aria-label="Derinlik cm" value={depth} onChange={(e) => setDepth(e.target.value)} type="number" min="1" step="1" className="h-8 rounded border border-blue-100 bg-white px-2 text-xs" placeholder="Derinlik" />
            <input aria-label="Ağırlık kg" value={weight} onChange={(e) => setWeight(e.target.value)} type="number" min="0.1" step="0.1" className="h-8 rounded border border-blue-100 bg-white px-2 text-xs" placeholder="Ağırlık" />
          </div>
          <Button
            size="sm"
            type="button"
            className="mt-2 w-full bg-blue-700 hover:bg-blue-800"
            disabled={busy || paymentStatus !== 'paid'}
            onClick={() => void run('create')}
          >
            <Send className="mr-2 h-3.5 w-3.5" />
            {busy ? 'Oluşturuluyor...' : 'Kargo Kodu Oluştur'}
          </Button>
          {paymentStatus !== 'paid' && <p className="mt-2 text-[10px] leading-4 text-blue-700">Ödeme tamamlanınca aktif olur.</p>}
        </>
      ) : (
        <Button size="sm" type="button" variant="outline" className="w-full border-blue-200 bg-white" disabled={busy} onClick={() => void run('refresh')}>
          <RefreshCw className="mr-2 h-3.5 w-3.5" />
          {busy ? 'Yenileniyor...' : 'Kargo Durumunu Yenile'}
        </Button>
      )}
      {message && <p className="mt-2 text-[10px] leading-4 text-blue-800">{message}</p>}
    </div>
  )
}
