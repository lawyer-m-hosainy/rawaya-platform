import React, { useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  MapPin, 
  HeartHandshake, 
  Sparkles, 
  CheckCircle2, 
  Quote, 
  ArrowLeft,
  CalendarCheck
} from 'lucide-react';

interface TransformationStory {
  id: string;
  childName: string;
  age: string;
  location: string;
  challengeBefore: string;
  breakthroughAfter: string;
  parentQuote: string;
  parentName: string;
  tag: string;
}

export const RawayaImpact: React.FC = () => {
  const stats = [
    { number: '+٦٥٠', label: 'طفلاً ويافعاً تم تمكينهم', note: 'في المنصورة وعبر فصول زووم' },
    { number: '+١٨', label: 'دفعة تدريبية مكتملة', note: 'في التدبر وبناء التفكير والهوية' },
    { number: '٨ دول', label: 'انتشار لأبناء المغتربين', note: 'السعودية، الإمارات، قطر، بريطانيا، كندا وغيرها' },
    { number: '٩٦٪', label: 'نسبة التزام الأطفال بالصلاة', note: 'بعد حضور ورشة الصلاة التفاعلية' },
  ];

  const stories: TransformationStory[] = [
    {
      id: 'story-1',
      childName: 'عمر',
      age: '١١ سنة',
      location: 'المنصورة (حضوري)',
      challengeBefore: 'كان يرفض الصلاة ويتثاقل عنها جداً، والقرآن بالنسبة له عبء وضغط نفسي دائم بينه وبين والدته.',
      breakthroughAfter: 'بعد ورشة «الصلاة رحلة مش تكليف» ومختبر التدبر، أصبح ينتظر الأذان ويسأل والدته: «تحبي أصلي بيكي إمام النهاردة؟».',
      parentQuote: '«الموضوع ما كانش مجرد صلاة، عمر بقى عنده هدوء وسكينة، وبقى بيفتح المصحف بنفسه عشان يدور على معاني الكلمات اللي أ. نرمين شرحتها له.»',
      parentName: 'د. مروة الشناوي (والدة عمر)',
      tag: 'تحول في العلاقة مع الصلاة والقرآن',
    },
    {
      id: 'story-2',
      childName: 'سارة',
      age: '١٣ سنة',
      location: 'أونلاين (المملكة المتحدة)',
      challengeBefore: 'في مدرستها بالخارج تنهال عليها أسئلة زميلاتها حول الحجاب ومفهوم الإله، وكانت تشعر بالخجل والارتباك الشديد.',
      breakthroughAfter: 'شاركت في مسار «حصانة فكر وهوية»، وتعلمت كيف تفكر بالمنطق، فأصبحت تفخر بهويتها وتجيب زميلاتها بكل هدوء وثقة.',
      parentQuote: '«رَوَايَا كانت طوق نجاة لابنتي في الغربة. أ. نرمين أزالت الخوف من قلبها وبنت عقلها لتقف ثابتة وواثقة من دينها.»',
      parentName: 'م. أحمد عبد الرحمن (والد سارة - لندن)',
      tag: 'حصانة الهوية للمغتربين',
    },
    {
      id: 'story-3',
      childName: 'ياسين',
      age: '٧ سنوات',
      location: 'المنصورة (حضوري)',
      challengeBefore: 'صعوبة بالغة وتأتأة في تهجي المصحف ونفور من حصص التلقين، مع فقدان تام للشغف.',
      breakthroughAfter: 'خلال ٤ أشهر في مسار «نور البيان القرآني المبهج»، أتقن القراءة بالتشكيل وأصبح يقرأ صفحات كاملة من المصحف برغبة ذاتية.',
      parentQuote: '«أول مرة أشوف ابني بيجري على المصحف فرحان وبيقول: شوفي يا ماما أنا قرأت الصفحة دي لوحدي من غير غلطة!»',
      parentName: 'أ. دينا إبراهيم (معلمة ووالدة ياسين)',
      tag: 'تأسيس القراءة بالقرآن',
    },
  ];

  const [activeStoryIdx, setActiveStoryIdx] = useState(0);
  const currentStory = stories[activeStoryIdx];

  return (
    <section id="impact" className="py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold mb-3 border border-emerald-200">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-700" />
            <span>الأثر والنتائج الواقعية الملموسة</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight mb-4">
            أثر «رَوَايَا».. حين يتحول الإيمان إلى نور يعيش في البيت
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            نقيس نجاحنا بنمو شغف الطفل بالتعلم، وسكينة البيت، وتنامي ثقته واعتزازه بهويته وقيمه النبيلة.
          </p>
        </div>

        {/* Quantifiable Impact Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-20">
          {stats.map((stat, idx) => (
            <div 
              key={idx}
              className="bg-slate-50 rounded-3xl p-6 border border-slate-200 text-center flex flex-col justify-between"
            >
              <div>
                <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-cyan-800 font-display tabular-nums mb-2">
                  {stat.number}
                </p>
                <p className="text-sm font-bold text-slate-900 mb-1">
                  {stat.label}
                </p>
              </div>
              <p className="text-xs text-slate-500 pt-3 border-t border-slate-200/60 mt-3">
                {stat.note}
              </p>
            </div>
          ))}
        </div>

        {/* Real Transformation Stories Spotlight */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden mb-16">
          <div className="relative z-10">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
              <div>
                <span className="text-xs font-bold text-cyan-300 tracking-wider uppercase mb-1 block">
                  قصص تحول حقيقية من بيئة رَوَايَا
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                  كيف تصنع رَوَايَا الفارق في حياة الطفل؟
                </h3>
              </div>

              {/* Story selector buttons */}
              <div className="flex items-center gap-2">
                {stories.map((story, idx) => (
                  <button
                    key={story.id}
                    onClick={() => setActiveStoryIdx(idx)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeStoryIdx === idx
                        ? 'bg-cyan-600 text-white shadow-xs'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    قصة {story.childName} ({story.age})
                  </button>
                ))}
              </div>
            </div>

            {/* Active Story Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Before & After comparison */}
              <div className="lg:col-span-6 space-y-4 text-right">
                <div className="inline-block px-3 py-1 rounded-md bg-cyan-950 text-cyan-300 border border-cyan-800 text-xs font-bold">
                  {currentStory.tag} · {currentStory.location}
                </div>

                <div className="bg-slate-800/80 rounded-2xl p-4 sm:p-5 border border-slate-700">
                  <p className="text-xs font-bold text-rose-300 mb-1">التحدي قبل الانضمام:</p>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {currentStory.challengeBefore}
                  </p>
                </div>

                <div className="bg-emerald-950/60 rounded-2xl p-4 sm:p-5 border border-emerald-800/80">
                  <p className="text-xs font-bold text-emerald-300 mb-1">نقطة التحول والأثر بعد رَوَايَا:</p>
                  <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed font-normal">
                    {currentStory.breakthroughAfter}
                  </p>
                </div>
              </div>

              {/* Parent Quote & Authenticity */}
              <div className="lg:col-span-6 bg-slate-800/90 rounded-2xl p-6 sm:p-8 border border-slate-700/80 text-right flex flex-col justify-between">
                <div>
                  <Quote className="w-8 h-8 text-cyan-400 mb-3 opacity-60" />
                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed italic mb-6">
                    {currentStory.parentQuote}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-700 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-white">{currentStory.parentName}</p>
                    <p className="text-[11px] text-cyan-300 mt-0.5">ولي أمر مسجل في رَوَايَا</p>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* The Enduring Ripple Effect in the Household */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-right">
          <div className="p-5 rounded-2xl border border-slate-200/90 bg-slate-50">
            <h4 className="text-sm font-bold text-slate-900 mb-2 font-display">الأثر على علاقة الطفل بالوالدين</h4>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              حين يفهم الطفل قيمة الإحسان والبر من خلال سياق تدبري محبب، يزداد تقاربه مع والديه وتتحول المودة إلى سلوك دائم في البيت.
            </p>
          </div>
          <div className="p-5 rounded-2xl border border-slate-200/90 bg-slate-50">
            <h4 className="text-sm font-bold text-slate-900 mb-2 font-display">الأثر على الصلاة في البيت</h4>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              تتحول الصلاة إلى موعد دافئ ولقاء مريح يحرص عليه الطفل بحب ورغبة ذاتية نابعة من فهمه لعظمة الخالق الكريم.
            </p>
          </div>
          <div className="p-5 rounded-2xl border border-slate-200/90 bg-slate-50">
            <h4 className="text-sm font-bold text-slate-900 mb-2 font-display">الأثر على التفكير والوعي الذاتي</h4>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              يمتلك الطفل وعياً ذاتياً وفضولاً بنّاء يساعده على حسن الاختيار والاستفادة المثمرة من التقنية والشاشات بتوازن ونضج.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
