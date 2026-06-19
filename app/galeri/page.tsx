import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const galleryItems = {
  klinik: [
    { id: 1, title: 'Resepsiyon', desc: 'Modern ve ferah giriş alanımız' },
    { id: 2, title: 'Muayene Odası', desc: 'Tam donanımlı muayene ünitemiz' },
    { id: 3, title: 'Ameliyathane', desc: 'Steril cerrahi ortamımız' },
    { id: 4, title: 'Görüntüleme Odası', desc: 'Röntgen ve ultrason ünitemiz' },
    { id: 5, title: 'Laboratuvar', desc: 'Hızlı sonuç veren laboratuvarımız' },
    { id: 6, title: 'Bekleme Alanı', desc: 'Rahat bekleme salonumuz' },
  ],
  hastalar: [
    { id: 1, title: 'Pamuk', desc: 'Başarılı ameliyat sonrası' },
    { id: 2, title: 'Max', desc: 'Düzenli kontrollerde' },
    { id: 3, title: 'Çiko', desc: 'Kanat tedavisi' },
    { id: 4, title: 'Fındık', desc: 'Diş tedavisi sonrası' },
    { id: 5, title: 'Boncuk', desc: 'Aşı günü' },
    { id: 6, title: 'Karamel', desc: 'Yavru kontrolü' },
  ],
  ekip: [
    { id: 1, title: 'Ekip Toplantısı', desc: 'Haftalık vaka değerlendirmesi' },
    { id: 2, title: 'Eğitim', desc: 'Sürekli mesleki gelişim' },
    { id: 3, title: 'Operasyon', desc: 'Cerrahi ekibimiz iş başında' },
    { id: 4, title: 'Hasta Bakımı', desc: 'Sevgi dolu yaklaşımımız' },
  ],
};

export default function GaleriPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Galeri
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Kliniğimizden, hastalarımızdan ve ekibimizden kareler
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="klinik" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-12">
              <TabsTrigger value="klinik">Klinik</TabsTrigger>
              <TabsTrigger value="hastalar">Hastalarımız</TabsTrigger>
              <TabsTrigger value="ekip">Ekibimiz</TabsTrigger>
            </TabsList>

            <TabsContent value="klinik">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryItems.klinik.map((item) => (
                  <div key={item.id} className="group cursor-pointer">
                    <div className="aspect-[4/3] bg-primary/10 rounded-lg overflow-hidden flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                      <svg className="w-16 h-16 text-primary/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="hastalar">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryItems.hastalar.map((item) => (
                  <div key={item.id} className="group cursor-pointer">
                    <div className="aspect-[4/3] bg-orange-50 rounded-lg overflow-hidden flex items-center justify-center mb-3 group-hover:bg-orange-100 transition-colors">
                      <svg className="w-16 h-16 text-orange-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="ekip">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryItems.ekip.map((item) => (
                  <div key={item.id} className="group cursor-pointer">
                    <div className="aspect-[4/3] bg-blue-50 rounded-lg overflow-hidden flex items-center justify-center mb-3 group-hover:bg-blue-100 transition-colors">
                      <svg className="w-16 h-16 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Tanıtım Videomuz
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Kliniğimizi ve hizmetlerimizi daha yakından tanıyın.
          </p>
          <div className="max-w-3xl mx-auto aspect-video bg-gray-200 rounded-xl flex items-center justify-center">
            <div className="text-center text-gray-400">
              <svg className="w-16 h-16 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>Video Oynatici</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
