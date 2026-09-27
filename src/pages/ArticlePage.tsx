import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Calendar, Clock, User } from 'lucide-react';
import { articleService, Article } from '../services/articleService';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (slug) {
      loadArticle(slug);
    }
  }, [slug]);

  const loadArticle = async (articleSlug: string) => {
    try {
      setLoading(true);
      const data = await articleService.getArticleBySlug(articleSlug);
      if (data.is_published) {
        setArticle(data);
      }
    } catch (error) {
      console.error('Error loading article:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col" dir="rtl">
        <Navbar onOpenEnrollment={() => {}} />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-pulse text-emerald-600 font-bold">جاري التحميل...</div>
        </div>
        <Footer onOpenAdmin={() => {}} />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col" dir="rtl">
        <Navbar onOpenEnrollment={() => {}} />
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
          <h1 className="text-3xl font-bold text-slate-800 mb-4">المقال غير موجود</h1>
          <p className="text-slate-600 mb-8">عذراً، المقال الذي تبحث عنه غير موجود أو تم حذفه.</p>
          <Link to="/" className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors">
            العودة للصفحة الرئيسية
          </Link>
        </div>
        <Footer onOpenAdmin={() => {}} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans" dir="rtl">
      {/* SEO Metadata */}
      <Helmet>
        <title>{`${article.title} | رَوَايَا`}</title>
        <meta name="description" content={article.excerpt} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:image" content={article.cover_image || 'https://rawaya.site/og-image.jpg'} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.excerpt} />
        <meta name="twitter:image" content={article.cover_image || 'https://rawaya.site/og-image.jpg'} />

        {/* Article specifics */}
        <meta property="article:published_time" content={article.created_at} />
        <meta property="article:author" content={article.author} />
        <meta property="article:section" content={article.category} />
      </Helmet>

      <Navbar onOpenEnrollment={() => {}} />

      <main className="flex-1 pt-24 pb-20">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-emerald-600 transition-colors mb-8 font-medium">
            <ArrowRight size={20} />
            العودة للرئيسية
          </Link>

          <header className="mb-12 text-center">
            {article.category && (
              <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-800 text-sm font-bold rounded-full mb-6">
                {article.category}
              </span>
            )}
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 mb-6 leading-tight">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-600 font-medium">
              <div className="flex items-center gap-2">
                <User size={18} className="text-emerald-600" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-emerald-600" />
                <span>{new Date(article.created_at).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              {article.read_time && (
                <div className="flex items-center gap-2">
                  <Clock size={18} className="text-emerald-600" />
                  <span>{article.read_time} قراءة</span>
                </div>
              )}
            </div>
          </header>

          {article.cover_image && (
            <div className="relative rounded-3xl overflow-hidden mb-12 shadow-xl aspect-video">
              <img 
                src={article.cover_image} 
                alt={article.title} 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          )}

          <div className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-emerald-600 hover:prose-a:text-emerald-700 prose-img:rounded-2xl" dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br/>') }} />
          
        </article>
      </main>

      <Footer onOpenAdmin={() => {}} />
    </div>
  );
}
