import React from 'react';
import { Target, Compass, Eye, Heart, Shield, Sparkles, BookOpen, UserCheck, Smile } from 'lucide-react';
import { RawayaLogo } from './RawayaLogo';

export const AboutRawaya: React.FC = () => {
  const pillarsOfChildGrowth = [
    {
      title: 'العقل والتفكير الواعي',
      desc: 'تعليم الطفل كيف يتدبر ويسأل ويفهم مقاصد كلام الله، فلا يكون مجرد ركيزة حفظ آلية.',
      icon: Sparkles,
      color: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    },
    {
      title: 'الإيمان والوجدان الحي',
      desc: 'حب الله ومعرفة صفاته ورحمته قبل الخوف، ليكون الدين سكينة ولذة وملاذاً آمناً.',
      icon: Heart,
      color: 'bg-rose-50 text-rose-700 border-rose-200',
    },
    {
      title: 'السلوك والاعتزاز بالهوية',
      desc: 'بناء طفل يعتز بقيمه وأخلاقه، يمتلك وعياً ناضجاً وثقة ذاتية تساعده على حسن الاختيار والتمييز.',
      icon: Shield,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      title: 'المهارة والتعبير والتواصل',
      desc: 'تمكين الطفل من التعبير عن أفكاره ومناقشة أسئلته بأمان وثقة، دون قمع أو توبيخ.',
      icon: UserCheck,
      color: 'bg-amber-50 text-amber-700 border-amber-200',
    },
  ];

  const coreValues = [
    { name: 'الأصالة الشرعية', desc: 'استناد المعرفة إلى الكتاب والسنة بفهم وسطي رصين من نبع الأزهر الشريف.' },
    { name: 'الفهم قبل الحفظ', desc: 'إدراك أن الحفظ أمانة والدراية غاية، وأن العلم الذي لا يُفهم يتبخر سريعاً.' },
    { name: 'الأمان النفسي', desc: 'حلقة نقاش بلا أحكام مسبقة، حيث التساؤل فضيلة والتفكير طريق الإيمان الراسخ.' },
    { name: 'الرفق والتدرج', desc: 'مراعاة الفروق الفردية وسيكولوجية كل مرحلة عمرية بحب وتشجيع دائم.' },
    { name: 'الربط بالواقع', desc: 'تحويل كل آية إلى خطة عمل وسلوك يومي يلمسه الأبوان في البيت والمدرسة.' },
    { name: 'الأثر المستدام', desc: 'زرع شجرة قيم تثمر مدى الحياة، ليبقى الابن ثابتاً حتى لو عصفت به المشتتات.' },
  ];

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-white via-[#faf8f5] to-white border-b border-slate-200 relative overflow-hidden">
      {/* Subtle Islamic arabesque texture */}
      <div className="absolute inset-0 islamic-pattern-overlay pointer-events-none opacity-60" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Lead Tag */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-100/80 text-cyan-900 text-xs font-bold mb-3 border border-cyan-200/60">
            <Compass className="w-3.5 h-3.5 text-cyan-700" />
            <span>عن الكيان · الهوية والرؤية</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight mb-5">
            مشروع «رَوَايَا».. رؤية متجددة لبناء شخصية طفلك وفهمه للقرآن
          </h2>

          <p className="text-base text-slate-600 leading-relaxed font-normal">
            انطلقت «رَوَايَا» من فكرة أساسية: الجمع المتناغم بين 
            <strong> أصالة الرواية بالسند المتصل</strong> و<strong> عمق الدراية والتدبر الحياتي</strong>، لنقدم لأبنائنا تعليماً يغذي العقل بالمعرفة، ويملأ القلب بالمحبة والسكينة.
          </p>
        </div>

        {/* Story & Philosophy Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch mb-20">
          
          {/* Genesis Card */}
          <div className="lg:col-span-7 bg-slate-50 rounded-3xl p-8 sm:p-10 border border-slate-200/90 flex flex-col justify-between text-right">
            <div>
              <span className="text-xs font-bold text-cyan-800 tracking-wider uppercase mb-2 block">
                نشأة رَوَايَا والانطلاقة التربوية
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display mb-4">
                «من قلب الميدان.. شغف حقيقي بتحويل القرآن إلى رحلة حب وفهم»
              </h3>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-5 font-normal">
                على مدار أكثر من عقد في تعليم الأطفال، لاحظت الأستاذة نرمين الحسيني أن أجمل ما يمكن أن نقدمه للطفل ليس مجرد تلقين النصوص والكلمات، بل مساعدته على استشعار جمالها، والعيش بقيمها، والإجابة عن تساؤلاته الفطرية برفق وتشويق.
              </p>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                من هنا تأسست <strong>رَوَايَا (رسالة ودراية)</strong> في المنصورة لتقدم نموذجاً تفاعلياً مبهجاً: القرآن يُتلى بالإتقان، ويُفهم بالحوار والمحبة، ليتحول إلى منارة تهدي أفكار الطفل وتلهم سلوكه الإيجابي في بيته ومجتمعه.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200/80 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 font-medium">الاسم ودلالته في لسان العرب</p>
                <p className="text-sm font-bold text-cyan-900 mt-0.5 font-display">
                  رَوَايَا: جمع راوية، وهو السقاء الذي يحمل الماء ليروي العطشى، ونقل العلم بأمانة ودراية.
                </p>
              </div>
            </div>
          </div>

          {/* Vision & Mission Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Vision */}
            <div className="bg-gradient-to-br from-cyan-900 to-slate-900 text-white rounded-3xl p-7 flex-1 shadow-md text-right border border-cyan-800/40 relative overflow-hidden">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-cyan-300 mb-4">
                <Eye className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-white font-display mb-2">رؤيتنا (Our Vision)</h4>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                أن تكون «رَوَايَا» المرجعية التربوية الرائدة في العالم العربي لبناء شخصية الطفل المسلم المتوازن، الذي يجمع بين الرسوخ العقدي، والذكاء القيمي، والفاعلية الإيجابية في مجتمعه.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-slate-900 text-white rounded-3xl p-7 flex-1 shadow-md text-right border border-slate-800 relative overflow-hidden">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-emerald-300 mb-4">
                <Target className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-white font-display mb-2">رسالتنا (Our Mission)</h4>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                إحياء العلاقة الحية بين الناشئة والقرآن من خلال بيئات تفاعلية مبهجة ومناهج قائمة على الفهم والتدبر، تمكّن الطفل من التفكير الحر الواعي، وتحمي فطرته من المؤثرات السلبية.
              </p>
            </div>
          </div>

        </div>

        {/* What Rawaya Builds in the Child */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display mb-3">
              ما الذي تسعى «رَوَايَا» إلى بنائه في طفلك؟
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              أربعة أبعاد تكاملية تبني شخصية إيمانية سوية ومستقرة نفسياً وفكرياً
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillarsOfChildGrowth.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div 
                  key={idx}
                  className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md transition-all text-right flex flex-col justify-between"
                >
                  <div>
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 border ${item.color}`}>
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h4 className="text-base font-bold text-slate-900 font-display mb-2.5">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Core Institutional Values */}
        <div className="bg-slate-50/80 rounded-3xl p-8 sm:p-12 border border-slate-200/80">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display mb-2">
              قيم ومبادئ رَوَايَا الحاكمة
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              الميثاق التربوي والأخلاقي الذي يحكم كل حلقة وورشة ومحتوى نقدّمه
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((v, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 border border-slate-200/70 text-right">
                <div className="flex items-center gap-2 mb-2 text-cyan-800">
                  <span className="w-2 h-2 rounded-full bg-cyan-600" />
                  <h4 className="text-sm font-bold text-slate-900 font-display">{v.name}</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
