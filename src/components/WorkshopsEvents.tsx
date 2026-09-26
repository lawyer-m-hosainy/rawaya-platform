import React, { useState } from 'react';
import { Calendar, MapPin, Users, Sparkles, Clock, CheckCircle, ArrowLeft } from 'lucide-react';

interface EventItem {
  id: string;
  title: string;
  category: 'ورشة حضورية' | 'فعالية أسرية' | 'معسكر أونلاين' | 'مبادرة مجتمعية';
  date: string;
  location: string;
  targetAudience: string;
  description: string;
  status: 'التسجيل مفتوح' | 'مقاعد محدودة' | 'اكتمل العدد' | 'منعقدة دورياً';
  statusColor: string;
  highlights: string[];
}

interface WorkshopsEventsProps {
  onRegisterEvent: (eventTitle: string) => void;
}

export const WorkshopsEvents: React.FC<WorkshopsEventsProps> = ({ onRegisterEvent }) => {
  const events: EventItem[] = [
    {
      id: 'prayer-workshop',
      title: 'ملتقى «الصلاة رحلة مش تكليف» للأطفال وأولياء الأمور',
      category: 'فعالية أسرية',
      date: 'الجمعة من كل أسبوعين (حضوري بالمنصورة)',
      location: 'قاعة رَوَايَا التفاعلية – المنصورة',
      targetAudience: 'الأطفال (٧-١٢ سنة) برفقة الأب أو الأم',
      description: 'لقاء عملي يفكك أسباب تثاقل الأبناء عن الصلاة، ويشرح أسرار الحركات والأذكار وخشوع القلب بطريقة حسية وتفاعلية تزرع حب الوقوف بين يدي الله.',
      status: 'مقاعد محدودة',
      statusColor: 'bg-amber-100 text-amber-800 border-amber-200',
      highlights: ['تطبيق عملي للوضوء والخشوع', 'جلسة حوارية خاصة لأولياء الأمور', 'حقيبة صلاتي المبهجة كهدية'],
    },
    {
      id: 'identity-camp',
      title: 'معسكر «بناء الوعي والهوية المتوازنة» لليافعين',
      category: 'معسكر أونلاين',
      date: 'السبت والأربعاء (مساءً عبر زووم)',
      location: 'فصول تفاعلية مباشرة عبر زووم (للمحافظات والدول العربية والغربية)',
      targetAudience: 'اليافعين والفتيات (١٢-١٦ سنة)',
      description: 'حلقات نقاشية ثرية تهدف إلى تعزيز الثقة المعرفية وتنمية مهارات التفكير الناقد والحوار الراقي، ليقف الشاب والفتاة على أرضية صلبة من الفهم والاعتزاز بهويتهم.',
      status: 'التسجيل مفتوح',
      statusColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      highlights: ['حوار تفاعلي مفتوح باحترام متبادل', 'تأصيل معرفي بالمنطق والحكمة', 'مجموعات نقاش صغيرة ومتابعة فردية'],
    },
    {
      id: 'noor-bayan-intensive',
      title: 'ورشة «نور البيان القرآني التأسيسي» للصغار',
      category: 'ورشة حضورية',
      date: 'الأحد والثلاثاء (صباحاً ومساءً)',
      location: 'مقر رَوَايَا – المنصورة',
      targetAudience: 'الأطفال من سن ٥ إلى ٨ سنوات',
      description: 'مسار تأسيسي تفاعلي يبسط قواعد التهجي والقراءة برفق وتشويق، ليتحول أول لقاء للطفل بالمصحف إلى تجربة إنجاز مبهجة وفخر حقيقي.',
      status: 'منعقدة دورياً',
      statusColor: 'bg-cyan-100 text-cyan-800 border-cyan-200',
      highlights: ['معلمات معتمدات بإشراف أ. نرمين', 'أنشطة حسية وألعاب لغوية', 'تخريج الطفل وهو يقرأ من المصحف مباشرة'],
    },
    {
      id: 'parenting-symposium',
      title: 'ندوة «التربية الواعية في العصر الرقمي: حوار وبناء توازن»',
      category: 'مبادرة مجتمعية',
      date: 'الخميس الأخير من كل شهر',
      location: 'حضوري بالمنصورة وبث مباشر عبر زووم',
      targetAudience: 'الآباء، الأمهات، والمربون',
      description: 'لقاء توعوي ثري يقدم مفاتيح عملية لبناء جسور الصداقة مع الأبناء، وتوجيه استخدام التكنولوجيا بذكاء وإيجابية داخل الأسرة.',
      status: 'التسجيل مفتوح',
      statusColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      highlights: ['دليل إرشادي للتوازن الرقمي الأسري', 'فقرة أسئلة واستشارات حية', 'شهادة مشاركة للحضور'],
    },
  ];

  const [activeCategory, setActiveCategory] = useState<string>('الكل');

  const filteredEvents = activeCategory === 'الكل'
    ? events
    : events.filter(e => e.category === activeCategory);

  return (
    <section id="events" className="py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-100 text-cyan-900 text-xs font-bold mb-3 border border-cyan-200">
            <Calendar className="w-3.5 h-3.5 text-cyan-700" />
            <span>الحراك الميداني والمبادرات التفاعلية</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight mb-4">
            الورش والفعاليات التربوية في «رَوَايَا»
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            ملتقيات حية وأنشطة غامرة بالمنصورة وأونلاين تجمع الأبناء والأسر حول مائدة القرآن والحوار البنّاء.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {['الكل', 'ورشة حضورية', 'فعالية أسرية', 'معسكر أونلاين', 'مبادرة مجتمعية'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-cyan-700 text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Events Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between text-right"
            >
              <div>
                {/* Meta Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span className="text-[11px] font-bold px-3 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                    {evt.category}
                  </span>
                  <span className={`text-[11px] font-bold px-3 py-1 rounded-md border ${evt.statusColor}`}>
                    {evt.status}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-display mb-3">
                  {evt.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                  {evt.description}
                </p>

                {/* Practical Details */}
                <div className="space-y-2 mb-6 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-cyan-600 shrink-0" />
                    <span><strong>الموعد:</strong> {evt.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-cyan-600 shrink-0" />
                    <span><strong>المكان:</strong> {evt.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-cyan-600 shrink-0" />
                    <span><strong>الفئة المستهدفة:</strong> {evt.targetAudience}</span>
                  </div>
                </div>

                {/* Event Key Highlights */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 mb-6">
                  <p className="text-[11px] font-bold text-slate-800 mb-2">أبرز مخرجات الفعالية:</p>
                  <div className="space-y-1.5">
                    {evt.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                        <CheckCircle className="w-3.5 h-3.5 text-cyan-700 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onRegisterEvent(evt.title)}
                className="w-full py-3 px-4 bg-slate-900 hover:bg-cyan-700 active:bg-cyan-800 text-white text-xs sm:text-sm font-bold rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>احجز مقعد طفلك في هذه الفعالية</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
