import React, { useState } from 'react';
import { REFLECTION_THEMES, ReflectionTheme } from '../data/rawayaData';
import { BookOpen, Sparkles, MessageCircle, ArrowLeft, Heart, CheckCircle2 } from 'lucide-react';

export const TadabburExplorer: React.FC = () => {
  const [selectedThemeId, setSelectedThemeId] = useState<string>(REFLECTION_THEMES[0].id);

  const currentTheme =
    REFLECTION_THEMES.find((t) => t.id === selectedThemeId) || REFLECTION_THEMES[0];

  return (
    <section id="tadabbur" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-xs font-bold text-cyan-800 tracking-wider uppercase mb-2">
            تجربة تفاعلية حية
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 font-display mb-4">
            مختبر التدبر: كيف نُحوّل الآية إلى سلوك ودرع حماية؟
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            جرّب نموذجاً مما يعيشه الأطفال في ورش «رَوَايَا». اختر موقفاً يواجهه طفلك في حياته لترى كيف نخاطب عقله وقلبه بالقرآن.
          </p>
        </div>

        {/* Interactive Segmented Control Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {REFLECTION_THEMES.map((theme) => {
            const isSelected = theme.id === selectedThemeId;
            return (
              <button
                key={theme.id}
                onClick={() => setSelectedThemeId(theme.id)}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {theme.title}
              </button>
            );
          })}
        </div>

        {/* Interactive Demonstration Sandbox Container */}
        <div className="max-w-5xl mx-auto bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs">
          {/* Top Ayah Card with Amiri Calligraphy */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs mb-8 text-center relative overflow-hidden">
            <div className="flex items-center justify-center gap-2 text-xs font-bold text-cyan-700 mb-4">
              <BookOpen className="w-4 h-4" />
              <span>الآية الكريمة ومحل التدبر</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-500">{currentTheme.surah}</span>
            </div>

            <p className="font-quran text-2xl sm:text-3xl lg:text-4xl text-slate-900 leading-[1.8] mb-3">
              «{currentTheme.ayah}»
            </p>
            <p className="text-xs text-slate-500 font-medium">
              سورة {currentTheme.surah}
            </p>
          </div>

          {/* 3 Step Transformation Pipeline */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1: التحدي المعاصر */}
            <div className="bg-white rounded-xl p-5 border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-700 text-xs font-bold flex items-center justify-center">
                    ١
                  </span>
                  <h4 className="text-sm font-bold text-slate-900">
                    التحدي الواقعي للطفل
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {currentTheme.modernChallenge}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-rose-600 font-medium">
                المشكلة: ارتباك أو ضغط خارجي
              </div>
            </div>

            {/* Step 2: أسلوب رَوَايَا في الفهم */}
            <div className="bg-cyan-50/70 rounded-xl p-5 border border-cyan-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-6 rounded-full bg-cyan-700 text-white text-xs font-bold flex items-center justify-center">
                    ٢
                  </span>
                  <h4 className="text-sm font-bold text-cyan-950">
                    كيف تحاور «رَوَايَا» عقل الطفل؟
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                  {currentTheme.howRawayaTeaches}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-cyan-200/60 text-[11px] text-cyan-800 font-semibold">
                الحل: بناء قناعة داخلية واعية
              </div>
            </div>

            {/* Step 3: التطبيق اليومي */}
            <div className="bg-white rounded-xl p-5 border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center">
                    ٣
                  </span>
                  <h4 className="text-sm font-bold text-slate-900">
                    التطبيق العملي في يومه
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {currentTheme.actionStep}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>النتيجة: القرآن منهج حياة وسند</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
