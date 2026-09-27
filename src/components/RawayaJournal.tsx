import React, { useEffect, useState } from 'react';
import { BookOpen, Clock, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { articleService, Article } from '../services/articleService';

export const RawayaJournal = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      setLoading(true);
      const data = await articleService.getArticles(true); // only published
      setArticles(data.slice(0, 3)); // show only latest 3 on home page
    } catch (error) {
      console.error('Error loading articles:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="insights" className="py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold mb-3 border border-emerald-200">
            <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
            <span>مدونة رَوَايَا التربوية</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight mb-4">
            مقالات ومفاهيم رَوَايَا للأسرة واليافعين
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            مقالات تربوية عملية تساعدك على فهم طفلك وبناء أسرة متماسكة.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-pulse flex items-center gap-2 text-emerald-600 font-bold">
              جاري تحميل المقالات...
            </div>
          </div>
        ) : (
          /* Articles Grid */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((art) => (
              <article
                key={art.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between text-right group"
              >
                <div>
                  {/* Meta Row */}
                  <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 mb-4">
                    {art.category && (
                      <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 font-bold border border-emerald-100">
                        {art.category}
                      </span>
                    )}
                    {art.read_time && (
                      <div className="flex items-center gap-1 text-slate-400">
                        <Clock className="w-3 h-3" />
                        <span>{art.read_time}</span>
                      </div>
                    )}
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display mb-3 group-hover:text-emerald-800 transition-colors leading-snug">
                    <Link to={`/article/${art.slug}`}>
                      {art.title}
                    </Link>
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-normal line-clamp-3">
                    {art.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-4">
                  <span className="text-xs font-bold text-slate-700">
                    بقلم: {art.author}
                  </span>

                  <Link
                    to={`/article/${art.slug}`}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1.5 transition-colors"
                  >
                    <span>اقرأ المقال كاملاً</span>
                    <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                  </Link>
                </div>
              </article>
            ))}

            {articles.length === 0 && (
              <div className="col-span-3 text-center py-12 text-slate-500 bg-white rounded-3xl border border-slate-200">
                قريباً... يتم كتابة مقالات تربوية جديدة.
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
};
