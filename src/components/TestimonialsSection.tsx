import React from 'react';
import { TESTIMONIALS } from '../data/rawayaData';
import { Quote, Star } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <p className="text-xs font-bold text-cyan-800 tracking-wider uppercase mb-2">
            شهادات وتجارب حية
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 font-display mb-4">
            كيف أحدثت «رَوَايَا» فارقاً في قلوب وعقول أطفالنا؟
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            كلمات وتجارب حقيقية من آباء وأمهات لمسوا التغيير في صلاة أبنائهم، ثقتهم، وحبهم للقرآن في المنصورة وعبر العالم العربي.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {TESTIMONIALS.map((item) => (
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
                <p className="text-xs font-bold text-cyan-800 mb-2">
                  الأثر الملموس: {item.impactHighlight}
                </p>
                {/* Clean unboxed metadata per zero-pill rule */}
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <span className="font-semibold text-slate-900">{item.parentName}</span>
                  <span aria-hidden="true">·</span>
                  <span>والد {item.childName}</span>
                  <span aria-hidden="true">·</span>
                  <span>{item.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
