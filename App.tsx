
import React, { useState, useCallback } from 'react';
import Settings from './components/Settings';
import Practice from './components/Practice';
import Search from './components/Search';
import type { PracticeSettings } from './types';

const App: React.FC = () => {
  const [mode, setMode] = useState<'practice' | 'search'>('practice');

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col items-center justify-center p-4 font-sans">
      <header className="w-full max-w-4xl text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-sky-700">Pratica di Coniugazione</h1>
        <p className="text-lg text-slate-600 mt-2">Master Italian Verbs with AI-Powered Practice</p>
      </header>
      <main className="w-full max-w-2xl">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 transition-all duration-300">
          <div className="border-b border-slate-200 mb-6">
              <nav className="flex space-x-4 -mb-px">
                  <button onClick={() => setMode('practice')} className={`py-3 px-4 text-sm font-medium border-b-2 ${mode === 'practice' ? 'border-sky-600 text-sky-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}>
                      Practice
                  </button>
                  <button onClick={() => setMode('search')} className={`py-3 px-4 text-sm font-medium border-b-2 ${mode === 'search' ? 'border-sky-600 text-sky-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}>
                      Search Conjugations
                  </button>
              </nav>
          </div>

          {mode === 'practice' && <PracticeContainer />}
          {mode === 'search' && <Search />}
          
        </div>
      </main>
      <footer className="w-full max-w-4xl text-center mt-8 text-slate-500 text-sm">
        <p>Offline capabilities and AI sync powered by Gemini</p>
      </footer>
    </div>
  );
};


const PracticeContainer: React.FC = () => {
  const [settings, setSettings] = useState<PracticeSettings | null>(null);

  const handleStartPractice = useCallback((newSettings: PracticeSettings) => {
    setSettings(newSettings);
  }, []);

  const handleBackToSettings = useCallback(() => {
    setSettings(null);
  }, []);

  if (!settings) {
    return <Settings onStart={handleStartPractice} />;
  }
  return <Practice settings={settings} onBack={handleBackToSettings} />;
};

export default App;
