import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const services = [
  {
    id: '1',
    name: 'Genel Muayene',
    description: 'Kapsamlı sağlık kontrolleri ile evcil hayvanınızın genel sağlık durumunu değerlendiriyoruz.',
    details: [
      'Fiziksel muayene',
      'Kalp ve akciğer dinlemesi',
      'Kilo ve vücut kondisyonu değerlendirmesi',
      'Diş ve ağız sağlığı kontrolü',
      'Kulak ve göz muayenesi',
    ],
    price: '500 TL',
    duration: '30 dakika',
  },
  {
    id: '2',
    name: 'Aşılama',
    description: 'Evcil hayvanlarınızı hastalıklara karşı korumak için düzenli aşılama programları.',
    details: [
      'Karma aşı (köpek/kedi)',
      'Kuduz aşısı',
      'Leptospiroz aşısı',
      'Bordetella aşısı',
      'Aşı kartı düzenlenmesi',
    ],
    price: '300-800 TL',
    duration: '15-20 dakika',
  },
  {
    id: '3',
    name: 'Cerrahi Operasyonlar',
    description: 'Deneyimli cerrahlarımız ve modern ekipmanlarımızla güvenli cerrahi müdahaleler.',
    details: [
      'Yumuşak doku cerrahisi',
      'Ortopedik operasyonlar',
      'Tümör cerrahisi',
      'Göz cerrahisi',
      'Acil cerrahi müdahaleler',
    ],
    price: '2000-15000 TL',
    duration: 'İşleme göre değişir',
  },
  {
    id: '4',
    name: 'Diş Tedavisi',
    description: 'Diş sağlığı için profesyonel temizlik ve tedavi hizmetleri.',
    details: [
      'Diş taşı temizliği',
      'Diş çekimi',
      'Periodontal tedavi',
      'Diş röntgeni',
      'Ağız hijyeni eğitimi',
    ],
    price: '800-3000 TL',
    duration: '45-90 dakika',
  },
  {
    id: '5',
    name: 'Ultrason & Röntgen',
    description: 'Gelişmiş görüntüleme teknolojileri ile doğru teşhis.',
    details: [
      'Dijital röntgen',
      'Abdominal ultrason',
      'Kardiyak ultrason',
      'Gebelik takibi',
      'Görüntü arşivleme',
    ],
    price: '400-1000 TL',
    duration: '20-40 dakika',
  },
  {
    id: '6',
    name: 'Laboratuvar',
    description: 'Kapsamlı kan, idrar ve diğer testlerle sağlık durumu analizi.',
    details: [
      'Tam kan sayımı',
      'Biyokimya paneli',
      'İdrar tahlili',
      'Dışkı parazit testi',
      'Hormon testleri',
    ],
    price: '200-1500 TL',
    duration: 'Sonuçlar 1-24 saat',
  },
  {
    id: '7',
    name: 'Kısırlaştırma',
    description: 'Güvenli ve profesyonel kısırlaştırma operasyonları.',
    details: [
      'Dişi hayvanlarda ovaryohisterektomi',
      'Erkek hayvanlarda kastrasyon',
      'Pre-operatif muayene',
      'Post-operatif bakım',
      'Ağrı yönetimi',
    ],
    price: '1500-4000 TL',
    duration: '30-60 dakika operasyon',
  },
  {
    id: '8',
    name: '7/24 Acil Servis',
    description: 'Her an yanınızdayız. Acil durumlarda hemen bize ulaşın.',
    details: [
      'Travma müdahalesi',
      'Zehirlenme tedavisi',
      'Solunum güçlüğü',
      'Doğum komplikasyonları',
      'Yoğun bakım',
    ],
    price: '1000 TL+',
    duration: 'Duruma göre',
    isEmergency: true,
  },
  {
    id: '9',
    name: 'Pet Kuaför',
    description: 'Evcil hayvanınızın bakım ve temizliği için profesyonel hizmetler.',
    details: [
      'Tıraş ve kesim',
      'Banyo ve kurutma',
      'Tırnak kesimi',
      'Kulak temizliği',
      'Özel bakım ürünleri',
    ],
    price: '150-500 TL',
    duration: '1-2 saat',
  },
  {
    id: '10',
    name: 'Pet Otel',
    description: 'Tatilinizde evcil hayvanınız güvenle bizimle kalsın.',
    details: [
      'Konforlu odalar',
      'Günlük aktiviteler',
      'Veteriner kontrolü',
      'Özel beslenme',
      'Canlı kamera izleme',
    ],
    price: '200-500 TL/gün',
    duration: 'Konaklama süresi',
  },
];

export default function HizmetlerPage() {
  return (
    <div className="py-12">
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Hizmetlerimiz
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Evcil hayvanlarınız için kapsamlı veteriner hizmetleri sunuyoruz.
            Modern ekipmanlar ve uzman kadromuzla her zaman yanınızdayız.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="space-y-8">
            {services.map((service) => (
              <Card
                key={service.id}
                id={service.id}
                className={`overflow-hidden ${
                  service.isEmergency ? 'border-red-200 bg-red-50' : ''
                }`}
              >
                <div className="grid md:grid-cols-3 gap-6">
                  <CardHeader className="md:col-span-2">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          service.isEmergency
                            ? 'bg-red-100 text-red-600'
                            : 'bg-primary/10 text-primary'
                        }`}
                      >
                        <span className="text-xl font-bold">{service.id}</span>
                      </div>
                      <div>
                        <CardTitle className="text-2xl mb-2">{service.name}</CardTitle>
                        <CardDescription className="text-base">
                          {service.description}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="mt-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Hizmet Detayları:</h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {service.details.map((detail, index) => (
                          <li key={index} className="flex items-center gap-2 text-gray-600">
                            <svg
                              className="w-4 h-4 text-primary flex-shrink-0"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-col justify-center bg-gray-50 p-6 rounded-lg m-4">
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-gray-500">Ücret</div>
                        <div
                          className={`text-2xl font-bold ${
                            service.isEmergency ? 'text-red-600' : 'text-primary'
                          }`}
                        >
                          {service.price}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Süre</div>
                        <div className="font-medium text-gray-900">{service.duration}</div>
                      </div>
                      <Link href="/randevu">
                        <Button
                          className="w-full"
                          variant={service.isEmergency ? 'destructive' : 'default'}
                        >
                          Randevu Al
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Sorularınız mı Var?
          </h2>
          <p className="text-green-100 mb-8 max-w-2xl mx-auto">
            Hizmetlerimiz hakkında daha fazla bilgi almak için bize ulaşın.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/iletisim">
              <Button size="lg" variant="secondary">
                İletişime Geçin
              </Button>
            </Link>
            <a href="tel:+905001234567">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                0500 VET XXXX
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
