import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import EmergencyButton from "@/components/shared/EmergencyButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = 'https://veteriner-klinigi.vercel.app';

export const metadata: Metadata = {
  title: {
    default: 'VetKlinik — Veteriner Kliniği | 7/24 Acil Servis',
    template: '%s | VetKlinik',
  },
  description:
    'Evcil dostlarınız için profesyonel veteriner hizmetleri. Köpek, kedi, kuş ve egzotik hayvanlar için 7/24 acil servis, aşılama, cerrahi ve daha fazlası.',
  keywords: [
    'veteriner', 'acil veteriner', 'köpek aşılama', 'kedi kısırlaştırma',
    'egzotik hayvan veterineri', 'veteriner kliniği', '7/24 veteriner',
  ],
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: SITE_URL,
    siteName: 'VetKlinik',
    title: 'VetKlinik — Veteriner Kliniği | 7/24 Acil Servis',
    description:
      'Evcil dostlarınız için profesyonel veteriner hizmetleri. 7/24 acil servis, aşılama, cerrahi ve daha fazlası.',
    images: [
      {
        url: '/og',
        width: 1200,
        height: 630,
        alt: 'VetKlinik — Veteriner Kliniği Demo Sitesi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VetKlinik — Veteriner Kliniği | 7/24 Acil Servis',
    description: 'Evcil dostlarınız için profesyonel veteriner hizmetleri.',
    images: ['/og'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
        <EmergencyButton />
      </body>
    </html>
  );
}
