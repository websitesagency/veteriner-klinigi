'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navigation = [
  { name: 'Ana Sayfa', href: '/' },
  { name: 'Hizmetler', href: '/hizmetler' },
  { name: 'Hakkımızda', href: '/hakkimizda' },
  { name: 'Ekibimiz', href: '/ekibimiz' },
  { name: 'Blog', href: '/blog' },
  { name: 'Galeri', href: '/galeri' },
  { name: 'İletişim', href: '/iletisim' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">VK</span>
          </div>
          <span className="font-bold text-xl text-primary">VetKlinik</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center space-x-3">
          <Link href="/acil">
            <Button variant="destructive" size="sm">
              7/24 Acil
            </Button>
          </Link>
          <Link href="/randevu">
            <Button variant="outline" size="sm">Randevu Al</Button>
          </Link>
          <a href="https://website-agency.lemonsqueezy.com/checkout/buy/1e5a595a-707c-4ae8-a297-82740070fdba" target="_blank" rel="noreferrer">
            <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
              Bu Siteyi Satın Al
            </Button>
          </a>
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger className="md:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-accent hover:text-accent-foreground">
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px]">
            <div className="flex flex-col space-y-4 mt-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-gray-700 hover:text-primary transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 space-y-2">
                <Link href="/acil" onClick={() => setIsOpen(false)}>
                  <Button variant="destructive" className="w-full">
                    7/24 Acil
                  </Button>
                </Link>
                <Link href="/randevu" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full">Randevu Al</Button>
                </Link>
                <a href="https://website-agency.lemonsqueezy.com/checkout/buy/1e5a595a-707c-4ae8-a297-82740070fdba" target="_blank" rel="noreferrer" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                    Bu Siteyi Satın Al
                  </Button>
                </a>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
