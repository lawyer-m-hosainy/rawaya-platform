import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowRight } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans" dir="rtl">
      <Navbar onOpenEnrollment={() => {}} />

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="relative">
            <h1 className="text-9xl font-black text-slate-200">404</h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-slate-800 bg-slate-50 px-4">عفواً!</span>
            </div>
          </div>
          
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
            الصفحة التي تبحث عنها غير موجودة
          </h2>
          
          <p className="text-slate-600">
            قد يكون تم نقل الصفحة أو حذفها، أو أنك قمت بكتابة الرابط بشكل خاطئ. لا تقلق، يمكنك دائماً العودة للرئيسية.
          </p>
          
          <div className="pt-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors shadow-sm"
            >
              <Home size={20} />
              <span>العودة للصفحة الرئيسية</span>
              <ArrowRight size={16} className="rotate-180 opacity-70" />
            </Link>
          </div>
        </div>
      </main>

      <Footer onOpenAdmin={() => {}} />
    </div>
  );
}
