import React, { useState, useEffect } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import { programService, Program } from '../services/programService';
import { enrollmentService } from '../services/enrollmentService';
import { z } from 'zod';

interface EnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProgramTitle?: string;
}

export const EnrollmentModal: React.FC<EnrollmentModalProps> = ({
  isOpen,
  onClose,
  selectedProgramTitle = '',
}) => {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [programs, setPrograms] = useState<Program[]>([]);
  
  const [formData, setFormData] = useState({
    parentName: '',
    childName: '',
    childAge: '',
    phone: '',
    programTitle: selectedProgramTitle,
    learningMode: 'online',
    city: '',
    notes: '',
  });

  useEffect(() => {
    if (selectedProgramTitle) {
      setFormData(prev => ({ ...prev, programTitle: selectedProgramTitle }));
    }
  }, [selectedProgramTitle]);

  useEffect(() => {
    if (isOpen && programs.length === 0) {
      programService.getPrograms(true).then(data => setPrograms(data)).catch(console.error);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    // Zod Validation
    const schema = z.object({
      parentName: z.string().min(2, "الاسم مطلوب (على الأقل حرفين)"),
      childName: z.string().min(2, "اسم الابن/الابنة مطلوب"),
      phone: z.string().regex(/^(01|\+201)[0125][0-9]{8}$/, "رقم الواتساب يجب أن يكون مصرياً صحيحاً (مثال: 01012345678)"),
      childAge: z.coerce.number().min(4, "العمر يجب أن يكون 4 سنوات على الأقل").max(18, "العمر يجب أن يكون 18 سنة كحد أقصى"),
      programTitle: z.string().min(1, "يرجى اختيار البرنامج"),
    });

    const result = schema.safeParse(formData);
    if (!result.success) {
      const formattedErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        formattedErrors[String(issue.path[0])] = issue.message;
      });
      setErrors(formattedErrors);
      return;
    }

    setSubmitting(true);
    
    try {
      await enrollmentService.createEnrollment({
        parent_name: formData.parentName,
        child_name: formData.childName,
        child_age: formData.childAge,
        phone: formData.phone,
        program_title: formData.programTitle || 'لم يحدد',
        learning_mode: formData.learningMode,
        city: formData.city,
        notes: formData.notes,
        status: 'new'
      });
      setStep(2); // Success step
    } catch (error) {
      console.error('Error submitting enrollment:', error);
      alert('حدث خطأ أثناء إرسال الطلب، يرجى المحاولة مرة أخرى.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in" dir="rtl">
      <div className="bg-white rounded-3xl w-full max-w-xl max-h-[90vh] flex flex-col shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors z-10"
        >
          <X size={20} />
        </button>

        {step === 1 ? (
          <div className="overflow-y-auto p-6 sm:p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">طلب تسجيل جديد</h2>
              <p className="text-slate-500 text-sm">يسعدنا انضمام أبنائكم لبرامج رَوَايَا التربوية</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">اسم ولي الأمر *</label>
                  <input
                    type="text"
                    required
                    value={formData.parentName}
                    onChange={e => setFormData({...formData, parentName: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all"
                  />
                  {errors.parentName && <p className="text-red-500 text-xs mt-1">{errors.parentName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">رقم الواتساب *</label>
                  <input
                    type="tel"
                    required
                    dir="ltr"
                    placeholder="+20..."
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all text-left"
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">اسم الابن/الابنة *</label>
                  <input
                    type="text"
                    required
                    value={formData.childName}
                    onChange={e => setFormData({...formData, childName: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all"
                  />
                  {errors.childName && <p className="text-red-500 text-xs mt-1">{errors.childName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">العمر *</label>
                  <input
                    type="number"
                    required
                    min="4"
                    max="18"
                    value={formData.childAge}
                    onChange={e => setFormData({...formData, childAge: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all"
                  />
                  {errors.childAge && <p className="text-red-500 text-xs mt-1">{errors.childAge}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">البرنامج المراد التسجيل فيه *</label>
                <select
                  required
                  value={formData.programTitle}
                  onChange={e => setFormData({...formData, programTitle: e.target.value})}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all"
                >
                  <option value="" disabled>اختر البرنامج...</option>
                  {programs.map(p => (
                    <option key={p.id} value={p.title}>{p.title} - ({p.format})</option>
                  ))}
                  {programs.length === 0 && <option value={selectedProgramTitle || 'برنامج عام'}>{selectedProgramTitle || 'برنامج عام'}</option>}
                </select>
                {errors.programTitle && <p className="text-red-500 text-xs mt-1">{errors.programTitle}</p>}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-cyan-700 transition-colors shadow-md disabled:opacity-70 mt-4"
              >
                {submitting ? 'جاري الإرسال...' : 'إرسال طلب التسجيل'}
              </button>
            </form>
          </div>
        ) : (
          <div className="p-10 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">تم تسجيل طلبك بنجاح!</h3>
            <p className="text-slate-600 mb-8">
              شكراً لثقتكم برَوَايَا. سيتم التواصل معكم عبر الواتساب في أقرب وقت لتأكيد التسجيل وإرسال التفاصيل.
            </p>
            <button
              onClick={onClose}
              className="px-8 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors"
            >
              إغلاق النافذة
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
