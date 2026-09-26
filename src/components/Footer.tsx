import React from 'react';
import { RawayaLogo } from './RawayaLogo';
import { MapPin, Instagram, Facebook, MessageCircle, Lock, Phone } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

interface FooterProps {
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Brand & Mission Column */}
          <div className="md:col-span-5 text-right">
            <RawayaLogo inverted size="lg" className="mb-4" />
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm mb-6">
              مشروع تربوي إسلامي متخصص يقوده كادر أزهري مجاز. نهدف لبناء جيل يعتز بدينه، يفهم القرآن ليعيش به، ويملك حصانة فكرية وثقة راسخة أمام مؤثرات العصر.
            </p>
            <div className="text-xs text-cyan-300 font-semibold font-display">
              «لمّا يفهم، هيتكلّم… ولو فضل تايه، هيسكت ويسمع لغيرك»
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 text-right">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              أقسام الموقع
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a href="#philosophy" className="hover:text-cyan-400 transition-colors">
                  فلسفة رَوَايَا والحديث الشريف
                </a>
              </li>
              <li>
                <a href="#pillars" className="hover:text-cyan-400 transition-colors">
                  محاور المنهج الخمسة
                </a>
              </li>
              <li>
                <a href="#tadabbur" className="hover:text-cyan-400 transition-colors">
                  مختبر التدبر القرآني
                </a>
              </li>
              <li>
                <a href="#programs" className="hover:text-cyan-400 transition-colors">
                  البرامج والورش التفاعلية
                </a>
              </li>
              <li>
                <a href="#teacher" className="hover:text-cyan-400 transition-colors">
                  عن المعلمة أ. نرمين الحسيني
                </a>
              </li>
              <li>
                <a href="#enrollment" className="hover:text-cyan-400 transition-colors">
                  تسجيل طفل جديد
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Location Column */}
          <div className="md:col-span-4 text-right">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              التواصل والمقر
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-center gap-2.5 text-cyan-300">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                <span className="font-semibold tracking-wide">الموقع الرسمي: rawaya.site</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{SITE_CONFIG.location.addressArabic}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>فصول أونلاين تفاعلية مباشرة عبر زووم للعالم العربي والمغتربين</span>
              </div>
              <div className="flex items-center gap-4 pt-3">
                <a
                  href={SITE_CONFIG.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-cyan-400 transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  <span>انستجرام (@rawaya_24_9)</span>
                </a>
                <a
                  href={SITE_CONFIG.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-cyan-400 transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                  <span>صفحة فيسبوك الرسمية</span>
                </a>
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsapp.number}?text=${encodeURIComponent(SITE_CONFIG.whatsapp.defaultMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-cyan-400 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Quiet copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>
            جميع الحقوق محفوظة © {new Date().getFullYear()} مشروع رَوَايَا التربوي (رسالة ودراية)
          </p>
          <div className="flex items-center gap-3">
            <p className="flex items-center gap-1 text-slate-400">
              <span>تحت إشراف وتأسيس أ. نرمين الحسيني</span>
              <span aria-hidden="true">·</span>
              <span>كلية الشريعة – جامعة الأزهر الشريف</span>
            </p>
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1 text-[11px] text-slate-500 hover:text-cyan-400 transition-colors cursor-pointer bg-slate-800/60 hover:bg-slate-800 px-2 py-1 rounded-md"
                title="لوحة تحكم إدارة المشروع (رمز PIN)"
              >
                <Lock className="w-3 h-3" />
                <span>بوابة الإدارة</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
