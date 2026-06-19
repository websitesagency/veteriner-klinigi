import { Card, CardContent } from '@/components/ui/card';

export default function HakkimizdaPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Hakkımızda
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            15 yılı aşkın deneyimimizle evcil dostlarınızın sağlığını koruyoruz.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Hikayemiz
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  VetKlinik, 2009 yılında Dr. Ayşe Yılmaz tarafından İstanbul&apos;da
                  kurulmuştur. Kuruluşumuzdan bu yana, binlerce evcil hayvana
                  sağlık hizmeti sunduk ve ailelerin mutluluğuna ortak olduk.
                </p>
                <p>
                  Modern veteriner tıbbının tüm olanaklarını kullanarak,
                  evcil hayvanlarınıza en iyi bakımı sunmayı hedefliyoruz.
                  Kliniğimizde son teknoloji ekipmanlar ve deneyimli bir ekip
                  bulunmaktadır.
                </p>
                <p>
                  Amacımız, sadece tedavi etmek değil, aynı zamanda evcil hayvan
                  sahiplerini bilgilendirmek ve koruyucu sağlık hizmetleri
                  sunmaktır.
                </p>
              </div>
            </div>
            <div className="bg-primary/10 rounded-2xl h-[400px] flex items-center justify-center">
              <div className="text-center text-gray-400">
                <svg className="w-24 h-24 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <p>Klinik Görseli</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Değerlerimiz
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Sevgi</h3>
                <p className="text-gray-600">
                  Her hayvana sevgi ve şefkatle yaklaşıyoruz.
                  Onların konforunu ve mutluluğunu ön planda tutuyoruz.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Güven</h3>
                <p className="text-gray-600">
                  Şeffaf iletişim ve dürüst yaklaşımımızla
                  güveninizi kazanmak en önemli önceliğimiz.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Uzmanlık</h3>
                <p className="text-gray-600">
                  Sürekli eğitim ve gelişimle veteriner tıbbındaki
                  en son gelişmeleri takip ediyoruz.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">15+</div>
              <div className="text-gray-600">Yıllık Deneyim</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">10K+</div>
              <div className="text-gray-600">Mutlu Hasta</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">5</div>
              <div className="text-gray-600">Uzman Veteriner</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">7/24</div>
              <div className="text-gray-600">Acil Servis</div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Klinik Olanaklarımız
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Modern Ameliyathane', desc: 'Tam donanımlı cerrahi ünite' },
              { title: 'Dijital Görüntüleme', desc: 'Röntgen ve ultrason cihazları' },
              { title: 'Laboratuvar', desc: 'Hızlı sonuç veren test ekipmanları' },
              { title: 'Yoğun Bakım', desc: '24 saat izleme sistemi' },
              { title: 'Diş Ünitesi', desc: 'Dental röntgen ve tedavi ekipmanı' },
              { title: 'Pet Otel', desc: 'Konforlu konaklama odaları' },
            ].map((facility, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-gray-900 mb-2">{facility.title}</h3>
                <p className="text-gray-600 text-sm">{facility.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
