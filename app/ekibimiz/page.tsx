import { Card, CardContent } from '@/components/ui/card';

const team = [
  {
    id: '1',
    name: 'Dr. Ayşe Yılmaz',
    title: 'Klinik Direktörü',
    specialty: 'Genel Cerrahi',
    experience: '20 yıl',
    education: 'İstanbul Üniversitesi Veteriner Fakültesi',
    bio: 'VetKlinik\'in kurucusu olan Dr. Ayşe, özellikle yumuşak doku cerrahisi ve ortopedi alanında uzmanlaşmıştır.',
  },
  {
    id: '2',
    name: 'Dr. Mehmet Kaya',
    title: 'Uzman Veteriner',
    specialty: 'İç Hastalıkları',
    experience: '15 yıl',
    education: 'Ankara Üniversitesi Veteriner Fakültesi',
    bio: 'İç hastalıkları ve dermatoloji konusunda geniş deneyime sahip Dr. Mehmet, kronik hastalıkların yönetiminde uzmandır.',
  },
  {
    id: '3',
    name: 'Dr. Elif Demir',
    title: 'Uzman Veteriner',
    specialty: 'Egzotik Hayvanlar',
    experience: '10 yıl',
    education: 'Uludağ Üniversitesi Veteriner Fakültesi',
    bio: 'Kuşlar, sürüngenler ve küçük memeliler konusunda uzman olan Dr. Elif, egzotik hayvan sahiplerinin ilk tercihidir.',
  },
  {
    id: '4',
    name: 'Dr. Can Öztürk',
    title: 'Veteriner Hekim',
    specialty: 'Diş Hastalıkları',
    experience: '8 yıl',
    education: 'Selçuk Üniversitesi Veteriner Fakültesi',
    bio: 'Veteriner diş hekimliği konusunda sertifikalı olan Dr. Can, diş tedavisi ve ağız cerrahisinde deneyimlidir.',
  },
  {
    id: '5',
    name: 'Dr. Selin Arslan',
    title: 'Veteriner Hekim',
    specialty: 'Görüntüleme',
    experience: '6 yıl',
    education: 'Erciyes Üniversitesi Veteriner Fakültesi',
    bio: 'Radyoloji ve ultrasonografi konusunda uzman olan Dr. Selin, doğru teşhis için gelişmiş görüntüleme teknikleri kullanır.',
  },
];

export default function EkibimizPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Uzman Kadromuz
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Deneyimli ve tutkulu veteriner hekimlerimizle tanışın.
            Evcil dostlarınız için en iyi bakımı sunmak için buradayız.
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member) => (
              <Card key={member.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-primary/10 flex items-center justify-center">
                  <svg className="w-24 h-24 text-primary/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                  <p className="text-primary font-medium">{member.title}</p>
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Uzmanlık:</span>
                      <span className="text-gray-900">{member.specialty}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Deneyim:</span>
                      <span className="text-gray-900">{member.experience}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Eğitim:</span>
                      <span className="text-gray-900 text-right">{member.education}</span>
                    </div>
                  </div>
                  <p className="mt-4 text-gray-600 text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ekibimize Katılın
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Hayvan sevgisi ve mesleki tutku ile dolu veteriner hekimler arıyoruz.
            Kariyerinizi bizimle şekillendirin.
          </p>
          <a href="mailto:kariyer@vetklinik.com" className="text-primary font-medium hover:underline">
            kariyer@vetklinik.com
          </a>
        </div>
      </section>
    </div>
  );
}
