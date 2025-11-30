import React, { useState, useEffect, useRef } from 'react';
import { QUESTIONS, UI_TEXT } from './constants';
import { Answer, Language, QuizState, CareerResult } from './types';
import { calculateScores, getCareerSuggestions } from './services/scoring';
import { encodeState, decodeState } from './services/urlUtils';
import SimpleRadarChart from './components/RadarChart';

// Icons
const CheckIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>;
const ChevronRight = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>;
const ChevronLeft = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>;
const MoonIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>;
const SunIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
const ShareIcon = () => <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>;

function App() {
  const [lang, setLang] = useState<Language>('bn');
  const [darkMode, setDarkMode] = useState(false);
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [results, setResults] = useState<CareerResult[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedResult, setSelectedResult] = useState<CareerResult | null>(null);
  const [copied, setCopied] = useState(false);

  // Initialize
  useEffect(() => {
    // Theme
    const isDark = localStorage.getItem('theme') === 'dark' || 
                   (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDarkMode(isDark);
    if (isDark) document.documentElement.classList.add('dark');

    // Check URL for shared results
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const data = params.get('data');
    if (data) {
      const sharedAnswers = decodeState(data);
      if (sharedAnswers) {
        setAnswers(sharedAnswers);
        finishQuiz(sharedAnswers);
        setStarted(true);
      }
    } else {
      // Local storage restore
      const saved = localStorage.getItem('quiz_answers');
      if (saved) {
        const parsed = JSON.parse(saved);
        setAnswers(parsed);
        const count = Object.keys(parsed).length;
        if (count === QUESTIONS.length) {
           // Optionally auto-finish? Let's just restore progress
           setCurrentQIndex(Math.min(count, QUESTIONS.length - 1));
        } else {
           setCurrentQIndex(count);
        }
      }
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
    if (newMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  };

  const finishQuiz = (finalAnswers: Record<number, number>) => {
    const scores = calculateScores(finalAnswers);
    const suggestions = getCareerSuggestions(scores, lang);
    setResults(suggestions);
    setIsFinished(true);
  };

  const handleAnswer = (val: number) => {
    const question = QUESTIONS[currentQIndex];
    const newAnswers = { ...answers, [question.id]: val };
    setAnswers(newAnswers);
    localStorage.setItem('quiz_answers', JSON.stringify(newAnswers));

    if (currentQIndex < QUESTIONS.length - 1) {
      setTimeout(() => setCurrentQIndex(currentQIndex + 1), 200); // Small delay for UX
    } else {
      finishQuiz(newAnswers);
    }
  };

  const handleBack = () => {
    if (currentQIndex > 0) setCurrentQIndex(currentQIndex - 1);
  };

  const handleRetake = () => {
    setAnswers({});
    setCurrentQIndex(0);
    setIsFinished(false);
    localStorage.removeItem('quiz_answers');
    window.location.hash = '';
  };

  const handleShare = () => {
    const encoded = encodeState(answers);
    const url = `${window.location.origin}${window.location.pathname}#/?data=${encoded}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Derived state
  const currentQ = QUESTIONS[currentQIndex];
  const progress = ((currentQIndex) / QUESTIONS.length) * 100;

  // -- VIEWS --

  const Landing = () => (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center max-w-2xl mx-auto animate-fade-in">
      <div className="mb-8 p-4 bg-teal-100 dark:bg-teal-900 rounded-full inline-block">
        <svg className="w-16 h-16 text-teal-600 dark:text-teal-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
      </div>
      <h1 className="text-4xl font-bold mb-4 text-slate-800 dark:text-white">{UI_TEXT[lang].welcome}</h1>
      <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
        {UI_TEXT[lang].subtitle}
      </p>
      <button 
        onClick={() => setStarted(true)}
        className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 px-10 rounded-full shadow-lg transition transform hover:scale-105 flex items-center gap-2"
      >
        <span>{UI_TEXT[lang].start}</span>
        <ChevronRight />
      </button>
      <div className="mt-8 text-sm text-slate-500">
        🕒 ~5 mins &bull; 15 Questions &bull; Free
      </div>
    </div>
  );

  const QuizView = () => (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 max-w-2xl mx-auto">
      <div className="w-full mb-8">
        <div className="flex justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
          <span>{UI_TEXT[lang].question} {currentQIndex + 1} {UI_TEXT[lang].of} {QUESTIONS.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
          <div className="bg-teal-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl w-full min-h-[300px] flex flex-col justify-center">
        <h2 className="text-2xl font-bold mb-8 text-center text-slate-800 dark:text-white leading-snug">
          {lang === 'bn' ? currentQ.text_bn : currentQ.text_en}
        </h2>

        <div className="space-y-4">
           <div className="flex justify-between text-xs text-slate-400 px-2 mb-2">
              <span>{UI_TEXT[lang].stronglyDisagree}</span>
              <span>{UI_TEXT[lang].stronglyAgree}</span>
           </div>
           <div className="flex gap-2 justify-between">
              {[1, 2, 3, 4, 5].map((val) => (
                <button
                  key={val}
                  onClick={() => handleAnswer(val)}
                  aria-label={`Rate ${val} out of 5`}
                  className={`
                    w-full aspect-square rounded-xl flex items-center justify-center text-xl font-bold transition-all border-2
                    ${answers[currentQ.id] === val 
                      ? 'bg-teal-600 border-teal-600 text-white scale-105' 
                      : 'bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:border-teal-400 hover:bg-teal-50 dark:hover:bg-slate-600'}
                  `}
                >
                  {val}
                </button>
              ))}
           </div>
        </div>
      </div>

      <div className="w-full flex justify-between mt-8">
        <button 
          onClick={handleBack}
          disabled={currentQIndex === 0}
          className="flex items-center text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white disabled:opacity-30 transition"
        >
          <ChevronLeft /> {UI_TEXT[lang].back}
        </button>
      </div>
    </div>
  );

  const ResultView = () => (
    <div className="min-h-screen p-4 md:p-8 max-w-5xl mx-auto animate-fade-in-up">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">{UI_TEXT[lang].resultsTitle}</h2>
        <div className="flex justify-center gap-4 mt-4">
           <button onClick={handleRetake} className="text-sm text-teal-600 dark:text-teal-400 font-semibold hover:underline">
             {UI_TEXT[lang].retake}
           </button>
           <button onClick={handleShare} className="text-sm text-teal-600 dark:text-teal-400 font-semibold hover:underline flex items-center">
             <ShareIcon /> {copied ? UI_TEXT[lang].copied : UI_TEXT[lang].share}
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Top Recommendation (Center/Big) */}
        <div className="lg:col-span-2 space-y-6">
          {results.map((res, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-6 border-l-8 border-teal-500 hover:shadow-lg transition">
              <div className="flex justify-between items-start mb-2">
                <div>
                   <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 dark:bg-teal-900/30 px-2 py-1 rounded">
                     #{idx + 1} Suggestion
                   </span>
                   <h3 className="text-2xl font-bold mt-2 text-slate-800 dark:text-white">{res.title}</h3>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-extrabold text-teal-600 dark:text-teal-400">{res.matchPercentage}%</div>
                  <div className="text-xs text-slate-500">{UI_TEXT[lang].match}</div>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-300 mb-6">{res.rationale}</p>
              <button 
                onClick={() => { setSelectedResult(res); setModalOpen(true); }}
                className="bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-800 dark:text-white py-2 px-4 rounded-lg font-medium text-sm transition flex items-center gap-2"
              >
                {UI_TEXT[lang].learnMore} <ChevronRight />
              </button>
            </div>
          ))}
        </div>

        {/* Sidebar: Radar & Stats */}
        <div className="lg:col-span-1 space-y-6">
           <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-6">
              <h4 className="font-bold text-slate-700 dark:text-slate-200 mb-4">{UI_TEXT[lang].chartTitle}</h4>
              <SimpleRadarChart scores={results[0].dimensionScores} lang={lang} />
           </div>
        </div>
      </div>
    </div>
  );

  // -- MAIN RENDER --

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans transition-colors duration-300">
      {/* Header */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-slate-900/90 backdrop-blur-md z-40 border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex justify-between items-center">
        <div className="font-bold text-xl text-teal-600 flex items-center gap-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg>
          <span className="hidden sm:inline">Career Compass</span>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => setLang(lang === 'en' ? 'bn' : 'en')} className="font-semibold text-sm px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            {lang === 'en' ? 'বাংলা' : 'English'}
          </button>
          <button onClick={toggleTheme} className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
            {darkMode ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </nav>

      <main className="pt-20 pb-10">
        {!started && !isFinished && <Landing />}
        {started && !isFinished && <QuizView />}
        {isFinished && <ResultView />}
      </main>

      {/* Action Plan Modal */}
      {modalOpen && selectedResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 relative">
            <button 
              onClick={() => setModalOpen(false)} 
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-1">{selectedResult.title}</h3>
            <p className="text-sm text-teal-600 font-semibold mb-6 uppercase tracking-wider">{UI_TEXT[lang].modalTitle}</p>
            
            <div className="space-y-4">
              {selectedResult.nextSteps.map((step, i) => (
                <div key={i} className="flex gap-3">
                   <div className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center text-teal-700 dark:text-teal-300 font-bold text-sm">
                     {i+1}
                   </div>
                   <p className="text-slate-600 dark:text-slate-300 mt-1">{step}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-700 text-center">
              <button 
                onClick={() => setModalOpen(false)}
                className="w-full py-3 bg-slate-800 dark:bg-slate-700 text-white rounded-lg font-semibold hover:bg-slate-700 dark:hover:bg-slate-600 transition"
              >
                {UI_TEXT[lang].close}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
