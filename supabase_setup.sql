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

-- Profiles Table (role-based access control — every auth user gets a row here)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    created_at TIMESTAMPTZ DEFAULT now()
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
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- ==========================================
-- 4. Role-based access control (is_admin())
-- ==========================================
-- A SECURITY DEFINER function is the only safe way to check a user's role
-- inside another table's RLS policy without triggering infinite recursion
-- (a policy on `profiles` that queries `profiles` directly in a subquery
-- recurses into itself). Every policy below calls this function instead of
-- querying public.profiles inline.
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
  );
$$;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;

-- Users can read their own profile row; admins can read every profile via is_admin()
CREATE POLICY "Users can read own profile" ON public.profiles
FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins can read all profiles" ON public.profiles
FOR SELECT USING (public.is_admin());

-- No UPDATE policy on profiles by design: nobody can self-promote to admin
-- through the API. Promoting a user to admin is a manual, deliberate action
-- run from the Supabase SQL Editor only:
--   UPDATE public.profiles SET role = 'admin' WHERE id = '<uuid from auth.users>';

-- Auto-create a profile row (role='user') for every new signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, role) VALUES (new.id, 'user')
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Backfill: required so any user created BEFORE this script ran (including
-- your own account) gets a profiles row too — otherwise is_admin() has
-- nothing to check for them and every admin-only policy below denies them.
INSERT INTO public.profiles (id, role)
SELECT id, 'user' FROM auth.users
ON CONFLICT (id) DO NOTHING;

-- After running this whole script once, promote your own account manually:
--   SELECT id, email FROM auth.users WHERE email = 'your-email-here';
--   UPDATE public.profiles SET role = 'admin' WHERE id = '<uuid from above>';

-- ==========================================
-- 5. RLS Policies (public read + admin-only write, from the start)
-- ==========================================

-- Articles: Anyone can read published, only admins can write
CREATE POLICY "Public can view published articles" ON public.articles FOR SELECT USING (is_published = true);
CREATE POLICY "Admin users full access articles" ON public.articles TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Media: Anyone can read published, only admins can write
CREATE POLICY "Public can view published media" ON public.media FOR SELECT USING (is_published = true);
CREATE POLICY "Admin users full access media" ON public.media TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Programs: Anyone can read active, only admins can write
CREATE POLICY "Public can view active programs" ON public.programs FOR SELECT USING (is_active = true);
CREATE POLICY "Admin users full access programs" ON public.programs TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Testimonials: Anyone can read published, only admins can write
CREATE POLICY "Public can view published testimonials" ON public.testimonials FOR SELECT USING (is_published = true);
CREATE POLICY "Admin users full access testimonials" ON public.testimonials TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Enrollments: Anyone can insert (submit a signup), only admins can read/update/delete
CREATE POLICY "Anyone can insert enrollments" ON public.enrollments FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin users full access enrollments" ON public.enrollments TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Site Settings: Anyone can read, only admins can update
CREATE POLICY "Public can view settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Admin users full access settings" ON public.site_settings TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- ==========================================
-- 6. Storage Buckets & Policies
-- ==========================================
INSERT INTO storage.buckets (id, name, public) VALUES
('images', 'images', true),
('videos', 'videos', true),
('documents', 'documents', true)
ON CONFLICT (id) DO NOTHING;

-- Policies for 'images' bucket
CREATE POLICY "Public Access images" ON storage.objects FOR SELECT USING (bucket_id = 'images');
CREATE POLICY "Admin Insert images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'images' AND public.is_admin());
CREATE POLICY "Admin Update images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'images' AND public.is_admin());
CREATE POLICY "Admin Delete images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'images' AND public.is_admin());

-- Policies for 'videos' bucket
CREATE POLICY "Public Access videos" ON storage.objects FOR SELECT USING (bucket_id = 'videos');
CREATE POLICY "Admin Insert videos" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'videos' AND public.is_admin());
CREATE POLICY "Admin Update videos" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'videos' AND public.is_admin());
CREATE POLICY "Admin Delete videos" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'videos' AND public.is_admin());

-- Policies for 'documents' bucket
CREATE POLICY "Public Access documents" ON storage.objects FOR SELECT USING (bucket_id = 'documents');
CREATE POLICY "Admin Insert documents" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'documents' AND public.is_admin());
CREATE POLICY "Admin Update documents" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'documents' AND public.is_admin());
CREATE POLICY "Admin Delete documents" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'documents' AND public.is_admin());

-- ==========================================
-- NOTE ON supabase_admin_migration.sql
-- ==========================================
-- This file now IS the complete, secure setup — a fresh project only ever
-- needs this one file. supabase_admin_migration.sql was the patch that got
-- these same is_admin()-based policies onto an already-running project that
-- had started with the old "USING (true)" policies; it is kept only as a
-- historical record of that migration and should not be run against a
-- database that was set up from this file, since the objects it creates
-- already exist here (its CREATE/DROP statements are safe to re-run but
-- redundant).
