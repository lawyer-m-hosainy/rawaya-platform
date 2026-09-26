import React, { useState } from 'react';
import { Send, CheckCircle2, MessageSquare, PhoneCall, ShieldCheck, Heart } from 'lucide-react';
import { PROGRAMS } from '../data/rawayaData';
import { PhoneInput } from './PhoneInput';
import { leadStorage } from '../services/leadStorage';
import { trackEvent } from '../utils/analytics';
import { SITE_CONFIG } from '../config/siteConfig';

interface EnrollmentSectionProps {
  initialProgram?: string;
}

export const EnrollmentSection: React.FC<EnrollmentSectionProps> = ({ initialProgram }) => {
  const [formData, setFormData] = useState({
    parentName: '',
    childName: '',
    childAge: '',
    phone: '',
    location: 'المنصورة (حضوري)',
    program: initialProgram || PROGRAMS[0].title,
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.parentName.trim() || !formData.childName.trim() || !formData.phone.trim()) {
      setErrorMsg('يرجى ملء جميع الحقول الإلزامية (اسم ولي الأمر، اسم الطفل، ورقم الهاتف/الواتساب)');
      return;
    }

    if (formData.phone.replace(/\D/g, '').length < 8) {
      setErrorMsg('يرجى إدخال رقم هاتف صحيح مفعّل عليه تطبيق واتساب');
      return;
    }

    setErrorMsg('');

    // Persist registration lead to reliable local storage
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
      `السلام عليكم أ. نرمين الحسيني (مشروع رَوَايَا)،\nأنا ولي أمر: ${formData.parentName}\nأرغب في تسجيل طفلي: ${formData.childName} (العمر: ${formData.childAge || 'غير محدد'})\nالبرنامج المطلوب: ${formData.program}\nالموقع: ${formData.location}\nملاحظات: ${formData.notes || 'لا يوجد'}`
    );
    return `https://wa.me/${SITE_CONFIG.phone.raw}?text=${text}`;
  };

  return (
    <section id="contact" className="py-24 bg-white border-b border-slate-200 scroll-mt-20">
      <div id="enrollment" className="-top-24 relative" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-100 text-cyan-900 text-xs font-bold mb-3 border border-cyan-200">
            <span>تواصل معنا والتسجيل المباشر</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 font-display mb-4">
            ابدأ رحلة «رَوَايَا» لطفلك من المكان الصح
          </h2>
          <p className="text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
            وفّر لطفلك بيئة تفاعلية صالحة تفهمه وتثبته، واجعله يبدأ خطوته الأولى في حب القرآن وبناء شخصيته.
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs">
          {submitted ? (
            <div className="text-center py-6 animate-in fade-in">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-display mb-2">
                تم استلام طلب التسجيل بنجاح!
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto mb-6 leading-relaxed">
                شكراً لثقتكم في مشروع «رَوَايَا». سنتواصل معكم هاتفياً أو عبر الواتساب لتأكيد موعد اللقاء التمهيدي وتفاصيل المقعد.
              </p>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 max-w-md mx-auto text-right text-xs text-slate-600 mb-6 space-y-1.5">
                <p><span className="font-bold text-slate-800">اسم ولي الأمر:</span> {formData.parentName}</p>
                <p><span className="font-bold text-slate-800">اسم الطفل:</span> {formData.childName} ({formData.childAge || 'غير محدد'} سنة)</p>
                <p><span className="font-bold text-slate-800">البرنامج المختار:</span> {formData.program}</p>
                <p><span className="font-bold text-slate-800">طبيعة الحضور:</span> {formData.location}</p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3 text-xs sm:text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>تأكيد الحجز فوراً عبر الواتساب</span>
                </a>
                <button
                  onClick={() => setSubmitted(false)}
                  className="w-full sm:w-auto px-5 py-3 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  تسجيل طفل آخر
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMsg && (
                <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Parent Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    اسم ولي الأمر (الأب / الأم) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.parentName}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    placeholder="مثال: أ. محمد أحمد"
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600 transition-colors"
                  />
                </div>

                {/* Child Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    اسم الطفل أو اليافع <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.childName}
                    onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
                    placeholder="مثال: عمر"
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Child Age */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    عمر الطفل (بالسنوات)
                  </label>
                  <input
                    type="number"
                    min="4"
                    max="18"
                    value={formData.childAge}
                    onChange={(e) => setFormData({ ...formData, childAge: e.target.value })}
                    placeholder="مثال: ٩"
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600 transition-colors"
                  />
                </div>

                {/* Phone / WhatsApp with International Country Codes */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    رقم الهاتف / الواتساب <span className="text-rose-500">*</span>
                  </label>
                  <PhoneInput
                    value={formData.phone}
                    onChange={(fullNumber) => setFormData({ ...formData, phone: fullNumber })}
                    placeholder="01012345678"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Location / Format */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    طريقة المشاركة المطلوبة
                  </label>
                  <select
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600 transition-colors"
                  >
                    <option value="المنصورة (حضوري)">المنصورة (حضوري في القاعة التفاعلية)</option>
                    <option value="أونلاين (تفاعلي عبر زووم)">أونلاين تفاعلي عبر زووم (للمحافظات والمغتربين)</option>
                    <option value="ملتقى الصلاة الأسري (حضوري)">ملتقى الصلاة الأسري (حضوري)</option>
                  </select>
                </div>

                {/* Program Track */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    البرنامج أو المسار المفضل
                  </label>
                  <select
                    value={formData.program}
                    onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600 transition-colors"
                  >
                    {PROGRAMS.map((prog) => (
                      <option key={prog.id} value={prog.title}>
                        {prog.title}
                      </option>
                    ))}
                    <option value="أرغب في استشارة لتحديد الأنسب لطفلي">
                      أرغب في استشارة تربوية لتحديد الأنسب لطفلي
                    </option>
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  تحديات أو أهداف تود مشاركتها معنا (اختياري)
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="مثال: طفلي يشعر بالخجل أمام زملائه، أو يعاني من تشتت الانتباه وكسل في الصلاة..."
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600 transition-colors resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 text-sm font-bold text-white bg-slate-900 hover:bg-cyan-700 active:bg-cyan-800 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>تأكيد إرسال طلب التسجيل في رَوَايَا</span>
                </button>
              </div>

              <p className="text-[11px] text-center text-slate-500">
                🔒 خصوصية بياناتك وبيانات طفلك محفوظة بالكامل. لا نشارك معلوماتك مع أي طرف ثالث.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
