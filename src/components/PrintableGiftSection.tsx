import React, { useState } from 'react';
import { Gift, Printer, Download, Sparkles, CheckCircle2, Heart, Star, Eye } from 'lucide-react';
import { PrintableGiftModal } from './PrintableGiftModal';

export const PrintableGiftSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="py-20 bg-gradient-to-b from-amber-50/60 via-emerald-50/30 to-white relative overflow-hidden border-b border-amber-200/50" dir="rtl">
      
      {/* Delicate Arabesque geometric pattern overlay */}
      <div className="absolute inset-0 islamic-pattern-overlay pointer-events-none" />

      {/* Decorative ambient glowing orbs */}
      <div className="absolute -top-24 right-1/4 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 left-1/4 w-96 h-96 bg-emerald-200/25 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Card with Warm Ivory & Emerald Borders */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl border-2 border-amber-300/60 shadow-xl overflow-hidden p-6 sm:p-10 lg:p-12 relative">
          
          {/* Subtle Arabesque Corner Badges */}
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            
            {/* Right Column: Copy & Details */}
            <div className="flex-1 text-right space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-100 to-amber-200 text-amber-950 text-xs font-bold border border-amber-300 shadow-2xs">
                <Gift className="w-3.5 h-3.5 text-amber-700" />
                <span>هدية مجانية لكل أم وأب من مشروع «رَوَايَا»</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display leading-tight">
                مُفكِّرَة رَوَايَا الأسبوعية:  
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 via-teal-700 to-amber-700 mt-1">
                  «شجرة صلاتي ونور قلبي بالقرآن»
                </span>
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed max-w-xl">
                أوراق عمل مصممة بعناية فائقة من إعداد <strong>أ. نرمين الحسيني</strong>، تجمع بين تحبيب الطفل في الصلاة بألوان محببة، وتدبر سورة من جزء عم، مع شجرة بر الوالدين، لتطبعها الأم وتعلقها في غرفة طفلها مباشرة.
              </p>

              {/* Feature Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>تلوين نجوم الصلوات الخمس بحب</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>سؤال تدبر أسبوعي لسور جزء عم</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>أعمال بر وإحسان عملية في البيت</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>جاهزة للطباعة المنزلية بمقاس A4</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-6 py-3.5 bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-800 hover:to-teal-900 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-lg shadow-emerald-900/15 hover:shadow-xl transition-all flex items-center gap-2.5 cursor-pointer transform hover:-translate-y-0.5"
                >
                  <Eye className="w-4 h-4 text-amber-300" />
                  <span>معاينة وتخصيص الورقة باسم طفلك</span>
                </button>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-5 py-3.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs sm:text-sm rounded-2xl transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-amber-700" />
                  <span>طباعة فورية (A4)</span>
                </button>
              </div>
            </div>

            {/* Left Column: Visual Mockup of the Printable Sheet */}
            <div className="w-full lg:w-96 shrink-0 flex justify-center">
              <div
                onClick={() => setIsModalOpen(true)}
                className="group relative cursor-pointer transform transition-all duration-300 hover:scale-105 hover:rotate-1"
              >
                {/* Stacked Paper Effect underneath */}
                <div className="absolute inset-0 bg-amber-200/80 rounded-2xl transform rotate-3 translate-y-2 scale-98 shadow-sm"></div>
                <div className="absolute inset-0 bg-emerald-200/70 rounded-2xl transform -rotate-2 -translate-y-1 scale-98 shadow-sm"></div>

                {/* Main Front Paper Mockup */}
                <div className="relative bg-white rounded-2xl p-5 border-2 border-amber-300 shadow-2xl w-72 sm:w-80 text-right space-y-3">
                  <div className="flex items-center justify-between border-b border-amber-200 pb-2">
                    <div>
                      <span className="text-[10px] text-amber-700 font-bold block">مشروع رَوَايَا التربوي</span>
                      <h5 className="text-xs font-bold text-slate-900 font-display">مفكرة شجرة صلاتي ونور قلبي</h5>
                    </div>
                    <span className="text-lg">🌿</span>
                  </div>

                  <div className="bg-amber-50/80 p-2 rounded-lg text-[10px] text-slate-700 flex justify-between">
                    <span>بطل رَوَايَا: <strong>عُمَر</strong></span>
                    <span className="text-emerald-700 font-bold">جزء عم</span>
                  </div>

                  {/* Prayer Stars Mock */}
                  <div className="space-y-1.5 py-1">
                    <span className="text-[9px] text-slate-500 font-bold block">متابعة الصلوات الخمس:</span>
                    <div className="flex justify-between text-xs bg-slate-50 p-2 rounded-lg border border-slate-100">
                      <span>🌅 ⭐</span>
                      <span>☀️ ⭐</span>
                      <span>🌤️ ⭐</span>
                      <span>🌇 ⭐</span>
                      <span>🌙 ⭐</span>
                    </div>
                  </div>

                  {/* Interactive Ribbon on Hover */}
                  <div className="pt-1">
                    <div className="w-full py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-center text-xs rounded-xl shadow-xs group-hover:bg-amber-400 transition-colors flex items-center justify-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>انقر لمعاينة وطباعة الورقة كاملة</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Modal View for Customization & Printing */}
      <PrintableGiftModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

    </section>
  );
};
