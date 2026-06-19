import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & About */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">VK</span>
              </div>
              <span className="font-bold text-xl">VetKlinik</span>
            </div>
            <p className="text-gray-400 text-sm">
              Evcil dostlarınızın sağlığı için profesyonel veteriner hizmetleri.
              7/24 acil servis, modern ekipmanlar ve uzman kadro.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Hızlı Erişim</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/hizmetler" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Hizmetlerimiz
                </Link>
              </li>
              <li>
                <Link href="/randevu" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Randevu Al
                </Link>
              </li>
              <li>
                <Link href="/ekibimiz" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Ekibimiz
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Hizmetlerimiz</h3>
            <ul className="space-y-2">
              <li className="text-gray-400 text-sm">Genel Muayene</li>
              <li className="text-gray-400 text-sm">Aşılama</li>
              <li className="text-gray-400 text-sm">Cerrahi Operasyonlar</li>
              <li className="text-gray-400 text-sm">Diş Tedavisi</li>
              <li className="text-gray-400 text-sm">7/24 Acil Servis</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">İletişim</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <svg className="w-5 h-5 text-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-400 text-sm">Hayvan Dostları Cad. No:15, İstanbul</span>
              </li>
              <li className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-gray-400 text-sm">0500 VET XXXX</span>
              </li>
              <li className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-red-400 text-sm font-medium">Acil: 0555 ACL XXXX (7/24)</span>
              </li>
              <li className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-400 text-sm">info@vetklinik.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Working Hours */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              <span className="font-medium text-white">Çalışma Saatleri: </span>
              Pzt-Cmt: 09:00-20:00 | Paz: 10:00-16:00 | Acil: 7/24
            </div>
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} VetKlinik. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
