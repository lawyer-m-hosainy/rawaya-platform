import React, { useState } from 'react';
import { 
  BrainCircuit, 
  Layers, 
  MessageCircleQuestion, 
  Sparkles, 
  Users, 
  Scale, 
  CheckCircle2, 
  ArrowLeft,
  BookOpen
} from 'lucide-react';

interface MethodologyPrinciple {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  practicalApplication: string;
  parentNoticeableImpact: string;
  contrastVsTraditional: string;
}

export const MethodologySection: React.FC = () => {
  const principles: MethodologyPrinciple[] = [
    {
      id: 'comprehension',
      number: '٠١',
      title: 'التعلم بالفهم وليس التلقين',
      subtitle: 'تفكيك المعنى وتذوق الكلمات قبل الإلزام بالحفظ',
      description: 'نرفض أن يتحول عقل الطفل إلى جهاز تسجيل يعيد الكلمات دون إدراك لمعناها. في رَوَايَا، كل آية وكل سورة تبدأ بحكاية المعنى، استكشاف المفردات، وسؤال: «ليه ربنا قال الكلمة دي بالذات هنا؟».',
      icon: BrainCircuit,
      practicalApplication: 'استخدام خرائط المفاهيم المصورة، وربط أسباب النزول بسياق درامي مشوق يفهمه عقل الصغير.',
      parentNoticeableImpact: 'الطفل يتلو السورة وهو يعيش تفاصيلها ويفسرها لإخوته وأبويه في البيت بفخر وسعادة.',
      contrastVsTraditional: 'في التلقين التقليدي: يحفظ ٥ أسطر ثم ينساها. في رَوَايَا: يفهم ٥ أسطر فتثبت مدى الحياة.',
    },
    {
      id: 'relevance',
      number: '٠٢',
      title: 'ربط المعرفة بحياة وواقع الطفل',
      subtitle: 'القرآن ليس نصوصاً تاريخية.. بل دليل حياة وملاذ يومي',
      description: 'نربط كل درس قرآني بمواقف يواجهها الطفل كل صباح: تنمر في المدرسة، خلاف مع صديق، غضب من خسارة في لعبة، أو شعور بالغيرة. يتحول القرآن إلى رفيق يرشده كيف يتصرف.',
      icon: Layers,
      practicalApplication: 'تحديات أسبوعية بعنوان «آية اليوم في بيتي»: كيف طبقت سورة الماعون اليوم في البيت؟',
      parentNoticeableImpact: 'تحسن مباشر في بر الوالدين، كظم الغيظ، ومشاركة الألعاب مع الإخوة دون صراع.',
      contrastVsTraditional: 'في المعتاد: القرآن ينتهي مع نهاية الحلقة. في رَوَايَا: القرآن يبدأ تطبيقه لحظة الخروج من الحلقة.',
    },
    {
      id: 'dialogue',
      number: '٠٣',
      title: 'الحوار والتفكير والتساؤل الحر',
      subtitle: 'التساؤل مفتاح المعرفة، والحوار طريق الاقتناع الراسخ',
      description: 'الفضول المعرفي والتساؤل هما المحرك الطبيعي لذكاء الطفل. في رَوَايَا، نفتح مساحة أمان كاملة للأبناء ليطرحوا كل ما يجول في خواطرهم عن الكون والحياة والدين، ونجيبهم بحكمة أزهرية ومنطق علمي وتربوي هادئ يروي عقولهم.',
      icon: MessageCircleQuestion,
      practicalApplication: 'جلسات «كرسي التساؤل الذكي» وورش التفكير الإبداعي المناسب لسن اليافعين.',
      parentNoticeableImpact: 'طفل يمتلك شجاعة التعبير، يتحدث بثقة وموضوعية، ويشارك أفكاره وتساؤلاته مع والديه بصدق وراحة.',
      contrastVsTraditional: 'في الأسلوب التقليدي: تجاهل تساؤلات الطفل. في رَوَايَا: «سؤالك ذكي وممتاز.. تعال نستكشف إجابته معاً».',
    },
    {
      id: 'character',
      number: '٠٤',
      title: 'بناء القيم والسلوك الوجداني',
      subtitle: 'تربية الضمير الحي واستشعار محبة الله ولطفه',
      description: 'لا نركز فقط على السلوك الظاهري، بل نغرس المحرك الداخلي الجميل: محبة الله، استشعار معيته ولطفه، والرقابة الذاتية النابعة من القلب. حين يمتلئ الوجدان بالنور، ينعكس ذلك محبة وإحساناً في كل تصرف.',
      icon: Sparkles,
      practicalApplication: 'مشاريع عملية في الصدق، الأمانة، التعاون، وبر الوالدين كعبادات حقيقية ممتعة.',
      parentNoticeableImpact: 'نضج ذاتي في إدارة الوقت والتعامل الإيجابي مع الأجهزة والهواتف عن قناعة شخصية.',
      contrastVsTraditional: 'في أسلوب الإلزام الجاف: مجرد أوامر شكلية. في رَوَايَا: بناء الدافع القلبي والمحبة أولاً.',
    },
    {
      id: 'developmental',
      number: '٠٥',
      title: 'مراعاة المرحلة العمرية واحتياجاتها',
      subtitle: 'لكل سن مفتاحه النفسي واللغوي وأسلوب خطابه الخاص',
      description: 'ابن الـ ٥ سنوات يحتاج الصورة والقصة واللعب (نور البيان)، وابن الـ ٩ سنوات يحتاج البطولة والقدوة والتحفيز، وابن الـ ١٤ سنة يحتاج المنطق والحوار العقلاني وبناء الهوية. لا يُخاطب الجميع بقالب واحد.',
      icon: Users,
      practicalApplication: 'تصميم حقائب تدريبية متخصصة ومقاييس تشخيصية ترصد التطور النمائي لكل فئة عمرية.',
      parentNoticeableImpact: 'تفاعل كامل من الطفل دون ملل أو شعور بأن الكلام أكبر من عقله أو ساذج بالنسبة له.',
      contrastVsTraditional: 'في القالب الواحد: تكرار نفس الدرس لجميع الأعمار. في رَوَايَا: هندسة منهجية دقيقة لكل مرحلة.',
    },
    {
      id: 'integration',
      number: '٠٦',
      title: 'التكامل بين المعرفة والشخصية',
      subtitle: 'العلم الشرعي لا يصنع شخصية منعزلة، بل يصنع قادة فاعلين',
      description: 'غاية رَوَايَا ليست تخريج طفل يعرف أحكاماً شرعية فحسب، بل بناء شخصية متزنة واثقة، قادرة على الإلقاء، الحوار، قيادة فرق العمل، وحل المشكلات، مع اعتزاز كامل بهويته الإسلامية في أي مكان بالعالم.',
      icon: Scale,
      practicalApplication: 'ورش مهارات الإلقاء والتحدث العام، ومناظرات فكرية هادفة بين اليافعين.',
      parentNoticeableImpact: 'جرأة أدبية أمام الزملاء والمعلمين، وقدرة على الدفاع عن ثوابته بثقة دون تردد أو انكسار.',
      contrastVsTraditional: 'في النمط القديم: انطوائية وضعف تواصل. في رَوَايَا: ثقة، قيادة، وأخلاق مشرقة.',
    },
  ];

  const [activeTab, setActiveTab] = useState<string>(principles[0].id);
  const activePrinciple = principles.find((p) => p.id === activeTab) || principles[0];
  const ActiveIcon = activePrinciple.icon;

  return (
    <section id="methodology" className="py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-100 text-cyan-900 text-xs font-bold mb-3 border border-cyan-200">
            <BookOpen className="w-3.5 h-3.5 text-cyan-700" />
            <span>الهندسة التربوية والمعايير الأكاديمية</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight mb-4">
            منهجية «رَوَايَا».. كيف نحوّل العلم إلى سلوك وحصانة؟
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            ستة أركان منهجية محكمة تمنح رَوَايَا ثقلها المؤسسي الفريد، وتضمن لأولياء الأمور نتائج ملموسة في عقل وسلوك أبنائهم.
          </p>
        </div>

        {/* Desktop Interactive Layout & Mobile Stack */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Navigation Column (List of 6 Principles) */}
          <div className="lg:col-span-5 space-y-3">
            {principles.map((item) => {
              const IconComp = item.icon;
              const isSelected = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full text-right p-4 sm:p-5 rounded-2xl border transition-all flex items-center justify-between gap-4 cursor-pointer ${
                    isSelected
                      ? 'bg-white border-cyan-600 shadow-md ring-1 ring-cyan-600 text-cyan-950'
                      : 'bg-white/70 hover:bg-white border-slate-200/90 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-cyan-700 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold text-cyan-700">{item.number}</span>
                        <h4 className="text-sm sm:text-base font-bold text-slate-900 font-display leading-snug">
                          {item.title}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <ArrowLeft className={`w-4 h-4 shrink-0 transition-transform ${
                    isSelected ? 'text-cyan-700 -translate-x-1' : 'text-slate-300'
                  }`} />
                </button>
              );
            })}
          </div>

          {/* Principle Deep Dive Detail Card */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm relative overflow-hidden">
              
              {/* Top Accent Stripe */}
              <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-cyan-600 via-sky-500 to-cyan-700" />

              {/* Title & Badge */}
              <div className="flex items-center justify-between mb-6 pt-2">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-cyan-100 text-cyan-800 border border-cyan-200">
                  الركن {activePrinciple.number} من منهجية رَوَايَا
                </span>
                <div className="w-12 h-12 rounded-2xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-700">
                  <ActiveIcon className="w-6 h-6" />
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display mb-2">
                {activePrinciple.title}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-cyan-800 mb-6">
                {activePrinciple.subtitle}
              </p>

              {/* Core Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-8 font-normal">
                {activePrinciple.description}
              </p>

              {/* Three Real-world Impact Boxes */}
              <div className="space-y-4">
                
                {/* 1. Practical Application */}
                <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200/80 text-right">
                  <div className="flex items-center gap-2 mb-1.5 text-cyan-800">
                    <CheckCircle2 className="w-4 h-4 text-cyan-600" />
                    <h5 className="text-xs font-bold text-slate-900">كيف نطبقها داخل القاعة والورشة؟</h5>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {activePrinciple.practicalApplication}
                  </p>
                </div>

                {/* 2. Noticeable Impact at Home */}
                <div className="bg-emerald-50/70 rounded-2xl p-4 sm:p-5 border border-emerald-200/80 text-right">
                  <div className="flex items-center gap-2 mb-1.5 text-emerald-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <h5 className="text-xs font-bold text-slate-900">ما الذي يلاحظه الأب والأم في البيت؟</h5>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-normal">
                    {activePrinciple.parentNoticeableImpact}
                  </p>
                </div>

                {/* 3. The Decisive Contrast */}
                <div className="bg-amber-50/70 rounded-2xl p-4 sm:p-5 border border-amber-200/80 text-right">
                  <div className="flex items-center gap-2 mb-1.5 text-amber-800">
                    <CheckCircle2 className="w-4 h-4 text-amber-600" />
                    <h5 className="text-xs font-bold text-slate-900">الفارق الجوهري مع التعليم التقليدي:</h5>
                  </div>
                  <p className="text-xs text-amber-900 leading-relaxed font-normal">
                    {activePrinciple.contrastVsTraditional}
                  </p>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
