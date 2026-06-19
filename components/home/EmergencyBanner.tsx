import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function EmergencyBanner() {
  return (
    <section className="bg-red-600 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-white">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold">7/24 Acil Veteriner Hizmeti</h3>
              <p className="text-red-100">
                Acil durumlarda hemen arayın. Deneyimli ekibimiz her an hazır.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a href="tel:+905551234567">
              <Button size="lg" variant="secondary" className="bg-white text-red-600 hover:bg-red-50">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                0555 ACL XXXX
              </Button>
            </a>
            <Link href="/acil">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Acil Bilgileri
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
