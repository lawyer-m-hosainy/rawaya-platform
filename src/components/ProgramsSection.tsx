import React, { useState } from 'react';
import { programService, Program } from '../services/programService';
import { Users, MapPin, Check, ArrowLeft, Sparkles } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

interface ProgramsSectionProps {
  onSelectProgram: (programTitle: string) => void;
}

export const ProgramsSection: React.FC<ProgramsSectionProps> = ({ onSelectProgram }) => {
  const [filter, setFilter] = useState<'all' | 'kids' | 'teens' | 'parents'>('all');
  
  const { data: programs = [], isLoading: loading } = useQuery({
    queryKey: ['programs', { activeOnly: true }],
    queryFn: () => programService.getPrograms(true)
  });

  const ageTiers = [
    { id: 'all', name: 'لجميع الفئات', count: `${programs.length} برامج` },
    { id: 'kids', name: 'أطفال (4 - 12 سنة)', count: `${programs.filter(p => p.category === 'kids').length} برنامج` },
    { id: 'teens', name: 'يافعين (13 - 18 سنة)', count: `${programs.filter(p => p.category === 'teens').length} برنامج` },
    { id: 'parents', name: 'أولياء أمور', count: `${programs.filter(p => p.category === 'parents').length} برنامج` },
  ];

  const filteredPrograms = programs.filter((prog) => {
    if (filter === 'all') return true;
    return prog.category === filter || prog.category === 'all';
  });

  return (
    <section id="programs" className="py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-100 text-cyan-900 text-xs font-bold mb-3 border border-cyan-200">
            <Sparkles className="w-3.5 h-3.5 text-cyan-700" />
            <span>البرامج والمسارات</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight mb-4">
            برامج رَوَايَا التربوية المتاحة للتسجيل
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            برامج مصممة بعناية لتناسب كل مرحلة عمرية وتلبي احتياجاتها وتغرس القيم بأسلوب تفاعلي وممتع.
          </p>
        </div>

        {/* Age Tier Category Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-14">
          {ageTiers.map((tier) => (
            <button
              key={tier.id}
              onClick={() => setFilter(tier.id as any)}
              className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex flex-col items-center ${
                filter === tier.id
                  ? 'bg-slate-900 text-white shadow-md ring-2 ring-cyan-600'
                  : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <span>{tier.name}</span>
              <span className={`text-[10px] mt-0.5 font-normal ${
                filter === tier.id ? 'text-cyan-300' : 'text-slate-500'
              }`}>
                {tier.count}
              </span>
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-pulse flex items-center gap-2 text-cyan-600 font-bold">
              
            </div>
          </div>
        ) : (
          /* Programs Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPrograms.map((prog) => (
              <div
                key={prog.id}
                className="bg-slate-50/70 rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-cyan-400 transition-all flex flex-col justify-between text-right group"
              >
                <div>
                  {/* Meta Badges */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[11px] font-bold px-3 py-1 rounded-md bg-white border border-slate-200 text-slate-700 shadow-2xs">
                      {prog.age_range}
                    </span>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-cyan-100 text-cyan-800">
                      {prog.duration}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-display mb-2 group-hover:text-cyan-800 transition-colors">
                    {prog.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-normal line-clamp-3">
                    {prog.description}
                  </p>

                  {/* Logistics */}
                  <div className="space-y-2 mb-6 pb-6 border-b border-slate-200 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-cyan-700 shrink-0" />
                      <span>{prog.format}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-cyan-700 shrink-0" />
                      <span>مجموعات تفاعلية محدودة العدد</span>
                    </div>
                  </div>

                  {/* Highlights / Outcomes */}
                  {prog.highlights && prog.highlights.length > 0 && (
                    <div className="mb-6">
                      <p className="text-[11px] font-bold text-slate-800 mb-2.5">أهم المخرجات والمميزات:</p>
                      <ul className="space-y-2 text-xs text-slate-600">
                        {prog.highlights.slice(0, 3).map((highlight: string, i: number) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Action */}
                <button
                  onClick={() => onSelectProgram(prog.title)}
                  className="w-full py-3 px-4 bg-slate-900 group-hover:bg-cyan-700 text-white text-xs sm:text-sm font-bold rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer mt-auto"
                >
                  <span>سجل الآن في هذا البرنامج</span>
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                </button>
              </div>
            ))}
            
            {filteredPrograms.length === 0 && (
              <div className="col-span-full text-center py-12 text-slate-500 bg-slate-50 rounded-3xl border border-slate-200">
                لا توجد برامج متاحة في هذا التصنيف حالياً.
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
};
