import React, { useState } from 'react';
import { 
  Building2, 
  GraduationCap, 
  Award, 
  ShieldCheck, 
  Users2, 
  CheckCircle2, 
  HeartHandshake, 
  Sparkles, 
  ArrowLeft, 
  FileCheck2, 
  Quote,
  ExternalLink,
  BookMarked
} from 'lucide-react';

interface Collaborator {
  id: string;
  name: string;
  category: 'academic' | 'experts' | 'schools' | 'diaspora';
  type: string;
  scope: string;
  description: string;
  badge: string;
  impactHighlight: string;
  statsOrEndorsement?: string;
}

export const PartnersSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'academic' | 'experts' | 'schools' | 'diaspora'>('all');
  const [partnershipModalOpen, setPartnershipModalOpen] = useState(false);
  const [partnerFormSubmitted, setPartnerFormSubmitted] = useState(false);

  const categories = [
    { id: 'all', label: 'كافة الشركاء والمرجعيات' },
    { id: 'academic', label: 'المرجعيات الأكاديمية والشرعية' },
    { id: 'experts', label: 'الخبراء والمستشارون التربويون' },
    { id: 'schools', label: 'المدارس والمراكز الحاضنة' },
    { id: 'diaspora', label: 'روابط المغتربين بالخارج' },
  ];

  const collaborators: Collaborator[] = [
    {
      id: 'azhar',
      name: 'جامعة الأزهر الشريف – كلية الشريعة',
      category: 'academic',
      type: 'المرجعية الفقهية والشرعية',
      scope: 'القاهرة، جمهورية مصر العربية',
      description: 'الرافد العلمي والتأصيلي لمنهج رَوَايَا، المستند إلى الفهم الأزهري الوسطي المستنير في غرس العقيدة والأخلاق دون إفراط أو تفريط.',
      badge: 'مرجعية معتمدة',
      impactHighlight: 'اعتماد التأصيل الشرعي لورش التدبر ومسارات العقيدة للناشئة.',
      statsOrEndorsement: 'تخرج مؤسسة المشروع بتقدير امتياز وتخصص في الفقه والشريعة.',
    },
    {
      id: 'isnad-scholars',
      name: 'شيوخ الإقراء والإسناد المتصل',
      category: 'academic',
      type: 'سند القرآن الكريم المتصل',
      scope: 'مصر والعالم الإسلامي',
      description: 'إجازة مسندة بالسند المتصل كابراً عن كابر إلى رسول الله ﷺ بروايتي شُعبة وحفص عن عاصم من طريق الشاطبية، لحفظ أمانة التلاوة والأداء.',
      badge: 'سند متصل موثق',
      impactHighlight: 'تدقيق وضبط أحكام التلاوة ومخارج الحروف للأطفال الصغار.',
      statsOrEndorsement: 'سلسلة إسناد شريفة موثقة ومجازة بالسماع والعرض.',
    },
    {
      id: 'child-psychology-consultant',
      name: 'استشارات التربية الإيجابية وسيكولوجيا الطفل',
      category: 'experts',
      type: 'الإرشاد النفسي والنمائي',
      scope: 'استشارات متخصصة',
      description: 'مراجعة المناهج والأنشطة عبر أخصائيين في علم نفس الطفل للتأكد من ملاءمة المفردات للقدرات الإدراكية لكل مرحلة عمرية وتعزيز الأمان النفسي.',
      badge: 'رعاية نفسية نمائية',
      impactHighlight: 'تصميم آليات تفاعلية تحول دون شعور الطفل بالذنب أو الإحباط.',
      statsOrEndorsement: '«منهج رَوَايَا يراعي الصحة النفسية للطفل قبل تلقين المعلومة».',
    },
    {
      id: 'digital-wellness-advisors',
      name: 'فريق التوجيه والتوازن الرقمي للنشء',
      category: 'experts',
      type: 'التوازن الرقمي وبناء الوعي المعاصر',
      scope: 'مصر والوطن العربي',
      description: 'تطوير حقائب تدريبية لليافعين والآباء لتحقيق التوازن الصحي بين الواقع والشاشات، واستثمار التقنية بصورة إيجابية تعزز المعرفة والإنتاجية.',
      badge: 'وعي وتوازن رقمي',
      impactHighlight: 'بناء مهارات التفكير الناقد والتمييز الإيجابي لدى الناشئة.',
      statsOrEndorsement: 'أكثر من ٢٠ ورشة متخصصة في التوازن الرقمي الأسري.',
    },
    {
      id: 'mansoura-schools-network',
      name: 'المدارس الخاصة والدولية بالدقهلية',
      category: 'schools',
      type: 'استضافة الورش والفعاليات',
      scope: 'المنصورة، مصر',
      description: 'استضافة ورش تفاعلية وحملات مدرسية مثل «الصلاة رحلة مش تكليف» ومسابقات التهجي القرآني المبهج في قاعات ومسارح المدارس.',
      badge: 'شراكة ميدانية',
      impactHighlight: 'الوصول المباشر إلى مئات الطلاب وتدريبهم داخل بيئتهم التعليمية.',
      statsOrEndorsement: 'تنفيذ برامج حضورية مشتركة مع مؤسسات تعليمية رائدة.',
    },
    {
      id: 'uk-canada-community',
      name: 'رابطات الأسر والمراكز الإسلامية بالمهجر',
      category: 'diaspora',
      type: 'تعليم الناشئة أونلاين',
      scope: 'بريطانيا، كندا، ألمانيا، ودول الخليج',
      description: 'تنظيم فصول تدبر وتأسيس لغوي لأبناء الجاليات العربية والمغتربين عبر منصة زووم التفاعلية، لحماية الهوية واللسان العربي في الغربة.',
      badge: 'انتشار دولي',
      impactHighlight: 'ربط أطفال المهجر بالقرآن ولغة الضاد بأسلوب حواري يفهم لغتهم وثقافتهم.',
      statsOrEndorsement: 'طلاب مسجلون بانتظام من أكثر من ٨ دول حول العالم.',
    },
  ];

  const filtered = activeCategory === 'all' 
    ? collaborators 
    : collaborators.filter(c => c.category === activeCategory);

  const trustPillars = [
    { title: 'أصالة شرعية أزهرية', desc: 'علم متوارث بالسند والفهم السليم', icon: GraduationCap },
    { title: 'مراعاة علم نفس الطفل', desc: 'بيئة بلا ترهيب تزرع حب الله أولاً', icon: ShieldCheck },
    { title: 'كادر تدريسي نسائي متخصص', desc: 'إشراف مباشر ومتابعة دقيقة للأم والطفل', icon: Users2 },
    { title: 'رابط حي مع واقع الأسرة', desc: 'أثر سلوكي ينعكس فوراً في البيت', icon: HeartHandshake },
  ];

  const handleSubmitPartnership = (e: React.FormEvent) => {
    e.preventDefault();
    setPartnerFormSubmitted(true);
    setTimeout(() => {
      setPartnerFormSubmitted(false);
      setPartnershipModalOpen(false);
    }, 2500);
  };

  return (
    <section id="partners" className="py-24 bg-white border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Lead Tag & Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-100 text-cyan-900 text-xs font-bold mb-3 border border-cyan-200">
            <HeartHandshake className="w-3.5 h-3.5 text-cyan-700" />
            <span>المصداقية والشراكات المؤسسية</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight mb-4">
            شركاء النجاح والمرجعيات المعتمدة لمشروع «رَوَايَا»
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            تستمد «رَوَايَا» ثقلها المهني من تعاون وثيق مع مرجعيات أكاديمية أزهرية رصينة، ونخبة من الخبراء التربويين والمؤسسات التعليمية الرائدة لبناء طفولة آمنة فكرياً ووجدانياً.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Trust Pillars High-Level Banner */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {trustPillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div 
                key={idx}
                className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200/90 text-right flex items-start gap-3.5"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-800 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 font-display">{p.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{p.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Collaborators & Institutional Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-cyan-400 transition-all flex flex-col justify-between text-right group"
            >
              <div>
                {/* Badge & Type */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[11px] font-bold px-3 py-1 rounded-md bg-cyan-50 text-cyan-800 border border-cyan-100">
                    {item.badge}
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {item.scope}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display mb-1 group-hover:text-cyan-800 transition-colors">
                  {item.name}
                </h3>
                <p className="text-xs font-semibold text-cyan-700 mb-3">
                  {item.type}
                </p>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5 font-normal">
                  {item.description}
                </p>
              </div>

              <div>
                {/* Specific Impact Highlight Box */}
                <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-100 text-xs mb-4">
                  <div className="flex items-start gap-2 text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>الأثر المؤسسي:</strong> {item.impactHighlight}</span>
                  </div>
                </div>

                {/* Evidence Quote / Stat */}
                {item.statsOrEndorsement && (
                  <div className="text-[11px] text-slate-500 italic flex items-center gap-1.5 pt-2 border-t border-slate-100">
                    <Quote className="w-3 h-3 text-cyan-600 shrink-0" />
                    <span className="line-clamp-1">{item.statsOrEndorsement}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Institutional Call To Action for Schools & Centers */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-cyan-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8 text-right">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-cyan-300 tracking-wider uppercase mb-2 block">
              تعاون مؤسسي ومبادرات مجتمعية
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white mb-3">
              هل تمثل مدرسة، مركزاً تربوياً، أو جمعية أسرية ترغب في استضافة ورش رَوَايَا؟
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              نرحب بالشراكات الهادفة لتطبيق ورش «الصلاة رحلة مش تكليف»، ومخيمات «حصانة الفكر»، أو إدراج مسارات التدبر ضمن برامج مؤسستكم التعليمية بإشراف أ. نرمين الحسيني.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <button
              onClick={() => setPartnershipModalOpen(true)}
              className="w-full sm:w-auto px-6 py-3.5 bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-700 text-white text-xs sm:text-sm font-bold rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileCheck2 className="w-4 h-4" />
              <span>طلب شراكة أو استضافة ورشة</span>
            </button>
            <a
              href="https://wa.me/201000000000?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D9%86%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%A8%D8%AD%D8%AB%20%D9%81%D8%B1%D8%B5%20%D8%A7%D9%84%D8%AA%D8%B9%D8%A7%D9%88%D9%86%20%D9%88%D8%A7%D9%84%D8%B4%D8%B1%D8%A7%D9%83%D8%A9%20%D9%85%D8%B9%20%D9%85%D8%B4%D8%B1%D9%88%D8%B9%20%D8%B1%D9%8E%D9%88%D9%8E%D8%A7%D9%8A%D9%8E%D8%A7"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold rounded-xl transition-colors flex items-center justify-center gap-2 text-center"
            >
              <span>محادثة الإدارة المؤسسية</span>
            </a>
          </div>
        </div>

      </div>

      {/* Institutional Partnership Proposal Modal */}
      {partnershipModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in" dir="rtl">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 p-6 sm:p-8 text-right relative">
            <h3 className="text-lg font-bold text-slate-900 font-display mb-2">
              طلب تعاون وشراكة مؤسسية مع «رَوَايَا»
            </h3>
            <p className="text-xs text-slate-600 mb-6">
              يسعدنا التنسيق معكم لتنفيذ ورش حضورية بالمنصورة أو برامج تدريبية وتفاعلية أونلاين.
            </p>

            {partnerFormSubmitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                <h4 className="text-sm font-bold text-emerald-900 mb-1">تم استلام طلبكم بنجاح</h4>
                <p className="text-xs text-emerald-700">سيتواصل معكم فريق العلاقات المؤسسية بمشروع رَوَايَا لمناقشة التفاصيل.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitPartnership} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">اسم المؤسسة أو المدرسة / الجهة *</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: مدارس المنصورة الرسمية / أكاديمية الأمل"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-cyan-600 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">اسم المسؤول وصفته *</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: أ. محمد أحمد (المدير التربوي)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-cyan-600 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">رقم الهاتف أو الواتساب للتواصل *</label>
                  <input
                    type="tel"
                    required
                    placeholder="010XXXXXXXX"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-cyan-600 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">طبيعة التعاون المقترح *</label>
                  <select
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-cyan-600 focus:outline-hidden bg-white"
                  >
                    <option>استضافة ورشة «الصلاة رحلة مش تكليف» للطلاب</option>
                    <option>تنظيم معسكر «حصانة الفكر وبناء الهوية» لليافعين</option>
                    <option>ورشة تأسيس نور البيان لمعلمات وطلاب الروضة</option>
                    <option>برنامج تدريب أونلاين لأبناء المغتربين</option>
                    <option>أخرى (يرجى التحديد في الملاحظات)</option>
                  </select>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setPartnershipModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-cyan-700 transition-colors shadow-xs cursor-pointer"
                  >
                    إرسال الطلب
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
