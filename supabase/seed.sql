-- VetKlinik Demo Seed Verisi
-- Supabase SQL Editor'da çalıştır

-- =====================
-- TEMİZLİK (önce sil, sonra ekle)
-- =====================
DELETE FROM gallery_items;
DELETE FROM testimonials;
DELETE FROM blog_posts;
DELETE FROM team_members;
DELETE FROM services;
DELETE FROM faq;
DELETE FROM statistics;
DELETE FROM facilities;
DELETE FROM about_content;
DELETE FROM contact_messages;
DELETE FROM subscribers;
DELETE FROM working_hours;

-- =====================
-- HİZMETLER (8 adet)
-- =====================
INSERT INTO services (name, description, details, price, duration, icon, is_emergency, show_on_home, sort_order) VALUES
(
  'Genel Muayene',
  'Kapsamlı sağlık kontrolleri ile evcil hayvanınızın genel sağlık durumunu değerlendiriyoruz.',
  ARRAY['Fiziksel muayene', 'Kalp ve akciğer dinlemesi', 'Kilo ve vücut kondisyonu değerlendirmesi', 'Diş ve ağız sağlığı kontrolü', 'Kulak ve göz muayenesi'],
  '500', '30 dakika', 'stethoscope', false, true, 1
),
(
  'Aşılama',
  'Evcil hayvanlarınızı hastalıklara karşı korumak için düzenli aşılama programları.',
  ARRAY['Karma aşı (köpek/kedi)', 'Kuduz aşısı', 'Leptospiroz aşısı', 'Bordetella aşısı', 'Aşı kartı düzenlenmesi'],
  '300-800', '15-20 dakika', 'shield', false, true, 2
),
(
  'Cerrahi Operasyonlar',
  'Modern ameliyathanemizde uzman kadromuzla güvenli cerrahi operasyonlar gerçekleştiriyoruz.',
  ARRAY['Kısırlaştırma operasyonları', 'Yumuşak doku cerrahisi', 'Ortopedik operasyonlar', 'Göz cerrahisi', 'Diş çekimi ve cerrahisi'],
  '2000-15000', 'Operasyona göre değişir', 'scissors', false, true, 3
),
(
  'Diş Tedavisi',
  'Evcil hayvanlarınızın ağız ve diş sağlığı için kapsamlı dental hizmetler sunuyoruz.',
  ARRAY['Diş taşı temizliği', 'Diş çekimi', 'Dental röntgen', 'Ağız içi muayene', 'Diş koruyucu tedaviler'],
  '800-3000', '45-90 dakika', 'tooth', false, true, 4
),
(
  'Ultrason & Röntgen',
  'Dijital görüntüleme sistemlerimizle hızlı ve doğru teşhis imkânı sağlıyoruz.',
  ARRAY['Dijital röntgen çekimi', 'Abdominal ultrason', 'Kardiyak ultrason', 'Karaciğer ve böbrek değerlendirmesi', 'Gebelik tespiti'],
  '400-1000', '20-40 dakika', 'scan', false, true, 5
),
(
  'Laboratuvar',
  'Tam donanımlı laboratuvarımızda kapsamlı kan ve biyokimya testleri yapıyoruz.',
  ARRAY['Tam kan sayımı', 'Biyokimya paneli', 'İdrar analizi', 'Dışkı muayenesi', 'Hormon testleri'],
  '200-1500', '15-30 dakika', 'flask', false, false, 6
),
(
  '7/24 Acil Servis',
  'Acil durumlarda 7 gün 24 saat hizmetinizdeyiz. Nöbetçi veterinerimiz her zaman hazır.',
  ARRAY['Travma ve kaza müdahalesi', 'Zehirlenme tedavisi', 'Doğum yardımı', 'Solunum güçlüğü', 'Acil cerrahi müdahale'],
  '1000+', '7/24 açık', 'ambulance', true, true, 7
),
(
  'Pet Otel',
  'Seyahatlerinizde evcil dostlarınız bizim güvencemizde, konforlu odalarda konaklayabilir.',
  ARRAY['Bireysel konfor odaları', 'Günlük veteriner kontrolü', 'Özel beslenme planı', 'Oyun ve egzersiz', 'Günlük fotoğraf paylaşımı'],
  '200-500/gün', 'Günlük', 'home', false, false, 8
);

-- =====================
-- EKİP ÜYELERİ (4 kişi)
-- =====================
INSERT INTO team_members (name, title, specialty, experience, education, bio, image_url, sort_order) VALUES
(
  'Dr. Ayşe Yılmaz',
  'Baş Veteriner Hekim',
  'İç Hastalıkları & Cerrahi',
  '14 yıl',
  'İstanbul Üniversitesi Veterinerlik Fakültesi, Cerrahi Doktorası',
  'Dr. Ayşe Yılmaz, VetKlinik''in kurucusu ve baş veteriner hekimidir. Küçük hayvan cerrahisi ve iç hastalıkları alanında uzmanlaşmış olup 14 yıllık deneyimiyle binlerce hastaya şifa olmuştur.',
  'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop',
  1
),
(
  'Dr. Mehmet Kaya',
  'Veteriner Hekim',
  'Dermatoloji & Ortopedi',
  '8 yıl',
  'Ankara Üniversitesi Veterinerlik Fakültesi',
  'Dr. Mehmet Kaya, deri hastalıkları ve ortopedik problemler konusunda uzmanlaşmıştır. Köpek ve kedilerin kronik hastalıklarının yönetiminde başarılı sonuçlar elde etmektedir.',
  'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop',
  2
),
(
  'Dr. Zeynep Arslan',
  'Veteriner Hekim',
  'Egzotik Hayvanlar & Kuşlar',
  '6 yıl',
  'Bursa Uludağ Üniversitesi Veterinerlik Fakültesi',
  'Dr. Zeynep Arslan, egzotik hayvanlar ve kuşların sağlığı konusunda uzmanlaşmış nadir veteriner hekimlerinden biridir. Papağan, sürüngen ve kemirgen hastalıklarında derin deneyime sahiptir.',
  'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop',
  3
),
(
  'Dr. Ali Demir',
  'Veteriner Hekim',
  'Nöroloji & Acil Tıp',
  '10 yıl',
  'Selçuk Üniversitesi Veterinerlik Fakültesi, Nöroloji Uzmanlığı',
  'Dr. Ali Demir, nörolojik rahatsızlıklar ve acil tıp konusunda uzmanlaşmıştır. 7/24 acil hizmetimizin koordinatörü olarak kritik vakalarda güvenilir bir isimdir.',
  'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop',
  4
);

-- =====================
-- MÜŞTERİ YORUMLARI (12 adet)
-- =====================
INSERT INTO testimonials (customer_name, pet_name, pet_type, content, rating, is_active) VALUES
('Selin Çelik', 'Pamuk', 'Kedi', 'Pamuk''umuz ani bir hastalık geçirdi, gece 2''de aradık ve Dr. Ali hemen bize yardımcı oldu. Müthiş bir ekip, gerçekten hayat kurtardılar.', 5, true),
('Burak Öztürk', 'Max', 'Köpek', 'Max''in ameliyatı için çok korktuk ama Dr. Ayşe Hanım bizi çok rahatlandırdı. Operasyon mükemmel geçti, Max şu an çok mutlu!', 5, true),
('Fatma Şahin', 'Boncuk', 'Kedi', 'Yıllardır buraya geliyoruz. Hijyen, ilgi, uzmanlık — her şey mükemmel. Boncuk''u başka yere götürmeyi düşünemem bile.', 5, true),
('Hasan Polat', 'Karamel', 'Köpek', 'Karamel 12 yaşında ve kronik eklem sorunları var. Dr. Mehmet Bey''in tedavisiyle çok daha rahat hareket ediyor. Teşekkürler!', 5, true),
('Merve Aktaş', 'Şeker', 'Tavşan', 'Şeker''im için egzotik hayvan kliniği aradım, neredeyse hiçbir yer bakmıyordu. Dr. Zeynep Hanım çok ilgilendi, harika!', 5, true),
('Emre Yıldız', 'Leo', 'Köpek', 'Fiyatlar makul, doktorlar ilgili, klinik çok temiz. Leo''nun kontrolleri için düzenli geliyoruz ve hep memnun ayrılıyoruz.', 4, true),
('Aylin Koç', 'Minnoş', 'Kedi', 'Minnoş''u getirdiğimizde çok stres altındaydı ama ekip onu çok nazik bir şekilde muayene etti. Hayvanlara gerçekten sevgiyle yaklaşıyorlar.', 5, true),
('Gökhan Erdoğan', 'Aslan', 'Köpek', 'Acil servis gerçekten 7/24 çalışıyor! Pazar gecesi Aslan zehirlendi, 40 dakikada müdahale ettiler. Çok teşekkürler.', 5, true),
('Nilüfer Tunç', 'Papatya', 'Kedi', 'Papatya''nın diş tedavisi için epey tedirgin idim ama Dr. Mehmet Bey her adımı sabırla anlattı. Sorunsuz geçti, teşekkürler.', 5, true),
('Serkan Yılmaz', 'Rocky', 'Köpek', 'Rocky''nin yıllık aşıları için geliyoruz. Randevu sistemi çok pratik, bekleme süresi kısa. Gayet profesyonel bir klinik.', 4, true),
('Derya Özcan', 'Mavi', 'Papağan', 'Papağanım Mavi için uygun klinik bulmak zordu. Dr. Zeynep''e ulaştım, harika bir uzman. Kesinlikle tavsiye ediyorum.', 5, true),
('Tolga Arslan', 'Beren', 'Kedi', 'Beren''in operasyonu sonrası bakımı da burada takip edildi. Sürekli bilgi verdiler, çok güvendim. Mükemmel hizmet.', 5, true);

-- =====================
-- BLOG YAZILARI (5 adet)
-- =====================
INSERT INTO blog_posts (slug, title, excerpt, content, category, image_url, is_published, read_time) VALUES
(
  'kopeklerde-asi-takvimi',
  'Köpeklerde Aşı Takvimi: Hangi Aşı Ne Zaman Yapılmalı?',
  'Köpeğinizin sağlıklı ve uzun bir ömür sürmesi için doğru aşı takvimine uymak kritik önem taşır. İşte mevsimsel ve zorunlu aşılar hakkında bilmeniz gerekenler.',
  '<p>Köpekler için aşılama programı, yaşa ve risk faktörlerine göre değişir. Yavru köpekler genellikle 6-8 haftalıkken ilk karma aşılarını alır...</p><p>Yetişkin köpekler için yıllık hatırlatma aşıları şarttır. Kuduz aşısı yasal zorunluluktur ve her yıl tekrarlanmalıdır.</p>',
  'Önleyici Sağlık',
  'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=400&fit=crop',
  true,
  '5 dakika'
),
(
  'kedilerde-dis-sagligi',
  'Kedilerde Diş Sağlığı: Göz Ardı Etmemeniz Gereken 5 İşaret',
  'Kedilerin %70''inden fazlası 3 yaşına kadar diş ve diş eti sorunları yaşar. Erken teşhis için dikkat etmeniz gereken belirtiler.',
  '<p>Kedilerde diş sağlığı sıklıkla göz ardı edilir çünkü kediler ağrılarını gizleme eğilimindedir. Ancak periodontal hastalık tüm vücut sağlığını olumsuz etkiler...</p>',
  'Diş Sağlığı',
  'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&h=400&fit=crop',
  true,
  '4 dakika'
),
(
  'yazin-hayvan-bakimi',
  'Yazın Evcil Hayvan Bakımı: Sıcaktan Koruma Rehberi',
  'Yaz aylarında evcil hayvanlar ısı çarpmasi riskiyle karşı karşıyadır. Bu rehberle dostlarınızı sıcaktan nasıl koruyacağınızı öğrenin.',
  '<p>Sıcak havalarda hayvanlar ısı çarpmasi ve dehidrasyon açısından risk altındadır. Köpek ve kedilerin terleme mekanizması insanlardan farklı çalışır...</p>',
  'Mevsimsel Bakım',
  'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&h=400&fit=crop',
  true,
  '6 dakika'
),
(
  'kedi-kopek-beslenmesi',
  'Kedi ve Köpek Beslenmesi: Hazır Mama mı Ev Yemeği mi?',
  'Evcil hayvanınız için en doğru beslenme programını nasıl belirlersiniz? Uzman görüşleri ve pratik öneriler bu yazıda.',
  '<p>Evcil hayvan beslenmesi son yıllarda çok tartışılan bir konu haline geldi. Hazır mama mı, ev yemeği mi ya da ham beslenme mi?...</p>',
  'Beslenme',
  'https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=800&h=400&fit=crop',
  true,
  '7 dakika'
),
(
  'yeni-yavru-bakim',
  'Yeni Yavru Köpek veya Kedi Aldınız: İlk Hafta Yapmanız Gerekenler',
  'Evi yeni bir cana kavuşturmanın heyecanı ile birlikte sorumluluklar da geliyor. İlk haftanın kritik adımlarını kaçırmayın.',
  '<p>Yeni bir yavruyu eve getirdiğinizde ilk 48 saat çok önemlidir. Veteriner ziyareti, beslenme düzeni ve sosyalleşme bu dönemin temellerini oluşturur...</p>',
  'Yavru Bakımı',
  'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&h=400&fit=crop',
  true,
  '8 dakika'
);

-- =====================
-- GALERİ (12 görsel)
-- =====================
INSERT INTO gallery_items (category, title, description, image_url, sort_order) VALUES
('klinik', 'Modern Ameliyathane', 'Tam donanımlı steril ameliyathanemiz', 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=600&h=400&fit=crop', 1),
('klinik', 'Muayene Odası', 'Konforlu ve hijyenik muayene odalarımız', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop', 2),
('klinik', 'Laboratuvar', 'Hızlı sonuç için modern lab ekipmanları', 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=600&h=400&fit=crop', 3),
('klinik', 'Görüntüleme Ünitesi', 'Dijital röntgen ve ultrason sistemimiz', 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&h=400&fit=crop', 4),
('hastalar', 'Başarılı Operasyon', 'Max''in ameliyat sonrası mutlu anları', 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=400&fit=crop', 5),
('hastalar', 'Sağlıklı Kontrol', 'Boncuk''un rutin sağlık kontrolü', 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=400&fit=crop', 6),
('hastalar', 'Tedavi Sonrası', 'Leo iyileşme sürecinde', 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=400&fit=crop', 7),
('ekip', 'Ekibimiz', 'Uzman veteriner ekibimiz', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=400&fit=crop', 8),
('ekip', 'Dr. Ayşe Yılmaz', 'Baş veteriner hekimimiz ameliyat sırasında', 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&h=400&fit=crop', 9),
('ekip', 'Ekip Çalışması', 'Birlikte daha güçlüyüz', 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&h=400&fit=crop', 10),
('etkinlikler', 'Sahiplendirme Günü', 'Aylık sahiplendirme etkinliğimiz', 'https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=600&h=400&fit=crop', 11),
('etkinlikler', 'Ücretsiz Muayene Kampanyası', 'Sokak hayvanları için ücretsiz muayene günümüz', 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&h=400&fit=crop', 12);

-- =====================
-- SSS (10 soru)
-- =====================
INSERT INTO faq (question, answer, sort_order) VALUES
('Randevu almadan gelebilir miyim?', 'Acil durumlar için randevusuz kabul yapıyoruz. Rutin muayeneler için randevu almanızı öneririz; böylece bekleme sürenizi minimuma indiriyoruz. Randevu için WhatsApp veya telefon hattımızı arayabilirsiniz.', 1),
('Acil servisiniz gerçekten 7/24 mı açık?', 'Evet, acil servisimiz 365 gün 24 saat hizmet vermektedir. Nöbetçi veterinerimiz her zaman hazır olup acil hat numaramızı (0555 ACL XXXX) arayabilirsiniz.', 2),
('Hangi hayvanlar için hizmet veriyorsunuz?', 'Köpek, kedi, tavşan, hamster, papağan ve diğer egzotik kuşlar, sürüngenler ve akvaryum balıkları dahil geniş bir yelpazede hizmet veriyoruz. Her türün uzmanı olan veterinerlerimiz mevcuttur.', 3),
('Aşı takvimini nasıl takip edebilirim?', 'Kliniğimizde dijital aşı takip sistemimiz sayesinde hayvanınızın aşı tarihlerini kaydediyoruz. Yaklaşan aşılar için SMS ile hatırlatma gönderiyoruz.', 4),
('Pet otelde nasıl bakım sağlanıyor?', 'Pet otelimizde her hayvan bireysel konfor odasında kalır. Günde iki kez veteriner kontrolü yapılır, özel beslenme programı uygulanır ve günlük egzersiz imkânı sağlanır. Her gün fotoğraf paylaşıyoruz.', 5),
('Operasyon öncesi ne yapmalıyım?', 'Planlı operasyonlar öncesinde hayvannızın en az 8-12 saat aç kalması gerekmektedir. Operasyon günü sabah sizi ayrıntılı bilgilendireceğiz. Sorularınız için bizi önceden arayabilirsiniz.', 6),
('Sigorta kabul ediyor musunuz?', 'Bazı evcil hayvan sigorta şirketlerinin poliçeleriyle çalışıyoruz. Sigortanızın geçerliliğini doğrulamak için lütfen önceden kliniğimizle iletişime geçin.', 7),
('Muayene ücreti ne kadar?', 'Genel muayene ücretimiz 500 TL''dir. Uzman muayenesi ve özel testler için farklı fiyatlandırmamız mevcuttur. Detaylı bilgi için bizi arayabilirsiniz.', 8),
('Yavru hayvanım kaç aylıkken ilk muayeneye gelmeli?', 'Yavru köpek ve kedilerin 6-8 haftalıkken ilk muayeneye getirilmesini öneriyoruz. Bu ziyarette genel sağlık değerlendirmesi yapılır ve aşı takvimi oluşturulur.', 9),
('Uzaktan konsültasyon imkânınız var mı?', 'WhatsApp hattımız üzerinden fotoğraf ve video göndererek ön değerlendirme yapabiliyoruz. Ancak kesin teşhis için klinik muayene şarttır.', 10);

-- =====================
-- İSTATİSTİKLER
-- =====================
INSERT INTO statistics (label, value, suffix, sort_order) VALUES
('Yıllık Deneyim', '15', '+', 1),
('Mutlu Hasta', '10', 'K+', 2),
('Uzman Veteriner', '4', '', 3),
('Acil Servis', '7/24', '', 4);

-- =====================
-- TESİSLER
-- =====================
INSERT INTO facilities (name, description, icon, sort_order) VALUES
('Modern Ameliyathane', 'Tam donanımlı, steril cerrahi ünitesi', 'scissors', 1),
('Dijital Görüntüleme', 'Dijital röntgen ve ultrason sistemleri', 'scan', 2),
('Tam Donanımlı Laboratuvar', '30 dakikada sonuç veren test ekipmanları', 'flask', 3),
('Yoğun Bakım Ünitesi', '24 saat monitörizasyon sistemi', 'heart', 4),
('Diş Ünitesi', 'Dental röntgen ve tedavi ekipmanı', 'tooth', 5),
('Pet Otel', '12 bireysel konfor odası', 'home', 6);

-- =====================
-- HAKKIMIZDA
-- =====================
INSERT INTO about_content (section, title, content, image_url) VALUES
(
  'story',
  'Hikayemiz',
  'VetKlinik, 2009 yılında Dr. Ayşe Yılmaz tarafından İstanbul''da kurulmuştur. Tek bir muayene odasıyla başladığımız bu yolculukta, bugün 4 uzman veteriner ve 15 personelden oluşan güçlü bir ekibe ulaştık. Kuruluşumuzdan bu yana 10.000''den fazla evcil hayvana sağlık hizmeti sunduk.',
  'https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=800&h=500&fit=crop'
),
(
  'mission',
  'Misyonumuz',
  'Evcil hayvanların yaşam kalitesini artırmak ve sahiplerine güvenilir veteriner hizmeti sunmak temel misyonumuzdur. Her hastamıza kendi evcil hayvanımızmış gibi yaklaşıyor, en güncel tıbbi bilgi ve teknolojiyi kullanıyoruz.',
  'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&h=500&fit=crop'
),
(
  'values',
  'Değerlerimiz',
  'Şeffaflık, empati ve mükemmellik — bu üç değer her kararımızın temelini oluşturur. Hayvan sahiplerine dürüst bilgi vermek, hastalara sevgiyle yaklaşmak ve sürekli gelişmek için çalışıyoruz.',
  'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&h=500&fit=crop'
);

-- =====================
-- ÇALIŞMA SAATLERİ
-- =====================
INSERT INTO working_hours (day, open_time, close_time, is_closed, sort_order) VALUES
('Pazartesi', '09:00', '20:00', false, 1),
('Salı', '09:00', '20:00', false, 2),
('Çarşamba', '09:00', '20:00', false, 3),
('Perşembe', '09:00', '20:00', false, 4),
('Cuma', '09:00', '20:00', false, 5),
('Cumartesi', '09:00', '20:00', false, 6),
('Pazar', '10:00', '16:00', false, 7);

-- =====================
-- DEMO İLETİŞİM MESAJLARI
-- =====================
INSERT INTO contact_messages (name, email, phone, subject, message, is_read) VALUES
('Selin Çelik', 'selin@example.com', '0532 111 2233', 'Randevu Talebi', 'Kedim Pamuk için bir sonraki aşı randevusu almak istiyorum. Uygun gün ve saatiniz var mı?', false),
('Burak Öztürk', 'burak@example.com', '0541 222 3344', 'Ameliyat Hakkında Bilgi', 'Köpeğim Max için kısırlaştırma ameliyatı fiyatı ve süreci hakkında bilgi almak istiyorum.', false),
('Fatma Şahin', 'fatma@example.com', '0555 333 4455', 'Acil Durum', 'Kedim aniden yemek yemeyi bıraktı ve halsiz görünüyor. Ne yapmalıyım?', true),
('Hasan Polat', 'hasan@example.com', '0543 444 5566', 'Pet Otel', '2 haftalık tatil için köpeğimi bırakabilir miyim? Fiyat ve kapasiteyi öğrenmek istiyorum.', true),
('Merve Aktaş', 'merve@example.com', '0535 555 6677', 'Egzotik Hayvan', 'Papağanım için uygun veteriner var mı? Bu konuda uzman doktor hakkında bilgi almak istiyorum.', false);

-- =====================
-- DEMO ABONELER
-- =====================
INSERT INTO subscribers (email, is_active) VALUES
('selin.celik@example.com', true),
('burak.ozturk@example.com', true),
('fatma.sahin@example.com', true),
('hasan.polat@example.com', true),
('merve.aktas@example.com', true),
('emre.yildiz@example.com', true),
('aylin.koc@example.com', true),
('gokhan.erdogan@example.com', true);

-- =====================
-- SITE AYARLARI
-- =====================
INSERT INTO site_settings (key, value) VALUES
('site_title', 'VetKlinik - Veteriner Kliniği'),
('site_description', 'İstanbul''un güvenilir veteriner kliniği. 7/24 acil servis, uzman kadro ve modern ekipmanlarla evcil dostlarınızın yanındayız.'),
('address', 'Hayvan Dostları Cad. No:15, Kadıköy / İstanbul'),
('phone', '0216 XXX XX XX'),
('emergency_phone', '0555 ACL XXXX'),
('email', 'info@vetklinik.com'),
('whatsapp', '905551234567'),
('video_url', ''),
('facebook', 'https://facebook.com/vetklinik'),
('instagram', 'https://instagram.com/vetklinik'),
('twitter', 'https://twitter.com/vetklinik')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
