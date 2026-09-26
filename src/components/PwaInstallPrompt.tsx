import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone, Check } from 'lucide-react';
import { RawayaLogo } from './RawayaLogo';

export const PwaInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setIsInstallable(false);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstallable(false);
    }
    setDeferredPrompt(null);
  };

  if (!isInstallable || isDismissed || isInstalled) return null;

  return (
    <div className="fixed bottom-24 right-5 z-40 max-w-sm bg-white border border-cyan-200/90 rounded-2xl shadow-xl p-3.5 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300" dir="rtl">
      <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center p-1.5 shrink-0 text-white">
        <RawayaLogo variant="emblem-only" size="sm" />
      </div>

      <div className="flex-1 min-w-0">
        <h5 className="text-xs font-bold text-slate-900 font-display">
          تثبيت تطبيق رَوَايَا على هاتفك
        </h5>
        <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">
          وصول سريع بلمسة واحدة بدون كتابة الرابط
        </p>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        <button
          onClick={handleInstallClick}
          className="px-2.5 py-1.5 bg-cyan-700 hover:bg-cyan-800 text-white text-[11px] font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
        >
          <Download className="w-3 h-3" />
          <span>تثبيت</span>
        </button>

        <button
          onClick={() => setIsDismissed(true)}
          className="p-1 text-slate-400 hover:text-slate-600 rounded-md transition-colors cursor-pointer"
          aria-label="إغلاق التنبيه"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
