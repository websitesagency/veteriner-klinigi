import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const emergencySymptoms = [
  'Solunum güçlüğü',
  'Şiddetli kanama',
  'Bilinç kaybı',
  'Nöbet / Kasılma',
  'Zehirlenme şüphesi',
  'Trafik kazası',
  'Düşme / Travma',
  'Kusma veya ishal (şiddetli)',
  'İdrar yapamama',
  'Doğum komplikasyonları',
  'Isı çarpması',
  'Boğulma',
];

const emergencySteps = [
  {
    title: 'Sakin Olun',
    description: 'Paniklememek hem sizin hem hayvanınızın güvenliği için önemlidir.',
  },
  {
    title: 'Acil Hattı Arayın',
    description: 'Hemen 0555 ACL XXXX numarasını arayın. 7/24 aktiftir.',
  },
  {
    title: 'Durumu Anlatın',
    description: 'Belirtileri ve ne zaman başladığını kısaca anlatın.',
  },
  {
    title: 'Talimatları Takip Edin',
    description: 'Veterinerimizin telefondaki yönlendirmelerini uygulayın.',
  },
  {
    title: 'Kliniğe Gelin',
    description: 'Güvenli bir şekilde kliniğimize gelin. Yol tarifi için sorun.',
  },
];

export default function AcilPage() {
  return (
    <div>
      {/* Emergency Hero */}
      <section className="bg-red-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            7/24 Acil Veteriner Hizmeti
          </h1>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            Acil bir durum mu var? Hemen arayın! Deneyimli ekibimiz her an hazır.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+905551234567">
              <Button size="lg" variant="secondary" className="bg-white text-red-600 hover:bg-red-50 text-lg px-8">
                <svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                0555 ACL XXXX
              </Button>
            </a>
            <a href="https://wa.me/905551234567">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8">
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Emergency Symptoms */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
            Acil Durum Belirtileri
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Aşağıdaki belirtilerden herhangi birini gözlemliyorsanız hemen bizi arayın.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {emergencySymptoms.map((symptom, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg p-4"
              >
                <svg className="w-5 h-5 text-red-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span className="text-sm font-medium text-red-800">{symptom}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What To Do */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Acil Durumda Ne Yapmalı?
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {emergencySteps.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="text-red-600">Acil Hat</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  7/24 acil durumlarda bu hattı arayabilirsiniz.
                  Nöbetçi veterinerimiz her zaman hazırdır.
                </p>
                <a href="tel:+905551234567" className="text-2xl font-bold text-red-600 hover:underline">
                  0555 ACL XXXX
                </a>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Klinik Adresi</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Hayvan Dostları Cad. No:15, İstanbul
                </p>
                <p className="text-sm text-gray-500">
                  7/24 acil giriş kapımız aktiftir. Otopark mevcuttur.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Important Notes */}
      <section className="py-16 bg-yellow-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <svg className="w-6 h-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Önemli Bilgiler
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                Hayvanınızı taşırken dikkatli olun, ağrılı hayvanlarda ani hareket ısırmaya neden olabilir.
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                Zehirlenme şüphesinde, mümkünse zehirli maddeyi yanınıza alın.
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                Kanama varsa temiz bir bezle bastırarak basınç uygulayın.
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                Acil durumda evde ilaç vermeden önce mutlaka veterinere danışın.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
