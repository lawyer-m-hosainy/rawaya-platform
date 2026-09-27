import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Check, Save, Eye, EyeOff } from 'lucide-react';
import { testimonialService, Testimonial } from '../../services/testimonialService';

export function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTestimonial, setEditingTestimonial] = useState<Partial<Testimonial> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      setLoading(true);
      const data = await testimonialService.getTestimonials(false); // get all including unpublished
      setTestimonials(data);
    } catch (error) {
      console.error('Error loading testimonials:', error);
      alert('حدث خطأ أثناء تحميل الشهادات');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTestimonial?.parent_name || !editingTestimonial?.text) {
      alert('الرجاء إدخال اسم ولي الأمر ونص الشهادة');
      return;
    }

    try {
      if (editingTestimonial.id) {
        await testimonialService.updateTestimonial(editingTestimonial.id, editingTestimonial);
      } else {
        await testimonialService.createTestimonial(editingTestimonial);
      }
      setIsModalOpen(false);
      setEditingTestimonial(null);
      loadTestimonials();
    } catch (error) {
      console.error('Error saving testimonial:', error);
      alert('حدث خطأ أثناء الحفظ');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذه الشهادة نهائياً؟')) {
      try {
        await testimonialService.deleteTestimonial(id);
        loadTestimonials();
      } catch (error) {
        console.error('Error deleting testimonial:', error);
        alert('حدث خطأ أثناء الحذف');
      }
    }
  };

  const handleTogglePublish = async (testimonial: Testimonial) => {
    try {
      await testimonialService.updateTestimonial(testimonial.id, { is_published: !testimonial.is_published });
      loadTestimonials();
    } catch (error) {
      console.error('Error toggling state:', error);
      alert('حدث خطأ أثناء تغيير الحالة');
    }
  };

  return (
    <div className="space-y-6 text-right">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">إدارة شهادات أولياء الأمور</h2>
        <button
          onClick={() => { setEditingTestimonial({ is_published: true }); setIsModalOpen(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
        >
          <Plus size={20} />
          <span>شهادة جديدة</span>
        </button>
      </div>

      {loading ? (
        <div className="text-center py-8 text-slate-500">جاري التحميل...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-3">
                   <h3 className="font-bold text-slate-800">{testimonial.parent_name}</h3>
                   <span className={`text-xs px-2 py-1 rounded-full ${testimonial.is_published ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'}`}>
                     {testimonial.is_published ? 'منشور' : 'مخفي'}
                   </span>
                </div>
                <div className="text-xs text-slate-500 mb-3 flex flex-wrap gap-2">
                   {testimonial.child_name && <span>ابن/ة: {testimonial.child_name}</span>}
                   {testimonial.location && <span>({testimonial.location})</span>}
                </div>
                <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100 mb-3 italic">
                  "{testimonial.text}"
                </p>
                {testimonial.impact_highlight && (
                  <p className="text-xs font-bold text-emerald-700 bg-emerald-50 p-2 rounded border border-emerald-100">
                    الأثر: {testimonial.impact_highlight}
                  </p>
                )}
              </div>
              
              <div className="flex items-center justify-end gap-2 mt-4 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => handleTogglePublish(testimonial)}
                    className={`p-2 rounded-lg transition-colors ${testimonial.is_published ? 'text-amber-600 hover:bg-amber-50' : 'text-emerald-600 hover:bg-emerald-50'}`}
                    title={testimonial.is_published ? 'إخفاء الشهادة' : 'نشر الشهادة'}
                  >
                    {testimonial.is_published ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  <button
                    onClick={() => { setEditingTestimonial(testimonial); setIsModalOpen(true); }}
                    className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    title="تعديل"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(testimonial.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="حذف"
                  >
                    <Trash2 size={18} />
                  </button>
              </div>
            </div>
          ))}
          {testimonials.length === 0 && (
            <div className="col-span-full p-8 text-center text-slate-500 bg-white rounded-xl border border-slate-200">
              لا توجد شهادات حالياً
            </div>
          )}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl max-h-[90vh] overflow-hidden flex flex-col" dir="rtl">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-800">
                {editingTestimonial?.id ? 'تعديل الشهادة' : 'إضافة شهادة جديدة'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <form id="testimonial-form" onSubmit={handleSave} className="space-y-4">
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">اسم ولي الأمر *</label>
                    <input
                      type="text"
                      value={editingTestimonial?.parent_name || ''}
                      onChange={e => setEditingTestimonial({...editingTestimonial, parent_name: e.target.value})}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">المكان / المدينة</label>
                    <input
                      type="text"
                      value={editingTestimonial?.location || ''}
                      onChange={e => setEditingTestimonial({...editingTestimonial, location: e.target.value})}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">اسم الابن/الابنة</label>
                    <input
                      type="text"
                      value={editingTestimonial?.child_name || ''}
                      onChange={e => setEditingTestimonial({...editingTestimonial, child_name: e.target.value})}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">عمر الابن/الابنة</label>
                    <input
                      type="text"
                      value={editingTestimonial?.child_age || ''}
                      onChange={e => setEditingTestimonial({...editingTestimonial, child_age: e.target.value})}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">نص الشهادة *</label>
                  <textarea
                    value={editingTestimonial?.text || ''}
                    onChange={e => setEditingTestimonial({...editingTestimonial, text: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none h-24"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">الأبرز أو الأثر (مثال: الثقة بالنفس، حب القرآن)</label>
                  <input
                    type="text"
                    value={editingTestimonial?.impact_highlight || ''}
                    onChange={e => setEditingTestimonial({...editingTestimonial, impact_highlight: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="is_published"
                    checked={editingTestimonial?.is_published || false}
                    onChange={e => setEditingTestimonial({...editingTestimonial, is_published: e.target.checked})}
                    className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 border-slate-300"
                  />
                  <label htmlFor="is_published" className="text-sm font-medium text-slate-700">
                    نشر الشهادة في الموقع فوراً
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
                form="testimonial-form"
                className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium flex items-center gap-2"
              >
                <Save size={20} />
                <span>حفظ الشهادة</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
