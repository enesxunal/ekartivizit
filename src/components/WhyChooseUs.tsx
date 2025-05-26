import { CheckCircle, Truck, CreditCard } from 'lucide-react'

export default function WhyChooseUs() {
  const features = [
    {
      icon: CheckCircle,
      title: 'Ücretsiz Tasarım Desteği',
      description: 'Uzman tasarım ekibimiz sizin için profesyonel tasarımlar hazırlar.',
      color: 'text-green-600'
    },
    {
      icon: Truck,
      title: 'Ücretsiz Kargo',
      description: 'Tüm siparişlerinizde kargo ücretsizdir.',
      color: 'text-blue-600'
    },
    {
      icon: CreditCard,
      title: 'KDV Dahil Fiyatlar',
      description: 'Tüm fiyatlarımızda KDV dahildir.',
      color: 'text-purple-600'
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            <span className="text-green-600">Özellikler</span>
          </h2>
          <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
            Neden Bizi Tercih Etmelisiniz?
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <div key={index} className="text-center group">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center group-hover:bg-green-50 transition-colors">
                    <IconComponent className={`w-8 h-8 ${feature.color}`} />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
} 