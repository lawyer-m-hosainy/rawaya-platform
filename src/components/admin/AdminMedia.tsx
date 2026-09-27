import React, { useState, useEffect } from 'react';
import { Plus, Trash2, X, Save, Image as ImageIcon, Video, Eye, EyeOff } from 'lucide-react';
import { mediaService, Media } from '../../services/mediaService';
import { supabase } from '../../lib/supabase';

export function AdminMedia() {
  const [mediaList, setMediaList] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingMedia, setEditingMedia] = useState<Partial<Media> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);

  useEffect(() => {
    loadMedia();
  }, []);

  const loadMedia = async () => {
    try {
      setLoading(true);
      const data = await mediaService.getMedia(false); // all media
      setMediaList(data);
    } catch (error) {
      console.error('Error loading media:', error);
      alert('حدث خطأ أثناء تحميل المعرض');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMedia?.title || !editingMedia?.url) {
      alert('الرجاء إدخال الوصف ورفع الملف');
      return;
    }

    try {
      if (editingMedia.id) {
        await mediaService.updateMediaEntry(editingMedia.id, editingMedia);
      } else {
        await mediaService.createMediaEntry(editingMedia);
      }
      setIsModalOpen(false);
      setEditingMedia(null);
      loadMedia();
    } catch (error) {
      console.error('Error saving media:', error);
      alert('حدث خطأ أثناء الحفظ');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا الملف نهائياً؟')) {
      try {
        await mediaService.deleteMediaEntry(id);
        loadMedia();
      } catch (error) {
        console.error('Error deleting media:', error);
        alert('حدث خطأ أثناء الحذف');
      }
    }
  };

  const handleTogglePublish = async (media: Media) => {
    try {
      await mediaService.updateMediaEntry(media.id, { is_published: !media.is_published });
      loadMedia();
    } catch (error) {
      console.error('Error toggling state:', error);
      alert('حدث خطأ أثناء تغيير الحالة');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      alert('نوع الملف غير مدعوم. يرجى رفع صورة بصيغة JPG أو PNG أو WebP فقط.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('حجم الملف كبير جداً. الحد الأقصى المسموح به هو 5 ميجابايت.');
      return;
    }

    const isVideo = file.type.startsWith('video/');
    
    setUploadingFile(true);
    try {
      const bucket = isVideo ? 'videos' : 'images';
      const url = await mediaService.uploadFile(file, bucket);
      
      setEditingMedia(prev => ({ 
        ...prev, 
        url, 
        type: isVideo ? 'video' : 'image',
        title: prev?.title || file.name.split('.')[0]
      }));
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('حدث خطأ أثناء الرفع');
    } finally {
      setUploadingFile(false);
    }
  };

  return (
    <div className="space-y-6 text-right">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">إدارة معرض الصور والفيديو</h2>
        <button
          onClick={() => { setEditingMedia({ is_published: true, type: 'image', sort_order: 0 }); setIsModalOpen(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
        >
          <Plus size={20} />
          <span>إضافة للمعرض</span>
        </button>
      </div>

      {loading ? (
        <div className="text-center py-8 text-slate-500">جاري التحميل...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mediaList.map((media) => (
            <div key={media.id} className={`bg-white rounded-xl shadow-sm border overflow-hidden relative group ${media.is_published ? 'border-slate-200' : 'border-slate-200 opacity-70'}`}>
              <div className="aspect-square bg-slate-100 relative">
                {media.type === 'image' ? (
                  <img src={media.url} alt={media.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-400">
                     <Video size={48} />
                  </div>
                )}
                
                {/* Actions Overlay */}
                <div className="absolute inset-0 bg-slate-900/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={() => handleTogglePublish(media)}
                    className={`p-2 rounded-full ${media.is_published ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'}`}
                    title={media.is_published ? 'إخفاء' : 'عرض'}
                  >
                    {media.is_published ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                  <button
                    onClick={() => handleDelete(media.id)}
                    className="p-2 bg-red-100 text-red-600 rounded-full"
                    title="حذف"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-bold text-sm text-slate-800 line-clamp-1">{media.title}</h3>
                <p className="text-xs text-slate-500 line-clamp-1">{media.location || 'بدون موقع'}</p>
              </div>
            </div>
          ))}
          {mediaList.length === 0 && (
            <div className="col-span-full p-8 text-center text-slate-500 bg-white rounded-xl border border-slate-200">
              المعرض فارغ حالياً
            </div>
          )}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col" dir="rtl">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-800">إضافة وسائط جديدة</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <form id="media-form" onSubmit={handleSave} className="space-y-4">
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">ملف الصورة أو الفيديو *</label>
                  <div className="flex flex-col gap-2">
                    {editingMedia?.url && (
                      <div className="text-xs text-emerald-600 font-bold bg-emerald-50 p-2 rounded border border-emerald-100 mb-2">
                        تم الرفع بنجاح!
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*,video/*"
                      onChange={handleFileUpload}
                      disabled={uploadingFile}
                      className="text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 w-full"
                    />
                    {uploadingFile && <span className="text-sm text-slate-500">جاري الرفع إلى Supabase... (قد يستغرق بعض الوقت للفيديو)</span>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">العنوان أو الوصف القصير *</label>
                  <input
                    type="text"
                    value={editingMedia?.title || ''}
                    onChange={e => setEditingMedia({...editingMedia, title: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">الموقع (مثال: مقر رَوَايَا، القاهرة)</label>
                  <input
                    type="text"
                    value={editingMedia?.location || ''}
                    onChange={e => setEditingMedia({...editingMedia, location: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">التعليق التفصيلي (يظهر تحت الصورة)</label>
                  <textarea
                    value={editingMedia?.caption || ''}
                    onChange={e => setEditingMedia({...editingMedia, caption: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none h-20"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="is_published"
                    checked={editingMedia?.is_published || false}
                    onChange={e => setEditingMedia({...editingMedia, is_published: e.target.checked})}
                    className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 border-slate-300"
                  />
                  <label htmlFor="is_published" className="text-sm font-medium text-slate-700">
                    نشر في المعرض فوراً
                  </label>
                </div>
              </form>
            </div>
            
            <div className="p-6 border-t border-slate-100 flex justify-end gap-3 bg-slate-50">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2 text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors font-medium"
              >
                إلغاء
              </button>
              <button
                type="submit"
                form="media-form"
                disabled={uploadingFile || !editingMedia?.url}
                className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium flex items-center gap-2 disabled:opacity-50"
              >
                <Save size={20} />
                <span>حفظ في المعرض</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
