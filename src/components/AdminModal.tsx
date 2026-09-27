import React, { useState, useEffect } from 'react';
import { X, LayoutDashboard, FileText, Image as ImageIcon, BookOpen, MessageSquare, Users, Settings, LogOut } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { AdminArticles } from './admin/AdminArticles';
import { AdminPrograms } from './admin/AdminPrograms';
import { AdminMedia } from './admin/AdminMedia';
import { AdminTestimonials } from './admin/AdminTestimonials';
import { AdminEnrollments } from './admin/AdminEnrollments';
import { AdminSettings } from './admin/AdminSettings';
// Import other tabs as they are created

type Tab = 'dashboard' | 'articles' | 'media' | 'programs' | 'testimonials' | 'enrollments' | 'settings';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check initial auth state
    supabase.auth.getSession().then(({ data: { session } }: any) => {
      setIsAuthenticated(!!session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
    } catch (error: any) {
      setAuthError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-sm" dir="rtl">
      <div className="bg-white rounded-2xl sm:rounded-[2rem] shadow-2xl w-full max-w-6xl h-[95vh] sm:h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-100 bg-slate-50/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-700">
              <Settings size={24} />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-800">لوحة تحكم رَوَايَا</h2>
              {isAuthenticated && (
                <p className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  متصل
                </p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content area */}
        <div className="flex flex-1 overflow-hidden">
          
          {!isAuthenticated ? (
            // Login Form
            <div className="flex-1 flex flex-col items-center justify-center p-6 bg-slate-50">
              <div className="w-full max-w-sm bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <LayoutDashboard size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800">تسجيل الدخول</h3>
                  <p className="text-sm text-slate-500 mt-2">يرجى تسجيل الدخول للوصول إلى لوحة التحكم</p>
                </div>
                
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">البريد الإلكتروني</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                      required
                      dir="ltr"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">كلمة المرور</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                      required
                      dir="ltr"
                    />
                  </div>
                  
                  {authError && <p className="text-red-500 text-sm font-medium text-center">{authError}</p>}
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors disabled:opacity-50"
                  >
                    {loading ? 'جاري التحقق...' : 'دخول'}
                  </button>
                </form>
              </div>
            </div>
          ) : (
            // Admin Interface
            <div className="flex flex-1 overflow-hidden">
              {/* Sidebar Tabs */}
              <div className="w-48 sm:w-64 bg-slate-50 border-l border-slate-100 flex flex-col shrink-0">
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                  <TabButton id="dashboard" icon={<LayoutDashboard size={20} />} label="الرئيسية" activeTab={activeTab} onClick={setActiveTab} />
                  <TabButton id="articles" icon={<FileText size={20} />} label="المقالات" activeTab={activeTab} onClick={setActiveTab} />
                  <TabButton id="media" icon={<ImageIcon size={20} />} label="المعرض" activeTab={activeTab} onClick={setActiveTab} />
                  <TabButton id="programs" icon={<BookOpen size={20} />} label="البرامج" activeTab={activeTab} onClick={setActiveTab} />
                  <TabButton id="testimonials" icon={<MessageSquare size={20} />} label="الشهادات" activeTab={activeTab} onClick={setActiveTab} />
                  <TabButton id="enrollments" icon={<Users size={20} />} label="التسجيلات" activeTab={activeTab} onClick={setActiveTab} />
                  <TabButton id="settings" icon={<Settings size={20} />} label="الإعدادات" activeTab={activeTab} onClick={setActiveTab} />
                </nav>
                <div className="p-4 border-t border-slate-200">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium"
                  >
                    <LogOut size={20} />
                    <span>تسجيل الخروج</span>
                  </button>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 p-6 overflow-y-auto bg-white">
                {activeTab === 'dashboard' && (
                  <div className="text-center py-20 text-slate-500">
                    <LayoutDashboard size={48} className="mx-auto mb-4 opacity-50" />
                    <h3 className="text-xl font-medium text-slate-700">مرحباً بك في لوحة تحكم رَوَايَا</h3>
                    <p className="mt-2">اختر أحد الأقسام من القائمة الجانبية للبدء</p>
                  </div>
                )}
                {activeTab === 'articles' && <AdminArticles />}
                {activeTab === 'media' && <AdminMedia />}
                {activeTab === 'programs' && <AdminPrograms />}
                {activeTab === 'testimonials' && <AdminTestimonials />}
                {activeTab === 'enrollments' && <AdminEnrollments />}
                {activeTab === 'settings' && <AdminSettings />}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface TabButtonProps {
  id: Tab;
  icon: React.ReactNode;
  label: string;
  activeTab: Tab;
  onClick: (id: Tab) => void;
}

function TabButton({ id, icon, label, activeTab, onClick }: TabButtonProps) {
  const isActive = activeTab === id;
  return (
    <button
      onClick={() => onClick(id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
        isActive
          ? 'bg-emerald-100 text-emerald-800'
          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
