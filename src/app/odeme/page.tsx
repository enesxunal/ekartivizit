'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useCart } from '@/contexts/CartContext'
import { useAuth } from '@/contexts/AuthContext'
import { useOrders } from '@/contexts/OrderContext'
import { useToast } from '@/contexts/ToastContext'
import { paymentMethods, processCreditCardPayment, processWhatsAppPayment, processBankTransferPayment } from '@/lib/payment'
// E-posta şablonları artık API üzerinden kullanılacak
import { ArrowLeft, Building2, Check, ChevronRight, CreditCard, LockKeyhole, MapPin, ShieldCheck, ShoppingCart, Smartphone, Truck, User } from 'lucide-react'

export default function OdemePage() {
  const router = useRouter()
  const { items, getTotalPrice, clearCart, getDiscountedTotal, appliedDiscount } = useCart()
  const { user } = useAuth()
  const { createOrder } = useOrders()
  const { addToast } = useToast()

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'whatsapp' | 'credit-card' | 'bank-transfer'>('whatsapp')
  const [isProcessing, setIsProcessing] = useState(false)

  // Müşteri bilgileri
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      district: '',
      postalCode: ''
    },
    notes: ''
  })

  // Fatura bilgileri
  const [invoiceInfo, setInvoiceInfo] = useState({
    type: 'individual' as 'individual' | 'corporate', // bireysel veya kurumsal
    name: '',
    email: '',
    phone: '',
    taxNumber: '', // vergi numarası (kurumsal için)
    taxOffice: '', // vergi dairesi (kurumsal için)
    address: {
      street: '',
      city: '',
      district: '',
      postalCode: ''
    }
  })

  // Kullanıcı bilgilerini otomatik doldur
  useEffect(() => {
    if (user) {
      setCustomerInfo({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: {
          street: user.address?.street || '',
          city: user.address?.city || '',
          district: user.address?.district || '',
          postalCode: user.address?.postalCode || ''
        },
        notes: ''
      })

      setInvoiceInfo(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: {
          street: user.address?.street || '',
          city: user.address?.city || '',
          district: user.address?.district || '',
          postalCode: user.address?.postalCode || ''
        }
      }))
    }
  }, [user])

  const [sameAsShipping, setSameAsShipping] = useState(true)

  const totalPrice = getDiscountedTotal()

  if (!items || items.length === 0) {
    return (
      <div className="min-h-screen bg-[#f4f4ef] text-[#171a16]">
        <Header />
        <main className="site-container max-w-5xl py-8 sm:py-10 lg:py-12">
          <Card className="text-center p-8">
            <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-semibold tracking-[-0.035em] text-[#171a16] mb-2">Sepetiniz Boş</h1>
            <p className="text-[#687067] mb-6">Ödeme yapabilmek için sepetinize ürün eklemeniz gerekiyor.</p>
            <Button onClick={() => router.push('/')} className="rounded-full bg-[#171a16] hover:bg-black">
              Alışverişe Devam Et
            </Button>
          </Card>
        </main>
        <Footer />
      </div>
    )
  }

  const handleInputChange = (field: string, value: string) => {
    if (field.startsWith('address.')) {
      const addressField = field.split('.')[1]
      setCustomerInfo(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }))
    } else {
      setCustomerInfo(prev => ({
        ...prev,
        [field]: value
      }))
    }
  }

  const handleInvoiceInputChange = (field: string, value: string) => {
    if (field.startsWith('address.')) {
      const addressField = field.split('.')[1]
      setInvoiceInfo(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }))
    } else {
      setInvoiceInfo(prev => ({
        ...prev,
        [field]: value
      }))
    }
  }

  const handleSameAsShippingChange = (checked: boolean) => {
    setSameAsShipping(checked)
    if (checked) {
      setInvoiceInfo(prev => ({
        ...prev,
        name: customerInfo.name,
        email: customerInfo.email,
        phone: customerInfo.phone,
        address: { ...customerInfo.address }
      }))
    }
  }

  const validateForm = () => {
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      addToast({
        type: 'error',
        title: 'Eksik Bilgi',
        description: 'Lütfen ad, e-posta ve telefon alanlarını doldurun'
      })
      return false
    }

    if (!customerInfo.address.street || !customerInfo.address.city || !customerInfo.address.district) {
      addToast({
        type: 'error',
        title: 'Eksik Adres Bilgisi',
        description: 'Lütfen teslimat adres bilgilerini doldurun'
      })
      return false
    }

    // Kart bilgileri Tosla'nın sayfasında girilecek, burada kontrol gerekmez

    return true
  }

  const handlePayment = async () => {
    if (!validateForm()) return

    setIsProcessing(true)

    try {
      // Sipariş oluştur
      const orderData = {
        items: items || [],
        customerInfo,
        invoiceInfo: sameAsShipping ? {
          ...invoiceInfo,
          name: customerInfo.name,
          email: customerInfo.email,
          phone: customerInfo.phone,
          address: customerInfo.address
        } : invoiceInfo,
        status: 'pending' as const,
        paymentStatus: 'pending' as const,
        paymentMethod: selectedPaymentMethod,
        subtotal: getTotalPrice(),
        discount: appliedDiscount ? getTotalPrice() - totalPrice : 0,
        discountCode: appliedDiscount?.code,
        shippingCost: 0,
        total: totalPrice,
        notes: customerInfo.notes
      }

      const orderResult = await createOrder(orderData)

      if (!orderResult.success || !orderResult.orderId) {
        addToast({
          type: 'error',
          title: 'Hata',
          description: orderResult.message || 'Sipariş oluşturulamadı'
        })
        return
      }

      // Ödeme işlemi
      const paymentData = {
        orderId: orderResult.orderId,
        amount: totalPrice,
        currency: 'TRY',
        customerInfo,
        items: (items || []).map((item) => ({
          id: item.product.id,
          name: item.product.name,
          price: item.price,
          quantity: item.quantity
        }))
      }

      let paymentResult

      switch (selectedPaymentMethod) {
        case 'whatsapp':
          paymentResult = await processWhatsAppPayment(paymentData)
          break
        case 'credit-card':
          // Kart bilgileri Tosla'nın sayfasında girilecek, burada boş gönderiyoruz
          paymentResult = await processCreditCardPayment(paymentData, {
            cardNumber: '',
            expiryMonth: '',
            expiryYear: '',
            cvc: '',
            cardHolderName: ''
          })
          break
        case 'bank-transfer':
          paymentResult = await processBankTransferPayment(paymentData)
          break
        default:
          throw new Error('Geçersiz ödeme yöntemi')
      }

      if (paymentResult.success) {
        // E-posta gönder - Müşteri
        try {
          await fetch('/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ emailType: 'orderConfirmation', orderId: orderResult.orderId })
          })

          // E-posta gönder - Admin
          await fetch('/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ emailType: 'orderNotificationAdmin', orderId: orderResult.orderId })
          })
        } catch (emailError) {
          console.error('E-posta gönderme hatası:', emailError)
          // E-posta hatası sipariş işlemini durdurmasın
        }

        // Sepeti temizle
        clearCart()
        
        if (paymentResult.redirectUrl) {
          if (selectedPaymentMethod === 'whatsapp') {
            // WhatsApp için yeni sekmede aç
            window.open(paymentResult.redirectUrl, '_blank')
            router.push(`/siparis-onay/${orderResult.orderId}`)
          } else {
            // Diğer ödeme yöntemleri için redirect
            router.push(paymentResult.redirectUrl)
          }
        } else {
          router.push(`/siparis-onay/${orderResult.orderId}`)
        }

        addToast({
          type: 'success',
          title: 'Ödeme Başarılı!',
          description: 'Siparişiniz alındı ve işleme konuldu'
        })
      } else {
        addToast({
          type: 'error',
          title: 'Ödeme Hatası',
          description: paymentResult.errorMessage || 'Ödeme işlemi başarısız oldu'
        })
      }
    } catch (error) {
      console.error('Ödeme hatası:', error)
      addToast({
        type: 'error',
        title: 'Hata',
        description: 'Ödeme işlemi sırasında bir hata oluştu'
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const getPaymentIcon = (method: string) => {
    switch (method) {
      case 'whatsapp': return <Smartphone className="w-5 h-5" />
      case 'credit-card': return <CreditCard className="w-5 h-5" />
      case 'bank-transfer': return <Building2 className="w-5 h-5" />
      default: return null
    }
  }

  return (
    <div className="min-h-screen bg-[#f7f8f5] text-[#171a16]">
      <Header />

      <main className="site-container py-5 sm:py-10 lg:py-14">
        <div className="mb-5 border-b border-[#dfe3dc] pb-5 sm:mb-8 sm:pb-7">
          <button type="button" onClick={() => router.push('/sepet')} className="mb-3 inline-flex items-center gap-2 text-xs font-semibold text-[#6d746a] hover:text-[#171a16] sm:mb-5">
            <ArrowLeft className="size-4" /> Sepete dön
          </button>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[.14em] text-[#579d32] sm:mb-3 sm:text-xs sm:tracking-[.16em]">Sipariş</p>
              <h1 className="text-[clamp(2rem,8vw,4.2rem)] font-semibold leading-[.94] tracking-[-.055em]">Teslimat ve ödeme</h1>
              <p className="mt-2 text-xs leading-5 text-[#777d74] sm:mt-3 sm:text-sm">Bilgilerinizi tamamlayın, ödeme yöntemini seçin ve siparişi oluşturun.</p>
            </div>

            <div className="flex items-center gap-1 text-[10px] font-semibold text-[#899087] sm:gap-2 sm:text-[11px]">
              {[['01','Sepet', true], ['02','Teslimat', true], ['03','Ödeme', true], ['04','Onay', false]].map(([no,label,active], index) => (
                <div key={String(no)} className="flex items-center gap-2">
                  <span className={`flex size-7 items-center justify-center rounded-full border ${active ? 'border-[#171a16] bg-[#171a16] text-white' : 'border-[#d5d9d2] bg-white text-[#949a91]'}`}>{no}</span>
                  <span className={`${active ? 'text-[#31362f]' : ''} hidden sm:inline`}>{String(label)}</span>
                  {index < 3 && <ChevronRight className="size-3.5 text-[#b2b7af]" />}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-5 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-12">
          <div className="space-y-4 sm:space-y-5">
            <CheckoutSection number="01" icon={User} title="İletişim bilgileri" description="Sipariş ve teslimat güncellemelerini bu bilgiler üzerinden paylaşacağız.">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Ad Soyad" required><Input value={customerInfo.name} onChange={(e) => handleInputChange('name', e.target.value)} placeholder="Adınız ve soyadınız" /></Field>
                <Field label="E-posta" required><Input type="email" value={customerInfo.email} onChange={(e) => handleInputChange('email', e.target.value)} placeholder="ornek@email.com" /></Field>
              </div>
              <div className="mt-4"><Field label="Telefon" required><Input value={customerInfo.phone} onChange={(e) => handleInputChange('phone', e.target.value)} placeholder="05xx xxx xx xx" /></Field></div>
            </CheckoutSection>

            <CheckoutSection number="02" icon={MapPin} title="Teslimat adresi" description="Siparişiniz bu adrese gönderilecek.">
              <Field label="Açık adres" required><Textarea value={customerInfo.address.street} onChange={(e) => handleInputChange('address.street', e.target.value)} placeholder="Mahalle, sokak, bina ve daire bilgisi" rows={3} /></Field>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                <Field label="İl" required><Input value={customerInfo.address.city} onChange={(e) => handleInputChange('address.city', e.target.value)} /></Field>
                <Field label="İlçe" required><Input value={customerInfo.address.district} onChange={(e) => handleInputChange('address.district', e.target.value)} /></Field>
                <Field label="Posta kodu"><Input value={customerInfo.address.postalCode} onChange={(e) => handleInputChange('address.postalCode', e.target.value)} /></Field>
              </div>
              <div className="mt-4"><Field label="Sipariş notu"><Textarea value={customerInfo.notes} onChange={(e) => handleInputChange('notes', e.target.value)} placeholder="Üretim veya teslimat için eklemek istediğiniz not" rows={2} /></Field></div>
            </CheckoutSection>

            <CheckoutSection number="03" icon={Building2} title="Fatura bilgileri" description="Bireysel veya kurumsal fatura tercihinizi belirleyin.">
              <div className="grid grid-cols-2 gap-2">
                {[
                  ['individual', 'Bireysel'],
                  ['corporate', 'Kurumsal'],
                ].map(([key,label]) => (
                  <button key={key} type="button" onClick={() => setInvoiceInfo((current) => ({ ...current, type: key as 'individual' | 'corporate' }))} className={`rounded-[12px] border px-4 py-3 text-sm font-semibold transition ${invoiceInfo.type === key ? 'border-[#171a16] bg-[#171a16] text-white' : 'border-[#dfe3dc] bg-white text-[#555c53] hover:border-[#aeb4aa]'}`}>{label}</button>
                ))}
              </div>

              <label className="mt-4 flex cursor-pointer items-center gap-3 rounded-[12px] bg-[#f6f7f4] px-4 py-3 text-sm text-[#555c53]">
                <input type="checkbox" checked={sameAsShipping} onChange={(e) => handleSameAsShippingChange(e.target.checked)} className="size-4 accent-[#171a16]" />
                Fatura adresim teslimat adresimle aynı
              </label>

              {invoiceInfo.type === 'corporate' && (
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <Field label="Firma / Unvan"><Input value={invoiceInfo.name} onChange={(e) => handleInvoiceInputChange('name', e.target.value)} /></Field>
                  <Field label="Vergi numarası"><Input value={invoiceInfo.taxNumber} onChange={(e) => handleInvoiceInputChange('taxNumber', e.target.value)} /></Field>
                  <Field label="Vergi dairesi"><Input value={invoiceInfo.taxOffice} onChange={(e) => handleInvoiceInputChange('taxOffice', e.target.value)} /></Field>
                  <Field label="Fatura e-postası"><Input type="email" value={invoiceInfo.email} onChange={(e) => handleInvoiceInputChange('email', e.target.value)} /></Field>
                </div>
              )}

              {!sameAsShipping && (
                <div className="mt-4 border-t border-[#eceee9] pt-4">
                  <Field label="Fatura adresi"><Textarea value={invoiceInfo.address.street} onChange={(e) => handleInvoiceInputChange('address.street', e.target.value)} rows={2} /></Field>
                  <div className="mt-4 grid gap-4 sm:grid-cols-3">
                    <Field label="İl"><Input value={invoiceInfo.address.city} onChange={(e) => handleInvoiceInputChange('address.city', e.target.value)} /></Field>
                    <Field label="İlçe"><Input value={invoiceInfo.address.district} onChange={(e) => handleInvoiceInputChange('address.district', e.target.value)} /></Field>
                    <Field label="Posta kodu"><Input value={invoiceInfo.address.postalCode} onChange={(e) => handleInvoiceInputChange('address.postalCode', e.target.value)} /></Field>
                  </div>
                </div>
              )}
            </CheckoutSection>

            <CheckoutSection number="04" icon={CreditCard} title="Ödeme yöntemi" description="Ödeme altyapısından bağımsız, sade bir seçim akışı.">
              <div className="grid gap-2">
                {Object.entries(paymentMethods).map(([key, method]) => {
                  const selected = selectedPaymentMethod === key
                  return (
                    <button key={key} type="button" onClick={() => setSelectedPaymentMethod(key as typeof selectedPaymentMethod)} className={`flex items-center gap-4 rounded-[14px] border p-4 text-left transition ${selected ? 'border-[#171a16] bg-[#f6f7f4]' : 'border-[#dfe3dc] bg-white hover:border-[#aeb4aa]'}`}>
                      <span className={`flex size-10 shrink-0 items-center justify-center rounded-full ${selected ? 'bg-[#171a16] text-white' : 'bg-[#f2f3ef] text-[#697067]'}`}>{getPaymentIcon(key)}</span>
                      <span className="min-w-0 flex-1"><span className="block text-sm font-semibold text-[#171a16]">{method.name}</span><span className="mt-1 block text-xs leading-5 text-[#7b8178]">{method.description}</span></span>
                      <span className={`flex size-5 shrink-0 items-center justify-center rounded-full border ${selected ? 'border-[#171a16] bg-[#171a16] text-white' : 'border-[#c9cec6]'}`}>{selected && <Check className="size-3" />}</span>
                    </button>
                  )
                })}
              </div>

              {selectedPaymentMethod === 'credit-card' && <div className="mt-3 flex gap-3 rounded-[12px] bg-[#eef6e9] p-4 text-xs leading-5 text-[#4f6443]"><ShieldCheck className="mt-0.5 size-4 shrink-0" /> Kart bilgileri güvenli ödeme sağlayıcısının ekranında girilir.</div>}
              {selectedPaymentMethod === 'bank-transfer' && <div className="mt-3 flex gap-3 rounded-[12px] bg-[#f5f6f2] p-4 text-xs leading-5 text-[#697067]"><Building2 className="mt-0.5 size-4 shrink-0" /> Sipariş oluşturulduktan sonra havale bilgileri ve ödeme onay akışı gösterilir.</div>}
              {selectedPaymentMethod === 'whatsapp' && <div className="mt-3 flex gap-3 rounded-[12px] bg-[#f5f6f2] p-4 text-xs leading-5 text-[#697067]"><Smartphone className="mt-0.5 size-4 shrink-0" /> Sipariş oluşturulur ve görüşmeye sipariş numarasıyla devam edilir.</div>}
            </CheckoutSection>
          </div>

          <aside className="lg:sticky lg:top-[82px] lg:h-fit">
            <div className="rounded-[20px] border border-[#dfe3dc] bg-white p-5 sm:p-6">
              <div className="flex items-center justify-between"><p className="text-xs font-semibold uppercase tracking-[.14em] text-[#8a9087]">Sipariş özeti</p><span className="text-xs text-[#8a9087]">{items.length} ürün</span></div>

              <div className="mt-5 space-y-4 border-b border-[#e8eae6] pb-5">
                {items.map((item) => (
                  <div key={item.id} className="grid grid-cols-[52px_1fr_auto] gap-3">
                    <div className="relative size-[52px] overflow-hidden rounded-[10px] bg-[#f2f3f0]"><Image src={item.product.image} alt={item.product.name} fill sizes="52px" className="object-contain p-2" /></div>
                    <div className="min-w-0"><p className="truncate text-xs font-semibold text-[#31362f]">{item.product.name}</p><p className="mt-1 text-[11px] text-[#8a9087]">{item.quantity.toLocaleString('tr-TR')} adet · {item.cartQuantity} paket</p></div>
                    <p className="text-xs font-semibold text-[#31362f]">{(item.price * item.cartQuantity).toLocaleString('tr-TR')} TL</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 py-5 text-sm">
                <div className="flex justify-between"><span className="text-[#777d74]">Ara toplam</span><span>{getTotalPrice().toLocaleString('tr-TR')} TL</span></div>
                {appliedDiscount && <div className="flex justify-between text-[#579d32]"><span>İndirim</span><span>-{(getTotalPrice() - totalPrice).toLocaleString('tr-TR')} TL</span></div>}
                <div className="flex justify-between"><span className="text-[#777d74]">Kargo</span><span className="font-medium text-[#579d32]">Ücretsiz</span></div>
              </div>

              <div className="border-t border-[#e8eae6] pt-5">
                <div className="flex items-end justify-between"><span className="text-sm font-semibold">Toplam</span><span className="text-[30px] font-semibold tracking-[-.045em]">{totalPrice.toLocaleString('tr-TR')} TL</span></div>
                <p className="mt-1 text-right text-[11px] text-[#949a91]">KDV dahil</p>
              </div>

              <button type="button" onClick={handlePayment} disabled={isProcessing} className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-[12px] bg-[#171a16] px-5 text-sm font-semibold text-white transition hover:bg-[#2b3029] disabled:cursor-not-allowed disabled:opacity-55">
                {isProcessing ? 'Sipariş oluşturuluyor...' : <>Siparişi oluştur <ChevronRight className="size-4" /></>}
              </button>

              <div className="mt-5 flex items-start gap-3 border-t border-[#eceee9] pt-5 text-xs leading-5 text-[#777d74]"><LockKeyhole className="mt-0.5 size-4 shrink-0 text-[#579d32]" /> Bilgileriniz sipariş işlemi için güvenli bağlantı üzerinden işlenir.</div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="rounded-[14px] border border-[#e0e3dd] bg-white p-4"><Truck className="mb-4 size-4 text-[#579d32]" /><p className="text-xs font-semibold">Gönderim</p><p className="mt-1 text-[11px] leading-4 text-[#858b82]">Sipariş durumundan takip edilir.</p></div>
              <div className="rounded-[14px] border border-[#e0e3dd] bg-white p-4"><ShieldCheck className="mb-4 size-4 text-[#579d32]" /><p className="text-xs font-semibold">Dosya kontrolü</p><p className="mt-1 text-[11px] leading-4 text-[#858b82]">Üretim öncesi siparişle eşleşir.</p></div>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  )
}

function CheckoutSection({ number, icon: Icon, title, description, children }: { number: string; icon: typeof User; title: string; description: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[16px] border border-[#dfe3dc] bg-white p-4 sm:rounded-[20px] sm:p-6">
      <div className="mb-4 flex items-start gap-3 border-b border-[#eceee9] pb-4 sm:mb-6 sm:gap-4 sm:pb-5">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#171a16] text-[11px] font-semibold text-white sm:size-9 sm:text-xs">{number}</span>
        <div className="flex-1"><div className="flex items-center gap-2"><Icon className="size-4 text-[#579d32]" /><h2 className="text-base font-semibold tracking-[-.02em]">{title}</h2></div><p className="mt-1 text-xs leading-5 text-[#7d837a]">{description}</p></div>
      </div>
      {children}
    </section>
  )
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return <label className="block"><span className="mb-2 block text-xs font-semibold text-[#555c53]">{label}{required && <span className="text-[#579d32]"> *</span>}</span>{children}</label>
}
