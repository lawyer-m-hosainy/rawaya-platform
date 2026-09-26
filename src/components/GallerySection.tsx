import React, { useState } from 'react';
import { Sparkles, Maximize2, X, MapPin, Users } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [activePhoto, setActivePhoto] = useState<string | null>(null);

  const photos = [
    {
      url: '/src/assets/images/workshop_confidence_kids_1790367244854.jpg',
      title: 'ورشة أنمّي ثقتي – سلسلة لِتَعَارَفُوا',
      caption: 'الأطفال يكتبون في دفاتر أنشطتهم، يناقشون أفكارهم بثقة ويتعلمون مواجهة الخجل والتنمر.',
      location: 'قاعة رَوَايَا – المنصورة',
    },
    {
      url: '/src/assets/images/prayer_father_child_circle_1790367254432.jpg',
      title: 'ملتقى «الصلاة رِباط» بين الآباء والأبناء',
      caption: 'صلاة جماعة وتصحيح عملي لهيئات الركوع والسجود، وغرس الخشوع ومحبة الوقوف بين يدي الله.',
      location: 'ملتقى رَوَايَا الأسري',
    },
    {
      url: '/src/assets/images/hero_rawaya_learning_1790367225382.jpg',
      title: 'حلقات التدبر التفاعلي لقصص القرآن',
      caption: 'طرح الأسئلة الحوارية: ماذا نتعلم من الآية؟ وكيف تطبقها في بيتك ومدرستك ومع أصدقائك؟',
      location: 'ورشة الفهم والتدبر',
    },
  ];

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-xs font-bold text-cyan-800 tracking-wider uppercase mb-2">
            معرض الأنشطة والتجارب
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 font-display mb-4">
            لحظات حقيقية من ورش وملتقيات «رَوَايَا»
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            بيئة تفاعلية حية تمنح طفلك الأمان ليُعبّر، ويفهم، ويبني صداقات صالحة تعينه على الثبات.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {photos.map((photo, idx) => (
            <div
              key={idx}
              onClick={() => setActivePhoto(photo.url)}
              className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-xs hover:shadow-md transition-all cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden bg-slate-100">
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                  <div className="p-2.5 rounded-full bg-slate-900/70 backdrop-blur-xs">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                </div>
              </div>

              <div className="p-5 text-right">
                <div className="flex items-center gap-1.5 text-[11px] text-cyan-700 font-semibold mb-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{photo.location}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1.5">{photo.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{photo.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-slate-900 rounded-2xl overflow-hidden p-2 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 left-4 z-10 p-2 bg-slate-900/80 text-white hover:bg-slate-800 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={activePhoto}
              alt="صورة مكبرة للورشة"
              className="max-h-[80vh] w-auto mx-auto rounded-xl object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      )}
    </section>
  );
};
