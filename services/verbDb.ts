
import type { VerbInfo } from '../types';

const DB_NAME = 'ItalianVerbDB';
const DB_VERSION = 1;
const STORE_NAME = 'verbs';

let dbPromise: Promise<IDBDatabase> | null = null;

function openDb(): Promise<IDBDatabase> {
  if (dbPromise) {
    return dbPromise;
  }
  dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      console.error('IndexedDB error:', request.error);
      reject('Error opening IndexedDB.');
      dbPromise = null; 
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'infinitive' });
      }
    };
  });
  return dbPromise;
}

export async function getVerb(infinitive: string): Promise<VerbInfo | undefined> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(infinitive.toLowerCase());

    request.onerror = () => reject('Error fetching verb from DB.');
    request.onsuccess = () => resolve(request.result as VerbInfo | undefined);
  });
}

export async function saveVerb(verbInfo: VerbInfo): Promise<void> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put({ ...verbInfo, infinitive: verbInfo.infinitive.toLowerCase() });

    request.onerror = () => reject('Error saving verb to DB.');
    request.onsuccess = () => resolve();
  });
}

export async function bulkSaveVerbs(verbInfos: VerbInfo[]): Promise<void> {
  if (verbInfos.length === 0) return;
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    transaction.onerror = (event) => {
        console.error('Transaction error during bulk save', event);
        reject('Transaction failed during bulk save.');
    };
    
    transaction.oncomplete = () => {
        resolve();
    };

    verbInfos.forEach(verbInfo => {
      store.put(verbInfo);
    });
  });
}
