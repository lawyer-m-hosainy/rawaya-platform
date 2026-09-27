import React, { useState, useEffect } from 'react';
import { Trash2, MessageSquare } from 'lucide-react';
import { enrollmentService, Enrollment } from '../../services/enrollmentService';

export function AdminEnrollments() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEnrollments();
  }, []);

  const loadEnrollments = async () => {
    try {
      setLoading(true);
      const data = await enrollmentService.getEnrollments();
      setEnrollments(data);
    } catch (error) {
      console.error('Error loading enrollments:', error);
      alert('حدث خطأ أثناء تحميل التسجيلات');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: Enrollment['status']) => {
    try {
      await enrollmentService.updateEnrollmentStatus(id, newStatus);
      setEnrollments(prev => prev.map(e => e.id === id ? { ...e, status: newStatus } : e));
    } catch (error) {
      console.error('Error updating status:', error);
      alert('حدث خطأ أثناء تحديث الحالة');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا التسجيل؟ لا يمكن التراجع عن هذا الإجراء.')) {
      try {
        await enrollmentService.deleteEnrollment(id);
        setEnrollments(prev => prev.filter(e => e.id !== id));
      } catch (error) {
        console.error('Error deleting enrollment:', error);
        alert('حدث خطأ أثناء الحذف');
      }
    }
  };

  const handleOpenWhatsApp = (enrollment: Enrollment) => {
    const formattedPhone = enrollment.phone.replace(/\D/g, '');
    const message = encodeURIComponent(`مرحباً أ/ ${enrollment.parent_name}، نتواصل معكِ من منصة رَوَايَا بخصوص تسجيل ابنك/ابنتك ${enrollment.child_name} في برنامج (${enrollment.program_title}).`);
    window.open(`https://wa.me/${formattedPhone}?text=${message}`, '_blank');
  };

  return (
    <div className="space-y-6 text-right">
      <div className="flex justify-between items-center border-b border-slate-200 pb-4">
        <h2 className="text-2xl font-bold text-slate-800">طلبات التسجيل</h2>
      </div>

      {loading ? (
        <div className="text-center py-8 text-slate-500">جاري التحميل...</div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-right text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="p-4 font-semibold text-slate-700">التاريخ</th>
                <th className="p-4 font-semibold text-slate-700">ولي الأمر</th>
                <th className="p-4 font-semibold text-slate-700">الطفل</th>
                <th className="p-4 font-semibold text-slate-700">البرنامج</th>
                <th className="p-4 font-semibold text-slate-700">الحالة</th>
                <th className="p-4 font-semibold text-slate-700">التواصل / إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {enrollments.map((enrollment) => (
                <tr key={enrollment.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 text-slate-500" dir="ltr">
                    {new Date(enrollment.created_at).toLocaleDateString('ar-EG')}
                  </td>
                  <td className="p-4 font-medium text-slate-800">
                    {enrollment.parent_name}
                    <div className="text-xs text-slate-500 mt-1" dir="ltr">{enrollment.phone}</div>
                  </td>
                  <td className="p-4 text-slate-600">
                    {enrollment.child_name}
                    <div className="text-xs text-slate-500 mt-1">{enrollment.child_age} سنة</div>
                  </td>
                  <td className="p-4 text-slate-800 font-semibold max-w-[200px] truncate" title={enrollment.program_title}>
                    {enrollment.program_title}
                  </td>
                  <td className="p-4">
                    <select
                      value={enrollment.status}
                      onChange={(e) => handleStatusChange(enrollment.id, e.target.value as Enrollment['status'])}
                      className={`text-xs font-semibold rounded-lg px-2 py-1.5 border cursor-pointer outline-none ${
                        enrollment.status === 'confirmed'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : enrollment.status === 'contacted'
                          ? 'bg-cyan-50 text-cyan-800 border-cyan-200'
                          : enrollment.status === 'cancelled'
                          ? 'bg-rose-50 text-rose-800 border-rose-200'
                          : 'bg-amber-50 text-amber-800 border-amber-200'
                      }`}
                    >
                      <option value="new">طلب جديد</option>
                      <option value="contacted">تم التواصل</option>
                      <option value="confirmed">مؤكد</option>
                      <option value="cancelled">ملغي</option>
                    </select>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenWhatsApp(enrollment)}
                        className="p-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-lg transition-colors flex items-center gap-1 text-xs font-bold"
                        title="تواصل واتساب"
                      >
                        <MessageSquare size={16} />
                        واتساب
                      </button>
                      <button
                        onClick={() => handleDelete(enrollment.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="حذف"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {enrollments.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">
                    لا توجد طلبات تسجيل حالياً.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
