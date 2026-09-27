-- Step 0 — تأكد من الأسماء الفعلية قبل ما تكمل
-- قم بتشغيل هذا الاستعلام في لوحة تحكم Supabase (SQL Editor) للتأكد من الأسماء الحالية:
-- SELECT tablename, policyname, cmd, roles
-- FROM pg_policies
-- WHERE schemaname = 'public'
--   AND tablename IN ('articles', 'media', 'programs', 'testimonials', 'enrollments', 'site_settings');

-- ==============================================================================
-- السكريبت الكامل لتطبيق نظام الصلاحيات (Admin Role) بعد التأكد من الأسماء:
-- ==============================================================================

-- 1. Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 2. Policy مباشرة، من غير recursion (بتقرا صفك انت بس)
CREATE POLICY "Users can read own profile" ON public.profiles
FOR SELECT USING (auth.uid() = id);

-- 3. الدالة الآمنة — كل فحص للصلاحية يعدي من هنا، مش subquery مباشر
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

-- (ملحوظة: أزلنا سياسة "Admins can read all profiles" لأن استخدام الدالة الآمنة في الاستعلامات الأخرى يغني عنها، 
-- وإذا احتجت قراءة كل الحسابات، يمكن استخدام is_admin() كالتالي)
CREATE POLICY "Admins can read all profiles" ON public.profiles
FOR SELECT USING (public.is_admin());

-- 4. Trigger للمستخدمين الجدد
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

-- 5. Backfill إجباري — من غير ده هتقفل نفسك بره
INSERT INTO public.profiles (id, role)
SELECT id, 'user' FROM auth.users
ON CONFLICT (id) DO NOTHING;

-- دلوقتي رقّي حسابك انت (وأي أدمن حقيقي تاني) يدوياً:
-- استبدل <uuid> بمعرف حسابك من جدول auth.users
-- UPDATE public.profiles SET role = 'admin' WHERE id = '<uuid>';

-- 6. استبدال الـ policies القديمة
DROP POLICY IF EXISTS "Auth users full access articles" ON public.articles;
CREATE POLICY "Admin users full access articles" ON public.articles
TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Auth users full access media" ON public.media;
CREATE POLICY "Admin users full access media" ON public.media
TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Auth users full access programs" ON public.programs;
CREATE POLICY "Admin users full access programs" ON public.programs
TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Auth users full access testimonials" ON public.testimonials;
CREATE POLICY "Admin users full access testimonials" ON public.testimonials
TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Auth users full access enrollments" ON public.enrollments;
CREATE POLICY "Admin users full access enrollments" ON public.enrollments
TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Auth users full access settings" ON public.site_settings;
CREATE POLICY "Admin users full access settings" ON public.site_settings
TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- تحديث الـ Storage Policies لتستخدم is_admin() بدلاً من الـ subquery
DROP POLICY IF EXISTS "Auth Insert images" ON storage.objects;
CREATE POLICY "Admin Insert images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'images' AND public.is_admin());

DROP POLICY IF EXISTS "Auth Update images" ON storage.objects;
CREATE POLICY "Admin Update images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'images' AND public.is_admin());

DROP POLICY IF EXISTS "Auth Delete images" ON storage.objects;
CREATE POLICY "Admin Delete images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'images' AND public.is_admin());

DROP POLICY IF EXISTS "Auth Insert videos" ON storage.objects;
CREATE POLICY "Admin Insert videos" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'videos' AND public.is_admin());

DROP POLICY IF EXISTS "Auth Update videos" ON storage.objects;
CREATE POLICY "Admin Update videos" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'videos' AND public.is_admin());

DROP POLICY IF EXISTS "Auth Delete videos" ON storage.objects;
CREATE POLICY "Admin Delete videos" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'videos' AND public.is_admin());

DROP POLICY IF EXISTS "Auth Insert documents" ON storage.objects;
CREATE POLICY "Admin Insert documents" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'documents' AND public.is_admin());

DROP POLICY IF EXISTS "Auth Update documents" ON storage.objects;
CREATE POLICY "Admin Update documents" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'documents' AND public.is_admin());

DROP POLICY IF EXISTS "Auth Delete documents" ON storage.objects;
CREATE POLICY "Admin Delete documents" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'documents' AND public.is_admin());
