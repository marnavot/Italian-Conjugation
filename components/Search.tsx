import React, { useState, useCallback, useEffect } from 'react';
import { getFullConjugation, FullConjugationResult } from '../services/conjugationService';
import { ALL_TENSES, ALL_PERSONS } from '../constants';
import { useSavedLists } from '../hooks/useSavedLists';
import { parseVerbsFromText } from '../services/verbParser';
import type { CustomVerb, VerbInfo } from '../types';

const LoadingSpinner: React.FC = () => (
    <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600"></div>
    </div>
);

const singleFormTenses = ['Gerundio'];


const getDisplayForm = (conjugation: string, verbInfo: VerbInfo): string => {
    if (!conjugation.includes(' / ')) {
        return conjugation;
    }

    const allForms = conjugation.split(' / ').map(p => p.trim());
    const hasContraction = allForms.some(p => p.includes("'"));
    const hasFullForm = allForms.some(p => !p.includes("'"));

    // If there's no mix of contraction styles, it's not an elision choice.
    // Return the original string to show all gender/other variations.
    if (!hasContraction || !hasFullForm) {
        return conjugation;
    }

    // It's an elision case. We need to filter based on preference, then show all variations of that preference.
    const { pronounType } = verbInfo;

    let preferContraction: boolean;

    if (pronounType === 'si') {
        // Rule 1: Regular reflexive verbs (-si) prefer the full form.
        preferContraction = false;
    } else if (pronounType && ['ci', 'la', 'cela', 'sela'].includes(pronounType)) {
        // Rule 2 & 4: Verbs with -ci, -la, -cela, -sela prefer the contracted form.
        preferContraction = true;
    } else if (pronounType && ['ne', 'sene'].includes(pronounType)) {
        // Rule 3: Verbs with -ne, -sene have conditional contraction.
        // If a contraction before 'e' exists, show ONLY those forms.
        const contractedWithEForms = allForms.filter(p => p.match(/n'[eèé]/i));
        if (contractedWithEForms.length > 0) {
            return contractedWithEForms.join(' / ');
        }
        // Otherwise, prefer the full form for -ne verbs.
        preferContraction = false;
    } else {
        // Default for unhandled cases: prefer the more common contracted form.
        preferContraction = true;
    }

    const filteredForms = allForms.filter(form => {
        const isContraction = form.includes("'");
        return preferContraction ? isContraction : !isContraction;
    });

    // If filtering accidentally removes everything, fall back to the original to be safe.
    return filteredForms.length > 0 ? filteredForms.join(' / ') : conjugation;
};


const Search: React.FC = () => {
    const [verb, setVerb] = useState('');
    const [results, setResults] = useState<FullConjugationResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [searchedVerb, setSearchedVerb] = useState('');
    const [isAllOpen, setIsAllOpen] = useState(false);

    // List Review Mode State
    const [isListMode, setIsListMode] = useState(false);
    const [currentListVerbs, setCurrentListVerbs] = useState<CustomVerb[]>([]);
    const [currentVerbIndex, setCurrentVerbIndex] = useState(0);
    const [selectedListName, setSelectedListName] = useState('');
    const { savedLists, saveList } = useSavedLists();

    const searchForVerb = useCallback(async (verbToSearch: string) => {
        if (!verbToSearch.trim()) return;
        setIsLoading(true);
        setError(null);
        setResults(null);
        setSearchedVerb(verbToSearch.trim().toLowerCase());
        try {
            const conjugationData = await getFullConjugation(verbToSearch.trim().toLowerCase());
            setResults(conjugationData);
        } catch (e) {
            console.error(e);
            setError(`Could not conjugate "${verbToSearch}". Please check the spelling.`);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleExitListMode = useCallback(() => {
        setIsListMode(false);
        setResults(null);
        setError(null);
        setSearchedVerb('');
        setSelectedListName('');
    }, []);
    
    const handleRemoveVerb = useCallback(() => {
        if (!isListMode || currentListVerbs.length === 0) return;
        
        const verbToRemove = currentListVerbs[currentVerbIndex];
        if (!window.confirm(`Are you sure you want to remove "${verbToRemove.verb}" from the list "${selectedListName}"?`)) {
            return;
        }

        const updatedVerbs = currentListVerbs.filter((_, index) => index !== currentVerbIndex);

        // Group verbs by translation to reconstruct lines with '/'
        const groupedByTranslation = updatedVerbs.reduce((acc, verb) => {
            acc[verb.englishTranslation] = acc[verb.englishTranslation] || [];
            acc[verb.englishTranslation].push(verb.verb);
            return acc;
        }, {} as Record<string, string[]>);
        
        const newContent = Object.entries(groupedByTranslation)
            .map(([translation, verbs]) => `${translation}, ${verbs.join(' / ')}`)
            .join('\n');
        
        saveList(selectedListName, newContent, true); // Overwrite the list
        
        setCurrentListVerbs(updatedVerbs);
        
        // Adjust index if we removed the last item
        if (currentVerbIndex >= updatedVerbs.length && updatedVerbs.length > 0) {
            setCurrentVerbIndex(updatedVerbs.length - 1);
        } else if (updatedVerbs.length === 0) {
            // If list becomes empty, exit review mode
            handleExitListMode();
        }

    }, [isListMode, currentListVerbs, currentVerbIndex, selectedListName, saveList, handleExitListMode]);

    useEffect(() => {
        if (isListMode && currentListVerbs.length > 0) {
            const verbToSearch = currentListVerbs[currentVerbIndex]?.verb;
            if (verbToSearch) {
                searchForVerb(verbToSearch);
            }
        }
    }, [isListMode, currentListVerbs, currentVerbIndex, searchForVerb]);

    const handleSearch = useCallback(() => searchForVerb(verb), [verb, searchForVerb]);

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') handleSearch();
    };

    const handleStartListReview = () => {
        if (!selectedListName) return;
        const list = savedLists.find(l => l.name === selectedListName);
        if (list) {
            const verbs = parseVerbsFromText(list.content);
            if (verbs.length > 0) {
                setCurrentListVerbs(verbs);
                setCurrentVerbIndex(0);
                setIsListMode(true);
                setIsAllOpen(false);
            } else {
                alert("The selected list is empty or invalid.");
            }
        }
    };

    const handleNextVerb = () => setCurrentVerbIndex(prev => Math.min(prev + 1, currentListVerbs.length - 1));
    const handlePrevVerb = () => setCurrentVerbIndex(prev => Math.max(prev - 1, 0));

    return (
        <div className="space-y-6">
            {isListMode ? (
                <div className="space-y-4 p-4 bg-slate-50 rounded-lg border">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold text-slate-800">Reviewing: <span className="font-bold text-sky-700">{selectedListName}</span></h2>
                        <button onClick={handleExitListMode} className="text-sm font-medium text-sky-600 hover:text-sky-800">&larr; Back to Search</button>
                    </div>
                    <div className="flex justify-between items-center">
                        <button onClick={handlePrevVerb} disabled={currentVerbIndex === 0} className="px-4 py-2 bg-slate-200 text-slate-800 font-bold rounded-lg shadow-sm hover:bg-slate-300 disabled:opacity-50 disabled:cursor-not-allowed">
                            &larr; Previous
                        </button>
                        <p className="text-sm text-slate-600 font-medium">
                            Verb {currentVerbIndex + 1} of {currentListVerbs.length}
                        </p>
                        <button onClick={handleNextVerb} disabled={currentVerbIndex >= currentListVerbs.length - 1} className="px-4 py-2 bg-slate-200 text-slate-800 font-bold rounded-lg shadow-sm hover:bg-slate-300 disabled:opacity-50 disabled:cursor-not-allowed">
                            Next &rarr;
                        </button>
                    </div>
                     <div className="text-center pt-2 border-t border-slate-200">
                        <button 
                            onClick={handleRemoveVerb} 
                            className="text-sm text-red-600 hover:text-red-800 hover:underline"
                        >
                            Remove from List
                        </button>
                    </div>
                </div>
            ) : (
                <div>
                    <h2 className="text-xl font-semibold text-slate-800 mb-2">Verb Conjugation Search</h2>
                    <p className="text-sm text-slate-600 mb-4">Enter a verb to see its full conjugation, or select a list to review.</p>
                    <div className="flex gap-2 mb-4">
                        <input type="text" value={verb} onChange={(e) => setVerb(e.target.value)} onKeyPress={handleKeyPress} placeholder="e.g., andare" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500" autoCapitalize="none" autoCorrect="off" />
                        <button onClick={handleSearch} disabled={isLoading || !verb.trim()} className="px-6 py-2 bg-sky-600 text-white font-bold rounded-lg shadow-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 disabled:bg-slate-400">Search</button>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg border">
                        <select value={selectedListName} onChange={(e) => setSelectedListName(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500">
                            <option value="">Select a list to review...</option>
                            {savedLists.map(list => <option key={list.name} value={list.name}>{list.name}</option>)}
                        </select>
                        <button onClick={handleStartListReview} disabled={!selectedListName} className="px-4 py-2 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-slate-400">Start Review</button>
                    </div>
                </div>
            )}

            {isLoading && <div className="h-40"><LoadingSpinner /></div>}
            {error && <p className="text-center text-red-500 bg-red-50 p-4 rounded-lg">{error}</p>}
            
            {results && (
                <div>
                    <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
                        <h3 className="text-2xl font-bold text-sky-700 capitalize">{searchedVerb}</h3>
                        <button onClick={() => setIsAllOpen(!isAllOpen)} className="px-3 py-1 bg-slate-200 text-slate-700 text-xs font-semibold rounded-full hover:bg-slate-300 transition-colors">
                            {isAllOpen ? 'Collapse All' : 'Expand All'}
                        </button>
                    </div>
                    <div className="text-left mb-6 text-slate-700 bg-slate-100 p-3 rounded-lg border">
                      {results.info.englishTranslation && <p><strong className="font-semibold">Translation:</strong> {results.info.englishTranslation}</p>}
                      <p><strong className="font-semibold">Auxiliary Verb:</strong> <span className="capitalize">{results.info.auxiliary}</span></p>
                    </div>

                    <div className="space-y-4">
                        {ALL_TENSES.map(tense => {
                            const conjugationList = results.conjugations[tense];
                            if (!conjugationList || conjugationList.length === 0) return null;

                            // FIX: Special rendering for Participio Passato with correct grammatical labels.
                            if (tense === 'Participio Passato') {
                                const labels = ['Masculine Singular', 'Feminine Singular', 'Masculine Plural', 'Feminine Plural'];
                                const formsToShow = conjugationList.length >= 4 ? conjugationList.slice(0, 4) : [conjugationList[0]];
                                const labelsToShow = conjugationList.length >= 4 ? labels : ['Invariable'];

                                return (
                                    <details key={tense} className="bg-slate-50 rounded-lg open:shadow-md transition-shadow group" open={isAllOpen}>
                                        <summary className="font-semibold text-slate-800 p-4 cursor-pointer list-none flex justify-between items-center">
                                            {tense}
                                            <span className="text-sky-500 text-xl transform transition-transform duration-200 group-open:rotate-180 details-arrow">&#9662;</span>
                                        </summary>
                                        <div className="p-4 border-t border-slate-200">
                                            <table className="w-full text-left">
                                                <tbody>
                                                    {formsToShow.map((conjugation, index) => (
                                                        <tr key={labelsToShow[index]} className="border-b border-slate-200 last:border-b-0">
                                                            <td className="py-2 pr-4 font-medium text-slate-600 w-1/3">{labelsToShow[index]}</td>
                                                            <td className="py-2 text-slate-800">{getDisplayForm(conjugation, results.info)}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </details>
                                );
                            }

                            // FIX: Special rendering for Participio Presente with correct grammatical labels.
                            if (tense === 'Participio Presente') {
                                const labels = ['Singular', 'Plural'];
                                const formsToShow = conjugationList.slice(0, 2);
                                return (
                                    <details key={tense} className="bg-slate-50 rounded-lg open:shadow-md transition-shadow group" open={isAllOpen}>
                                        <summary className="font-semibold text-slate-800 p-4 cursor-pointer list-none flex justify-between items-center">
                                            {tense}
                                            <span className="text-sky-500 text-xl transform transition-transform duration-200 group-open:rotate-180 details-arrow">&#9662;</span>
                                        </summary>
                                        <div className="p-4 border-t border-slate-200">
                                            <table className="w-full text-left">
                                                <tbody>
                                                    {formsToShow.map((conjugation, index) => (
                                                        <tr key={labels[index]} className="border-b border-slate-200 last:border-b-0">
                                                            <td className="py-2 pr-4 font-medium text-slate-600 w-1/3">{labels[index]}</td>
                                                            <td className="py-2 text-slate-800">{getDisplayForm(conjugation, results.info)}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </details>
                                );
                            }

                            const isSingleForm = singleFormTenses.includes(tense);

                            if (isSingleForm) {
                                return (
                                    <div key={tense} className="bg-slate-50 rounded-lg p-4 shadow-sm">
                                        <h4 className="font-semibold text-slate-800">{tense}</h4>
                                        <p className="text-slate-800 text-lg mt-1">{getDisplayForm(conjugationList[0], results.info)}</p>
                                    </div>
                                );
                            }

                            return (
                                <details key={tense} className="bg-slate-50 rounded-lg open:shadow-md transition-shadow group" open={isAllOpen}>
                                    <summary className="font-semibold text-slate-800 p-4 cursor-pointer list-none flex justify-between items-center">
                                        {tense}
                                        <span className="text-sky-500 text-xl transform transition-transform duration-200 group-open:rotate-180 details-arrow">&#9662;</span>
                                    </summary>
                                    <div className="p-4 border-t border-slate-200">
                                        <table className="w-full text-left">
                                            <tbody>
                                                {ALL_PERSONS.map((person, index) => {
                                                    if (tense === 'Imperativo' && person === 'io') return null;
                                                    const conjugation = conjugationList[index] || '';
                                                    return (
                                                        <tr key={person} className="border-b border-slate-200 last:border-b-0">
                                                            <td className="py-2 pr-4 font-medium text-slate-600 w-1/4">{person}</td>
                                                            <td className="py-2 text-slate-800">{getDisplayForm(conjugation, results.info)}</td>
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