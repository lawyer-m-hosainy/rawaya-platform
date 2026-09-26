import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, MessageSquare, Send } from 'lucide-react';
import { PROGRAMS } from '../data/rawayaData';
import { PhoneInput } from './PhoneInput';
import { leadStorage } from '../services/leadStorage';
import { trackEvent } from '../utils/analytics';
import { SITE_CONFIG } from '../config/siteConfig';

interface EnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProgramTitle?: string;
}

export const EnrollmentModal: React.FC<EnrollmentModalProps> = ({
  isOpen,
  onClose,
  selectedProgramTitle,
}) => {
  const [formData, setFormData] = useState({
    parentName: '',
    childName: '',
    childAge: '',
    phone: '',
    location: 'المنصورة (حضوري)',
    program: selectedProgramTitle || PROGRAMS[0].title,
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (selectedProgramTitle) {
      setFormData((prev) => ({ ...prev, program: selectedProgramTitle }));
    }
  }, [selectedProgramTitle]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.parentName.trim() || !formData.childName.trim() || !formData.phone.trim()) {
      setErrorMsg('يرجى ملء جميع الحقول المطلوبة');
      return;
    }
    setErrorMsg('');

    // Persist registration lead to localStorage
    leadStorage.saveLead({
      parentName: formData.parentName,
      childName: formData.childName,
      childAge: formData.childAge || 'غير محدد',
      phone: formData.phone,
      programTitle: formData.program,
      learningMode: formData.location.includes('حضوري') ? 'in-person' : 'online',
      city: formData.location.includes('حضوري') ? 'المنصورة' : 'أونلاين',
      notes: formData.notes,
    });

    trackEvent('enrollment_submitted', { program: formData.program });
    setSubmitted(true);
  };

  const getWhatsAppUrl = () => {
    const text = encodeURIComponent(
      `السلام عليكم أ. نرمين الحسيني (رَوَايَا)،\nأنا: ${formData.parentName}\nأود حجز مقعد لطفلي: ${formData.childName} (${formData.childAge || 'العمر غير محدد'})\nالبرنامج: ${formData.program}\nالمكان: ${formData.location}`
    );
    return `https://wa.me/${SITE_CONFIG.whatsapp.number}?text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="إغلاق"
          className="absolute top-5 left-5 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="text-right mb-6">
              <span className="text-xs font-bold text-cyan-800 tracking-wider">
                مشروع رَوَايَا التربوي
              </span>
              <h3 className="text-xl font-bold text-slate-900 font-display mt-1">
                حجز مقعد وتسجيل طفل
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                سجل بيانات طفلك وسنتواصل معك فوراً لتحديد الموعد والمستوى الأنسب
              </p>
            </div>

            {errorMsg && (
              <div className="p-3 mb-4 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-right">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  اسم ولي الأمر <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.parentName}
                  onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                  placeholder="أ. محمد أحمد"
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-cyan-600 transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    اسم الطفل <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.childName}
                    onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
                    placeholder="عمر"
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-cyan-600 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    عمر الطفل
                  </label>
                  <input
                    type="number"
                    min="4"
                    max="18"
                    value={formData.childAge}
                    onChange={(e) => setFormData({ ...formData, childAge: e.target.value })}
                    placeholder="٩ سنوات"
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-cyan-600 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  رقم الواتساب للتواصل <span className="text-rose-500">*</span>
                </label>
                <PhoneInput
                  value={formData.phone}
                  onChange={(fullNumber) => setFormData({ ...formData, phone: fullNumber })}
                  placeholder="01012345678"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  البرنامج المطلوب
                </label>
                <select
                  value={formData.program}
                  onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-cyan-600 transition-colors"
                >
                  {PROGRAMS.map((prog) => (
                    <option key={prog.id} value={prog.title}>
                      {prog.title}
                    </option>
                  ))}
                  <option value="استشارة تربوية لتحديد المسار الأنسب">
                    استشارة تربوية لتحديد المسار الأنسب
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  طريقة الحضور
                </label>
                <select
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-cyan-600 transition-colors"
                >
                  <option value="المنصورة (حضوري)">المنصورة (حضوري في القاعة التفاعلية)</option>
                  <option value="أونلاين (تفاعلي عبر زووم)">أونلاين تفاعلي (للمحافظات والخارج)</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 text-xs sm:text-sm font-bold text-white bg-slate-900 hover:bg-cyan-700 rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>تأكيد طلب التسجيل</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 animate-in fade-in">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-display mb-2">
              تم تسجيل بيانات طفلك بنجاح!
            </h3>
            <p className="text-xs text-slate-600 mb-6 leading-relaxed">
              سنتواصل معك عبر الواتساب لتأكيد المقعد وتحديد موعد جلسة التقييم والتعارف.
            </p>
            <div className="flex flex-col gap-2">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>المتابعة عبر الواتساب الآن</span>
              </a>
              <button
                onClick={onClose}
                className="w-full py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
              >
                إغلاق النافذة
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
