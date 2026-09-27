import React, { useState, useEffect } from 'react';
import { Sparkles, Maximize2, X, MapPin } from 'lucide-react';
import { mediaService, Media } from '../services/mediaService';

export const GallerySection: React.FC = () => {
  const [activePhoto, setActivePhoto] = useState<Media | null>(null);
  const [mediaList, setMediaList] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMedia();
  }, []);

  const loadMedia = async () => {
    try {
      setLoading(true);
      const data = await mediaService.getMedia(true);
      setMediaList(data);
    } catch (error) {
      console.error('Error loading gallery:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="gallery" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-xs font-bold text-cyan-800 tracking-wider uppercase mb-2">
            معرض الفعاليات والنشاطات
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 font-display mb-4">
            لقطات حقيقية من ورش وفعاليات «رَوَايَا»
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            بيئة تعليمية حية تعكس تفاعل أبنائنا وبناتنا، ونشاطات تصنع ذكريات تربوية على أرض الواقع.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-pulse flex items-center gap-2 text-cyan-600 font-bold">
              جاري تحميل المعرض...
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mediaList.map((mediaItem) => (
              <div
                key={mediaItem.id}
                onClick={() => setActivePhoto(mediaItem)}
                className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <div className="relative h-64 overflow-hidden bg-slate-100">
                  {mediaItem.type === 'video' ? (
                    <video
                      src={mediaItem.url}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      muted
                      playsInline
                    />
                  ) : (
                    <img
                      src={mediaItem.url}
                      alt={mediaItem.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                  )}
                  
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                    <div className="p-2.5 rounded-full bg-slate-900/70 backdrop-blur-sm">
                      <Maximize2 className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                <div className="p-5 text-right flex flex-col justify-between h-full">
                  <div>
                    {mediaItem.location && (
                      <div className="flex items-center gap-1.5 text-[11px] text-cyan-700 font-semibold mb-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{mediaItem.location}</span>
                      </div>
                    )}
                    <h3 className="text-sm font-bold text-slate-900 mb-1.5">{mediaItem.title}</h3>
                    {mediaItem.caption && (
                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">{mediaItem.caption}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {mediaList.length === 0 && (
              <div className="col-span-full text-center py-12 text-slate-500 bg-white rounded-3xl border border-slate-200">
                لا توجد صور في المعرض حالياً.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] bg-slate-900 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
            dir="rtl"
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 left-4 z-10 p-2 bg-slate-900/80 text-white hover:bg-slate-800 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="flex-1 overflow-hidden flex items-center justify-center bg-black">
                {activePhoto.type === 'video' ? (
                  <video
                    src={activePhoto.url}
                    controls
                    autoPlay
                    className="max-h-[70vh] w-full object-contain"
                  />
                ) : (
                  <img
                    src={activePhoto.url}
                    alt={activePhoto.title}
                    className="max-h-[70vh] w-auto mx-auto object-contain"
                    referrerPolicy="no-referrer"
                  />
                )}
            </div>
            
            <div className="p-6 bg-slate-900 text-white border-t border-slate-800 text-right">
              <h3 className="text-lg font-bold mb-2">{activePhoto.title}</h3>
              {activePhoto.caption && (
                <p className="text-sm text-slate-300 leading-relaxed">{activePhoto.caption}</p>
              )}
              {activePhoto.location && (
                <div className="flex items-center gap-1.5 text-[12px] text-cyan-400 font-semibold mt-3">
                  <MapPin className="w-4 h-4" />
                  <span>{activePhoto.location}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
