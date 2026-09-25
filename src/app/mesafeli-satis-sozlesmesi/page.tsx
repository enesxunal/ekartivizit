'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Building2, ShoppingBag, Truck, RotateCcw, Scale, Mail, Phone } from 'lucide-react'

const sections = [
  {
    title: '1. Taraflar',
    icon: Building2,
    content: (
      <div className="space-y-2 text-[#4f574f]">
        <p><strong className="text-[#171a16]">Satıcı:</strong> Enes Ünal (E-Kartvizit)</p>
        <p><strong className="text-[#171a16]">Vergi Dairesi:</strong> Güngören</p>
        <p><strong className="text-[#171a16]">Vergi Kimlik No:</strong> 9080359504</p>
        <p><strong className="text-[#171a16]">Adres:</strong> Merkez Mah. Bayrampaşa Cad. No: 23 B, Güngören / İstanbul</p>
        <p><strong className="text-[#171a16]">E-posta:</strong> info@ekartvizit.tr</p>
        <p><strong className="text-[#171a16]">Telefon:</strong> 0 850 840 30 11</p>
        <p className="pt-2">Alıcı; ekartvizit.tr üzerinden sipariş oluşturan ve sipariş sırasında ad, iletişim, teslimat ve fatura bilgilerini beyan eden gerçek veya tüzel kişidir.</p>
      </div>
    ),
  },
  {
    title: '2. Sözleşmenin Konusu',
    icon: ShoppingBag,
    content: (
      <div className="space-y-3 text-[#4f574f]">
        <p>Bu sözleşme, Alıcı’nın <strong className="text-[#171a16]">https://ekartvizit.tr</strong> üzerinden elektronik ortamda sipariş verdiği baskı, tanıtım ve promosyon ürünlerinin satışı ve teslimine ilişkin tarafların hak ve yükümlülüklerini düzenler.</p>
        <p>Siparişe konu ürünün adı, adedi, teknik özellikleri, kişiselleştirme seçenekleri, satış bedeli, ödeme yöntemi ve teslimat bilgileri sipariş özeti ile ödeme adımında Alıcı’ya gösterilen bilgilerden oluşur.</p>
      </div>
    ),
  },
  {
    title: '3. Fiyat ve Ödeme',
    icon: FileText,
    content: (
      <div className="space-y-3 text-[#4f574f]">
        <p>Ürünlerin güncel satış fiyatı ve varsa ek hizmet bedelleri ürün ve ödeme sayfalarında gösterilir. Sipariş anında onaylanan toplam bedel esas alınır.</p>
        <p>Ödeme, sitede sipariş anında sunulan aktif ödeme yöntemlerinden biri kullanılarak gerçekleştirilir. Ödeme işlemi tamamlanmadan üretim süreci başlatılmayabilir.</p>
      </div>
    ),
  },
  {
    title: '4. Teslimat',
    icon: Truck,
    content: (
      <div className="space-y-3 text-[#4f574f]">
        <p>Siparişler, Alıcı’nın bildirdiği teslimat adresine anlaşmalı kargo/taşıma hizmeti ile gönderilir. Üretim ve teslimat süresi ürünün türüne, adedine, kişiselleştirme durumuna ve taşıma bölgesine göre değişebilir.</p>
        <p>Alıcı, teslimat sırasında paketi kontrol etmeli; taşıma sırasında oluştuğu açıkça görülen hasarlarda kargo görevlisi ile tutanak düzenlemelidir.</p>
      </div>
    ),
  },
  {
    title: '5. Cayma, İptal ve İade',
    icon: RotateCcw,
    content: (
      <div className="space-y-3 text-[#4f574f]">
        <p>Standart ve kişiselleştirilmemiş ürünlerde tüketicinin cayma ve iade hakları yürürlükteki tüketici mevzuatına göre uygulanır.</p>
        <p>Tüketicinin istekleri veya kişisel ihtiyaçları doğrultusunda hazırlanan; baskı içeriği, ölçüsü, tasarımı, isim/iletişim bilgileri veya benzeri özellikleri müşteriye özel üretilen ürünlerde mevzuattaki istisnalar kapsamında cayma hakkı uygulanmayabilir.</p>
        <p>Ayıplı, hatalı veya siparişten farklı üretilen ürünlere ilişkin yasal haklar saklıdır. Bu tür durumlarda info@ekartvizit.tr üzerinden sipariş numarası ve görsellerle bildirim yapılabilir.</p>
      </div>
    ),
  },
  {
    title: '6. Genel Hükümler ve Uyuşmazlık',
    icon: Scale,
    content: (
      <div className="space-y-3 text-[#4f574f]">
        <p>Alıcı, sipariş öncesinde ürünün temel nitelikleri, toplam fiyat, ödeme ve teslimat koşulları hakkında bilgi sahibi olduğunu ve siparişi elektronik ortamda onayladığını kabul eder.</p>
        <p>Uyuşmazlıklarda, tüketicinin yerleşim yerindeki veya tüketici işleminin yapıldığı yerdeki yetkili Tüketici Hakem Heyetleri ve Tüketici Mahkemeleri ile ilgili mevzuatta belirlenen diğer yetkili mercilere başvurulabilir.</p>
        <p>Bu sözleşme, siparişin elektronik ortamda onaylanması ile taraflar bakımından geçerli hale gelir.</p>
      </div>
    ),
  },
]

export default function MesafeliSatisSozlesmesiPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#f4f4ef] text-[#171a16]">
        <section className="bg-[#171a16] py-10 text-white sm:py-12 lg:py-14">
          <div className="site-container">
            <div className="mx-auto max-w-4xl text-center">
              <FileText className="mx-auto mb-5 h-14 w-14" />
              <h1 className="text-[clamp(2.25rem,4vw,4rem)] font-semibold leading-[.9] tracking-[-0.06em]">
                Mesafeli Satış Sözleşmesi
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/65 sm:text-lg">
                ekartvizit.tr üzerinden verilen siparişlerde satıcı ve alıcı arasındaki satış, ödeme, teslimat ve iade koşulları.
              </p>
              <p className="mt-5 text-sm text-white/55">Son güncelleme: 25 Eylül 2026</p>
            </div>
          </div>
        </section>

        <section className="site-container py-9 sm:py-12">
          <div className="mx-auto max-w-4xl space-y-5">
            <Card className="rounded-[28px] border-black/8 shadow-none">
              <CardContent className="p-6 sm:p-8">
                <p className="leading-7 text-[#4f574f]">
                  İşbu Mesafeli Satış Sözleşmesi, 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve ilgili mesafeli satış mevzuatı çerçevesinde hazırlanmıştır.
                </p>
              </CardContent>
            </Card>

            {sections.map(({ title, icon: Icon, content }) => (
              <Card key={title} className="rounded-[28px] border-black/8 shadow-none">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-3 text-xl tracking-[-0.025em] sm:text-2xl">
                    <span className="flex size-10 items-center justify-center rounded-full bg-[#579d32]/10 text-[#579d32]">
                      <Icon className="size-5" />
                    </span>
                    {title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-7 text-[15px] leading-7 sm:text-base">
                  {content}
                </CardContent>
              </Card>
            ))}

            <Card className="rounded-[28px] border-black/8 bg-white shadow-none">
              <CardContent className="grid gap-4 p-6 sm:grid-cols-2 sm:p-8">
                <a href="mailto:info@ekartvizit.tr" className="flex items-center gap-3 rounded-2xl border border-black/8 p-4 transition hover:border-black/20">
                  <Mail className="size-5 text-[#579d32]" />
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.12em] text-[#7b827a]">E-posta</div>
                    <div className="mt-1 font-semibold">info@ekartvizit.tr</div>
                  </div>
                </a>
                <a href="tel:+908508403011" className="flex items-center gap-3 rounded-2xl border border-black/8 p-4 transition hover:border-black/20">
                  <Phone className="size-5 text-[#579d32]" />
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.12em] text-[#7b827a]">Telefon</div>
                    <div className="mt-1 font-semibold">0 850 840 30 11</div>
                  </div>
                </a>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
