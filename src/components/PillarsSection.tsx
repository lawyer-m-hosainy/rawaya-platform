import React from 'react';
import { BookOpen, Shield, Sparkles, HeartHandshake, Award } from 'lucide-react';

export const PillarsSection: React.FC = () => {
  return (
    <section id="pillars" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <p className="text-xs font-bold text-cyan-800 tracking-wider uppercase mb-2">
            محاور رَوَايَا التربوية
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 font-display mb-4">
            خمس ركائز لبناء شخصية مسلمة واعية ومعتزة
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            لا نكتفي بملء ذاكرة الطفل بالمعلومات، بل نبني منظومة متكاملة من القيم والمهارات التي تحميه في عالمه المعاصر.
          </p>
        </div>

        {/* Asymmetric Bento Grid (Landing Design Reference compliant) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: التدبر القرآني (Col Span 7) */}
          <div className="md:col-span-7 bg-white rounded-2xl p-7 border border-slate-200/90 shadow-xs flex flex-col justify-between hover:border-cyan-400 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-cyan-700 tracking-wider">01. المحور القرآني الأعمق</span>
                <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-700 flex items-center justify-center">
                  <BookOpen className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-display mb-3">
                التدبر الحي: «الآية بتكلمني أنا»
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                ننتقل بالطفل من مجرد ترديد الحروف إلى تدبر المعنى واستشعار مخاطبة القرآن لواقعه اليومي: في خوفه، في غضبه، في مذاكرته، ومع أصدقائه. حينها يصبح القرآن بوصلة لاتخاذ القرارات.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center gap-3 text-xs text-slate-500">
              <span>أسئلة حوارية مفتوحة</span>
              <span aria-hidden="true">·</span>
              <span>ربط بالواقع المعاش</span>
              <span aria-hidden="true">·</span>
              <span>تأملات أسبوعية</span>
            </div>
          </div>

          {/* Card 2: العقيدة والفطرة (Col Span 5) */}
          <div className="md:col-span-5 bg-white rounded-2xl p-7 border border-slate-200/90 shadow-xs flex flex-col justify-between hover:border-cyan-400 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-cyan-700 tracking-wider">02. تحصين الفطرة</span>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <Shield className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-display mb-3">
                العقيدة الصافية وحماية الفطرة
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                ترسيخ معرفة الله وأسمائه وصفاته بلغة بسيطة محببة، وتثبيت أركان الإيمان ليصبح لدى الطفل درع واقٍ ضد الترندات والأفكار المشوشة المنتشرة في ألعاب الفيديو والكرتون.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center gap-3 text-xs text-slate-500">
              <span>أفهم ديني بحب</span>
              <span aria-hidden="true">·</span>
              <span>إجابة تساؤلات الطفولة</span>
            </div>
          </div>

          {/* Card 3: بناء الشخصية والثقة (Col Span 4) */}
          <div className="md:col-span-4 bg-white rounded-2xl p-7 border border-slate-200/90 shadow-xs flex flex-col justify-between hover:border-cyan-400 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-cyan-700 tracking-wider">03. بناء الذات</span>
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-display mb-3">
                الثقة بالنفس والتعبير الجريء
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                من خلال ورش سلسلة «لِتَعَارَفُوا»، يتعلم الطفل كيف يتكلم بجرأة وثقة، ويعبر عن مشاعره، ويقف في وجه التنمر وضغوط الأقران دون أن يساوم على مبادئه.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 text-xs text-slate-500">
              <span>«لما يفهم هيتكلم… ولن يسمع لغيرك»</span>
            </div>
          </div>

          {/* Card 4: التجويد ونور البيان (Col Span 4) */}
          <div className="md:col-span-4 bg-white rounded-2xl p-7 border border-slate-200/90 shadow-xs flex flex-col justify-between hover:border-cyan-400 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-cyan-700 tracking-wider">04. الإتقان الأزهري</span>
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-display mb-3">
                التجويد والإتقان بالسند المتصل
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                تأسيس سليم لنطق الحروف ومخارجها وأحكام التجويد على يد معلمة مجازة بقراءة الإمام عاصم بروايتي شُعبة وحفص من طريق الشاطبية، ليتلو الطفل القرآن عذباً فصيحاً كما أُنزل على النبي ﷺ.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 text-xs text-slate-500">
              <span>إجازة بروايتي شُعبة وحفص من طريق الشاطبية</span>
            </div>
          </div>

          {/* Card 5: الصلاة والرباط الأسري (Col Span 4) */}
          <div className="md:col-span-4 bg-white rounded-2xl p-7 border border-slate-200/90 shadow-xs flex flex-col justify-between hover:border-cyan-400 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-cyan-700 tracking-wider">05. العبادة والقدوة</span>
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                  <HeartHandshake className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-display mb-3">
                الصلاة رِباط ومحبة أسرية
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                ورش عملية مشتركة بين الآباء والأبناء تصحح الركوع والسجود، وتغرس حب الصلاة جماعة بالقدوة الحية والذكريات المشتركة التي تدوم طوال العمر.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 text-xs text-slate-500">
              <span>قدوة عملية مع الآباء والأمهات</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
