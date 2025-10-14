
import { useState, useEffect, useCallback } from 'react';
import type { SavedList } from '../types';

const STORAGE_KEY = 'italianVerbCustomLists';

export function useSavedLists() {
  const [savedLists, setSavedLists] = useState<SavedList[]>([]);

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

  const saveList = useCallback((listName: string, content: string, shouldOverwrite: boolean = false): { success: boolean, needsOverwrite: boolean } => {
    if (savedLists.some(list => list.name === listName) && !shouldOverwrite) {
      return { success: false, needsOverwrite: true };
    }

    const updatedLists = savedLists.filter(list => list.name !== listName);
    const newList = { name: listName, content: content };
    const newSavedLists = [...updatedLists, newList].sort((a, b) => a.name.localeCompare(b.name));

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newSavedLists));
      setSavedLists(newSavedLists);
      return { success: true, needsOverwrite: false };
    } catch (error) {
      console.error("Failed to save list to local storage:", error);
      alert("Error: Could not save the list.");
      return { success: false, needsOverwrite: false };
    }
  }, [savedLists]);

  const deleteList = useCallback((listName: string) => {
    const newSavedLists = savedLists.filter(list => list.name !== listName);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newSavedLists));
      setSavedLists(newSavedLists);
    } catch (error) {
      console.error("Failed to delete list from local storage:", error);
      alert("Error: Could not delete the list.");
    }
  }, [savedLists]);

  return { savedLists, saveList, deleteList };
}
