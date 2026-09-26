import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, Heart, Shield, Lightbulb, Compass, Sparkles } from 'lucide-react';
import { RawayaLogo } from './RawayaLogo';

export const PhilosophyComparison: React.FC = () => {
  const [activeView, setActiveView] = useState<'both' | 'traditional' | 'rawaya'>('both');

  const comparisons = [
    {
      title: 'علاقة الطفل بالقرآن',
      traditional: 'واجب مدرسي ثقيل وتكليف للتسميع، ينتهي بمجرد الخروج من الحلقة.',
      rawaya: 'ملجأ روحي وسند نفسي؛ يشعر أن الله يكلمه هو شخصياً في يومه وتحدياته.',
    },
    {
      title: 'مواجهة الشبهات والمحتوى الغريب',
      traditional: 'ارتباك أو صمت؛ لأن الحفظ بلا فهم لا يمنحه حججاً عقلية ولا ردوداً واعية.',
      rawaya: 'مناعة فكرية وحوار شجاع؛ يعرف أصل دينه وفطرته فيميز الخطأ ويرفضه فوراً.',
    },
    {
      title: 'أداء العبادات (مثل الصلاة)',
      traditional: 'حركات روتينية سريعة لتجنب لوم الأهل أو العقاب.',
      rawaya: 'حب وخشوع واستشعار لقيمة الوقوف بين يدي الله، بمشاركة واعية مع الوالدين.',
    },
    {
      title: 'ثبات الحفظ واستمراريته',
      traditional: 'نصوص تُحفظ في الذاكرة قصيرة المدى وتتلاشى بمجرد انقطاع التسميع.',
      rawaya: 'الفهم يثبت الحفظ في الوجدان مدى الحياة لأنه ارتبط بمشاعر ومواقف حية.',
    },
  ];

  return (
    <section id="philosophy" className="py-20 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <p className="text-xs font-bold text-cyan-800 tracking-wider uppercase mb-2">
            فلسفة رَوَايَا التربوية
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 font-display mb-4">
            الحماية لا تأتي بالحفظ وحده… بل بالوعي والفهم
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            إحنا كأهل بنخاف، ونفتكر إن تحفيظ القرآن لوحده كفيل بحماية أولادنا. لكن لو طفلك لم يشعر أن الآية تخاطبه، لن تكون له سنداً حين تعصف به الشبهات.
          </p>
        </div>

        {/* The Hadith Quote Card */}
        <div className="max-w-3xl mx-auto mb-14 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl p-6 sm:p-8 text-center shadow-lg relative overflow-hidden border border-slate-700">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="relative">
            <span className="text-cyan-400 text-xs font-semibold tracking-wider block mb-2">
              أمانة التربية والمسؤولية أمام الله
            </span>
            <blockquote className="font-quran text-xl sm:text-2xl lg:text-3xl text-slate-100 leading-relaxed mb-4">
              «إِنَّ اللَّهَ سَائِلٌ كُلَّ رَاعٍ عَمَّا اسْتَرْعَاهُ، أَحَفِظَ أَمْ ضَيَّعَ؟»
            </blockquote>
            <p className="text-xs text-slate-400">
              رواه النسائي وصححه الألباني · مسؤوليتك أن تبحث له عن بيئة يفهم فيها دينه، قبل أن يحتاج من يرجعه
            </p>
          </div>
        </div>

        {/* View Switcher Tabs (Buttons with click handlers, strictly per design skill) */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 bg-slate-100 rounded-lg border border-slate-200">
            <button
              onClick={() => setActiveView('both')}
              className={`px-4 py-2 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                activeView === 'both'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              مقارنة شاملة
            </button>
            <button
              onClick={() => setActiveView('rawaya')}
              className={`px-4 py-2 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                activeView === 'rawaya'
                  ? 'bg-white text-cyan-800 font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              طريقة رَوَايَا
            </button>
            <button
              onClick={() => setActiveView('traditional')}
              className={`px-4 py-2 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                activeView === 'traditional'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              التحفيظ التقليدي
            </button>
          </div>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {/* Traditional Column */}
          {(activeView === 'both' || activeView === 'traditional') && (
            <div
              className={`rounded-2xl border border-slate-200 bg-slate-50/70 p-6 sm:p-8 flex flex-col transition-all ${
                activeView === 'traditional' ? 'md:col-span-2 max-w-2xl mx-auto' : ''
              }`}
            >
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 font-display">
                    التحفيظ الآلي المجرّد
                  </h3>
                  <p className="text-xs text-slate-500">حفظ بدون فهم لمعاني الآيات وتدبرها</p>
                </div>
              </div>

              <div className="space-y-5">
                {comparisons.map((item, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-4 border border-slate-200/80">
                    <p className="text-xs font-semibold text-slate-500 mb-1">{item.title}</p>
                    <p className="text-sm text-slate-700 leading-relaxed">{item.traditional}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 text-center">
                <p className="text-xs text-amber-800 font-medium">
                  النتيجة: قد يحفظ الطفل أجزاءً، لكنه يبقى عُرضة للتشتت عند مواجهة أي فكرة غريبة.
                </p>
              </div>
            </div>
          )}

          {/* Rawaya Column */}
          {(activeView === 'both' || activeView === 'rawaya') && (
            <div
              className={`rounded-2xl border-2 border-cyan-600/40 bg-cyan-50/40 p-6 sm:p-8 flex flex-col transition-all shadow-sm ${
                activeView === 'rawaya' ? 'md:col-span-2 max-w-2xl mx-auto' : ''
              }`}
            >
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-cyan-200/80">
                <div className="w-10 h-10 rounded-xl bg-cyan-700 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 font-display">
                    منهج رَوَايَا التربوي
                  </h3>
                  <p className="text-xs text-cyan-800 font-medium">الفهم أولاً، فيتبعه الحب، ثم يثبت الحفظ والوعي</p>
                </div>
              </div>

              <div className="space-y-5">
                {comparisons.map((item, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-4 border border-cyan-100 shadow-xs">
                    <p className="text-xs font-semibold text-cyan-800 mb-1">{item.title}</p>
                    <p className="text-sm text-slate-800 leading-relaxed font-medium">{item.rawaya}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-cyan-200/80 text-center">
                <p className="text-xs text-cyan-900 font-bold">
                  النتيجة: طفل يملك هوية معتزة، يفهم دينه ويعيش به، والقرآن في قلبه ملجأ وسند دائم.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Official Brand Identity Spotlight */}
        <div className="mt-16 bg-slate-50 border border-slate-200/90 rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1 text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 text-cyan-800 text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
              <span>هوية وشعار رَوَايَا</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display mb-3">
              ماذا يعني شعار «رَوَايَا»؟
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              صُمم الشعار بالخط الكوفي الهندسي المعاصر محاكياً أحرف كلمة <strong>«روايا»</strong>، مع حركات الفتحة المتصاعدة للدلالة على السمو والارتقاء، ويرتكز على خط الأفق السماوي ليمثل رسوخ الهوية.
            </p>
            <div className="space-y-2 text-xs text-slate-700">
              <p>
                <strong className="text-cyan-800">الرواية:</strong> السند المتصل وضبط الحفظ والأمانة العلمية المتوارثة كابراً عن كابر.
              </p>
              <p>
                <strong className="text-cyan-800">الدراية:</strong> الفهم العميق، والوعي المقاصدي، والتدبر العملي الذي يحمي عقل الطفل في حياته اليومية.
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center justify-center">
            <RawayaLogo variant="badge" className="border border-slate-200 shadow-md" />
          </div>
        </div>
      </div>
    </section>
  );
};
