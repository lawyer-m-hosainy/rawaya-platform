import React, { useState, useEffect } from 'react';
import { Quote } from 'lucide-react';
import { testimonialService, Testimonial } from '../services/testimonialService';

export const TestimonialsSection: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      setLoading(true);
      const data = await testimonialService.getTestimonials(true);
      setTestimonials(data);
    } catch (error) {
      console.error('Error loading testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="testimonials" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <p className="text-xs font-bold text-cyan-800 tracking-wider uppercase mb-2">
            شركاء وشهادات نعتز بها
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 font-display mb-4">
            ماذا يقولون عن «رَوَايَا» من واقع تجاربهم؟
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            نسعد بشهادات حقيقية من آباء وأمهات لمسوا التغيير في حياة أبنائهم، ونسعى للارتقاء في المنظومة وبناء جيل متزن وواعٍ.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-pulse flex items-center gap-2 text-cyan-600 font-bold">
              جاري تحميل الشهادات...
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:border-cyan-300 transition-colors"
              >
                <div>
                  <Quote className="w-8 h-8 text-cyan-200 mb-4" />
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-6 font-normal">
                    «{item.text}»
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  {item.impact_highlight && (
                    <p className="text-xs font-bold text-cyan-800 mb-2">
                      الأثر الملموس: {item.impact_highlight}
                    </p>
                  )}
                  <div className="flex items-center flex-wrap gap-1.5 text-xs text-slate-500">
                    <span className="font-semibold text-slate-900">{item.parent_name}</span>
                    {item.child_name && (
                      <>
                        <span aria-hidden="true">•</span>
                        <span>ولي أمر {item.child_name}</span>
                      </>
                    )}
                    {item.location && (
                      <>
                        <span aria-hidden="true">•</span>
                        <span>{item.location}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {testimonials.length === 0 && (
              <div className="col-span-full text-center py-12 text-slate-500 bg-white rounded-3xl border border-slate-200">
                لا توجد شهادات منشورة حالياً.
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
