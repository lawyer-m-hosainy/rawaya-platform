import React, { useState, useEffect, useCallback } from 'react';
import { RawayaLogo } from './RawayaLogo';
import { Menu, X, PhoneCall } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

interface NavbarProps {
  onOpenEnrollment: () => void;
}

interface NavItem {
  name: string;
  href: string;
  id: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEnrollment }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Exact navigation structure requested for an elite educational institution
  const navLinks: NavItem[] = [
    { name: 'الرئيسية', href: '/#hero', id: 'hero' },
    { name: 'عن روايا', href: '/#about', id: 'about' },
    { name: 'المؤسِّسة', href: '/#founder', id: 'founder' },
    { name: 'منهجيتنا', href: '/#methodology', id: 'methodology' },
    { name: 'برامجنا', href: '/#programs', id: 'programs' },
    { name: 'الفعاليات', href: '/#events', id: 'events' },
    { name: 'أثر روايا', href: '/#impact', id: 'impact' },
    { name: 'المحتوى', href: '/#insights', id: 'insights' },
    { name: 'تواصل معنا', href: '/#contact', id: 'contact' },
  ];

  // Smooth scroll handler with offset for sticky navbar
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (targetId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('hero');
      return;
    }

    const element = document.getElementById(targetId);
    if (element) {
      const navbarOffset = 76;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = Math.max(0, elementPosition - navbarOffset);

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveSection(targetId);
    }
  };

  // Scroll spy to highlight active section as user scrolls
  const updateActiveSection = useCallback(() => {
    const scrollPosition = window.scrollY + 140;
    setScrolled(window.scrollY > 20);

    const sectionIds = navLinks.map((l) => l.id);
    
    // Check if at the bottom of the page
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
      setActiveSection(navLinks[navLinks.length - 1].id);
      return;
    }

    for (let i = sectionIds.length - 1; i >= 0; i--) {
      const id = sectionIds[i];
      const section = document.getElementById(id);
      if (section) {
        const top = section.offsetTop;
        if (scrollPosition >= top) {
          setActiveSection(id);
          break;
        }
      }
    }
  }, [navLinks]);

  useEffect(() => {
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    updateActiveSection();
    return () => window.removeEventListener('scroll', updateActiveSection);
  }, [updateActiveSection]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-200/80 py-2.5'
          : 'bg-white/90 backdrop-blur-xs border-b border-slate-100 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Zone 1: Rawaya Project Brand */}
          <a
            href="#hero"
            onClick={(e) => handleScrollTo(e, 'hero')}
            className="flex items-center group focus-visible:outline-hidden cursor-pointer"
          >
            <RawayaLogo size="md" />
          </a>

          {/* Zone 2: Professional Navigation Links */}
          <nav className="hidden xl:flex items-center gap-5 text-[13px] font-medium">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.id)}
                  className={`relative py-1 transition-colors whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'text-cyan-800 font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span
                      className="absolute -bottom-1.5 inset-x-0 h-0.5 bg-cyan-700 rounded-full transition-all duration-300"
                      aria-hidden="true"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Direct Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsapp.number}?text=${encodeURIComponent(SITE_CONFIG.whatsapp.defaultMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-slate-700 hover:text-slate-900 px-3 py-2 transition-colors flex items-center gap-1.5"
            >
              <PhoneCall className="w-3.5 h-3.5 text-cyan-600" />
              <span>استفسار</span>
            </a>
            <button
              onClick={onOpenEnrollment}
              className="px-4 py-2.5 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-cyan-700 active:bg-cyan-800 transition-colors shadow-xs whitespace-nowrap cursor-pointer"
            >
              سجّل لطفلك الآن
            </button>
          </div>

          {/* Mobile / Tablet menu toggle */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={onOpenEnrollment}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-md"
            >
              سجّل الآن
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 shadow-lg animate-in fade-in slide-in-from-top-2">
          <nav className="grid grid-cols-2 gap-1.5">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.id)}
                  className={`text-xs py-2.5 px-3 rounded-xl transition-colors flex items-center justify-between ${
                    isActive
                      ? 'text-cyan-800 font-bold bg-cyan-50/80 border-r-2 border-cyan-600'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-600" />
                  )}
                </a>
              );
            })}
          </nav>
          <div className="pt-3 mt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEnrollment();
              }}
              className="w-full text-center py-2.5 text-xs font-semibold text-white bg-cyan-700 rounded-lg"
            >
              سجّل لطفلك الآن
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
