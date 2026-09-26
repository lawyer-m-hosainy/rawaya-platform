import React from 'react';

interface RawayaLogoProps {
  className?: string;
  variant?: 'horizontal' | 'badge' | 'emblem-only';
  inverted?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
}

export const RawayaLogo: React.FC<RawayaLogoProps> = ({
  className = '',
  variant = 'horizontal',
  inverted = false,
  size = 'md',
  showTagline = true,
}) => {
  // Brand color palette extracted directly from official logo (IMG-20260925-WA0036.jpg)
  const greyColor = inverted ? '#F8FAFC' : '#58585A';
  const cyanColor = inverted ? '#70C8F4' : '#6EC5F3';
  const textColor = inverted ? 'text-white' : 'text-[#58585A]';
  const subtextColor = inverted ? 'text-cyan-300' : 'text-[#58585A]';

  // SVG Emblem strictly matching the official geometry
  const EmblemSvg = ({ widthClass = 'w-10 h-10' }: { widthClass?: string }) => (
    <div className={`relative shrink-0 ${widthClass} flex items-center justify-center select-none`}>
      <svg
        viewBox="-4 -6 188 120"
        className="w-full h-full drop-shadow-xs overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ============================================================
            ZONE 1: LEFT BLOCK (spells 'يـا' with two square dots below)
           ============================================================ */}
        {/* Top-left dark grey square */}
        <rect x="0" y="10" width="24" height="24" fill={greyColor} />

        {/* Top-right cyan horizontal rectangle */}
        <rect x="34" y="10" width="38" height="14" fill={cyanColor} />

        {/* Middle dark grey body (chair / inverted-L connector) */}
        {/* Left vertical stem descending from top-left */}
        <rect x="0" y="34" width="24" height="24" fill={greyColor} />
        {/* Horizontal crossbar connecting to the right */}
        <rect x="24" y="34" width="48" height="24" fill={greyColor} />

        {/* Two bottom square dots of letter Yaa (ي) */}
        {/* Dot 1 (left) */}
        <rect x="0" y="66" width="24" height="22" fill={greyColor} />
        {/* Dot 2 (right) */}
        <rect x="48" y="66" width="24" height="22" fill={greyColor} />

        {/* ============================================================
            ZONE 2: CENTER PILLAR (Alif / straight stem)
           ============================================================ */}
        <rect x="84" y="10" width="24" height="78" fill={greyColor} />

        {/* ============================================================
            ZONE 3: 2nd FROM RIGHT (Raa / stepped pillar with cyan accent)
           ============================================================ */}
        {/* Top cyan slanted mark (Fathah accent) */}
        <polygon
          points="120,4 144,-1 144,11 120,16"
          fill={cyanColor}
        />
        
        {/* Dark grey body with stepped bottom cutout */}
        {/* Top portion of Column 3 with slanted top edge */}
        <polygon
          points="108,20 144,14 144,56 108,56"
          fill={greyColor}
        />
        {/* Bottom leg on the right descending to baseline */}
        <rect x="120" y="56" width="24" height="32" fill={greyColor} />

        {/* ============================================================
            ZONE 4: FAR RIGHT PILLAR (Alif with cyan accent)
           ============================================================ */}
        {/* Top cyan slanted mark (Fathah accent) */}
        <polygon
          points="156,4 180,-1 180,11 156,16"
          fill={cyanColor}
        />

        {/* Vertical dark grey pillar with slanted top edge */}
        <polygon
          points="156,20 180,14 180,88 156,88"
          fill={greyColor}
        />

        {/* ============================================================
            ZONE 5: FULL-WIDTH HORIZONTAL CYAN BAR
           ============================================================ */}
        <rect x="0" y="94" width="180" height="14" fill={cyanColor} />
      </svg>
    </div>
  );

  // Variant 1: Complete official Badge / Vertical stack (Exact match to uploaded image)
  if (variant === 'badge') {
    return (
      <div className={`flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-sm text-center max-w-[280px] select-none ${className}`}>
        {/* Official Geometric Emblem */}
        <div className="w-48 h-32 mb-2 flex items-center justify-center">
          <EmblemSvg widthClass="w-44 h-28" />
        </div>

        {/* RAWAYA in clean spaced geometric caps */}
        <div 
          className="text-sm sm:text-base font-bold tracking-[0.38em] text-[#58585A] uppercase pl-[0.38em] my-1"
          style={{ fontFamily: "'Alexandria', sans-serif" }}
        >
          RAWAYA
        </div>

        {/* رسالة ودراية in exact brand typography */}
        <div 
          className="text-lg sm:text-xl font-bold text-[#58585A] mt-0.5 tracking-wide"
          style={{ fontFamily: "'Cairo', 'Alexandria', sans-serif" }}
        >
          رســـالـــة ودرايـــة
        </div>
      </div>
    );
  }

  // Variant 2: Emblem only
  if (variant === 'emblem-only') {
    const sizeMap = {
      sm: 'w-8 h-8',
      md: 'w-10 h-10',
      lg: 'w-14 h-14',
      xl: 'w-20 h-20',
    };
    return <EmblemSvg widthClass={sizeMap[size]} />;
  }

  // Variant 3: Default Horizontal Navbar / Header Brand Lockup
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-18 h-18',
  };

  return (
    <div className={`flex items-center gap-3.5 select-none ${className}`}>
      {/* Official Exact Geometric Emblem */}
      <EmblemSvg widthClass={iconSizes[size]} />

      {/* Typography with identical font family and balance */}
      <div className="flex flex-col text-right leading-none">
        <div className="flex items-baseline gap-2">
          {/* Main Brand Arabic Name */}
          <span
            className={`font-extrabold text-xl sm:text-2xl tracking-tight transition-colors ${textColor}`}
            style={{ fontFamily: "'Cairo', 'Alexandria', sans-serif" }}
          >
            رَوَايَا
          </span>
          {/* English tracking matching logo */}
          <span
            className={`text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase ${subtextColor}`}
            style={{ fontFamily: "'Alexandria', sans-serif" }}
          >
            RAWAYA
          </span>
        </div>

        {/* Tagline matching the exact typography of "رسالة ودراية" */}
        {showTagline && (
          <span
            className={`text-[11px] sm:text-xs font-semibold tracking-wide mt-1 ${subtextColor}`}
            style={{ fontFamily: "'Cairo', 'Alexandria', sans-serif" }}
          >
            رســـالـــة ودرايـــة
          </span>
        )}
      </div>
    </div>
  );
};
