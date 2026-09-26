import React from 'react';
import { Award, BookOpen, GraduationCap, ShieldCheck, HeartHandshake, Sparkles, CheckCircle2 } from 'lucide-react';

interface TeacherProfileProps {
  onOpenEnrollment: () => void;
}

export const TeacherProfile: React.FC<TeacherProfileProps> = ({ onOpenEnrollment }) => {
  const credentials = [
    {
      icon: GraduationCap,
      title: 'خريجة كلية الشريعة الإسلامية',
      institution: 'جامعة الأزهر الشريف',
      desc: 'دراسة أكاديمية معمقة في الفقه وأصول الشريعة والتفسير، وتأصيل منهج الوسطية والاعتدال.',
    },
    {
      icon: Award,
      title: 'إجازة القرآن الكريم بالسند المتصل',
      institution: 'بقراءة عاصم الكوفي (شُعبة وحفص)',
      desc: 'إجازة مسندة بالسند المتصل من طريق الشاطبية إلى رسول الله ﷺ مشافهة وضبطاً وإتقاناً.',
    },
    {
      icon: BookOpen,
      title: 'معلمة معتمدة بطريقة نور البيان',
      institution: 'اعتماد تربوي تخصصي',
      desc: 'تأسيس القراءة بالقرآن الكريم وبناء الجسور اللغوية للأطفال من سن ٤ إلى ٨ سنوات.',
    },
    {
      icon: ShieldCheck,
      title: '+١٣ عاماً في الميدان التربوي',
      institution: 'خبرة حية مع مئات الأسر',
      desc: 'ممارسة عملية في تحفيظ القرآن، وبناء التفكير المتوازن والوعي المعرفي للناشئة واليافعين.',
    },
  ];

  return (
    <section id="founder" className="py-24 bg-white border-b border-slate-200 scroll-mt-20">
      {/* Anchor for backwards compatibility */}
      <div id="teacher" className="-top-24 relative" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-100 text-cyan-900 text-xs font-bold mb-3 border border-cyan-200">
            <Sparkles className="w-3.5 h-3.5 text-cyan-700" />
            <span>المؤسِّسة والقيادة التربوية</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight mb-4">
            أ. نرمين الحسيني.. علمٌ أزهري وشغفٌ بمستقبل النشء
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            الجمع بين التأصيل الشرعي الرصين بالسند المتصل، والخبرة النفسية العميقة بخصائص وسلوكيات جيل الألفية والإنترنت.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Portrait Column */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-slate-100">
                <img
                  src="/src/assets/images/teacher_nermeen_educator_1790367234348.jpg"
                  alt="أ. نرمين الحسيني - مؤسسة مشروع رَوَايَا التربوي"
                  className="w-full h-[480px] object-cover object-center"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Floating verified badge */}
              <div className="absolute -bottom-5 -left-4 sm:left-6 bg-slate-900 text-white p-4 rounded-2xl shadow-lg border border-slate-700 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-700 flex items-center justify-center text-white shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-white">إجازة بالسند المتصل</p>
                  <p className="text-[11px] text-cyan-300">روايتا شُعبة وحفص عن الإمام عاصم</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bio & Academic Pedagogy Column */}
          <div className="lg:col-span-7 order-1 lg:order-2 text-right">
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-800 mb-3">
              <span>مؤسسة ومنشئة منهج رَوَايَا (رسالة ودراية)</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display mb-4">
              من محاريب الأزهر الشريف إلى عقول وقلوب أبنائنا
            </h3>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-6 font-normal">
              باحثة ومربية شرعية حاصلة على ليسانس الشريعة الإسلامية من جامعة الأزهر الشريف. آمنت أن التعليم الديني في هذا العصر يحتاج إلى لغة جديدة تخاطب عقل الطفل وتلامس وجدانه، ولا تكتفي بسرد المتون الجافة. طوّرت عبر ١٣ عاماً من التعامل اليومي مع الأطفال منظومة «رَوَايَا» لتكون بيئة آمنة تفهم أسئلتهم الصعبة وتجيب عليها بمحبة ومنطق علمي رصين.
            </p>

            {/* Direct Words from the Teacher */}
            <div className="bg-slate-50 border-r-4 border-cyan-600 rounded-2xl p-5 mb-8 text-slate-800">
              <p className="text-xs font-bold text-cyan-800 mb-1.5 flex items-center gap-1.5">
                <HeartHandshake className="w-4 h-4 text-cyan-600" />
                <span>رؤيتي للتربية والتعليم:</span>
              </p>
              <p className="text-xs sm:text-sm leading-relaxed text-slate-700 italic">
                «رسالتنا التربوية أن نفتح قلب الطفل لجمال معاني القرآن ولطف الشريعة؛ فحين يتذوق الصغير حلاوة الفهم، تتحول العبادة إلى سكينة وشغف ذاتي، وينطلق في حياته واثقاً من نفسه ومعتزاً بقيمه.»
              </p>
            </div>

            {/* Credentials Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {credentials.map((c, i) => {
                const IconComponent = c.icon;
                return (
                  <div key={i} className="flex items-start gap-3 p-3.5 rounded-2xl border border-slate-200/90 bg-white shadow-2xs">
                    <div className="w-8 h-8 rounded-lg bg-cyan-50 text-cyan-700 flex items-center justify-center shrink-0 mt-0.5">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{c.title}</h4>
                      <p className="text-[11px] font-semibold text-cyan-800 mt-0.5">{c.institution}</p>
                      <p className="text-[11px] text-slate-500 mt-1 leading-snug">{c.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenEnrollment}
                className="px-6 py-3 text-xs sm:text-sm font-bold text-white bg-slate-900 hover:bg-cyan-700 active:bg-cyan-800 rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                انضم لرحلة رَوَايَا مع أ. نرمين
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
