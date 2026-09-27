/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { AboutRawaya } from '../components/AboutRawaya';
import { TeacherProfile } from '../components/TeacherProfile';
import { MethodologySection } from '../components/MethodologySection';
import { TadabburExplorer } from '../components/TadabburExplorer';
import { ProgramsSection } from '../components/ProgramsSection';
import { WorkshopsEvents } from '../components/WorkshopsEvents';
import { GallerySection } from '../components/GallerySection';
import { RawayaImpact } from '../components/RawayaImpact';
import { PartnersSection } from '../components/PartnersSection';
import { RawayaJournal } from '../components/RawayaJournal';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { DiagnosticQuiz } from '../components/DiagnosticQuiz';
import { FaqSection } from '../components/FaqSection';
import { PrintableGiftSection } from '../components/PrintableGiftSection';
import { EnrollmentSection } from '../components/EnrollmentSection';
import { Footer } from '../components/Footer';
import { EnrollmentModal } from '../components/EnrollmentModal';
import { FloatingWhatsApp } from '../components/FloatingWhatsApp';
import { AdminModal } from '../components/AdminModal';
import { PwaInstallPrompt } from '../components/PwaInstallPrompt';

export function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProgram, setModalProgram] = useState<string>('');
  const [adminOpen, setAdminOpen] = useState(false);

  // Keyboard shortcut: Ctrl+Shift+A or Alt+A opens Admin Dashboard
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') || (e.altKey && e.key.toLowerCase() === 'a')) {
        e.preventDefault();
        setAdminOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOpenEnrollment = (programName?: string) => {
    if (programName) {
      setModalProgram(programName);
    }
    setModalOpen(true);
  };

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const navbarOffset = 76;
      const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = Math.max(0, elementPosition - navbarOffset);
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleSelectRecommendedProgram = (programName: string) => {
    setModalProgram(programName);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-900">
      
      {/* Institutional Top Navbar */}
      <Navbar onOpenEnrollment={() => handleOpenEnrollment()} />

      <main className="grow">
        
        {/* 1. الرئيسية | Home */}
        <Hero
          onOpenEnrollment={() => handleOpenEnrollment()}
          onExplorePrograms={() => handleScrollToSection('about')}
        />

        {/* 2. عن روايا | About Rawaya: القصة، الفلسفة، بناء الطفل، الرؤية، والرسالة والقيم */}
        <AboutRawaya />

        {/* 3. عن المؤسِّسة | Founder: أ. نرمين الحسيني (الأزهر، السند المتصل، نور البيان، والخبرة) */}
        <TeacherProfile onOpenEnrollment={() => handleOpenEnrollment()} />

        {/* 4. منهجية روايا | Our Approach: التعلم بالفهم، الربط بالواقع، الحوار، وبناء السلوك */}
        <MethodologySection />

        {/* التطبيق العملي للمنهجية: مختبر التدبر القرآني */}
        <TadabburExplorer />

        {/* 5. البرامج والمسارات | Programs: مصنفة حسب المراحل العمرية (أطفال، يافعين، أسر) */}
        <ProgramsSection onSelectProgram={(progTitle) => handleOpenEnrollment(progTitle)} />

        {/* 6. الورش والفعاليات | Workshops & Events: اللقاءات الحية، معسكرات الصلاة، والندوات */}
        <WorkshopsEvents onRegisterEvent={(eventTitle) => handleOpenEnrollment(eventTitle)} />

        {/* المعرض المصور للورش والأنشطة التفاعلية */}
        <GallerySection />

        {/* 7. أثر روايا | Impact: أرقام، قصص تحول حقيقية، وانعكاس المنهج في سلوك البيت */}
        <RawayaImpact />

        {/* 8. شركاء النجاح | Partners: المرجعيات الأكاديمية والشركاء الميدانيين */}
        <PartnersSection />

        {/* 9. من روايا | Insights / Journal: مقالات وأفكار تربوية للأهل بمحتوى رصين */}
        <RawayaJournal />

        {/* أداة تقييم ومقياس وعي الطفل للآباء */}
        <DiagnosticQuiz onSelectRecommendedProgram={handleSelectRecommendedProgram} />

        {/* 10. تجارب أولياء الأمور | Testimonials: شهادات حقيقية وموثقة */}
        <TestimonialsSection />

        {/* 11. الأسئلة الشائعة | FAQ */}
        <FaqSection />

        {/* هدية رَوَايَا المجانية للأسرة: مفكرة الصلاة والتدبر A4 الجاهزة للطباعة والتلوين */}
        <PrintableGiftSection />

        {/* 12. تواصل معنا والتسجيل | Contact & Direct Registration */}
        <EnrollmentSection initialProgram={modalProgram} />

      </main>

      {/* Institutional Footer */}
      <Footer onOpenAdmin={() => setAdminOpen(true)} />

      {/* Quick Interactive Enrollment Modal */}
      <EnrollmentModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedProgramTitle={modalProgram}
      />

      {/* Protected Admin Management Modal */}
      <AdminModal
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
      />

      {/* Floating WhatsApp Quick Inquiries with Dynamic Ripple */}
      <FloatingWhatsApp />

      {/* PWA Mobile & Desktop Install Prompt */}
      <PwaInstallPrompt />

    </div>
  );
}
