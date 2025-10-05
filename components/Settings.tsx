
import React, { useState, useCallback, useEffect } from 'react';
import type { PracticeSettings, CustomVerb, VerbInfo } from '../types';
import { ALL_TENSES, ALL_PERSONS } from '../constants';
import { getVerbInfoBatch } from '../services/geminiService';
import { bulkSaveVerbs } from '../services/verbDb';

interface SettingsProps {
  onStart: (settings: PracticeSettings) => void;
}

interface SavedList {
  name: string;
  content: string;
}

type SyncStatus = 'idle' | 'syncing' | 'success' | 'error';

const STORAGE_KEY = 'italianVerbCustomLists';

const Checkbox: React.FC<{ label: string; checked: boolean; onChange: () => void; }> = ({ label, checked, onChange }) => (
  <label className="flex items-center space-x-3 cursor-pointer p-2 rounded-md hover:bg-sky-50 transition-colors">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="h-5 w-5 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
    />
    <span className="text-slate-700">{label}</span>
  </label>
);

const parseVerbsFromText = (text: string): CustomVerb[] => {
  if (!text.trim()) {
    return [];
  }
  const lines = text.split('\n');
  return lines
    .map(line => {
      const trimmedLine = line.trim();
      if (!trimmedLine) return null;

      const tabParts = trimmedLine.split('\t');
      if (tabParts.length >= 2 && tabParts[0].trim() && tabParts[1].trim()) {
        return { englishTranslation: tabParts[0].trim(), verb: tabParts[1].trim() };
      }

      const lastCommaIndex = trimmedLine.lastIndexOf(',');
      if (lastCommaIndex > 0 && lastCommaIndex < trimmedLine.length - 1) {
          const englishPart = trimmedLine.substring(0, lastCommaIndex).trim();
          const verbPart = trimmedLine.substring(lastCommaIndex + 1).trim();
          if (englishPart && verbPart) {
              return { englishTranslation: englishPart, verb: verbPart };
          }
      }
      
      const simpleParts = trimmedLine.split(/,/).map(p => p.trim());
      if (simpleParts.length === 2 && simpleParts[0] && simpleParts[1]) {
          return { englishTranslation: simpleParts[0], verb: simpleParts[1] };
      }

      return null;
    })
    .filter((v): v is CustomVerb => v !== null);
};


const Settings: React.FC<SettingsProps> = ({ onStart }) => {
  const [selectedTenses, setSelectedTenses] = useState<Set<string>>(new Set(['Indicativo Presente']));
  const [selectedPersons, setSelectedPersons] = useState<Set<string>>(new Set(ALL_PERSONS));
  const [difficulty, setDifficulty] = useState('Beginner');
  const [customVerbs, setCustomVerbs] = useState<CustomVerb[]>([]);
  const [textAreaContent, setTextAreaContent] = useState('');
  const [savedLists, setSavedLists] = useState<SavedList[]>([]);
  const [selectedList, setSelectedList] = useState<string>('');
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('idle');
  const [syncMessage, setSyncMessage] = useState('');

  const hasCustomVerbs = customVerbs.length > 0;

  useEffect(() => {
    try {
      const storedLists = localStorage.getItem(STORAGE_KEY);
      if (storedLists) {
        setSavedLists(JSON.parse(storedLists));
      }
    } catch (error) {
      console.error("Failed to load custom lists from local storage:", error);
    }
  }, []);
  
  useEffect(() => {
    const verbs = parseVerbsFromText(textAreaContent);
    setCustomVerbs(verbs);
  }, [textAreaContent]);
  
  const handleTextareaChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaContent(event.target.value);
  }, []);

  const clearCustomVerbs = useCallback(() => {
    setTextAreaContent('');
  }, []);
  
  const handleSaveList = useCallback(() => {
    const listName = window.prompt("Enter a name for this verb list:");
    if (!listName || !listName.trim()) return;

    if (savedLists.some(list => list.name === listName)) {
      if (!window.confirm(`A list named "${listName}" already exists. Do you want to overwrite it?`)) {
        return;
      }
    }

    const updatedLists = savedLists.filter(list => list.name !== listName);
    const newList = { name: listName, content: textAreaContent };
    const newSavedLists = [...updatedLists, newList].sort((a, b) => a.name.localeCompare(b.name));

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newSavedLists));
      setSavedLists(newSavedLists);
      setSelectedList(listName);
      alert(`List "${listName}" saved successfully!`);
    } catch (error) {
      console.error("Failed to save list to local storage:", error);
      alert("Error: Could not save the list.");
    }
  }, [textAreaContent, savedLists]);

  const handleListSelection = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const listName = event.target.value;
    setSelectedList(listName);
    if (listName) {
      const list = savedLists.find(l => l.name === listName);
      if (list) {
        setTextAreaContent(list.content);
      }
    } else {
      setTextAreaContent('');
    }
  }, [savedLists]);

  const handleDeleteList = useCallback(() => {
    if (!selectedList || !window.confirm(`Are you sure you want to delete the list "${selectedList}"?`)) {
      return;
    }

    const newSavedLists = savedLists.filter(list => list.name !== selectedList);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newSavedLists));
      setSavedLists(newSavedLists);
      setSelectedList('');
      setTextAreaContent('');
      alert(`List "${selectedList}" deleted.`);
    } catch (error) {
      console.error("Failed to delete list from local storage:", error);
      alert("Error: Could not delete the list.");
    }
  }, [selectedList, savedLists]);

  const toggleTense = useCallback((tense: string) => {
    setSelectedTenses(prev => {
      const newSet = new Set(prev);
      newSet.has(tense) ? newSet.delete(tense) : newSet.add(tense);
      return newSet;
    });
  }, []);

  const togglePerson = useCallback((person: string) => {
    setSelectedPersons(prev => {
      const newSet = new Set(prev);
      newSet.has(person) ? newSet.delete(person) : newSet.add(person);
      return newSet;
    });
  }, []);
  
  const handleStart = () => {
    onStart({
      tenses: Array.from(selectedTenses),
      persons: ALL_PERSONS.filter(p => selectedPersons.has(p)),
      difficulty,
      customVerbs: hasCustomVerbs ? customVerbs : undefined,
    });
  };

  const handleSync = async () => {
    if (savedLists.length === 0) {
      setSyncMessage("You have no saved lists to sync.");
      setSyncStatus('error');
      setTimeout(() => setSyncStatus('idle'), 3000);
      return;
    }

    setSyncStatus('syncing');
    setSyncMessage("Gathering verbs from all saved lists...");

    try {
      const allCustomVerbs = savedLists.flatMap(list => parseVerbsFromText(list.content));
      const uniqueVerbs = Array.from(new Set(allCustomVerbs.map(v => v.verb.toLowerCase())));
      
      setSyncMessage(`Found ${uniqueVerbs.length} unique verbs. Fetching data from Gemini...`);

      const verbInfo = await getVerbInfoBatch(uniqueVerbs);

      setSyncMessage(`Saving ${verbInfo.length} verbs to the offline database...`);
      await bulkSaveVerbs(verbInfo.map(v => ({...v, infinitive: v.infinitive.toLowerCase()})));
      
      setSyncMessage(`Successfully synced ${verbInfo.length} verbs!`);
      setSyncStatus('success');
    } catch (error) {
      console.error("Sync failed:", error);
      setSyncMessage("An error occurred during sync. Please try again.");
      setSyncStatus('error');
    } finally {
      setTimeout(() => setSyncStatus('idle'), 5000);
    }
  };

  const canStart = selectedTenses.size > 0 && selectedPersons.size > 0;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-slate-800 mb-4 border-b pb-2">Choose Tenses/Moods</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
          {ALL_TENSES.map(tense => (
            <Checkbox key={tense} label={tense} checked={selectedTenses.has(tense)} onChange={() => toggleTense(tense)} />
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold text-slate-800 mb-4 border-b pb-2">Choose Persons</h2>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {ALL_PERSONS.map(person => (
            <Checkbox key={person} label={person} checked={selectedPersons.has(person)} onChange={() => togglePerson(person)} />
          ))}
        </div>
      </div>
       <div className={`transition-opacity ${hasCustomVerbs ? 'opacity-50' : 'opacity-100'}`}>
        <h2 className="text-xl font-semibold text-slate-800 mb-4 border-b pb-2">Choose Difficulty</h2>
        {hasCustomVerbs && <p className="text-sm text-slate-500 -mt-3 mb-3">Disabled when using a custom verb list.</p>}
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {['Beginner', 'Intermediate', 'Advanced'].map(level => (
            <label key={level} className={`flex items-center space-x-3 p-2 rounded-md transition-colors ${!hasCustomVerbs ? 'cursor-pointer hover:bg-sky-50' : 'cursor-not-allowed'}`}>
              <input
                type="radio"
                name="difficulty"
                value={level}
                checked={difficulty === level}
                onChange={() => setDifficulty(level)}
                disabled={hasCustomVerbs}
                className="h-5 w-5 text-sky-600 focus:ring-sky-500 border-gray-300 disabled:bg-slate-200 disabled:cursor-not-allowed"
              />
              <span className={`text-slate-700 ${hasCustomVerbs ? 'text-slate-400' : ''}`}>{level}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold text-slate-800 mb-4 border-b pb-2">Custom Verb List <span className="text-sm font-normal text-slate-500">(Optional)</span></h2>
        
        <div className="mb-4 p-4 bg-slate-50 rounded-lg border">
            <div className="flex items-start gap-4">
              <div className="flex-grow">
                <label htmlFor="saved-lists-select" className="block text-sm font-medium text-slate-700 mb-2">My Saved Lists</label>
                <div className="flex gap-2">
                    <select
                    id="saved-lists-select"
                    value={selectedList}
                    onChange={handleListSelection}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm rounded-md"
                    >
                    <option value="">Load a list...</option>
                    {savedLists.map(list => (
                        <option key={list.name} value={list.name}>
                        {list.name}
                        </option>
                    ))}
                    </select>
                    <button
                    onClick={handleDeleteList}
                    disabled={!selectedList}
                    className="px-3 py-2 bg-red-600 text-white text-sm font-medium rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-slate-400 disabled:cursor-not-allowed"
                    aria-label="Delete selected list"
                    >
                    Delete
                    </button>
                </div>
              </div>
              <div className="flex-shrink-0">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Offline Data</label>
                  <button
                    onClick={handleSync}
                    disabled={syncStatus === 'syncing' || savedLists.length === 0}
                    className="w-full px-3 py-2 bg-slate-600 text-white text-sm font-medium rounded-md shadow-sm hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 disabled:bg-slate-400 disabled:cursor-not-allowed"
                    aria-label="Sync verb data for offline use"
                  >
                    {syncStatus === 'syncing' ? 'Syncing...' : 'Sync Verb Data'}
                  </button>
              </div>
            </div>
            {syncStatus !== 'idle' && (
              <p className={`text-sm mt-2 ${syncStatus === 'error' ? 'text-red-600' : 'text-slate-600'}`}>
                {syncMessage}
              </p>
            )}
        </div>

        <p className="text-sm text-slate-600 mb-3">Paste your list below, or load a saved one. The first column should be English, the second Italian.</p>
        <textarea
          rows={5}
          value={textAreaContent}
          onChange={handleTextareaChange}
          placeholder={`to be,essere
to have,avere`}
          className="w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 font-mono text-sm"
          aria-label="Custom verb list input"
        />
        <div className="mt-3">
          {hasCustomVerbs && (
            <div className="flex items-center justify-between p-3 bg-sky-50 rounded-lg">
              <p className="text-sm text-slate-700">
                Loaded <span className="font-semibold">{customVerbs.length} verbs</span>.
              </p>
              <div>
                <button onClick={handleSaveList} className="text-sm font-medium text-sky-600 hover:text-sky-800 mr-4">
                  Save List
                </button>
                <button onClick={clearCustomVerbs} className="text-sm font-medium text-red-600 hover:text-red-800">
                  Clear
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-end pt-4">
        <button
          onClick={handleStart}
          disabled={!canStart}
          className="px-8 py-3 bg-sky-600 text-white font-bold rounded-lg shadow-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50 transition-all disabled:bg-slate-400 disabled:cursor-not-allowed"
        >
          Start Practicing
        </button>
      </div>
    </div>
  );
};

export default Settings;
