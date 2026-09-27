import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Check, Save, Eye, EyeOff } from 'lucide-react';
import { programService, Program } from '../../services/programService';

export function AdminPrograms() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProgram, setEditingProgram] = useState<Partial<Program> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadPrograms();
  }, []);

  const loadPrograms = async () => {
    try {
      setLoading(true);
      const data = await programService.getPrograms(false); // get all including inactive
      setPrograms(data);
    } catch (error) {
      console.error('Error loading programs:', error);
      alert('حدث خطأ أثناء تحميل البرامج');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProgram?.title) {
      alert('الرجاء إدخال اسم البرنامج');
      return;
    }
    
    // Ensure highlights is an array of strings
    if (typeof editingProgram.highlights === 'string') {
        editingProgram.highlights = (editingProgram.highlights as string).split('\n').filter(h => h.trim() !== '');
    }

    try {
      if (editingProgram.id) {
        await programService.updateProgram(editingProgram.id, editingProgram);
      } else {
        await programService.createProgram(editingProgram);
      }
      setIsModalOpen(false);
      setEditingProgram(null);
      loadPrograms();
    } catch (error) {
      console.error('Error saving program:', error);
      alert('حدث خطأ أثناء الحفظ');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا البرنامج نهائياً؟')) {
      try {
        await programService.deleteProgram(id);
        loadPrograms();
      } catch (error) {
        console.error('Error deleting program:', error);
        alert('حدث خطأ أثناء الحذف');
      }
    }
  };

  const handleToggleActive = async (program: Program) => {
    try {
      await programService.updateProgram(program.id, { is_active: !program.is_active });
      loadPrograms();
    } catch (error) {
      console.error('Error toggling state:', error);
      alert('حدث خطأ أثناء تغيير الحالة');
    }
  };

  return (
    <div className="space-y-6 text-right">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">إدارة البرامج والمسارات</h2>
        <button
          onClick={() => { setEditingProgram({ is_active: true, highlights: [] }); setIsModalOpen(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
        >
          <Plus size={20} />
          <span>برنامج جديد</span>
        </button>
      </div>

      {loading ? (
        <div className="text-center py-8 text-slate-500">جاري التحميل...</div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-slate-200">
          <table className="w-full text-right">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="p-4 font-semibold text-slate-700">اسم البرنامج</th>
                <th className="p-4 font-semibold text-slate-700">الفئة العمرية</th>
                <th className="p-4 font-semibold text-slate-700">الطريقة</th>
                <th className="p-4 font-semibold text-slate-700">الحالة</th>
                <th className="p-4 font-semibold text-slate-700 text-center">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {programs.map((prog) => (
                <tr key={prog.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-medium text-slate-800">{prog.title}</td>
                  <td className="p-4 text-slate-600">{prog.age_range || '-'}</td>
                  <td className="p-4 text-slate-600">{prog.format || '-'}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${prog.is_active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-800'}`}>
                      {prog.is_active ? 'متاح للتسجيل' : 'متوقف'}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleToggleActive(prog)}
                        className={`p-2 rounded-lg transition-colors ${prog.is_active ? 'text-amber-600 hover:bg-amber-50' : 'text-emerald-600 hover:bg-emerald-50'}`}
                        title={prog.is_active ? 'إيقاف البرنامج' : 'تفعيل البرنامج'}
                      >
                        {prog.is_active ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                      <button
                        onClick={() => { setEditingProgram({ ...prog, highlights: prog.highlights.join('\n') as any }); setIsModalOpen(true); }}
                        className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="تعديل"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(prog.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="حذف"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {programs.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500">لا توجد برامج حالياً</td>
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
                {editingProgram?.id ? 'تعديل البرنامج' : 'إضافة برنامج جديد'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <form id="program-form" onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">اسم البرنامج *</label>
                    <input
                      type="text"
                      value={editingProgram?.title || ''}
                      onChange={e => setEditingProgram({...editingProgram, title: e.target.value})}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">الفئة العمرية (أطفال/يافعين/أولياء أمور)</label>
                    <select
                      value={editingProgram?.category || 'kids'}
                      onChange={e => setEditingProgram({...editingProgram, category: e.target.value})}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                    >
                      <option value="kids">أطفال (4-12 سنة)</option>
                      <option value="teens">يافعين (13-18 سنة)</option>
                      <option value="parents">أولياء أمور</option>
                      <option value="all">الجميع</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">الفئة العمرية بالنص (مثال: من 6 إلى 9 سنوات)</label>
                    <input
                      type="text"
                      value={editingProgram?.age_range || ''}
                      onChange={e => setEditingProgram({...editingProgram, age_range: e.target.value})}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">المدة (مثال: شهر كامل - 8 جلسات)</label>
                    <input
                      type="text"
                      value={editingProgram?.duration || ''}
                      onChange={e => setEditingProgram({...editingProgram, duration: e.target.value})}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">طريقة الحضور (حضوري/أونلاين)</label>
                    <input
                      type="text"
                      value={editingProgram?.format || ''}
                      onChange={e => setEditingProgram({...editingProgram, format: e.target.value})}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">ترتيب العرض (رقم)</label>
                    <input
                      type="number"
                      value={editingProgram?.sort_order || 0}
                      onChange={e => setEditingProgram({...editingProgram, sort_order: parseInt(e.target.value)})}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">الوصف</label>
                  <textarea
                    value={editingProgram?.description || ''}
                    onChange={e => setEditingProgram({...editingProgram, description: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none h-24"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">المخرجات / المميزات (كل ميزة في سطر)</label>
                  <textarea
                    value={editingProgram?.highlights as any || ''}
                    onChange={e => setEditingProgram({...editingProgram, highlights: e.target.value as any})}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none h-24"
                    placeholder="ميزة 1&#10;ميزة 2&#10;ميزة 3"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={editingProgram?.is_active || false}
                    onChange={e => setEditingProgram({...editingProgram, is_active: e.target.checked})}
                    className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 border-slate-300"
                  />
                  <label htmlFor="is_active" className="text-sm font-medium text-slate-700">
                    متاح للتسجيل حالياً
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
                form="program-form"
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
