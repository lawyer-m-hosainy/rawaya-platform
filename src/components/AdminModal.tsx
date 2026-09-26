import React, { useState, useEffect } from 'react';
import { X, Lock, Download, Trash2, Search, Filter, Phone, CheckCircle, Clock, AlertCircle, RefreshCw, BarChart3, Users, MessageSquare } from 'lucide-react';
import { leadStorage, EnrollmentLead } from '../services/leadStorage';
import { getMetrics, EventMetrics } from '../utils/analytics';
import { hashPin } from '../utils/hashUtils';
import { SITE_CONFIG } from '../config/siteConfig';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState(false);

  const [leads, setLeads] = useState<EnrollmentLead[]>([]);
  const [metrics, setMetrics] = useState<EventMetrics | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | EnrollmentLead['status']>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'leads' | 'analytics'>('leads');

  const loadData = () => {
    setLeads(leadStorage.getLeads());
    setMetrics(getMetrics());
  };

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      loadData();
    }
  }, [isOpen, isAuthenticated]);

  // Listen to live lead updates
  useEffect(() => {
    const handleUpdate = () => loadData();
    window.addEventListener('rawaya:leads_updated', handleUpdate);
    window.addEventListener('rawaya:lead_created', handleUpdate);
    return () => {
      window.removeEventListener('rawaya:leads_updated', handleUpdate);
      window.removeEventListener('rawaya:lead_created', handleUpdate);
    };
  }, []);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const inputHash = await hashPin(pin);
    if (inputHash === SITE_CONFIG.admin.secretPinHash) {
      setIsAuthenticated(true);
      setPinError(false);
      loadData();
    } else {
      setPinError(true);
    }
  };

  const handleStatusChange = (id: string, newStatus: EnrollmentLead['status']) => {
    leadStorage.updateLeadStatus(id, newStatus);
    loadData();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الطلب نهائياً؟')) {
      leadStorage.deleteLead(id);
      loadData();
    }
  };

  const handleOpenWhatsApp = (lead: EnrollmentLead) => {
    const cleanPhone = lead.phone.replace(/[^\d]/g, '');
    const message = encodeURIComponent(
      `السلام عليكم ورحمة الله أ. ${lead.parentName} الكريم، معكم إدارة مشروع «رَوَايَا» التربوي بخصوص طلب تسجيل نجلكم المبارك (${lead.childName}) في «${lead.programTitle}». يسعدنا التواصل معكم لتأكيد تفاصيل الحجز.`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  const filteredLeads = leads.filter((lead) => {
    if (statusFilter !== 'all' && lead.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        lead.parentName.toLowerCase().includes(q) ||
        lead.childName.toLowerCase().includes(q) ||
        lead.phone.includes(q) ||
        lead.programTitle.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6" dir="rtl">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 sm:p-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold font-display text-white">
                لوحة إدارة طلبات التسجيل | رَوَايَا
              </h3>
              <p className="text-xs text-slate-400">
                متابعة طلبات أولياء الأمور وإدارة الحجوزات والتحليلات
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content: PIN Authentication Form */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-cyan-50 text-cyan-700 flex items-center justify-center mx-auto mb-4 border border-cyan-100">
              <Lock className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-2">الدخول المحمي للإدارة</h4>
            <p className="text-xs text-slate-600 mb-6 leading-relaxed">
              هذه المنطقة مخصصة لأستاذة نرمين الحسيني وإدارة مشروع رَوَايَا لمتابعة الحجوزات.
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={pin}
                  onChange={(e) => {
                    setPin(e.target.value);
                    setPinError(false);
                  }}
                  placeholder="أدخل رمز الدخول (PIN)"
                  autoFocus
                  className="w-full text-center tracking-widest text-lg py-3 px-4 rounded-xl border border-slate-300 focus:border-cyan-600 focus:ring-2 focus:ring-cyan-500/20 outline-hidden font-mono"
                />
                {pinError && (
                  <p className="text-xs text-rose-600 mt-2 font-semibold">
                    رمز الدخول غير صحيح. يرجى المحاولة مرة أخرى.
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-cyan-700 hover:bg-cyan-800 text-white text-sm font-bold rounded-xl transition-all shadow-md cursor-pointer"
              >
                تأكيد الدخول
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard View */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Top Toolbar & Tabs */}
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('leads')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'leads'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>طلبات التسجيل ({leads.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'analytics'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>الإحصائيات والتحليلات</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => leadStorage.exportToCSV()}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
                  title="تصدير إلى ملف إكسل CSV"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>تصدير Excel (CSV)</span>
                </button>

                <button
                  onClick={loadData}
                  className="p-1.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-slate-600 transition-colors cursor-pointer"
                  title="تحديث البيانات"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Tab 1: Leads Management */}
            {activeTab === 'leads' && (
              <div className="flex-1 flex flex-col overflow-hidden">
                
                {/* Search & Filter Bar */}
                <div className="p-3 sm:p-4 bg-white border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="relative w-full sm:w-72">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="بحث بالاسم، رقم الهاتف، المسار..."
                      className="w-full pl-3 pr-8 py-2 text-xs rounded-xl border border-slate-200 focus:border-cyan-600 outline-hidden"
                    />
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>

                  {/* Status Pills */}
                  <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                    <span className="text-[11px] text-slate-500 font-semibold ml-1">الحالة:</span>
                    {(['all', 'new', 'contacted', 'confirmed', 'cancelled'] as const).map((st) => {
                      const labels: Record<string, string> = {
                        all: 'الكل',
                        new: 'جديد',
                        contacted: 'تم التواصل',
                        confirmed: 'تم التأكيد',
                        cancelled: 'ملغي',
                      };
                      return (
                        <button
                          key={st}
                          onClick={() => setStatusFilter(st)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                            statusFilter === st
                              ? 'bg-cyan-700 text-white'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {labels[st]}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Table / List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {filteredLeads.length === 0 ? (
                    <div className="text-center py-12 text-slate-500 text-xs">
                      {leads.length === 0
                        ? 'لا توجد طلبات تسجيل حتى الآن. ستظهر الطلبات هنا فور ملء أولياء الأمور للنموذج.'
                        : 'لا توجد نتائج تطابق خيارات الفرز المحددة.'}
                    </div>
                  ) : (
                    filteredLeads.map((lead) => (
                      <div
                        key={lead.id}
                        className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs hover:shadow-xs transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-4"
                      >
                        <div className="space-y-1 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs font-bold text-slate-900">
                              {lead.parentName}
                            </span>
                            <span className="text-[10px] text-slate-500 font-mono bg-slate-100 px-2 py-0.5 rounded-md">
                              {new Date(lead.createdAt).toLocaleDateString('ar-EG', {
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                                lead.learningMode === 'in-person'
                                  ? 'bg-amber-100 text-amber-900'
                                  : 'bg-blue-100 text-blue-900'
                              }`}
                            >
                              {lead.learningMode === 'in-person' ? 'حضوري (المنصورة)' : 'عن بُعد (زووم)'}
                            </span>
                          </div>

                          <div className="text-xs text-slate-600 flex flex-wrap items-center gap-x-4 gap-y-1">
                            <span>
                              الطفل: <strong className="text-slate-800">{lead.childName}</strong> ({lead.childAge} سنوات)
                            </span>
                            <span>
                              المسار: <strong className="text-cyan-800 font-semibold">{lead.programTitle}</strong>
                            </span>
                            {lead.city && <span>المدينة: {lead.city}</span>}
                          </div>

                          {lead.notes && (
                            <p className="text-[11px] text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-100">
                              💬 ملاحظات ولي الأمر: {lead.notes}
                            </p>
                          )}
                        </div>

                        {/* Controls */}
                        <div className="flex items-center gap-2 shrink-0 border-t md:border-t-0 pt-2 md:pt-0">
                          {/* Direct WhatsApp button */}
                          <button
                            onClick={() => handleOpenWhatsApp(lead)}
                            className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                            title="مراسلة عبر واتساب"
                          >
                            <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                            <span>واتساب</span>
                          </button>

                          {/* Status Dropdown */}
                          <select
                            value={lead.status}
                            onChange={(e) => handleStatusChange(lead.id, e.target.value as any)}
                            className={`text-xs font-semibold rounded-xl px-2.5 py-1.5 border cursor-pointer outline-hidden ${
                              lead.status === 'confirmed'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                : lead.status === 'contacted'
                                ? 'bg-cyan-50 text-cyan-800 border-cyan-200'
                                : lead.status === 'cancelled'
                                ? 'bg-rose-50 text-rose-800 border-rose-200'
                                : 'bg-amber-50 text-amber-800 border-amber-200'
                            }`}
                          >
                            <option value="new">جديد ⏳</option>
                            <option value="contacted">تم التواصل 📞</option>
                            <option value="confirmed">تم التأكيد ✅</option>
                            <option value="cancelled">ملغي ❌</option>
                          </select>

                          {/* Delete */}
                          <button
                            onClick={() => handleDelete(lead.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                            title="حذف الطلب"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Tab 2: Analytics & Metrics */}
            {activeTab === 'analytics' && (
              <div className="p-6 overflow-y-auto space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
                    <p className="text-2xl font-black text-slate-900 font-display">
                      {leads.length}
                    </p>
                    <p className="text-xs text-slate-600 font-semibold mt-1">إجمالي طلبات التسجيل</p>
                  </div>

                  <div className="bg-cyan-50 border border-cyan-200 rounded-2xl p-4 text-center">
                    <p className="text-2xl font-black text-cyan-900 font-display">
                      {metrics?.whatsappClicks || 0}
                    </p>
                    <p className="text-xs text-cyan-800 font-semibold mt-1">نقرات محادثات الواتساب</p>
                  </div>

                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center">
                    <p className="text-2xl font-black text-emerald-900 font-display">
                      {leads.filter((l) => l.status === 'confirmed').length}
                    </p>
                    <p className="text-xs text-emerald-800 font-semibold mt-1">حجوزات مؤكدة</p>
                  </div>

                  <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 text-center">
                    <p className="text-2xl font-black text-purple-900 font-display">
                      {metrics?.quizCompletions || 0}
                    </p>
                    <p className="text-xs text-purple-800 font-semibold mt-1">اختبارات وعي الطفل المكتملة</p>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-4">
                  <h4 className="text-xs font-bold text-slate-800 mb-3">توزيع الحجوزات حسب المسار التعليمي:</h4>
                  <div className="space-y-2">
                    {Object.entries(
                      leads.reduce((acc, lead) => {
                        acc[lead.programTitle] = (acc[lead.programTitle] || 0) + 1;
                        return acc;
                      }, {} as Record<string, number>)
                    ).map(([title, count]) => (
                      <div key={title} className="flex items-center justify-between text-xs">
                        <span className="text-slate-700">{title}</span>
                        <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md">
                          {count} طلب
                        </span>
                      </div>
                    ))}
                    {leads.length === 0 && (
                      <p className="text-xs text-slate-400">ستظهر الرسوم البيانية عند استلام أول طلب.</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Footer Status */}
            <div className="p-3 bg-slate-100 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
              <span>جميع البيانات محفوظة محلياً وتعمل بدون انقطاع.</span>
              <button
                onClick={() => setIsAuthenticated(false)}
                className="text-slate-600 hover:text-slate-900 underline cursor-pointer"
              >
                تسجيل الخروج من الإدارة
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
