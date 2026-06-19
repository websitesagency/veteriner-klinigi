# Veteriner Kliniği - Hayvan Sağlığı Platformu

@AGENTS.md

## Proje Genel Bakış

**Proje Adı:** VetKlinik (Dr. Veteriner Hekim Hayvan Sağlığı Merkezi)
**Versiyon:** 0.1.0
**Tür:** Full-stack web uygulaması
**Framework:** Next.js 16+ + React 19+ + TypeScript 5+
**Dil:** Türkçe (tr_TR)

---

## Proje Yapısı

```
veteriner-klinigi/
├── app/                          # Next.js App Router
│   ├── (public)/                 # Herkese açık sayfalar
│   │   ├── page.tsx              # Ana sayfa
│   │   ├── hizmetler/page.tsx    # Hizmetler (8+ hizmet)
│   │   ├── hakkimizda/page.tsx   # Klinik tanıtımı
│   │   ├── ekibimiz/page.tsx     # Veteriner kadrosu
│   │   ├── blog/                 # Blog / Makale bölümü
│   │   │   ├── page.tsx          # Blog listesi
│   │   │   └── [slug]/page.tsx   # Blog detay
│   │   ├── galeri/page.tsx       # Klinik fotoğrafları
│   │   ├── basari-hikayeleri/page.tsx  # Tedavi edilen hayvanlar
│   │   ├── randevu/page.tsx      # Randevu sihirbazı (5 adım)
│   │   ├── acil/page.tsx         # 7/24 Acil hizmet bilgisi
│   │   ├── iletisim/page.tsx     # İletişim formu
│   │   └── layout.tsx            # Public layout
│   ├── admin/                    # Admin paneli (korumalı)
│   │   ├── login/page.tsx        # Giriş sayfası
│   │   ├── dashboard/page.tsx    # Dashboard
│   │   ├── randevular/page.tsx   # Randevu yönetimi
│   │   ├── hastalar/             # Hasta (hayvan) yönetimi
│   │   │   ├── page.tsx          # Hasta listesi
│   │   │   └── [id]/page.tsx     # Hasta detay (sağlık geçmişi)
│   │   ├── sahipler/             # Hayvan sahibi yönetimi
│   │   │   ├── page.tsx          # Sahip listesi
│   │   │   └── [id]/page.tsx     # Sahip detay
│   │   ├── asilar/page.tsx       # Aşı takvimi yönetimi
│   │   ├── stok/page.tsx         # İlaç ve malzeme stoku
│   │   ├── blog/                 # Blog yönetimi
│   │   │   ├── page.tsx          # Yazı listesi
│   │   │   ├── yeni/page.tsx     # Yeni yazı
│   │   │   └── [id]/duzenle/page.tsx
│   │   ├── mesajlar/page.tsx     # Mesaj kutusu
│   │   ├── ayarlar/page.tsx      # Ayarlar
│   │   └── layout.tsx            # Admin layout
│   ├── api/                      # API rotaları
│   │   ├── admin/
│   │   │   ├── login/route.ts
│   │   │   └── logout/route.ts
│   │   ├── randevu/route.ts      # Randevu CRUD
│   │   ├── hasta/route.ts        # Hasta CRUD
│   │   └── asi-hatirlatma/route.ts  # Aşı hatırlatma
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Ana yönlendirme
│   └── globals.css               # Global stiller
├── components/                   # React bileşenleri
│   ├── admin/                    # Admin bileşenleri
│   │   ├── AdminSidebar.tsx
│   │   ├── AdminTopbar.tsx
│   │   ├── PatientCard.tsx       # Hasta kartı
│   │   ├── VaccineCalendar.tsx   # Aşı takvimi
│   │   ├── StockAlert.tsx        # Stok uyarısı
│   │   └── StatusBadge.tsx
│   ├── booking/                  # Randevu bileşenleri
│   │   ├── PetTypeSelector.tsx   # Hayvan türü (Adım 1)
│   │   ├── ServiceSelector.tsx   # Hizmet seçimi (Adım 2)
│   │   ├── DateTimePicker.tsx    # Tarih/saat (Adım 3)
│   │   ├── OwnerForm.tsx         # Sahip bilgileri (Adım 4)
│   │   └── BookingSummary.tsx    # Özet (Adım 5)
│   ├── home/                     # Ana sayfa bölümleri
│   │   ├── HeroSection.tsx       # Hayvan görselleri
│   │   ├── ServicesGrid.tsx      # 8 hizmet
│   │   ├── EmergencyBanner.tsx   # 7/24 Acil banner
│   │   ├── TeamPreview.tsx       # Veteriner ekibi
│   │   ├── SuccessStories.tsx    # Tedavi hikayeleri
│   │   ├── VaccineReminder.tsx   # Aşı hatırlatma CTA
│   │   ├── PetCareGuide.tsx      # Bakım ipuçları
│   │   ├── Testimonials.tsx
│   │   ├── BlogPreview.tsx
│   │   ├── Faq.tsx
│   │   └── CtaBanner.tsx
│   ├── shared/                   # Ortak bileşenler
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── WhatsAppButton.tsx
│   │   └── EmergencyButton.tsx   # Acil çağrı butonu
│   └── ui/                       # shadcn UI bileşenleri
├── lib/                          # Yardımcı fonksiyonlar
│   ├── supabase.ts
│   ├── adminAuth.ts
│   ├── vaccineSchedule.ts        # Aşı takvimi hesaplama
│   └── utils.ts
├── types/                        # TypeScript tipleri
│   ├── index.ts                  # Domain tipleri
│   ├── admin.ts
│   └── pet.ts                    # Hayvan tipleri
└── public/                       # Statik dosyalar
    └── images/
        ├── pets/                 # Hayvan görselleri
        └── clinic/               # Klinik görselleri
```

---

## Hizmetler (8 Adet)

1. **Genel Muayene** - 500 TL - Rutin sağlık kontrolü
2. **Aşılama** - 300-800 TL - Tüm aşı türleri
3. **Cerrahi Operasyonlar** - 2000-15000 TL - Ameliyatlar
4. **Diş Tedavisi** - 800-3000 TL - Diş temizliği, çekim
5. **Ultrason & Röntgen** - 400-1000 TL - Görüntüleme
6. **Laboratuvar** - 200-1500 TL - Kan, idrar testleri
7. **Kısırlaştırma** - 1500-4000 TL - Kısırlaştırma operasyonu
8. **Acil Servis** - 1000 TL+ - 7/24 acil müdahale
9. **Pet Kuaför** - 150-500 TL - Tıraş, bakım
10. **Pet Otel** - 200-500 TL/gün - Konaklama

---

## Hayvan Türleri

```typescript
type PetType =
  | 'kopek'      // Köpek
  | 'kedi'       // Kedi
  | 'kus'        // Kuş (Papağan, Muhabbet vb.)
  | 'tavsan'     // Tavşan
  | 'hamster'    // Hamster
  | 'balik'      // Akvaryum balıkları
  | 'surungenler' // Kaplumbağa, kertenkele vb.
  | 'egzotik';   // Egzotik hayvanlar
```

---

## Veri Tipleri

### Hasta (Pet)
```typescript
{
  id: string;
  patient_number: string;           // "HST-2024-0001"
  name: string;                     // Hayvan adı
  species: PetType;                 // Tür
  breed: string;                    // Irk
  birth_date: string;
  gender: 'erkek' | 'disi';
  weight_kg: number;
  color: string;                    // Renk/desen
  microchip_number?: string;        // Mikroçip numarası
  is_neutered: boolean;             // Kısır mı?
  allergies: string[];              // Alerjiler
  chronic_conditions: string[];     // Kronik hastalıklar
  owner_id: string;
  photo_url?: string;
}
```

### Hayvan Sahibi (Owner)
```typescript
{
  id: string;
  owner_number: string;             // "SHP-2024-0001"
  full_name: string;
  phone: string;
  email: string;
  address: string;
  emergency_contact?: string;       // Acil iletişim
  pets: string[];                   // Hayvan ID'leri
  notes: string;
}
```

### Randevu (Appointment)
```typescript
{
  id: string;
  appointment_number: string;
  pet_id: string;
  owner_id: string;
  service_id: string;
  veterinarian_id: string;          // Hangi veteriner
  appointment_type: 'muayene' | 'kontrol' | 'acil' | 'operasyon';
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  symptoms?: string;                // Şikayetler
  diagnosis?: string;               // Teşhis
  treatment?: string;               // Tedavi
  prescriptions?: string[];         // Reçeteler
  notes: string;
}
```

### Aşı Kaydı (VaccineRecord)
```typescript
{
  id: string;
  pet_id: string;
  vaccine_type: 'karma' | 'kuduz' | 'leptospiroz' | 'bordetella' | 'lyme' | 'fiv' | 'felv';
  administered_date: string;
  next_due_date: string;
  batch_number: string;             // Parti numarası
  veterinarian_id: string;
  notes?: string;
}
```

### Stok (Inventory)
```typescript
{
  id: string;
  name: string;
  category: 'ilac' | 'asi' | 'malzeme' | 'mama';
  quantity: number;
  unit: 'adet' | 'ml' | 'mg' | 'kg';
  min_quantity: number;             // Minimum stok uyarısı
  expiry_date?: string;
  supplier: string;
  price: number;
}
```

---

## Renk Paleti

```css
/* Ana Renkler - Veteriner Teması */
--primary: #2E7D32;        /* Doğa yeşili */
--primary-dark: #1B5E20;   /* Koyu yeşil */
--secondary: #FF9800;      /* Sıcak turuncu (dikkat çekici) */
--accent: #4FC3F7;         /* Açık mavi (güven) */

/* Arka Plan */
--bg-light: #F5FBF5;       /* Açık yeşilimsi */
--bg-accent: #E8F5E9;      /* Yeşil vurgu */

/* Acil Durumlar */
--emergency: #D32F2F;      /* Kırmızı (acil) */
--warning: #FFA726;        /* Turuncu (uyarı) */

/* Metin */
--text-dark: #1A1A1A;
--text-muted: #5D5D5D;
```

---

## Randevu Formu (5 Adım)

1. **Hayvan Bilgileri:** Tür seçimi + Mevcut hasta mı? (varsa seç, yoksa yeni kayıt)
2. **Hizmet Seçimi:** 10 hizmetten biri + Acil mi?
3. **Tarih & Saat:** Takvim + Veteriner seçimi + 30 dk'lık slotlar
4. **Sahip Bilgileri:** Ad, telefon, adres, acil iletişim
5. **Özet & Onay:** Şikayetler + SMS hatırlatma tercihi

---

## Özel Özellikler

### 1. Aşı Takvimi Sistemi
- Hayvan türüne göre otomatik aşı takvimi oluşturma
- SMS/E-posta hatırlatma (7 gün, 1 gün önce)
- Dashboard'da yaklaşan aşılar listesi

### 2. Acil Servis Modülü
- 7/24 Acil buton (floating)
- Acil randevular için özel slot sistemi
- Nöbetçi veteriner bilgisi

### 3. Hasta Takip Sistemi
- Hayvan sağlık geçmişi timeline
- Kilo takip grafiği
- İlaç geçmişi
- Aşı kartı görüntüleme/indirme

### 4. Stok Yönetimi
- Minimum stok uyarıları
- Son kullanma tarihi takibi
- Otomatik sipariş listesi oluşturma

---

## Entegrasyonlar

- **Supabase:** Veritabanı ve kimlik doğrulama
- **Resend:** E-posta bildirimleri (randevu, aşı hatırlatma)
- **Twilio:** SMS bildirimleri
- **Google Calendar:** Randevu ekleme
- **WhatsApp:** Canlı destek + Acil iletişim
- **Google Maps:** Klinik konumu

---

## İletişim Bilgileri

- **Telefon:** 0500 VET XXXX
- **Acil Hat:** 0555 ACL XXXX (7/24)
- **E-posta:** info@vetklinik.com
- **Adres:** Hayvan Dostları Cad. No:15, İstanbul
- **Çalışma Saatleri:**
  - Pazartesi-Cumartesi: 09:00-20:00
  - Pazar: 10:00-16:00
  - Acil: 7/24

---

## Sosyal Medya İçerikleri

- Pet bakım ipuçları
- Tedavi edilen hayvan hikayeleri (izinli)
- Aşı bilgilendirme paylaşımları
- Sahiplendirme duyuruları
- Canlı operasyon paylaşımları (eğitim amaçlı)

---

## SEO Anahtar Kelimeleri

- Veteriner [Şehir]
- Acil veteriner
- Köpek aşısı
- Kedi kısırlaştırma
- Pet kuaför
- Hayvan hastanesi
- 7/24 veteriner
- Egzotik hayvan veterineri
