import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, ArrowLeft, RotateCcw, Sparkles, Shield, Heart } from 'lucide-react';

interface DiagnosticQuizProps {
  onSelectRecommendedProgram: (programName: string) => void;
}

export const DiagnosticQuiz: React.FC<DiagnosticQuizProps> = ({ onSelectRecommendedProgram }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [completed, setCompleted] = useState(false);

  const questions = [
    {
      title: '١. كيف يتعامل طفلك عندما يرى مشهداً أو فكرة غريبة تخالف فطرته على الشاشة؟',
      options: [
        { text: 'يتأثر بها سريعاً ويقلدها في كلامه وحركاته دون إدراك للخطأ.', score: 1 },
        { text: 'يستغرب أو يرتبك ويسكت، ولا يملك رداً أو بياناً لما يشعر به.', score: 2 },
        { text: 'يميز الخطأ فوراً، ولديه وعي داخلي وحصانة تجعله يرفضها بثقة.', score: 3 },
      ],
    },
    {
      title: '٢. ما هي العلاقة الحقيقية لطفلك مع القرآن الكريم حالياً؟',
      options: [
        { text: 'يراها مادة للحفظ الإجباري وتسميع الحروف فقط وينفر منها أحياناً.', score: 1 },
        { text: 'يحفظ بانتظام لكنه لا يفهم معاني الآيات ولا يشعر أنها تخاطب واقعه.', score: 2 },
        { text: 'يتدبر الآيات ويستشهد بها في مواقفه اليومية ويجد فيها ملجأه وراحته.', score: 3 },
      ],
    },
    {
      title: '٣. كيف يؤدي طفلك الصلاة في يومه؟',
      options: [
        { text: 'لا يصلي إلا بعد إلحاح شديد أو لتجنب اللوم والعقاب.', score: 1 },
        { text: 'يصلي حركات ميكانيكية سريعة جداً دون استشعار للخشوع أو محبة الوقوف بين يدي الله.', score: 2 },
        { text: 'يبادر للصلاة بنفسه، ويحب أن يقف بجانب والديه في صلاة الجماعة.', score: 3 },
      ],
    },
    {
      title: '٤. كيف يتصرف طفلك عند مواجهة التنمر أو ضغوط الأقران في المدرسة؟',
      options: [
        { text: 'ينقاد للآخرين بسهولة خوفاً من السخرية، ويهتز تقديره لذاته.', score: 1 },
        { text: 'يكتم مشاعره في قلبه ويتردد في الدفاع عن نفسه أو إبداء رأيه.', score: 2 },
        { text: 'واثق من نفسه، يعتز بأخلاقه وهويته بجرأة وأدب دون انقياد أو خوف.', score: 3 },
      ],
    },
  ];

  const handleSelectOption = (score: number) => {
    const updated = [...answers, score];
    setAnswers(updated);
    if (currentStep + 1 < questions.length) {
      setCurrentStep(currentStep + 1);
    } else {
      setCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers([]);
    setCompleted(false);
  };

  // Determine recommendation based on total score
  const totalScore = answers.reduce((a, b) => a + b, 0);

  let recommendation = {
    title: 'برنامج وَمِن ذُرِّيَّتِنَا + ورشة أنمّي ثقتي',
    diagnosis: 'طفلك بحاجة ماسة لتعزيز الحصانة الفكرية وتثبيت دعائم العقيدة والثقة بالنفس قبل أن يتعرض لمزيد من التشتت والارتباك.',
    actionPlan: 'نوصي ببدء رحلة رَوَايَا فوراً من خلال ورشة الثقة وبناء الشخصية لتتحول قناعاته إلى سلوك شجاع يحميه من الشبهات.',
    targetProgram: 'ورشة أنمّي ثقتي (سلسلة لِتَعَارَفُوا)',
  };

  if (totalScore >= 10) {
    recommendation = {
      title: 'مسار نُور البَيَان والإتقان القرآني المتقدم',
      diagnosis: 'ما شاء الله! طفلك يمتلك أساساً طيباً، وهو مؤهل الآن لتعميق التدبر وحفظ القرآن بالسند المتصل والإجازة مع استثمار وعيه في القيادة والتأثير.',
      actionPlan: 'نوصي بإشراكه في مسار نور البيان القرآني لترسيخ الأحكام والتلاوة الفصيحة مع الاستمرار في ملتقى الصلاة الأسري.',
      targetProgram: 'مسار نُور البَيَان والإتقان القرآني',
    };
  } else if (totalScore >= 7) {
    recommendation = {
      title: 'سلسلة لِتَعَارَفُوا + ملتقى الصلاة رِباط',
      diagnosis: 'طفلك لديه بذور طيبة لكنه يمر بمرحلة صمت وتردد، وقد ينقاد تدريجياً لغيره إن لم يجد البيئة الآمنة التي تُنطقه وتثبته.',
      actionPlan: 'نوصي بالتركيز على جانب الفهم والحوار التربوي من خلال ورش سلسلة لتعارفوا وملتقى الصلاة الأسري.',
      targetProgram: 'ورشة أنمّي ثقتي (سلسلة لِتَعَارَفُوا)',
    };
  }

  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-xs font-bold text-cyan-800 tracking-wider uppercase mb-2">
            استبيان الوعي التربوي المجاني
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mb-3">
            مقياس وعي وبصيرة طفلك
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            ٤ أسئلة صريحة تمنحك تشخيصاً دقيقاً لمدى جاهزية طفلك النفسية والدينية لمواجهة مؤثرات العصر، والمسار الأنسب له في «رَوَايَا».
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs">
          {!completed ? (
            <div>
              {/* Progress Tracker (Clean typography, no mechanical slashes) */}
              <div className="flex items-center justify-between text-xs text-slate-500 mb-6">
                <span>السؤال {currentStep + 1} من {questions.length}</span>
                <span className="font-semibold text-cyan-800">
                  {Math.round(((currentStep + 1) / questions.length) * 100)}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mb-8">
                <div
                  className="bg-cyan-700 h-full transition-all duration-300 rounded-full"
                  style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                />
              </div>

              {/* Question Title */}
              <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display mb-6 leading-snug">
                {questions[currentStep].title}
              </h3>

              {/* Options */}
              <div className="space-y-3">
                {questions[currentStep].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(option.score)}
                    className="w-full text-right p-4 rounded-xl border border-slate-200 bg-white hover:border-cyan-500 hover:bg-cyan-50/30 transition-all text-xs sm:text-sm text-slate-700 leading-relaxed cursor-pointer flex items-center justify-between group"
                  >
                    <span>{option.text}</span>
                    <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:text-cyan-700 group-hover:-translate-x-1 transition-all shrink-0 mr-3" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center animate-in fade-in">
              <div className="w-14 h-14 bg-cyan-100 text-cyan-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-7 h-7" />
              </div>

              <h3 className="text-xl font-bold text-slate-900 font-display mb-2">
                نتيجة التقييم والتشخيص التربوي
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                بناءً على إجاباتك الصريحة حول واقع طفلك
              </p>

              <div className="bg-white rounded-2xl p-6 border border-slate-200 text-right mb-6 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-bold text-cyan-800 mb-2">
                  <Shield className="w-4 h-4" />
                  <span>المسار المرشح لطفلك:</span>
                </div>
                <h4 className="text-lg font-bold text-slate-900 font-display mb-3">
                  {recommendation.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4">
                  {recommendation.diagnosis}
                </p>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600">
                  <span className="font-bold text-slate-800">خطوتك القادمة: </span>
                  {recommendation.actionPlan}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => onSelectRecommendedProgram(recommendation.targetProgram)}
                  className="w-full sm:w-auto px-6 py-3 text-xs sm:text-sm font-bold text-white bg-cyan-700 hover:bg-cyan-800 rounded-lg shadow-sm transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>تسجيل طفلي في هذا المسار</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={resetQuiz}
                  className="w-full sm:w-auto px-4 py-3 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>إعادة التقييم</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
