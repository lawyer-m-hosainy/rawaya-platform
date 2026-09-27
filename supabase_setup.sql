-- ==========================================
-- 1. Create Tables
-- ==========================================

-- Articles Table
CREATE TABLE IF NOT EXISTS public.articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    category TEXT,
    excerpt TEXT,
    content TEXT,
    cover_image TEXT,
    author TEXT DEFAULT 'أ. نرمين الحسيني',
    read_time TEXT,
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Media Table
CREATE TABLE IF NOT EXISTS public.media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    caption TEXT,
    type TEXT NOT NULL CHECK (type IN ('image', 'video')),
    url TEXT NOT NULL,
    thumbnail_url TEXT,
    location TEXT,
    category TEXT,
    sort_order INTEGER DEFAULT 0,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Programs Table
CREATE TABLE IF NOT EXISTS public.programs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    subtitle TEXT,
    category TEXT,
    age_range TEXT,
    format TEXT,
    duration TEXT,
    description TEXT,
    highlights JSONB,
    badge TEXT,
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Testimonials Table
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    parent_name TEXT NOT NULL,
    child_name TEXT,
    child_age TEXT,
    location TEXT,
    text TEXT NOT NULL,
    impact_highlight TEXT,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enrollments Table
CREATE TABLE IF NOT EXISTS public.enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    parent_name TEXT NOT NULL,
    child_name TEXT NOT NULL,
    child_age TEXT NOT NULL,
    phone TEXT NOT NULL,
    program_title TEXT NOT NULL,
    learning_mode TEXT,
    city TEXT,
    notes TEXT,
    status TEXT DEFAULT 'new',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Site Settings Table
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT UNIQUE NOT NULL,
    value TEXT,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- ==========================================
-- 2. Insert Default Settings
-- ==========================================
INSERT INTO public.site_settings (key, value) VALUES
    ('phone', '+201097232231'),
    ('email', 'info@rawaya.site'),
    ('whatsapp_message', 'مرحباً، أود الاستفسار عن برامج رَوَايَا..'),
    ('facebook_url', ''),
    ('instagram_url', ''),
    ('youtube_url', '')
ON CONFLICT (key) DO NOTHING;

-- ==========================================
-- 3. Enable RLS (Row Level Security)
-- ==========================================
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- ==========================================
-- 4. Create RLS Policies
-- ==========================================

-- Articles: Anyone can read published, only authenticated can do everything
CREATE POLICY "Public can view published articles" ON public.articles FOR SELECT USING (is_published = true);
CREATE POLICY "Auth users full access articles" ON public.articles TO authenticated USING (true) WITH CHECK (true);

-- Media: Anyone can read published, only authenticated can do everything
CREATE POLICY "Public can view published media" ON public.media FOR SELECT USING (is_published = true);
CREATE POLICY "Auth users full access media" ON public.media TO authenticated USING (true) WITH CHECK (true);

-- Programs: Anyone can read active, only authenticated can do everything
CREATE POLICY "Public can view active programs" ON public.programs FOR SELECT USING (is_active = true);
CREATE POLICY "Auth users full access programs" ON public.programs TO authenticated USING (true) WITH CHECK (true);

-- Testimonials: Anyone can read published, only authenticated can do everything
CREATE POLICY "Public can view published testimonials" ON public.testimonials FOR SELECT USING (is_published = true);
CREATE POLICY "Auth users full access testimonials" ON public.testimonials TO authenticated USING (true) WITH CHECK (true);

-- Enrollments: Anyone can insert, only authenticated can read/update/delete
CREATE POLICY "Anyone can insert enrollments" ON public.enrollments FOR INSERT WITH CHECK (true);
CREATE POLICY "Auth users full access enrollments" ON public.enrollments TO authenticated USING (true) WITH CHECK (true);

-- Site Settings: Anyone can read, only authenticated can update
CREATE POLICY "Public can view settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Auth users full access settings" ON public.site_settings TO authenticated USING (true) WITH CHECK (true);

-- ==========================================
-- 5. Storage Buckets & Policies
-- ==========================================
-- (Assuming Storage is enabled, we insert the buckets into the storage.buckets table)
INSERT INTO storage.buckets (id, name, public) VALUES 
('images', 'images', true),
('videos', 'videos', true),
('documents', 'documents', true)
ON CONFLICT (id) DO NOTHING;

-- Policies for 'images' bucket
CREATE POLICY "Public Access images" ON storage.objects FOR SELECT USING (bucket_id = 'images');
CREATE POLICY "Auth Insert images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'images');
CREATE POLICY "Auth Update images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'images');
CREATE POLICY "Auth Delete images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'images');

-- Policies for 'videos' bucket
CREATE POLICY "Public Access videos" ON storage.objects FOR SELECT USING (bucket_id = 'videos');
CREATE POLICY "Auth Insert videos" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'videos');
CREATE POLICY "Auth Update videos" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'videos');
CREATE POLICY "Auth Delete videos" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'videos');

-- Policies for 'documents' bucket
CREATE POLICY "Public Access documents" ON storage.objects FOR SELECT USING (bucket_id = 'documents');
CREATE POLICY "Auth Insert documents" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'documents');
CREATE POLICY "Auth Update documents" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'documents');
CREATE POLICY "Auth Delete documents" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'documents');
