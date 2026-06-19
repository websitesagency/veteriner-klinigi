import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

// Vercel Cron her gece 03:00'da çağırır (UTC 00:00 = TR 03:00)
export async function GET(request: NextRequest) {
  // Sadece demo modda çalışır
  if (process.env.NEXT_PUBLIC_DEMO_MODE !== 'true') {
    return NextResponse.json({ error: 'Demo modu aktif değil.' }, { status: 403 });
  }

  // Cron secret doğrulama
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Yetkisiz istek.' }, { status: 401 });
  }

  try {
    const supabase = createAdminClient();

    // Tüm demo verilerini temizle
    await supabase.from('gallery_items').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('testimonials').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('blog_posts').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('team_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('services').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('faq').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('statistics').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('facilities').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('about_content').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('contact_messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('subscribers').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('working_hours').delete().neq('id', '00000000-0000-0000-0000-000000000000');

    // Seed verisini yeniden yükle
    await seedServices(supabase);
    await seedTeam(supabase);
    await seedTestimonials(supabase);
    await seedBlog(supabase);
    await seedGallery(supabase);
    await seedFaq(supabase);
    await seedStatistics(supabase);
    await seedFacilities(supabase);
    await seedAbout(supabase);
    await seedWorkingHours(supabase);
    await seedContactMessages(supabase);
    await seedSubscribers(supabase);
    await seedSiteSettings(supabase);

    console.log('[cron] Demo veri sıfırlama tamamlandı:', new Date().toISOString());
    return NextResponse.json({ success: true, resetAt: new Date().toISOString() });
  } catch (error) {
    console.error('[cron] Demo sıfırlama hatası:', error);
    return NextResponse.json({ error: 'Sıfırlama başarısız.' }, { status: 500 });
  }
}

async function seedServices(supabase: ReturnType<typeof createAdminClient>) {
  await supabase.from('services').insert([
    { name: 'Genel Muayene', description: 'Kapsamlı sağlık kontrolleri ile evcil hayvanınızın genel sağlık durumunu değerlendiriyoruz.', details: ['Fiziksel muayene', 'Kalp ve akciğer dinlemesi', 'Kilo ve vücut kondisyonu değerlendirmesi', 'Diş ve ağız sağlığı kontrolü', 'Kulak ve göz muayenesi'], price: '500', duration: '30 dakika', icon: 'stethoscope', is_emergency: false, show_on_home: true, sort_order: 1 },
    { name: 'Aşılama', description: 'Evcil hayvanlarınızı hastalıklara karşı korumak için düzenli aşılama programları.', details: ['Karma aşı (köpek/kedi)', 'Kuduz aşısı', 'Leptospiroz aşısı', 'Bordetella aşısı', 'Aşı kartı düzenlenmesi'], price: '300-800', duration: '15-20 dakika', icon: 'shield', is_emergency: false, show_on_home: true, sort_order: 2 },
    { name: 'Cerrahi Operasyonlar', description: 'Modern ameliyathanemizde uzman kadromuzla güvenli cerrahi operasyonlar gerçekleştiriyoruz.', details: ['Kısırlaştırma operasyonları', 'Yumuşak doku cerrahisi', 'Ortopedik operasyonlar', 'Göz cerrahisi', 'Diş çekimi ve cerrahisi'], price: '2000-15000', duration: 'Operasyona göre değişir', icon: 'scissors', is_emergency: false, show_on_home: true, sort_order: 3 },
    { name: 'Diş Tedavisi', description: 'Evcil hayvanlarınızın ağız ve diş sağlığı için kapsamlı dental hizmetler.', details: ['Diş taşı temizliği', 'Diş çekimi', 'Dental röntgen', 'Ağız içi muayene', 'Diş koruyucu tedaviler'], price: '800-3000', duration: '45-90 dakika', icon: 'tooth', is_emergency: false, show_on_home: true, sort_order: 4 },
    { name: 'Ultrason & Röntgen', description: 'Dijital görüntüleme sistemlerimizle hızlı ve doğru teşhis imkânı sağlıyoruz.', details: ['Dijital röntgen çekimi', 'Abdominal ultrason', 'Kardiyak ultrason', 'Karaciğer ve böbrek değerlendirmesi', 'Gebelik tespiti'], price: '400-1000', duration: '20-40 dakika', icon: 'scan', is_emergency: false, show_on_home: true, sort_order: 5 },
    { name: 'Laboratuvar', description: 'Tam donanımlı laboratuvarımızda kapsamlı kan ve biyokimya testleri yapıyoruz.', details: ['Tam kan sayımı', 'Biyokimya paneli', 'İdrar analizi', 'Dışkı muayenesi', 'Hormon testleri'], price: '200-1500', duration: '15-30 dakika', icon: 'flask', is_emergency: false, show_on_home: false, sort_order: 6 },
    { name: '7/24 Acil Servis', description: 'Acil durumlarda 7 gün 24 saat hizmetinizdeyiz. Nöbetçi veterinerimiz her zaman hazır.', details: ['Travma ve kaza müdahalesi', 'Zehirlenme tedavisi', 'Doğum yardımı', 'Solunum güçlüğü', 'Acil cerrahi müdahale'], price: '1000+', duration: '7/24 açık', icon: 'ambulance', is_emergency: true, show_on_home: true, sort_order: 7 },
    { name: 'Pet Otel', description: 'Seyahatlerinizde evcil dostlarınız bizim güvencemizde, konforlu odalarda konaklayabilir.', details: ['Bireysel konfor odaları', 'Günlük veteriner kontrolü', 'Özel beslenme planı', 'Oyun ve egzersiz', 'Günlük fotoğraf paylaşımı'], price: '200-500/gün', duration: 'Günlük', icon: 'home', is_emergency: false, show_on_home: false, sort_order: 8 },
  ]);
}

async function seedTeam(supabase: ReturnType<typeof createAdminClient>) {
  await supabase.from('team_members').insert([
    { name: 'Dr. Ayşe Yılmaz', title: 'Baş Veteriner Hekim', specialty: 'İç Hastalıkları & Cerrahi', experience: '14 yıl', education: 'İstanbul Üniversitesi Veterinerlik Fakültesi, Cerrahi Doktorası', bio: 'Dr. Ayşe Yılmaz, VetKlinik\'in kurucusu ve baş veteriner hekimidir. 14 yıllık deneyimiyle binlerce hastaya şifa olmuştur.', image_url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop', sort_order: 1 },
    { name: 'Dr. Mehmet Kaya', title: 'Veteriner Hekim', specialty: 'Dermatoloji & Ortopedi', experience: '8 yıl', education: 'Ankara Üniversitesi Veterinerlik Fakültesi', bio: 'Dr. Mehmet Kaya, deri hastalıkları ve ortopedik problemler konusunda uzmanlaşmıştır.', image_url: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop', sort_order: 2 },
    { name: 'Dr. Zeynep Arslan', title: 'Veteriner Hekim', specialty: 'Egzotik Hayvanlar & Kuşlar', experience: '6 yıl', education: 'Bursa Uludağ Üniversitesi Veterinerlik Fakültesi', bio: 'Dr. Zeynep Arslan, egzotik hayvanlar ve kuşların sağlığı konusunda uzmanlaşmıştır.', image_url: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop', sort_order: 3 },
    { name: 'Dr. Ali Demir', title: 'Veteriner Hekim', specialty: 'Nöroloji & Acil Tıp', experience: '10 yıl', education: 'Selçuk Üniversitesi Veterinerlik Fakültesi, Nöroloji Uzmanlığı', bio: 'Dr. Ali Demir, nörolojik rahatsızlıklar ve acil tıp konusunda uzmanlaşmıştır.', image_url: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop', sort_order: 4 },
  ]);
}

async function seedTestimonials(supabase: ReturnType<typeof createAdminClient>) {
  await supabase.from('testimonials').insert([
    { customer_name: 'Selin Çelik', pet_name: 'Pamuk', pet_type: 'Kedi', content: 'Pamuk\'umuz ani bir hastalık geçirdi, gece 2\'de aradık ve Dr. Ali hemen bize yardımcı oldu!', rating: 5, is_active: true },
    { customer_name: 'Burak Öztürk', pet_name: 'Max', pet_type: 'Köpek', content: 'Max\'in ameliyatı için çok korktuk ama Dr. Ayşe Hanım bizi çok rahatlandırdı. Operasyon mükemmel geçti!', rating: 5, is_active: true },
    { customer_name: 'Fatma Şahin', pet_name: 'Boncuk', pet_type: 'Kedi', content: 'Yıllardır buraya geliyoruz. Hijyen, ilgi, uzmanlık — her şey mükemmel.', rating: 5, is_active: true },
    { customer_name: 'Hasan Polat', pet_name: 'Karamel', pet_type: 'Köpek', content: 'Karamel 12 yaşında ve kronik eklem sorunları var. Dr. Mehmet Bey\'in tedavisiyle çok daha rahat hareket ediyor.', rating: 5, is_active: true },
    { customer_name: 'Merve Aktaş', pet_name: 'Şeker', pet_type: 'Tavşan', content: 'Şeker\'im için egzotik hayvan kliniği aradım, neredeyse hiçbir yer bakmıyordu. Dr. Zeynep Hanım harika!', rating: 5, is_active: true },
    { customer_name: 'Emre Yıldız', pet_name: 'Leo', pet_type: 'Köpek', content: 'Fiyatlar makul, doktorlar ilgili, klinik çok temiz. Leo\'nun kontrolleri için düzenli geliyoruz.', rating: 4, is_active: true },
    { customer_name: 'Aylin Koç', pet_name: 'Minnoş', pet_type: 'Kedi', content: 'Minnoş\'u getirdiğimizde çok stres altındaydı ama ekip onu çok nazik muayene etti.', rating: 5, is_active: true },
    { customer_name: 'Gökhan Erdoğan', pet_name: 'Aslan', pet_type: 'Köpek', content: 'Acil servis gerçekten 7/24 çalışıyor! Pazar gecesi Aslan zehirlendi, 40 dakikada müdahale ettiler.', rating: 5, is_active: true },
    { customer_name: 'Nilüfer Tunç', pet_name: 'Papatya', pet_type: 'Kedi', content: 'Papatya\'nın diş tedavisi için epey tedirgin idim ama Dr. Mehmet Bey her adımı sabırla anlattı.', rating: 5, is_active: true },
    { customer_name: 'Serkan Yılmaz', pet_name: 'Rocky', pet_type: 'Köpek', content: 'Rocky\'nin yıllık aşıları için geliyoruz. Randevu sistemi çok pratik, bekleme süresi kısa.', rating: 4, is_active: true },
    { customer_name: 'Derya Özcan', pet_name: 'Mavi', pet_type: 'Papağan', content: 'Papağanım Mavi için uygun klinik bulmak zordu. Dr. Zeynep\'e ulaştım, harika bir uzman.', rating: 5, is_active: true },
    { customer_name: 'Tolga Arslan', pet_name: 'Beren', pet_type: 'Kedi', content: 'Beren\'in operasyonu sonrası bakımı da burada takip edildi. Mükemmel hizmet.', rating: 5, is_active: true },
  ]);
}

async function seedBlog(supabase: ReturnType<typeof createAdminClient>) {
  await supabase.from('blog_posts').insert([
    { slug: 'kopeklerde-asi-takvimi', title: 'Köpeklerde Aşı Takvimi: Hangi Aşı Ne Zaman Yapılmalı?', excerpt: 'Köpeğinizin sağlıklı ve uzun bir ömür sürmesi için doğru aşı takvimine uymak kritik önem taşır.', content: '<p>Köpekler için aşılama programı, yaşa ve risk faktörlerine göre değişir.</p>', category: 'Önleyici Sağlık', image_url: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=400&fit=crop', is_published: true, read_time: '5 dakika' },
    { slug: 'kedilerde-dis-sagligi', title: 'Kedilerde Diş Sağlığı: Göz Ardı Etmemeniz Gereken 5 İşaret', excerpt: 'Kedilerin %70\'inden fazlası 3 yaşına kadar diş ve diş eti sorunları yaşar.', content: '<p>Kedilerde diş sağlığı sıklıkla göz ardı edilir.</p>', category: 'Diş Sağlığı', image_url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&h=400&fit=crop', is_published: true, read_time: '4 dakika' },
    { slug: 'yazin-hayvan-bakimi', title: 'Yazın Evcil Hayvan Bakımı: Sıcaktan Koruma Rehberi', excerpt: 'Yaz aylarında evcil hayvanlar ısı çarpması riskiyle karşı karşıyadır.', content: '<p>Sıcak havalarda hayvanlar dehidrasyon açısından risk altındadır.</p>', category: 'Mevsimsel Bakım', image_url: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&h=400&fit=crop', is_published: true, read_time: '6 dakika' },
    { slug: 'kedi-kopek-beslenmesi', title: 'Kedi ve Köpek Beslenmesi: Hazır Mama mı Ev Yemeği mi?', excerpt: 'Evcil hayvanınız için en doğru beslenme programını nasıl belirlersiniz?', content: '<p>Evcil hayvan beslenmesi son yıllarda çok tartışılan bir konu haline geldi.</p>', category: 'Beslenme', image_url: 'https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=800&h=400&fit=crop', is_published: true, read_time: '7 dakika' },
    { slug: 'yeni-yavru-bakim', title: 'Yeni Yavru Köpek veya Kedi Aldınız: İlk Hafta Yapmanız Gerekenler', excerpt: 'Evi yeni bir cana kavuşturmanın heyecanı ile birlikte sorumluluklar da geliyor.', content: '<p>Yeni bir yavruyu eve getirdiğinizde ilk 48 saat çok önemlidir.</p>', category: 'Yavru Bakımı', image_url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&h=400&fit=crop', is_published: true, read_time: '8 dakika' },
  ]);
}

async function seedGallery(supabase: ReturnType<typeof createAdminClient>) {
  await supabase.from('gallery_items').insert([
    { category: 'klinik', title: 'Modern Ameliyathane', description: 'Tam donanımlı steril ameliyathanemiz', image_url: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=600&h=400&fit=crop', sort_order: 1 },
    { category: 'klinik', title: 'Muayene Odası', description: 'Konforlu ve hijyenik muayene odalarımız', image_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop', sort_order: 2 },
    { category: 'klinik', title: 'Laboratuvar', description: 'Hızlı sonuç için modern lab ekipmanları', image_url: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=600&h=400&fit=crop', sort_order: 3 },
    { category: 'klinik', title: 'Görüntüleme Ünitesi', description: 'Dijital röntgen ve ultrason sistemimiz', image_url: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&h=400&fit=crop', sort_order: 4 },
    { category: 'hastalar', title: 'Başarılı Operasyon', description: 'Max\'in ameliyat sonrası mutlu anları', image_url: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=400&fit=crop', sort_order: 5 },
    { category: 'hastalar', title: 'Sağlıklı Kontrol', description: 'Boncuk\'un rutin sağlık kontrolü', image_url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=400&fit=crop', sort_order: 6 },
    { category: 'hastalar', title: 'Tedavi Sonrası', description: 'Leo iyileşme sürecinde', image_url: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=400&fit=crop', sort_order: 7 },
    { category: 'ekip', title: 'Ekibimiz', description: 'Uzman veteriner ekibimiz', image_url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=400&fit=crop', sort_order: 8 },
    { category: 'ekip', title: 'Dr. Ayşe Yılmaz', description: 'Baş veteriner hekimimiz ameliyat sırasında', image_url: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&h=400&fit=crop', sort_order: 9 },
    { category: 'ekip', title: 'Ekip Çalışması', description: 'Birlikte daha güçlüyüz', image_url: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&h=400&fit=crop', sort_order: 10 },
    { category: 'etkinlikler', title: 'Sahiplendirme Günü', description: 'Aylık sahiplendirme etkinliğimiz', image_url: 'https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=600&h=400&fit=crop', sort_order: 11 },
    { category: 'etkinlikler', title: 'Ücretsiz Muayene Kampanyası', description: 'Sokak hayvanları için ücretsiz muayene günümüz', image_url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&h=400&fit=crop', sort_order: 12 },
  ]);
}

async function seedFaq(supabase: ReturnType<typeof createAdminClient>) {
  await supabase.from('faq').insert([
    { question: 'Randevu almadan gelebilir miyim?', answer: 'Acil durumlar için randevusuz kabul yapıyoruz. Rutin muayeneler için randevu almanızı öneririz.', sort_order: 1 },
    { question: 'Acil servisiniz gerçekten 7/24 mı açık?', answer: 'Evet, acil servisimiz 365 gün 24 saat hizmet vermektedir.', sort_order: 2 },
    { question: 'Hangi hayvanlar için hizmet veriyorsunuz?', answer: 'Köpek, kedi, tavşan, hamster, papağan ve egzotik hayvanlar dahil geniş yelpazede hizmet veriyoruz.', sort_order: 3 },
    { question: 'Aşı takvimini nasıl takip edebilirim?', answer: 'Dijital aşı takip sistemimiz sayesinde hayvanınızın aşı tarihlerini kaydediyoruz.', sort_order: 4 },
    { question: 'Pet otelde nasıl bakım sağlanıyor?', answer: 'Her hayvan bireysel konfor odasında kalır. Günde iki kez veteriner kontrolü yapılır.', sort_order: 5 },
    { question: 'Operasyon öncesi ne yapmalıyım?', answer: 'Planlı operasyonlar öncesinde hayvanınızın en az 8-12 saat aç kalması gerekmektedir.', sort_order: 6 },
    { question: 'Sigorta kabul ediyor musunuz?', answer: 'Bazı evcil hayvan sigorta şirketlerinin poliçeleriyle çalışıyoruz.', sort_order: 7 },
    { question: 'Muayene ücreti ne kadar?', answer: 'Genel muayene ücretimiz 500 TL\'dir.', sort_order: 8 },
    { question: 'Yavru hayvanım kaç aylıkken ilk muayeneye gelmeli?', answer: 'Yavru köpek ve kedilerin 6-8 haftalıkken ilk muayeneye getirilmesini öneriyoruz.', sort_order: 9 },
    { question: 'Uzaktan konsültasyon imkânınız var mı?', answer: 'WhatsApp hattımız üzerinden ön değerlendirme yapabiliyoruz.', sort_order: 10 },
  ]);
}

async function seedStatistics(supabase: ReturnType<typeof createAdminClient>) {
  await supabase.from('statistics').insert([
    { label: 'Yıllık Deneyim', value: '15', suffix: '+', sort_order: 1 },
    { label: 'Mutlu Hasta', value: '10', suffix: 'K+', sort_order: 2 },
    { label: 'Uzman Veteriner', value: '4', suffix: '', sort_order: 3 },
    { label: 'Acil Servis', value: '7/24', suffix: '', sort_order: 4 },
  ]);
}

async function seedFacilities(supabase: ReturnType<typeof createAdminClient>) {
  await supabase.from('facilities').insert([
    { name: 'Modern Ameliyathane', description: 'Tam donanımlı, steril cerrahi ünitesi', icon: 'scissors', sort_order: 1 },
    { name: 'Dijital Görüntüleme', description: 'Dijital röntgen ve ultrason sistemleri', icon: 'scan', sort_order: 2 },
    { name: 'Tam Donanımlı Laboratuvar', description: '30 dakikada sonuç veren test ekipmanları', icon: 'flask', sort_order: 3 },
    { name: 'Yoğun Bakım Ünitesi', description: '24 saat monitörizasyon sistemi', icon: 'heart', sort_order: 4 },
    { name: 'Diş Ünitesi', description: 'Dental röntgen ve tedavi ekipmanı', icon: 'tooth', sort_order: 5 },
    { name: 'Pet Otel', description: '12 bireysel konfor odası', icon: 'home', sort_order: 6 },
  ]);
}

async function seedAbout(supabase: ReturnType<typeof createAdminClient>) {
  await supabase.from('about_content').insert([
    { section: 'story', title: 'Hikayemiz', content: 'VetKlinik, 2009 yılında Dr. Ayşe Yılmaz tarafından İstanbul\'da kurulmuştur. Bugün 4 uzman veteriner ve 15 personelden oluşan güçlü bir ekibe ulaştık.', image_url: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=800&h=500&fit=crop' },
    { section: 'mission', title: 'Misyonumuz', content: 'Evcil hayvanların yaşam kalitesini artırmak ve sahiplerine güvenilir veteriner hizmeti sunmak temel misyonumuzdur.', image_url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&h=500&fit=crop' },
    { section: 'values', title: 'Değerlerimiz', content: 'Şeffaflık, empati ve mükemmellik bu üç değer her kararımızın temelini oluşturur.', image_url: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&h=500&fit=crop' },
  ]);
}

async function seedWorkingHours(supabase: ReturnType<typeof createAdminClient>) {
  await supabase.from('working_hours').insert([
    { day: 'Pazartesi', open_time: '09:00', close_time: '20:00', is_closed: false, sort_order: 1 },
    { day: 'Salı', open_time: '09:00', close_time: '20:00', is_closed: false, sort_order: 2 },
    { day: 'Çarşamba', open_time: '09:00', close_time: '20:00', is_closed: false, sort_order: 3 },
    { day: 'Perşembe', open_time: '09:00', close_time: '20:00', is_closed: false, sort_order: 4 },
    { day: 'Cuma', open_time: '09:00', close_time: '20:00', is_closed: false, sort_order: 5 },
    { day: 'Cumartesi', open_time: '09:00', close_time: '20:00', is_closed: false, sort_order: 6 },
    { day: 'Pazar', open_time: '10:00', close_time: '16:00', is_closed: false, sort_order: 7 },
  ]);
}

async function seedContactMessages(supabase: ReturnType<typeof createAdminClient>) {
  await supabase.from('contact_messages').insert([
    { name: 'Selin Çelik', email: 'selin@example.com', phone: '0532 111 2233', subject: 'Randevu Talebi', message: 'Kedim Pamuk için aşı randevusu almak istiyorum.', is_read: false },
    { name: 'Burak Öztürk', email: 'burak@example.com', phone: '0541 222 3344', subject: 'Ameliyat Hakkında Bilgi', message: 'Köpeğim Max için kısırlaştırma ameliyatı hakkında bilgi almak istiyorum.', is_read: false },
    { name: 'Fatma Şahin', email: 'fatma@example.com', phone: '0555 333 4455', subject: 'Acil Durum', message: 'Kedim aniden yemek yemeyi bıraktı ve halsiz görünüyor.', is_read: true },
    { name: 'Hasan Polat', email: 'hasan@example.com', phone: '0543 444 5566', subject: 'Pet Otel', message: '2 haftalık tatil için köpeğimi bırakabilir miyim?', is_read: true },
    { name: 'Merve Aktaş', email: 'merve@example.com', phone: '0535 555 6677', subject: 'Egzotik Hayvan', message: 'Papağanım için uzman veteriner var mı?', is_read: false },
  ]);
}

async function seedSubscribers(supabase: ReturnType<typeof createAdminClient>) {
  await supabase.from('subscribers').insert([
    { email: 'selin.celik@example.com', is_active: true },
    { email: 'burak.ozturk@example.com', is_active: true },
    { email: 'fatma.sahin@example.com', is_active: true },
    { email: 'hasan.polat@example.com', is_active: true },
    { email: 'merve.aktas@example.com', is_active: true },
    { email: 'emre.yildiz@example.com', is_active: true },
    { email: 'aylin.koc@example.com', is_active: true },
    { email: 'gokhan.erdogan@example.com', is_active: true },
  ]);
}

async function seedSiteSettings(supabase: ReturnType<typeof createAdminClient>) {
  const settings = [
    ['site_title', 'VetKlinik - Veteriner Kliniği'],
    ['site_description', 'İstanbul\'un güvenilir veteriner kliniği. 7/24 acil servis, uzman kadro.'],
    ['address', 'Hayvan Dostları Cad. No:15, Kadıköy / İstanbul'],
    ['phone', '0216 XXX XX XX'],
    ['emergency_phone', '0555 ACL XXXX'],
    ['email', 'info@vetklinik.com'],
    ['whatsapp', '905551234567'],
    ['video_url', ''],
    ['facebook', 'https://facebook.com/vetklinik'],
    ['instagram', 'https://instagram.com/vetklinik'],
    ['twitter', 'https://twitter.com/vetklinik'],
  ];
  for (const [key, value] of settings) {
    await supabase.from('site_settings').upsert({ key, value }, { onConflict: 'key' });
  }
}
