import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Check, Eye, EyeOff, Save } from 'lucide-react';
import { articleService, Article } from '../../services/articleService';
import { supabase } from '../../lib/supabase';

export function AdminArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingArticle, setEditingArticle] = useState<Partial<Article> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      setLoading(true);
      const data = await articleService.getArticles(false); // get all including unpublished
      setArticles(data);
    } catch (error) {
      console.error('Error loading articles:', error);
      alert('حدث خطأ أثناء تحميل المقالات');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle?.title || !editingArticle?.content) {
      alert('الرجاء إدخال العنوان والمحتوى');
      return;
    }
    
    // Auto generate slug if new
    if (!editingArticle.id && !editingArticle.slug) {
        editingArticle.slug = editingArticle.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    }

    try {
      if (editingArticle.id) {
        await articleService.updateArticle(editingArticle.id, editingArticle);
      } else {
        await articleService.createArticle(editingArticle);
      }
      setIsModalOpen(false);
      setEditingArticle(null);
      loadArticles();
    } catch (error) {
      console.error('Error saving article:', error);
      alert('حدث خطأ أثناء الحفظ');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا المقال نهائياً؟')) {
      try {
        await articleService.deleteArticle(id);
        loadArticles();
      } catch (error) {
        console.error('Error deleting article:', error);
        alert('حدث خطأ أثناء الحذف');
      }
    }
  };

  const handleTogglePublish = async (article: Article) => {
    try {
      await articleService.updateArticle(article.id, { is_published: !article.is_published });
      loadArticles();
    } catch (error) {
      console.error('Error toggling publish state:', error);
      alert('حدث خطأ أثناء تغيير حالة النشر');
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    
    setUploadingImage(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage.from('images').upload(fileName, file);
      if (uploadError) throw uploadError;
      
      const { data } = supabase.storage.from('images').getPublicUrl(fileName);
      setEditingArticle(prev => ({ ...prev, cover_image: data.publicUrl }));
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('حدث خطأ أثناء رفع الصورة');
    } finally {
      setUploadingImage(false);
    }
  };

  return (
    <div className="space-y-6 text-right">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">إدارة المقالات</h2>
        <button
          onClick={() => { setEditingArticle({ is_published: false }); setIsModalOpen(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
        >
          <Plus size={20} />
          <span>مقال جديد</span>
        </button>
      </div>

      {loading ? (
        <div className="text-center py-8 text-slate-500">جاري التحميل...</div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-slate-200">
          <table className="w-full text-right">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="p-4 font-semibold text-slate-700">العنوان</th>
                <th className="p-4 font-semibold text-slate-700">التصنيف</th>
                <th className="p-4 font-semibold text-slate-700">الحالة</th>
                <th className="p-4 font-semibold text-slate-700">التاريخ</th>
                <th className="p-4 font-semibold text-slate-700 text-center">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {articles.map((article) => (
                <tr key={article.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-medium text-slate-800">{article.title}</td>
                  <td className="p-4 text-slate-600">{article.category || '-'}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${article.is_published ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-800'}`}>
                      {article.is_published ? 'منشور' : 'مسودة'}
                    </span>
                  </td>
                  <td className="p-4 text-slate-500 text-sm">{new Date(article.created_at).toLocaleDateString('ar-EG')}</td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleTogglePublish(article)}
                        className={`p-2 rounded-lg transition-colors ${article.is_published ? 'text-amber-600 hover:bg-amber-50' : 'text-emerald-600 hover:bg-emerald-50'}`}
                        title={article.is_published ? 'إخفاء (مسودة)' : 'نشر'}
                      >
                        {article.is_published ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                      <button
                        onClick={() => { setEditingArticle(article); setIsModalOpen(true); }}
                        className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="تعديل"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(article.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="حذف"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {articles.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500">لا توجد مقالات حالياً</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col" dir="rtl">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-800">
                {editingArticle?.id ? 'تعديل مقال' : 'إضافة مقال جديد'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <form id="article-form" onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">العنوان *</label>
                  <input
                    type="text"
                    value={editingArticle?.title || ''}
                    onChange={e => setEditingArticle({...editingArticle, title: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">التصنيف</label>
                    <input
                      type="text"
                      value={editingArticle?.category || ''}
                      onChange={e => setEditingArticle({...editingArticle, category: e.target.value})}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">الرابط المخصص (Slug)</label>
                    <input
                      type="text"
                      value={editingArticle?.slug || ''}
                      onChange={e => setEditingArticle({...editingArticle, slug: e.target.value})}
                      placeholder="سيتم توليده تلقائياً إن ترك فارغاً"
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">ملخص (Excerpt)</label>
                  <textarea
                    value={editingArticle?.excerpt || ''}
                    onChange={e => setEditingArticle({...editingArticle, excerpt: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none h-20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">صورة الغلاف</label>
                  <div className="flex items-center gap-4">
                    {editingArticle?.cover_image && (
                      <img src={editingArticle.cover_image} alt="Cover" className="h-16 w-16 object-cover rounded-lg border border-slate-200" />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                      className="text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                    />
                    {uploadingImage && <span className="text-sm text-slate-500">جاري الرفع...</span>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">المحتوى *</label>
                  <textarea
                    value={editingArticle?.content || ''}
                    onChange={e => setEditingArticle({...editingArticle, content: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none h-64 font-mono text-sm"
                    required
                    dir="auto"
                  />
                  <p className="text-xs text-slate-500 mt-1">يدعم تنسيق Markdown.</p>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="is_published"
                    checked={editingArticle?.is_published || false}
                    onChange={e => setEditingArticle({...editingArticle, is_published: e.target.checked})}
                    className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 border-slate-300"
                  />
                  <label htmlFor="is_published" className="text-sm font-medium text-slate-700">
                    نشر المقال فوراً
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
                form="article-form"
                className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium flex items-center gap-2"
              >
                <Save size={20} />
                <span>حفظ</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
