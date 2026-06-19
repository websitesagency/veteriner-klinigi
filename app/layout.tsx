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

export const metadata: Metadata = {
  title: "VetKlinik - Veteriner Kliniği | 7/24 Acil Servis",
  description: "Evcil dostlarınız için profesyonel veteriner hizmetleri. Köpek, kedi, kuş ve egzotik hayvanlar için 7/24 acil servis, aşılama, cerrahi ve daha fazlası.",
  keywords: "veteriner, istanbul, acil veteriner, köpek aşılama, kedi kısırlaştırma, egzotik hayvan veterineri",
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
