import React from 'react';
import { ArrowLeft, Sparkles, BookOpen, ShieldCheck } from 'lucide-react';
import { RawayaLogo } from './RawayaLogo';

interface HeroProps {
  onOpenEnrollment: () => void;
  onExplorePrograms: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenEnrollment, onExplorePrograms }) => {
  return (
    <section id="hero" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-gradient-to-b from-[#fbf9f4] via-[#f7f5ed] to-white">
      {/* Subtle Islamic geometric arabesque background pattern */}
      <div 
        className="absolute inset-0 islamic-pattern-overlay pointer-events-none"
        aria-hidden="true"
      />
      {/* Ambient warm gold and emerald soft glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-200/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 left-10 w-80 h-80 bg-emerald-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Main Editorial Text Column */}
          <div className="lg:col-span-7 flex flex-col text-right">
            {/* Clean unboxed kicker metadata */}
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-800 mb-4 tracking-wide">
              <span>مشروع رَوَايَا التربوي</span>
              <span aria-hidden="true">·</span>
              <span>رسالة ودراية</span>
              <span aria-hidden="true">·</span>
              <span>المنصورة وعبر الإنترنت</span>
            </div>

            {/* Headline with balanced wrapping */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-[1.3] tracking-tight mb-6 font-display max-w-2xl">
              نبني في طفلك عقلاً يفهم…{' '}
              <span className="text-cyan-700 underline decoration-cyan-400/40 decoration-4 underline-offset-8">
                وقلباً يعتز بقيمه وهويته.
              </span>
            </h1>

            {/* Core Educational Purpose */}
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-6 max-w-2xl font-normal">
              مشروع «رَوَايَا» يقدّم تجربة تعليمية مبهجة تجمع بين إتقان القرآن الكريم وفهم معانيه العميقة، ليتحول العلم إلى سلوك يومي، حوار ذكي، وثقة راسخة تنير شخصية طفلك في كل خطوة.
            </p>

            {/* Rawaya Educational Philosophy */}
            <div className="bg-slate-900 text-white rounded-xl p-5 mb-8 border-r-4 border-cyan-500 shadow-md max-w-2xl">
              <p className="text-sm sm:text-base font-semibold text-cyan-300 mb-1">
                فلسفة رَوَايَا التربوية:
              </p>
              <p className="text-base sm:text-lg font-medium text-slate-100 font-display leading-snug">
                «حين يفهم الطفل ما يتلوه، ينبض قلبه باليقين.. ويعبر عن دينه باعتزاز واقتناع.»
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-8">
              <button
                onClick={onOpenEnrollment}
                className="px-6 py-3.5 text-sm font-bold text-white bg-cyan-700 hover:bg-cyan-800 rounded-lg shadow-xs hover:shadow-sm transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>سجّل لطفلك في رَوَايَا</span>
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              </button>

              <button
                onClick={onExplorePrograms}
                className="px-6 py-3.5 text-sm font-semibold text-slate-800 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-cyan-700" />
                <span>استكشف محاور المنهج والورش</span>
              </button>
            </div>

            {/* Clean unboxed proof markers */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200/80 max-w-2xl">
              <div>
                <p className="text-lg sm:text-xl font-bold text-slate-900 font-display tabular-nums">+١٣ عاماً</p>
                <p className="text-xs text-slate-600 mt-0.5">خبرة بالتربية الشرعية</p>
              </div>
              <div>
                <p className="text-lg sm:text-xl font-bold text-slate-900 font-display">مجازة بالسند</p>
                <p className="text-xs text-slate-600 mt-0.5">قراءة عاصم (حفص وشعبة)</p>
              </div>
              <div>
                <p className="text-lg sm:text-xl font-bold text-slate-900 font-display">منهج تفاعلي</p>
                <p className="text-xs text-slate-600 mt-0.5">تدبر وبناء شخصية</p>
              </div>
            </div>
          </div>

          {/* Marquee Image & Visual Anchor */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-slate-100 group">
              <img
                src="/src/assets/images/hero_rawaya_learning_1790367225382.jpg"
                alt="ورشة تفاعلية لأطفال رَوَايَا في المنصورة يتعلمون تدبر القرآن وبناء الشخصية"
                className="w-full h-[360px] sm:h-[440px] object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              {/* Subtle dark gradient scrim for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

              {/* Bottom image overlay narrative */}
              <div className="absolute bottom-0 inset-x-0 p-5 text-white">
                <div className="flex items-center gap-2 text-xs font-medium text-cyan-300 mb-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>ورشة حية من بيئة رَوَايَا</span>
                </div>
                <p className="text-sm font-semibold text-slate-100 leading-snug">
                  «القرآن ما يبقاش مجرد واجب مدرسي… يبقى ملجأ وسند وسكينة»
                </p>
                <div className="flex items-center gap-3 text-xs text-slate-300 mt-2">
                  <span>المنصورة</span>
                  <span aria-hidden="true">·</span>
                  <span>أنشطة تفاعلية ومجموعات نقاش</span>
                </div>
              </div>
            </div>

            {/* Floating Official Brand Badge */}
            <div className="absolute -top-4 -left-3 sm:left-4 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 shadow-lg border border-slate-200 hidden sm:flex items-center">
              <RawayaLogo size="sm" showTagline={false} />
            </div>

            {/* Subtle decorative offset card */}
            <div className="absolute -bottom-4 -right-4 bg-white rounded-xl p-3.5 shadow-lg border border-slate-200/90 hidden sm:flex items-center gap-3 max-w-xs">
              <div className="w-10 h-10 rounded-lg bg-cyan-50 flex items-center justify-center text-cyan-700 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-slate-900">حصانة فكرية وعقدية</p>
                <p className="text-[11px] text-slate-600">حماية الفطرة قبل أن تتشوه</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
