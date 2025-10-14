import React, { useState, useCallback, useEffect } from 'react';
import type { PracticeSettings, CustomVerb } from '../types';
import { ALL_TENSES, ALL_PERSONS } from '../constants';
import { useSavedLists } from '../hooks/useSavedLists';
import { parseVerbsFromText } from '../services/verbParser';
import { syncAuxiliaryVerbs } from '../services/conjugationService';
import { clearAllVerbs } from '../services/verbDb';


interface SettingsProps {
  onStart: (settings: PracticeSettings) => void;
}

const TENSE_GROUPS: Record<string, string[]> = {
    'Indicativo': ALL_TENSES.filter(t => t.startsWith('Indicativo')),
    'Condizionale': ALL_TENSES.filter(t => t.startsWith('Condizionale')),
    'Congiuntivo': ALL_TENSES.filter(t => t.startsWith('Congiuntivo')),
    'Other': ALL_TENSES.filter(t => !t.startsWith('Indicativo') && !t.startsWith('Condizionale') && !t.startsWith('Congiuntivo')),
};


const ListManager: React.FC = () => {
    const { savedLists, saveList, deleteList } = useSavedLists();
    const [selectedListToEdit, setSelectedListToEdit] = useState('');
    const [listName, setListName] = useState('');
    const [listContent, setListContent] = useState('');
    const [feedback, setFeedback] = useState('');

    useEffect(() => {
        if (selectedListToEdit) {
            const list = savedLists.find(l => l.name === selectedListToEdit);
            if (list) {
                setListName(list.name);
                setListContent(list.content);
            }
        } else {
            setListName('');
            setListContent('');
        }
    }, [selectedListToEdit, savedLists]);

    const handleSave = () => {
        if (!listName.trim()) {
            setFeedback('List name is required.');
            return;
        }
        const result = saveList(listName, listContent, selectedListToEdit === listName);
        if (result.success) {
            setFeedback(`List "${listName}" saved successfully.`);
            if (!selectedListToEdit) { // if it was a new list
                setSelectedListToEdit(listName);
            }
        } else if (result.needsOverwrite) {
            if (window.confirm(`A list named "${listName}" already exists. Do you want to overwrite it?`)) {
                saveList(listName, listContent, true);
                setFeedback(`List "${listName}" overwritten.`);
            }
        }
        setTimeout(() => setFeedback(''), 3000);
    };

    const handleDelete = () => {
        if (!selectedListToEdit) return;
        if (window.confirm(`Are you sure you want to delete the list "${selectedListToEdit}"?`)) {
            deleteList(selectedListToEdit);
            setFeedback(`List "${selectedListToEdit}" deleted.`);
            setSelectedListToEdit('');
            setTimeout(() => setFeedback(''), 3000);
        }
    };
    
    const handleNewList = () => {
        setSelectedListToEdit('');
        setListName('');
        setListContent('');
    };

    return (
        <details className="p-4 border rounded-lg bg-slate-50 group">
            <summary className="font-semibold text-slate-800 cursor-pointer list-none flex justify-between items-center">
                Manage Custom Verb Lists
                <span className="text-sky-500 text-xl transform transition-transform duration-200 group-open:rotate-180 details-arrow">&#9662;</span>
            </summary>
            <div className="mt-4 pt-4 border-t space-y-4">
                <div className="flex gap-2 items-center">
                    <select
                        value={selectedListToEdit}
                        onChange={(e) => setSelectedListToEdit(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 text-sm"
                    >
                        <option value="">-- Select a list to edit --</option>
                        {savedLists.map(list => <option key={list.name} value={list.name}>{list.name}</option>)}
                    </select>
                    <button onClick={handleNewList} className="px-4 py-2 bg-slate-200 text-slate-800 text-sm font-bold rounded-lg hover:bg-slate-300 whitespace-nowrap">
                        + New List
                    </button>
                </div>
                <input
                    type="text"
                    placeholder="List Name"
                    value={listName}
                    onChange={(e) => setListName(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 text-sm"
                />
                <textarea
                    placeholder="to arrive, arrivare&#10;to have, avere"
                    value={listContent}
                    onChange={(e) => setListContent(e.target.value)}
                    rows={6}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 text-sm font-mono"
                />
                <div className="flex justify-between items-center">
                    <span className="text-sm text-green-600">{feedback}</span>
                    <div className="flex gap-2">
                        {selectedListToEdit && (
                             <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white text-sm font-bold rounded-lg hover:bg-red-700">Delete</button>
                        )}
                        <button onClick={handleSave} className="px-4 py-2 bg-sky-600 text-white text-sm font-bold rounded-lg hover:bg-sky-700">{selectedListToEdit ? 'Save Changes' : 'Save New List'}</button>
                    </div>
                </div>
            </div>
        </details>
    );
};

const OfflineDataManager: React.FC = () => {
    const { savedLists } = useSavedLists();
    const [selectedListToSync, setSelectedListToSync] = useState('');
    const [syncStatus, setSyncStatus] = useState('');
    const [isSyncing, setIsSyncing] = useState(false);

    const handleSync = async () => {
        if (!selectedListToSync) return;
        const list = savedLists.find(l => l.name === selectedListToSync);
        if (!list) return;

        const verbs = parseVerbsFromText(list.content).map(v => v.verb);
        if (verbs.length === 0) {
            setSyncStatus('Error: No valid verbs found in the list.');
            setTimeout(() => setSyncStatus(''), 4000);
            return;
        }

        setIsSyncing(true);
        setSyncStatus(`Syncing ${verbs.length} verbs...`);
        try {
            await syncAuxiliaryVerbs(verbs);
            setSyncStatus(`Successfully synced auxiliary verbs for "${selectedListToSync}".`);
        } catch (error) {
            console.error(error);
            setSyncStatus('Error: Sync failed. Please check the console.');
        } finally {
            setIsSyncing(false);
            setTimeout(() => setSyncStatus(''), 4000);
        }
    };
    
    const handleClearData = async () => {
        if (window.confirm('Are you sure you want to clear all synced verb data? This will reset all verbs to their default conjugation rules.')) {
            try {
                await clearAllVerbs();
                setSyncStatus('All synced data has been cleared.');
            } catch (error) {
                console.error(error);
                setSyncStatus('Error: Could not clear data.');
            } finally {
                setTimeout(() => setSyncStatus(''), 4000);
            }
        }
    };

    return (
        <details className="p-4 border rounded-lg bg-slate-50 group">
            <summary className="font-semibold text-slate-800 cursor-pointer list-none flex justify-between items-center">
                Offline Data Management
                <span className="text-sky-500 text-xl transform transition-transform duration-200 group-open:rotate-180 details-arrow">&#9662;</span>
            </summary>
            <div className="mt-4 pt-4 border-t space-y-4">
                <div>
                    <h4 className="font-medium text-slate-700 mb-2">Sync Auxiliary Verbs</h4>
                    <p className="text-xs text-slate-500 mb-2">Fix incorrect auxiliary verbs (essere/avere) for a list by syncing with the AI, without changing irregular conjugation rules.</p>
                    <div className="flex items-center gap-2">
                         <select
                            value={selectedListToSync}
                            onChange={(e) => setSelectedListToSync(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 text-sm"
                            disabled={isSyncing}
                        >
                            <option value="">Select a list to sync...</option>
                            {savedLists.map(list => <option key={list.name} value={list.name}>{list.name}</option>)}
                        </select>
                        <button onClick={handleSync} disabled={!selectedListToSync || isSyncing} className="px-4 py-2 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 disabled:bg-slate-400 whitespace-nowrap">
                            {isSyncing ? 'Syncing...' : 'Sync Auxiliaries'}
                        </button>
                    </div>
                </div>
                 <div>
                    <h4 className="font-medium text-slate-700 mb-2">Database Reset</h4>
                     <button onClick={handleClearData} className="px-4 py-2 bg-red-600 text-white text-sm font-bold rounded-lg shadow-sm hover:bg-red-700">
                        Clear All Synced Data
                    </button>
                </div>
                {syncStatus && <p className="text-sm text-slate-600 text-center">{syncStatus}</p>}
            </div>
        </details>
    );
};


const Settings: React.FC<SettingsProps> = ({ onStart }) => {
  const [selectedTenses, setSelectedTenses] = useState<string[]>(['Indicativo Presente']);
  const [selectedPersons, setSelectedPersons] = useState<string[]>(ALL_PERSONS);
  const [difficulty, setDifficulty] = useState('Beginner');
  const [useCustomVerbs, setUseCustomVerbs] = useState(false);
  const [selectedList, setSelectedList] = useState('');
  const [customVerbs, setCustomVerbs] = useState<CustomVerb[]>([]);
  const [error, setError] = useState('');

  const { savedLists } = useSavedLists();
  
  useEffect(() => {
    if (useCustomVerbs && selectedList) {
      const list = savedLists.find(l => l.name === selectedList);
      if (list) {
        const parsedVerbs = parseVerbsFromText(list.content);
        setCustomVerbs(parsedVerbs);
        if(parsedVerbs.length === 0) {
          setError('Selected list has no valid verbs.');
        } else {
          setError('');
        }
      }
    } else {
      setCustomVerbs([]);
    }
  }, [useCustomVerbs, selectedList, savedLists]);

  const handleTenseChange = useCallback((tense: string) => {
    setSelectedTenses(prev =>
      prev.includes(tense)
        ? prev.filter(t => t !== tense)
        : [...prev, tense]
    );
  }, []);

  const handlePersonChange = useCallback((person: string) => {
    setSelectedPersons(prev =>
      prev.includes(person)
        ? prev.filter(p => p !== person)
        : [...prev, person]
    );
  }, []);

  const handleSelectAllTenses = useCallback((group: string[]) => {
      setSelectedTenses(prev => {
          const newTenses = new Set([...prev, ...group]);
          return Array.from(newTenses);
      });
  }, []);

  const handleDeselectAllTenses = useCallback((group: string[]) => {
      setSelectedTenses(prev => prev.filter(t => !group.includes(t)));
  }, []);

  const handleStartPractice = useCallback(() => {
    setError('');
    if (selectedTenses.length === 0) {
      setError('Please select at least one tense.');
      return;
    }
    if (selectedPersons.length === 0) {
      setError('Please select at least one person.');
      return;
    }
    if (useCustomVerbs && customVerbs.length === 0) {
      setError('Please select a custom list with valid verbs, or disable the custom verb option.');
      return;
    }

    onStart({
      tenses: selectedTenses,
      persons: selectedPersons,
      difficulty: difficulty,
      customVerbs: useCustomVerbs ? customVerbs : undefined,
    });
  }, [onStart, selectedTenses, selectedPersons, difficulty, useCustomVerbs, customVerbs]);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-slate-800 mb-4 border-b pb-2">Practice Settings</h2>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-slate-700">Tenses</h3>
        {Object.entries(TENSE_GROUPS).map(([groupName, tenses]) => (
            <div key={groupName} className="p-4 border rounded-lg bg-slate-50">
                <div className="flex justify-between items-center mb-3">
                    <h4 className="font-semibold">{groupName}</h4>
                    <div>
                        <button onClick={() => handleSelectAllTenses(tenses)} className="text-xs text-sky-600 hover:underline mr-2">All</button>
                        <button onClick={() => handleDeselectAllTenses(tenses)} className="text-xs text-sky-600 hover:underline">None</button>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                  {tenses.map(tense => (
                    <label key={tense} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedTenses.includes(tense)}
                        onChange={() => handleTenseChange(tense)}
                        className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                      />
                      <span className="text-sm text-slate-700">{tense}</span>
                    </label>
                  ))}
                </div>
            </div>
        ))}
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-medium text-slate-700">Persons</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {ALL_PERSONS.map(person => (
            <label key={person} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedPersons.includes(person)}
                onChange={() => handlePersonChange(person)}
                className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
              />
              <span className="text-sm text-slate-700">{person}</span>
            </label>
          ))}
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-slate-700">Verb Difficulty</h3>
        <div className="flex space-x-4">
          {['Beginner', 'Intermediate', 'Advanced'].map(level => (
            <label key={level} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="difficulty"
                value={level}
                checked={difficulty === level}
                onChange={(e) => setDifficulty(e.target.value)}
                className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                disabled={useCustomVerbs}
              />
              <span className={`text-sm ${useCustomVerbs ? 'text-slate-400' : 'text-slate-700'}`}>{level}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-3">
          <h3 className="text-lg font-medium text-slate-700">Custom Verb List</h3>
          <label className="flex items-center space-x-2 cursor-pointer">
              <input
                  type="checkbox"
                  checked={useCustomVerbs}
                  onChange={(e) => setUseCustomVerbs(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
              />
              <span className="text-sm text-slate-700">Use a custom verb list for practice</span>
          </label>

          {useCustomVerbs && (
              <div className="pl-6">
                  <select
                      value={selectedList}
                      onChange={(e) => setSelectedList(e.target.value)}
                      className="w-full max-w-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-sm"
                      disabled={savedLists.length === 0}
                  >
                      <option value="">{savedLists.length > 0 ? 'Select a list...' : 'No saved lists found'}</option>
                      {savedLists.map(list => <option key={list.name} value={list.name}>{list.name}</option>)}
                  </select>
              </div>
          )}
      </div>
      
      <div className="pt-4 text-right space-y-2">
          {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}
          <button
            onClick={handleStartPractice}
            className="px-8 py-3 bg-sky-600 text-white font-bold rounded-lg shadow-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50 transition-all"
          >
            Start Practice
          </button>
      </div>

      <div className="space-y-4 pt-4 border-t">
          <ListManager />
          <OfflineDataManager />
      </div>

    </div>
  );
};

export default Settings;
