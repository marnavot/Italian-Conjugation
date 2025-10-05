import React, { useState, useCallback } from 'react';
import { getFullConjugation, FullConjugationResult } from '../services/conjugationService';
import { ALL_TENSES, ALL_PERSONS } from '../constants';

const LoadingSpinner: React.FC = () => (
    <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600"></div>
    </div>
);

const singleFormTenses = ['Gerundio'];

const Search: React.FC = () => {
    const [verb, setVerb] = useState('');
    const [results, setResults] = useState<FullConjugationResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [searchedVerb, setSearchedVerb] = useState('');

    const handleSearch = useCallback(async () => {
        if (!verb.trim()) {
            return;
        }
        setIsLoading(true);
        setError(null);
        setResults(null);
        setSearchedVerb(verb.trim().toLowerCase());
        try {
            const conjugationData = await getFullConjugation(verb.trim().toLowerCase());
            setResults(conjugationData);
        } catch (e) {
            console.error(e);
            setError(`Could not conjugate "${verb}". Please check the spelling.`);
        } finally {
            setIsLoading(false);
        }
    }, [verb]);

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };
    
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-semibold text-slate-800 mb-2">Verb Conjugation Search</h2>
                <p className="text-sm text-slate-600 mb-4">Enter an Italian verb in its infinitive form (e.g., "parlare", "essere") to see its full conjugation table.</p>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={verb}
                        onChange={(e) => setVerb(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="e.g., andare"
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
                        autoCapitalize="none"
                        autoCorrect="off"
                    />
                    <button
                        onClick={handleSearch}
                        disabled={isLoading || !verb.trim()}
                        className="px-6 py-2 bg-sky-600 text-white font-bold rounded-lg shadow-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50 transition-all disabled:bg-slate-400 disabled:cursor-not-allowed"
                    >
                        Search
                    </button>
                </div>
            </div>

            {isLoading && <div className="h-40"><LoadingSpinner /></div>}
            {error && <p className="text-center text-red-500 bg-red-50 p-4 rounded-lg">{error}</p>}
            
            {results && (
                <div>
                    <h3 className="text-2xl font-bold text-center text-sky-700 mb-4 capitalize">{searchedVerb}</h3>
                    <div className="text-center mb-6 text-slate-700 bg-slate-100 p-3 rounded-lg border">
                      {results.info.englishTranslation && (
                        <p><strong className="font-semibold">Translation:</strong> {results.info.englishTranslation}</p>
                      )}
                      <p><strong className="font-semibold">Auxiliary Verb:</strong> <span className="capitalize">{results.info.auxiliary}</span></p>
                    </div>

                    <div className="space-y-6">
                        {ALL_TENSES.map(tense => {
                            const conjugationList = results.conjugations[tense];
                            if (!conjugationList || conjugationList.length === 0) {
                                return null;
                            }

                            if (tense === 'Participio Passato') {
                                const labels = ['Singolare maschile', 'Singolare femminile', 'Plurale maschile', 'Plurale femminile'];
                                return (
                                    <div key={tense} className="bg-slate-50 rounded-lg p-4 shadow-sm">
                                        <h4 className="font-semibold text-slate-800">{tense}</h4>
                                        {conjugationList.length === 1 ? (
                                             <p className="text-slate-800 text-lg mt-1">{conjugationList[0]}</p>
                                        ) : (
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 mt-2">
                                                {conjugationList.map((form, index) => (
                                                    <div key={index} className="flex items-baseline space-x-2">
                                                        <span className="text-sm text-slate-500 w-36 text-right">{labels[index]}:</span>
                                                        <span className="text-slate-800">{form}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            }

                            if (tense === 'Participio Presente') {
                                const labels = ['Singolare', 'Plurale'];
                                return (
                                    <div key={tense} className="bg-slate-50 rounded-lg p-4 shadow-sm">
                                        <h4 className="font-semibold text-slate-800">{tense}</h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 mt-2">
                                            {conjugationList.map((form, index) => (
                                                 <div key={index} className="flex items-baseline space-x-2">
                                                    <span className="text-sm text-slate-500 w-20 text-right">{labels[index]}:</span>
                                                    <span className="text-slate-800">{form}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            }

                            const isSingleForm = singleFormTenses.includes(tense);

                            return isSingleForm ? (
                                <div key={tense} className="bg-slate-50 rounded-lg p-4 shadow-sm">
                                    <h4 className="font-semibold text-slate-800">{tense}</h4>
                                    <p className="text-slate-800 text-lg mt-1">{conjugationList[0]}</p>
                                </div>
                            ) : (
                                <details key={tense} className="bg-slate-50 rounded-lg open:shadow-md transition-shadow group">
                                    <summary className="font-semibold text-slate-800 p-4 cursor-pointer list-none flex justify-between items-center">
                                        {tense}
                                        <span className="text-sky-500 text-xl transform transition-transform duration-200 group-open:rotate-180 details-arrow">&#9662;</span>
                                    </summary>
                                    <div className="p-4 border-t border-slate-200">
                                        <table className="w-full text-left">
                                            <tbody>
                                                {ALL_PERSONS.map((person, index) => {
                                                    if (tense === 'Imperativo' && person === 'io') {
                                                        return null;
                                                    }
                                                    return (
                                                        <tr key={person} className="border-b border-slate-200 last:border-b-0">
                                                            <td className="py-2 pr-4 font-medium text-slate-600 w-1/4">{person}</td>
                                                            <td className="py-2 text-slate-800">{conjugationList[index]}</td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </details>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Search;