import React, { useState, useRef } from 'react';
import { X, Printer, Download, Sparkles, Heart, Star, CheckCircle, Gift } from 'lucide-react';
import { RawayaLogo } from './RawayaLogo';

interface PrintableGiftModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrintableGiftModal: React.FC<PrintableGiftModalProps> = ({ isOpen, onClose }) => {
  const [childName, setChildName] = useState('');
  const [selectedSurah, setSelectedSurah] = useState('سورة الفلق');
  const [weekGoal, setWeekGoal] = useState('المحافظة على صلاة العصر في وقتها وبر الوالدين');

  if (!isOpen) return null;

  const handlePrint = () => {
    const printContent = document.getElementById('printable-rawaya-sheet');
    if (!printContent) return;
    
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '1px';
    iframe.style.height = '1px';
    iframe.style.opacity = '0';
    iframe.style.pointerEvents = 'none';
    document.body.appendChild(iframe);

    const iframeDoc = iframe.contentWindow?.document;
    if (!iframeDoc) {
      document.body.removeChild(iframe);
      return;
    }

    // Get all stylesheets from the main document to ensure Tailwind is loaded
    const styles = Array.from(document.head.querySelectorAll('style, link[rel="stylesheet"]'))
      .map(node => node.outerHTML)
      .join('\n');
    
    iframeDoc.write(`
      <html dir="rtl" lang="ar">
        <head>
          <title>طباعة مفكرة رَوَايَا</title>
          ${styles}
          <style>
            body { background: white !important; padding: 0; margin: 0; display: flex; justify-content: center; }
            #printable-rawaya-sheet { border: none !important; box-shadow: none !important; width: 100%; max-width: 210mm; min-height: 297mm; }
            .no-print { display: none !important; }
            @page { size: A4; margin: 0; }
          </style>
        </head>
        <body>
          ${printContent.outerHTML}
          <script>
            // Wait a moment for styles/fonts to load before opening print dialog
            setTimeout(() => {
              window.focus();
              window.print();
            }, 800);
          </script>
        </body>
      </html>
    `);
    iframeDoc.close();

    // Clean up the iframe after the print dialog is likely closed
    setTimeout(() => {
      if (document.body.contains(iframe)) {
        document.body.removeChild(iframe);
      }
    }, 5000);
  };

  const daysOfWeek = ['السبت', 'الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'];
  const prayers = [
    { name: 'الفجر', icon: '🌅' },
    { name: 'الظهر', icon: '☀️' },
    { name: 'العصر', icon: '🌤️' },
    { name: 'المغرب', icon: '🌇' },
    { name: 'العشاء', icon: '🌙' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4" dir="rtl">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-amber-200 overflow-hidden flex flex-col max-h-[95vh]">
        
        {/* Modal Controls Header (Hidden in Print) */}
        <div className="no-print bg-gradient-to-r from-emerald-950 via-slate-900 to-amber-950 text-white p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 border-b border-amber-500/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold font-display text-amber-200 flex items-center gap-2">
                <span>هدية رَوَايَا المجانية للأسرة</span>
                <span className="text-[10px] bg-amber-500/30 text-amber-300 px-2 py-0.5 rounded-full border border-amber-400/30 font-sans">جاهزة للطباعة والتلوين</span>
              </h3>
              <p className="text-xs text-slate-300">
                مفكرة أسبوعية لمتابعة صلاة الطفل بالحب + تدبر سورة من جزء عم (A4)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>طباعة الورقة (Print / PDF)</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Customization Toolbar (Hidden in Print) */}
        <div className="no-print p-3 sm:p-4 bg-amber-50/70 border-b border-amber-200/60 flex flex-wrap items-center gap-3 text-xs">
          <span className="font-bold text-amber-900">تخصيص المفكرة قبل الطباعة:</span>
          
          <div className="flex items-center gap-1.5 flex-1 min-w-[200px]">
            <label className="text-slate-600 shrink-0">اسم الطفل:</label>
            <input
              type="text"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              placeholder="مثال: عمر / مريم"
              className="w-full max-w-xs px-3 py-1.5 bg-white border border-amber-300 rounded-lg text-xs text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div className="flex items-center gap-1.5">
            <label className="text-slate-600 shrink-0">سورة الأسبوع:</label>
            <input
              type="text"
              value={selectedSurah}
              onChange={(e) => setSelectedSurah(e.target.value)}
              placeholder="سورة الفلق"
              className="w-32 px-3 py-1.5 bg-white border border-amber-300 rounded-lg text-xs text-slate-900 focus:outline-hidden"
            />
          </div>
        </div>

        {/* The Printable A4 Sheet Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-100 flex justify-center">
          
          <div
            id="printable-rawaya-sheet"
            className="w-full max-w-2xl bg-white rounded-2xl shadow-lg border-2 border-amber-500/40 p-6 sm:p-8 text-right font-sans relative overflow-hidden"
            style={{ minHeight: '850px' }}
          >
            {/* Islamic decorative corner frames */}
            <div className="absolute top-0 right-0 w-24 h-24 border-t-4 border-r-4 border-amber-500/50 rounded-tr-2xl pointer-events-none" />
            <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-amber-500/50 rounded-tl-2xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-amber-500/50 rounded-br-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-24 h-24 border-b-4 border-l-4 border-amber-500/50 rounded-bl-2xl pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between border-b-2 border-amber-200 pb-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center p-2 shadow-xs">
                  <RawayaLogo variant="emblem-only" size="sm" inverted />
                </div>
                <div>
                  <h1 className="text-xl font-bold font-display text-slate-900">
                    مُفكِّرَة رَوَايَا الأسريّة
                  </h1>
                  <p className="text-[11px] text-amber-800 font-semibold font-quran">
                    «شجرة صلاتي ونور قلبي بالقرآن»
                  </p>
                </div>
              </div>

              <div className="text-left font-quran text-xs text-slate-600 max-w-[200px] leading-relaxed hidden sm:block">
                «وَأْمُرْ أَهْلَكَ بِالصَّلَاةِ وَاصْطَبِرْ عَلَيْهَا»
                <span className="block text-[10px] text-amber-700">[طه: 132]</span>
              </div>
            </div>

            {/* Child Profile Row */}
            <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-3 mb-5 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-800">بطل / بطلة رَوَايَا:</span>
                <span className="font-bold text-emerald-800 text-sm border-b-2 border-dotted border-emerald-600 px-2 py-0.5 min-w-[120px] inline-block text-center">
                  {childName.trim() || '........................'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-800">الأسبوع:</span>
                <span className="text-slate-600 border-b border-dotted border-slate-400 px-2 min-w-[80px] inline-block text-center">
                  الأول / ........
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-800">المُربّية:</span>
                <span className="text-cyan-900 font-semibold">أ. نرمين الحسيني</span>
              </div>
            </div>

            {/* Section 1: Weekly Prayer Coloring Tracker */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                  <span>١. جدول الصلوات الخمس (لوّن النجمة عند إتمام الصلاة بحب)</span>
                </h2>
                <span className="text-[10px] text-slate-500">«الصلاة نور»</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-center border-collapse text-[11px]">
                  <thead>
                    <tr className="bg-slate-900 text-white">
                      <th className="py-1.5 px-2 border border-slate-800 rounded-tr-lg">اليوم</th>
                      {prayers.map((p) => (
                        <th key={p.name} className="py-1.5 px-2 border border-slate-800">
                          {p.name} {p.icon}
                        </th>
                      ))}
                      <th className="py-1.5 px-2 border border-slate-800 rounded-tl-lg">نجوم اليوم ⭐</th>
                    </tr>
                  </thead>
                  <tbody>
                    {daysOfWeek.map((day, idx) => (
                      <tr key={day} className={idx % 2 === 0 ? 'bg-white' : 'bg-amber-50/40'}>
                        <td className="py-2 px-2 border border-slate-200 font-bold text-slate-800">
                          {day}
                        </td>
                        {prayers.map((p) => (
                          <td key={p.name} className="py-2 px-2 border border-slate-200">
                            {/* Colorable star outline circle */}
                            <div className="w-5 h-5 mx-auto rounded-full border-2 border-amber-400 flex items-center justify-center text-[10px] text-amber-500">
                              ☆
                            </div>
                          </td>
                        ))}
                        <td className="py-2 px-2 border border-slate-200 text-slate-400 font-mono">
                          [  / ٥ ]
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Section 2: Quran Tadabbur Box */}
            <div className="mb-5 bg-emerald-50/60 border border-emerald-200 rounded-xl p-3.5">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>٢. آية وتدبر الأسبوع في جزء عم (عقل يفهم ويتفكر):</span>
                </h3>
                <span className="text-[11px] font-bold text-emerald-800 bg-white px-2.5 py-0.5 rounded-full border border-emerald-300">
                  {selectedSurah}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-white p-2.5 rounded-lg border border-emerald-100">
                  <span className="font-semibold text-slate-800 block text-[11px] mb-1">
                    🔍 ماذا فهمت من السورة هذا الأسبوع؟
                  </span>
                  <div className="h-10 border-b border-dotted border-slate-300 text-slate-400 text-[10px] pt-1">
                    اكتب أو ارسم فكرتك الجميلة هنا...
                  </div>
                </div>

                <div className="bg-white p-2.5 rounded-lg border border-emerald-100">
                  <span className="font-semibold text-slate-800 block text-[11px] mb-1">
                    🌱 كيف أعيش بالسورة في تعاملي مع إخوتي ووالديّ؟
                  </span>
                  <div className="h-10 border-b border-dotted border-slate-300 text-slate-400 text-[10px] pt-1">
                    سأقول كلاماً طيباً ولا أرفع صوتي...
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Ihsan & Good Deeds */}
            <div className="mb-5 bg-amber-50/50 border border-amber-200 rounded-xl p-3.5">
              <h3 className="text-xs font-bold text-amber-950 flex items-center gap-1.5 mb-2">
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-400" />
                <span>٣. شجرة الإحسان وبِرّ الوالدين (أعمال صالحة أسعدت بها أمي وأبي):</span>
              </h3>
              
              <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                <div className="bg-white p-2 rounded-lg border border-amber-200 flex flex-col items-center">
                  <span>🍃 قبّلت يد أمي وأبي</span>
                  <div className="w-4 h-4 mt-1 border border-amber-400 rounded-sm"></div>
                </div>
                <div className="bg-white p-2 rounded-lg border border-amber-200 flex flex-col items-center">
                  <span>🍃 رتبت غرفتي وسريري</span>
                  <div className="w-4 h-4 mt-1 border border-amber-400 rounded-sm"></div>
                </div>
                <div className="bg-white p-2 rounded-lg border border-amber-200 flex flex-col items-center">
                  <span>🍃 ساعدت إخوتي الصغار</span>
                  <div className="w-4 h-4 mt-1 border border-amber-400 rounded-sm"></div>
                </div>
              </div>
            </div>

            {/* Footer Signature & Affirmation */}
            <div className="border-t-2 border-amber-200 pt-3 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-slate-800 text-[11px]">
                  «أنت بطل رَوَايَا.. نحن فخورون بك وبقلبك الطيب»
                </p>
                <p className="text-[10px] text-slate-500">
                  منصة رَوَايَا التربوية | rawaya.site
                </p>
              </div>

              <div className="text-left">
                <span className="text-[10px] text-slate-500 block">اعتماد وتوقيع المربية:</span>
                <span className="font-bold text-cyan-900 text-xs font-display">
                  أ. نرمين الحسيني ✍️
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Modal Bottom Guidance Footer (Hidden in Print) */}
        <div className="no-print p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>نصيحة: اطبع الورقة بالألوان وعلّقها على باب غرفة طفلك مع قلم تلوين جميل.</span>
          </div>

          <button
            onClick={handlePrint}
            className="w-full sm:w-auto px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>طباعة الورقة الآن</span>
          </button>
        </div>

      </div>
    </div>
  );
};
