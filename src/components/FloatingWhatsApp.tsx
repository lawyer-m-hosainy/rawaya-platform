import React, { useState, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, BookOpen, ArrowRight, RotateCcw } from 'lucide-react';
import { RawayaLogo } from './RawayaLogo';
import { SITE_CONFIG } from '../config/siteConfig';
import { trackEvent } from '../utils/analytics';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState<string>('');
  const [detectedProgram, setDetectedProgram] = useState<string | null>(null);
  const [hoveredProgram, setHoveredProgram] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Trigger entrance on component mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Show a gentle greeting tooltip after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Listen for program focus/hover events from ProgramsSection
  useEffect(() => {
    const handleProgramFocus = (event: Event) => {
      const customEvent = event as CustomEvent<{ title: string; id: string }>;
      if (customEvent.detail?.title) {
        setHoveredProgram(customEvent.detail.title);
      }
    };

    window.addEventListener('rawaya:program-focus', handleProgramFocus);
    return () => {
      window.removeEventListener('rawaya:program-focus', handleProgramFocus);
    };
  }, []);

  // Function to detect whether user is currently looking at ProgramsSection and which card is closest
  const detectProgramInView = (): string | null => {
    const section = document.getElementById('programs');
    if (!section) return null;

    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    // Check if the Programs section is in view
    const isInProgramsSection = rect.top < windowHeight * 0.75 && rect.bottom > windowHeight * 0.15;
    if (!isInProgramsSection) return null;

    // Find all program cards with data-program-title inside this section
    const cards = Array.from(section.querySelectorAll<HTMLElement>('[data-program-title]'));
    if (cards.length === 0) return null;

    const centerY = windowHeight / 2;
    let closestCard = cards[0];
    let minDistance = Infinity;

    for (const card of cards) {
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.top + cardRect.height / 2;
      const distance = Math.abs(cardCenter - centerY);
      if (distance < minDistance) {
        minDistance = distance;
        closestCard = card;
      }
    }

    return closestCard.getAttribute('data-program-title') || null;
  };

  const defaultPhone = SITE_CONFIG.phone.raw;

  // Reset back to initial General inquiries
  const handleResetToGeneral = () => {
    setDetectedProgram(null);
    setSelectedPrompt('');
  };

  // Dynamic prompts depending on whether a program was detected in ProgramsSection
  const quickPrompts = detectedProgram
    ? [
        `السلام عليكم، أود الاستفسار عن تفاصيل وحجز مقعد في: ${detectedProgram}`,
        `هل يناسب برنامج «${detectedProgram}» عمر ومستوى طفلي؟`,
        `ما هي مواعيد وطريقة الاشتراك في «${detectedProgram}»؟`,
      ]
    : [
        'السلام عليكم، أود معرفة مواعيد ورش رَوَايَا الحضورية بالمنصورة',
        'السلام عليكم، أرغب في الاستفسار عن الفصول التفاعلية أونلاين عبر زووم',
        'السلام عليكم، كيف أختار الورشة الأنسب لعمر ومستوى طفلي؟',
      ];

  const handleOpenWhatsApp = (customText?: string) => {
    trackEvent('whatsapp_click', { program: detectedProgram || 'general' });
    let message = customText || selectedPrompt;
    if (!message) {
      if (detectedProgram) {
        message = SITE_CONFIG.whatsapp.programMessageTemplate(detectedProgram);
      } else {
        message = SITE_CONFIG.whatsapp.defaultMessage;
      }
    }
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${defaultPhone}?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  const handleToggleChat = () => {
    if (!isOpen) {
      // User is clicking to open: check if they are in ProgramsSection
      const inView = detectProgramInView();
      const programToSet = inView || hoveredProgram;
      setDetectedProgram(programToSet);
      setShowTooltip(false);
      setIsOpen(true);
      trackEvent('whatsapp_click', { action: 'open_drawer' });
    } else {
      setIsOpen(false);
    }
  };

  return (
    <div
      className={`fixed bottom-5 left-5 z-50 flex flex-col items-start font-sans select-none animate-floating-entrance ${
        isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      dir="rtl"
    >
      
      {/* Expandable Chat Card */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-88 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-cyan-900 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white p-1 shadow-xs flex items-center justify-center">
                <RawayaLogo variant="emblem-only" size="sm" />
              </div>
              <div className="text-right">
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>أ. نرمين الحسيني</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </h4>
                <p className="text-[11px] text-cyan-200">مشروع رَوَايَا التربوي</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-300 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="إغلاق المحادثة"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-slate-50 space-y-3">
            {/* Detected Program Context Banner if clicked in ProgramsSection */}
            {detectedProgram ? (
              <div className="bg-gradient-to-r from-cyan-50 to-emerald-50 border border-cyan-200/90 rounded-2xl p-3 text-right shadow-2xs">
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <div className="flex items-center gap-1.5 text-cyan-900 text-[11px] font-bold">
                    <BookOpen className="w-3.5 h-3.5 text-cyan-700" />
                    <span>استفسار حول المسار المختار:</span>
                  </div>
                  <button
                    onClick={handleResetToGeneral}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-700 hover:text-slate-950 bg-white hover:bg-slate-100 px-2 py-0.5 rounded-lg border border-slate-200/90 shadow-2xs transition-all cursor-pointer"
                    title="الرجوع إلى الاستفسارات العامة"
                  >
                    <ArrowRight className="w-3 h-3 text-slate-500" />
                    <span>استفسار عام</span>
                  </button>
                </div>
                <p className="text-xs font-bold text-slate-900 font-display line-clamp-2">
                  {detectedProgram}
                </p>
                <p className="text-[10px] text-slate-600 mt-1">
                  تم تجهيز الأسئلة والرسالة خصيصاً لهذا البرنامج.
                </p>
              </div>
            ) : (
              <div className="bg-white p-3 rounded-2xl rounded-tr-none border border-slate-200/90 shadow-xs text-xs text-slate-700 leading-relaxed text-right">
                <p className="font-semibold text-slate-900 mb-1">أهلاً وسهلاً بك ولي أمرنا الكريم 🌸</p>
                <p>نسعد بالإجابة على تساؤلاتك ومساعدتك في اختيار البرنامج الأنسب لطفلك لبناء شخصيته بالقرآن.</p>
              </div>
            )}

            {/* Quick Prompt Suggestions */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-bold text-slate-500 text-right">
                  {detectedProgram ? 'رسائل سريعة لهذا المسار:' : 'استفسارات شائعة بنقرة واحدة:'}
                </p>
                {detectedProgram && (
                  <button
                    onClick={handleResetToGeneral}
                    className="text-[10px] text-cyan-700 hover:text-cyan-900 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>الأسئلة العامة</span>
                    <ArrowRight className="w-2.5 h-2.5" />
                  </button>
                )}
              </div>

              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOpenWhatsApp(prompt)}
                  className="w-full text-right p-2.5 rounded-xl bg-white hover:bg-cyan-50/80 border border-slate-200 hover:border-cyan-300 text-[11px] text-slate-700 hover:text-cyan-900 transition-colors flex items-center justify-between group cursor-pointer"
                >
                  <span className="line-clamp-1">{prompt}</span>
                  <Send className="w-3 h-3 text-slate-400 group-hover:text-cyan-700 shrink-0 mr-1 rotate-180" />
                </button>
              ))}

              {/* Explicit Back to General Button if in program-specific mode */}
              {detectedProgram && (
                <button
                  onClick={handleResetToGeneral}
                  className="w-full mt-2 py-2 px-3 rounded-xl border border-dashed border-slate-300 hover:border-slate-400 bg-white/80 hover:bg-white text-[11px] font-semibold text-slate-600 hover:text-slate-900 flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs group"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 transition-transform group-hover:translate-x-0.5" />
                  <span>الرجوع إلى قائمة الاستفسارات العامة</span>
                </button>
              )}
            </div>

            {/* Direct CTA Button */}
            <div className="pt-2">
              <button
                onClick={() => handleOpenWhatsApp()}
                className={`w-full py-2.5 px-4 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                  detectedProgram 
                    ? 'bg-cyan-700 hover:bg-cyan-800 active:bg-cyan-900' 
                    : 'bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>
                  {detectedProgram ? 'تواصل واتساب بخصوص هذا المسار' : 'محادثة مباشرة على الواتساب'}
                </span>
              </button>
            </div>
          </div>

          {/* Footer note */}
          <div className="px-4 py-2 bg-slate-100 text-[10px] text-center text-slate-500 border-t border-slate-200">
            🔒 استفسار مباشر ومتابعة سريعة مع إدارة المشروع
          </div>
        </div>
      )}

      {/* Floating Action Button with Bubble */}
      <div className="flex items-center gap-3">
        
        {/* Main Floating WhatsApp Button */}
        <button
          onClick={handleToggleChat}
          className="relative group p-3.5 sm:p-4 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white rounded-full shadow-xl hover:shadow-2xl hover:shadow-emerald-600/40 transition-all duration-300 ease-out transform hover:scale-110 active:scale-95 flex items-center justify-center cursor-pointer"
          aria-label="تواصل معنا عبر واتساب"
        >
          {/* Dynamic Radiating Ripple Effect (radiates outward in continuous staggered waves every few seconds) */}
          {!isOpen && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {/* Concentric outward wave 1 */}
              <span className="absolute inset-0 rounded-full border border-emerald-400/90 bg-emerald-500/20 animate-ripple-1 pointer-events-none" />
              {/* Concentric outward wave 2 (staggered delay) */}
              <span className="absolute inset-0 rounded-full border border-emerald-400/75 bg-emerald-500/15 animate-ripple-2 pointer-events-none" />
              {/* Concentric outward wave 3 (staggered delay) */}
              <span className="absolute inset-0 rounded-full border border-emerald-400/60 bg-emerald-500/10 animate-ripple-3 pointer-events-none" />
              {/* Ambient rhythmic breathing ring */}
              <span className="absolute -inset-0.5 rounded-full bg-emerald-400/40 animate-pulse pointer-events-none" />
            </div>
          )}

          {/* Interactive Hover Glow Wave */}
          <span className="absolute -inset-1 rounded-full bg-emerald-500 opacity-30 group-hover:opacity-75 group-hover:scale-120 blur-xs transition-all duration-300" />

          {/* Notification Dot */}
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
            ١
          </span>

          <div className="relative z-10">
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <MessageSquare className="w-6 h-6" />
            )}
          </div>
        </button>

        {/* Small greeting speech bubble (visible before clicking) */}
        {!isOpen && showTooltip && (
          <div className="hidden sm:flex items-center gap-2 bg-white text-slate-800 px-3.5 py-2 rounded-2xl shadow-lg border border-slate-200 text-xs font-semibold animate-in fade-in slide-in-from-left-2">
            <span>تواصل مع أ. نرمين عبر الواتساب</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowTooltip(false);
              }}
              className="text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
