-- VetKlinik Database Schema
-- Run this in Supabase SQL Editor to create all tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Site Settings Table
CREATE TABLE IF NOT EXISTS site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key VARCHAR(100) UNIQUE NOT NULL,
    value TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default settings
INSERT INTO site_settings (key, value) VALUES
    ('site_title', 'VetKlinik - Veteriner Kliniği'),
    ('site_description', 'Evcil dostlarınız için profesyonel veteriner hizmetleri'),
    ('address', 'Hayvan Dostları Cad. No:15, İstanbul'),
    ('phone', '0500 VET XXXX'),
    ('emergency_phone', '0555 ACL XXXX'),
    ('email', 'info@vetklinik.com'),
    ('whatsapp', '905551234567'),
    ('video_url', ''),
    ('facebook', ''),
    ('instagram', ''),
    ('twitter', '')
ON CONFLICT (key) DO NOTHING;

-- Working Hours Table
CREATE TABLE IF NOT EXISTS working_hours (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    day VARCHAR(20) NOT NULL,
    open_time VARCHAR(10),
    close_time VARCHAR(10),
    is_closed BOOLEAN DEFAULT FALSE,
    sort_order INTEGER DEFAULT 0
);

-- Insert default working hours
INSERT INTO working_hours (day, open_time, close_time, is_closed, sort_order) VALUES
    ('Pazartesi', '09:00', '20:00', false, 1),
    ('Salı', '09:00', '20:00', false, 2),
    ('Çarşamba', '09:00', '20:00', false, 3),
    ('Perşembe', '09:00', '20:00', false, 4),
    ('Cuma', '09:00', '20:00', false, 5),
    ('Cumartesi', '09:00', '20:00', false, 6),
    ('Pazar', '10:00', '16:00', false, 7)
ON CONFLICT DO NOTHING;

-- Services Table
CREATE TABLE IF NOT EXISTS services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(200) NOT NULL,
    description TEXT,
    details TEXT[], -- Array of detail items
    price VARCHAR(50),
    duration VARCHAR(50),
    icon VARCHAR(50), -- Icon name or SVG
    is_emergency BOOLEAN DEFAULT FALSE,
    show_on_home BOOLEAN DEFAULT TRUE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Team Members Table
CREATE TABLE IF NOT EXISTS team_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(200) NOT NULL,
    title VARCHAR(100),
    specialty VARCHAR(200),
    experience VARCHAR(50),
    education VARCHAR(300),
    bio TEXT,
    image_url TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_name VARCHAR(200) NOT NULL,
    pet_name VARCHAR(100),
    pet_type VARCHAR(50),
    content TEXT NOT NULL,
    rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- FAQ Table
CREATE TABLE IF NOT EXISTS faq (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog Posts Table
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(200) UNIQUE NOT NULL,
    title VARCHAR(300) NOT NULL,
    excerpt TEXT,
    content TEXT,
    category VARCHAR(100),
    image_url TEXT,
    is_published BOOLEAN DEFAULT FALSE,
    read_time VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Gallery Items Table
CREATE TABLE IF NOT EXISTS gallery_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category VARCHAR(50) NOT NULL, -- 'klinik', 'hastalar', 'ekip'
    title VARCHAR(200),
    description TEXT,
    image_url TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Statistics Table
CREATE TABLE IF NOT EXISTS statistics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    label VARCHAR(100) NOT NULL,
    value VARCHAR(50) NOT NULL,
    suffix VARCHAR(20), -- e.g., '+', 'K', '%'
    sort_order INTEGER DEFAULT 0
);

-- Insert default statistics
INSERT INTO statistics (label, value, suffix, sort_order) VALUES
    ('Yıllık Deneyim', '15', '+', 1),
    ('Mutlu Hasta', '10', 'K+', 2),
    ('Uzman Veteriner', '5', '', 3),
    ('Acil Servis', '7/24', '', 4)
ON CONFLICT DO NOTHING;

-- Facilities Table
CREATE TABLE IF NOT EXISTS facilities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(200) NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    sort_order INTEGER DEFAULT 0
);

-- Insert default facilities
INSERT INTO facilities (name, description, sort_order) VALUES
    ('Modern Ameliyathane', 'Tam donanımlı cerrahi ünite', 1),
    ('Dijital Görüntüleme', 'Röntgen ve ultrason cihazları', 2),
    ('Laboratuvar', 'Hızlı sonuç veren test ekipmanları', 3),
    ('Yoğun Bakım', '24 saat izleme sistemi', 4),
    ('Diş Ünitesi', 'Dental röntgen ve tedavi ekipmanı', 5),
    ('Pet Otel', 'Konforlu konaklama odaları', 6)
ON CONFLICT DO NOTHING;

-- About Content Table
CREATE TABLE IF NOT EXISTS about_content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    section VARCHAR(50) NOT NULL, -- 'story', 'values', 'mission'
    title VARCHAR(200),
    content TEXT,
    image_url TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default about content
INSERT INTO about_content (section, title, content) VALUES
    ('story', 'Hikayemiz', 'VetKlinik, 2009 yılında Dr. Ayşe Yılmaz tarafından İstanbul''da kurulmuştur. Kuruluşumuzdan bu yana, binlerce evcil hayvana sağlık hizmeti sunduk ve ailelerin mutluluğuna ortak olduk.')
ON CONFLICT DO NOTHING;

-- Newsletter Subscribers Table
CREATE TABLE IF NOT EXISTS subscribers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT TRUE
);

-- Contact Messages Table
CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(200) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    subject VARCHAR(300),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Login Attempts Table (rate limiting)
CREATE TABLE IF NOT EXISTS login_attempts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ip_address VARCHAR(45) NOT NULL,
    success BOOLEAN DEFAULT FALSE,
    attempted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_login_attempts_ip_time ON login_attempts(ip_address, attempted_at);

-- Otomatik temizlik: 24 saatten eski kayıtları sil
CREATE OR REPLACE FUNCTION cleanup_old_login_attempts() RETURNS void AS $$
BEGIN
  DELETE FROM login_attempts WHERE attempted_at < NOW() - INTERVAL '24 hours';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Enable RLS
ALTER TABLE login_attempts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role full access" ON login_attempts FOR ALL USING (auth.role() = 'service_role');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_services_show_on_home ON services(show_on_home);
CREATE INDEX IF NOT EXISTS idx_services_sort_order ON services(sort_order);
CREATE INDEX IF NOT EXISTS idx_team_members_sort_order ON team_members(sort_order);
CREATE INDEX IF NOT EXISTS idx_testimonials_is_active ON testimonials(is_active);
CREATE INDEX IF NOT EXISTS idx_blog_posts_is_published ON blog_posts(is_published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_gallery_items_category ON gallery_items(category);
CREATE INDEX IF NOT EXISTS idx_contact_messages_is_read ON contact_messages(is_read);
CREATE INDEX IF NOT EXISTS idx_subscribers_is_active ON subscribers(is_active);

-- Enable Row Level Security
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE working_hours ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE statistics ENABLE ROW LEVEL SECURITY;
ALTER TABLE facilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public read access" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Public read access" ON working_hours FOR SELECT USING (true);
CREATE POLICY "Public read access" ON services FOR SELECT USING (true);
CREATE POLICY "Public read access" ON team_members FOR SELECT USING (true);
CREATE POLICY "Public read access" ON testimonials FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access" ON faq FOR SELECT USING (true);
CREATE POLICY "Public read access" ON blog_posts FOR SELECT USING (is_published = true);
CREATE POLICY "Public read access" ON gallery_items FOR SELECT USING (true);
CREATE POLICY "Public read access" ON statistics FOR SELECT USING (true);
CREATE POLICY "Public read access" ON facilities FOR SELECT USING (true);
CREATE POLICY "Public read access" ON about_content FOR SELECT USING (true);

-- Allow insert for subscribers and contact messages (public forms)
CREATE POLICY "Public insert access" ON subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert access" ON contact_messages FOR INSERT WITH CHECK (true);

-- Service role has full access (for admin operations)
CREATE POLICY "Service role full access" ON site_settings FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access" ON working_hours FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access" ON services FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access" ON team_members FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access" ON testimonials FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access" ON faq FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access" ON blog_posts FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access" ON gallery_items FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access" ON statistics FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access" ON facilities FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access" ON about_content FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access" ON subscribers FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access" ON contact_messages FOR ALL USING (auth.role() = 'service_role');
