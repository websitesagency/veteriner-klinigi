import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-green-50 to-blue-50 py-20 md:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="paw-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="2" fill="currentColor" className="text-primary" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#paw-pattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              7/24 Acil Servis Aktif
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Evcil Dostlarınız İçin{' '}
              <span className="text-primary">Profesyonel</span>{' '}
              Veteriner Hizmetleri
            </h1>

            <p className="text-lg text-gray-600 max-w-lg">
              Modern ekipmanlar, uzman veteriner kadrosu ve sevgi dolu yaklaşımımızla
              evcil hayvanlarınızın sağlığını koruyoruz. Köpek, kedi ve egzotik hayvanlar için
              tüm sağlık hizmetleri.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/randevu">
                <Button size="lg" className="w-full sm:w-auto">
                  Hemen Randevu Al
                </Button>
              </Link>
              <Link href="/hizmetler">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Hizmetlerimizi İnceleyin
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">15+</div>
                <div className="text-sm text-gray-500">Yıllık Deneyim</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">10K+</div>
                <div className="text-sm text-gray-500">Mutlu Hasta</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">5</div>
                <div className="text-sm text-gray-500">Uzman Veteriner</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <svg className="w-32 h-32 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <p className="text-lg font-medium">Veteriner & Hayvan Görseli</p>
              </div>
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">%98 Memnuniyet</div>
                  <div className="text-sm text-gray-500">Hasta Sahiplerinden</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
