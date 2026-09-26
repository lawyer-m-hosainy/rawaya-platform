import React, { useState } from 'react';
import { BookOpen, Clock, ArrowLeft, X, Sparkles, Share2, Check } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  excerpt: string;
  author: string;
  content: string[];
}

export const RawayaJournal: React.FC = () => {
  const articles: Article[] = [
    {
      id: 'prayer-love',
      title: 'رحلة حب الصلاة: كيف نغرس شغف العبادة في وجدان الطفل برفق ومودة؟',
      category: 'تربية وجدانية',
      readTime: '٤ دقائق قراءة',
      date: 'سبتمبر ٢٠٢٦',
      author: 'أ. نرمين الحسيني',
      excerpt: 'كيف نعلّم الصغير أن الصلاة لقاء حب وشكر لله؟ خطوات تربوية رقيقة وعملية لبناء علاقة دافئة بين طفلك وسجادة الصلاة تنبع من القلب والاقتناع.',
      content: [
        'كثيراً ما يتساءل الآباء والأمهات: كيف نساعد أبناءنا على الإقبال على الصلاة بحب وشغف حقيقي وراحة بال دون الحاجة إلى التكرار والإلحاح؟',
        'الخطوة الأولى تبدأ من ترسيخ محبة الله ولطفه: أن نحدث الطفل عن نعم الله الواسعة وعن كل الجمال الذي يحيط به في حياته، ليدرك بقلبه أن الصلاة هي أجمل لحظة شكر وتواصل مع الخالق الكريم.',
        'الخطوة الثانية: جعل الصلاة تجربة أسرية مبهجة؛ نصلي معاً في جو هادئ ومريح، ونمنح الطفل فرصة المشاركة وفرش السجادة أو رفع الأذان بصوته العذب، ونتبادل الابتسامات والدعوات الدافئة بعد التسليم.',
        'الخطوة الثالثة: استكشاف معاني الأذكار والركوع والسجود بلغة مبسطة؛ فحين يعلم الطفل أن السجود هو مساحة للأمنيات والدعاء بكل ما يحبه، تصبح الصلاة واحة سكينة ينتظرها بشوق.',
      ],
    },
    {
      id: 'rote-vs-understanding',
      title: 'فقه المعنى قبل الحفظ: كيف يتحول القرآن إلى رفيق فكري ووجداني للطفل؟',
      category: 'فكر تربوي وقرآني',
      readTime: '٥ دقائق قراءة',
      date: 'أغسطس ٢٠٢٦',
      author: 'أ. نرمين الحسيني',
      excerpt: 'لماذا يعد الفهم العميق والتدبر المبكر حجر الزاوية في بناء شخصية النشء؟ وكيف ننقل الآيات من مجرد نصوص إلى سلوكيات مضيئة وحوار مثمر.',
      content: [
        'حين يقترن حفظ القرآن الكريم بفهم معانيه الجميلة وسياقاته العميقة، تكتسب الآيات حياة وحيوية حقيقية في عقل الطفل وسلوكه اليومي.',
        'فهم مفردات السور وقصص الأنبياء يلبي فضول الطفل المعرفي، ويدربه على طرح الأسئلة الذكية والتفكر في معاني الخير والعدل والرحمة.',
        'في رَوَايَا، نرى أن كل جلسة قرآنية هي فرصة لبناء الشخصية: نربط الآيات بمواقف يتعلم منها الطفل كيف يحترم الآخرين، كيف يبر والديه، وكيف يتكلم بصدق ولطف.',
        'بهذا التكامل بين التلاوة المتقنة والدراية الواعية، ينشأ الطفل متزناً، فخوراً بهويته، وقادراً على الحوار والتعبير عن قيمه بذكاء وأدب رفيع.',
      ],
    },
    {
      id: 'screens-and-fitrah',
      title: 'الوعي الإيجابي في العصر الرقمي: بناء مهارات التفكير الناقد والحوار مع الأبناء',
      category: 'تنمية الوعي والتفكير',
      readTime: '٦ دقائق قراءة',
      date: 'يوليو ٢٠٢٦',
      author: 'أ. نرمين الحسيني',
      excerpt: 'كيف نساعد أبناءنا على الاستفادة من عالم التكنولوجيا بوعي وتوازن، وتنمية قدرتهم الذاتية على التمييز والاختيار الصائب بملء إرادتهم.',
      content: [
        'يعيش أطفال اليوم في عالم متصل بالمعرفة والشاشات، وهذا الواقع يمنحهم فرصاً واسعة للاستكشاف والتعلم إذا ما اقترن برعاية والدية حكيمة وتواصل مستمر.',
        'بدلاً من أساليب التقييد الصارم التي قد تشعر الطفل بالعزلة، نعتمد على منهجية «بناء الوعي والتمييز الذاتي»؛ نشاهد ونتحاور معاً: ما رأيك في تصرف هذه الشخصية؟ وكيف يمكننا التصرف بطريقة أكثر حكمة؟',
        'حين ندرب الطفل على التفكير الناقد والملاحظة الواعية، يكتسب ثقة داخلية تمكنه من تقدير المفيد واجتناب ما لا يليق بقيمه دون الحاجة لرقابة دائمة.',
        'الدفء الأسري والمساحة الآمنة للنقاش في المنزل هما الحصن الأجمل الذي يمنح أبناءنا النضج والاستقرار الفكري والعاطفي.',
      ],
    },
  ];

  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [copied, setCopied] = useState(false);

  const handleShare = (article: Article) => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${article.title}\nمن مقالات مشروع رَوَايَا: https://rawaya.site`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="insights" className="py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-100 text-cyan-900 text-xs font-bold mb-3 border border-cyan-200">
            <BookOpen className="w-3.5 h-3.5 text-cyan-700" />
            <span>من رَوَايَا · المقالات والأفكار التربوية</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight mb-4">
            فكر ومحتوى «رَوَايَا» للأسرة والوالدية
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            إضاءات تربوية وتأصيلات شرعية معاصرة تساعدك على فهم نفسية طفلك وبناء جسور الحوار والمودة معه.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((art) => (
            <article
              key={art.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between text-right group"
            >
              <div>
                {/* Meta Row */}
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 mb-4">
                  <span className="px-2.5 py-1 rounded-md bg-cyan-50 text-cyan-800 font-bold border border-cyan-100">
                    {art.category}
                  </span>
                  <div className="flex items-center gap-1 text-slate-400">
                    <Clock className="w-3 h-3" />
                    <span>{art.readTime}</span>
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display mb-3 group-hover:text-cyan-800 transition-colors leading-snug">
                  {art.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                  {art.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">
                  بقلم: {art.author}
                </span>

                <button
                  onClick={() => setSelectedArticle(art)}
                  className="text-xs font-bold text-cyan-700 hover:text-cyan-900 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>اقرأ المقال كاملاً</span>
                  <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                </button>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Full Article Reading Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in" dir="rtl">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[88vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-10 text-right relative">
            
            {/* Modal Controls */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-cyan-100 text-cyan-800">
                {selectedArticle.category} · {selectedArticle.readTime}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleShare(selectedArticle)}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                  title="مشاركة المقال"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                  aria-label="إغلاق"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Article Content */}
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display mb-3 leading-snug">
              {selectedArticle.title}
            </h2>

            <div className="flex items-center gap-3 text-xs text-slate-500 mb-6">
              <span>بقلم: {selectedArticle.author}</span>
              <span aria-hidden="true">·</span>
              <span>مشروع رَوَايَا التربوي</span>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
              {selectedArticle.content.map((paragraph, idx) => (
                <p key={idx} className="bg-slate-50/60 p-3.5 rounded-xl border border-slate-100">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Modal Footer Call to Action */}
            <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-600">
                ترغب في تطبيق هذه المفاهيم عملياً مع طفلك؟
              </div>
              <button
                onClick={() => {
                  setSelectedArticle(null);
                  const el = document.getElementById('enrollment');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-white bg-cyan-700 hover:bg-cyan-800 rounded-xl transition-colors cursor-pointer"
              >
                انضم لبرامج رَوَايَا الآن
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
