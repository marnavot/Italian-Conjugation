
import React, { useState, useEffect, useCallback } from 'react';
import type { PracticeSettings, Problem, GradingResult } from '../types';
import { getNewProblem } from '../services/geminiService';
import { getConjugationForTense } from '../services/conjugationService';
import { ALL_PERSONS } from '../constants';

interface PracticeProps {
  settings: PracticeSettings;
  onBack: () => void;
}

const LoadingSpinner: React.FC = () => (
    <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600"></div>
    </div>
);

const Practice: React.FC<PracticeProps> = ({ settings, onBack }) => {
  const [problem, setProblem] = useState<Problem | null>(null);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [results, setResults] = useState<Record<string, GradingResult>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [usedVerbs, setUsedVerbs] = useState<string[]>([]);
  
  const fetchNewProblem = useCallback(async (verbsToExclude: string[]) => {
    setIsLoading(true);
    setError(null);
    setIsChecked(false);
    setResults({});
    const initialAnswers = settings.persons.reduce((acc, person) => ({ ...acc, [person]: '' }), {});
    setUserAnswers(initialAnswers);
    try {
      const newProblem = await getNewProblem(settings.tenses, verbsToExclude, settings.difficulty, settings.customVerbs);
      setProblem(newProblem);
      setUsedVerbs(prev => [...prev, newProblem.verb]);
    } catch (err) {
      setError('Failed to fetch a new verb. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [settings.tenses, settings.persons, settings.difficulty, settings.customVerbs]);

  useEffect(() => {
    fetchNewProblem([]);
  }, [fetchNewProblem]);

  const handleInputChange = (person: string, value: string) => {
    setUserAnswers(prev => ({ ...prev, [person]: value }));
  };

  const handleSubmit = async () => {
    if (!problem) return;
    setIsSubmitting(true);
    setError(null);
    try {
      const correctConjugations = await getConjugationForTense(problem.verb, problem.tense);
      const correctAnswersMap = ALL_PERSONS.reduce((acc, person, index) => {
        acc[person] = correctConjugations[index];
        return acc;
      }, {} as Record<string, string>);

      const newResults: Record<string, GradingResult> = {};
      for (const person of settings.persons) {
        const userAnswer = userAnswers[person]?.trim().toLowerCase() || '';
        const correctAnswer = correctAnswersMap[person];
        // Handle multiple correct answers (e.g., "debba / deva")
        const isCorrect = correctAnswer.split(' / ').some(ans => ans.trim().toLowerCase() === userAnswer);

        newResults[person] = {
          person,
          correctAnswer,
          isCorrect,
        };
      }
      setResults(newResults);
      setIsChecked(true);
    } catch (err) {
      console.error(err);
      setError('Could not check your answers. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isLoading) {
    return <div className="h-64 flex justify-center items-center"><LoadingSpinner /></div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <button onClick={onBack} className="text-sky-600 hover:text-sky-800 transition-colors">&larr; Change Settings</button>
      </div>
      <div className="text-center bg-slate-50 p-4 rounded-lg">
        <p className="text-lg text-slate-600">Conjugate the verb</p>
        <div className="relative inline-block group">
            <h2 className="text-3xl font-bold text-sky-700 capitalize cursor-pointer underline decoration-dotted decoration-slate-400 underline-offset-4">
                {problem?.verb}
            </h2>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max whitespace-nowrap px-3 py-1.5 bg-slate-700 text-white text-sm rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {problem?.englishTranslation}
            </div>
        </div>
        <p className="text-lg text-slate-600">in the <span className="font-semibold">{problem?.tense}</span> tense.</p>
      </div>
      
      <div className="space-y-4">
        {settings.persons.map(person => {
          const result = results[person];
          const borderColor = isChecked ? (result?.isCorrect ? 'border-green-500' : 'border-red-500') : 'border-slate-300';
          return (
            <div key={person}>
              <div className="grid grid-cols-[auto,1fr,auto] items-center gap-4">
                <label htmlFor={person} className="font-bold text-lg text-slate-700 justify-self-end w-16 text-right">{person}</label>
                <div className="relative w-full">
                  <input
                    id={person}
                    type="text"
                    value={userAnswers[person] || ''}
                    onChange={e => handleInputChange(person, e.target.value)}
                    disabled={isChecked}
                    className={`w-full px-4 py-2 border-2 ${borderColor} rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors disabled:bg-slate-100`}
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect="off"
                  />
                </div>
                <div className="h-6 w-6 flex items-center justify-center">
                  {isChecked && (
                    result?.isCorrect 
                    ? <span className="text-green-500 text-2xl font-bold">&#x2713;</span> 
                    : <span className="text-red-500 text-2xl font-bold">&#x2717;</span>
                  )}
                </div>
              </div>
              {isChecked && !result?.isCorrect && (
                  <div className="grid grid-cols-[auto,1fr,auto] items-center gap-4 mt-1">
                      <div className="col-start-2 col-span-2 text-green-600 text-sm pl-1">
                          Correct: <span className="font-semibold">{result?.correctAnswer}</span>
                      </div>
                  </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex justify-end pt-4 min-h-[52px]">
        {isSubmitting ? (
          <div className="flex justify-center items-center w-full"><LoadingSpinner /></div>
        ) : isChecked ? (
          <button onClick={() => fetchNewProblem(usedVerbs)} className="px-8 py-3 bg-sky-600 text-white font-bold rounded-lg shadow-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50 transition-all">Next Verb</button>
        ) : (
          <button onClick={handleSubmit} className="px-8 py-3 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-all">Check Answers</button>
        )}
      </div>
    </div>
  );
};

export default Practice;
