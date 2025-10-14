import type { VerbInfo } from '../types';

const DB_NAME = 'VerbDatabase';
const DB_VERSION = 1;
const STORE_NAME = 'verbs';

let db: IDBDatabase | null = null;

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (db) {
      resolve(db);
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      console.error("Error opening IndexedDB:", request.error);
      reject(request.error);
    };

    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const tempDb = (event.target as IDBOpenDBRequest).result;
      if (!tempDb.objectStoreNames.contains(STORE_NAME)) {
        tempDb.createObjectStore(STORE_NAME, { keyPath: 'infinitive' });
      }
    };
  });
}

export async function getVerb(infinitive: string): Promise<VerbInfo | null> {
  const dbConnection = await openDb();
  return new Promise((resolve, reject) => {
    try {
      const transaction = dbConnection.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(infinitive);

      request.onsuccess = () => {
        resolve(request.result || null);
      };

      request.onerror = () => {
        console.error(`Error fetching verb "${infinitive}":`, request.error);
        reject(request.error);
      };
    } catch (error) {
        console.error(`Error creating transaction for verb "${infinitive}":`, error);
        reject(error);
    }
  });
}

export async function saveVerb(verbInfo: VerbInfo): Promise<void> {
    const dbConnection = await openDb();
    return new Promise((resolve, reject) => {
        try {
            const transaction = dbConnection.transaction(STORE_NAME, 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.put(verbInfo);

            request.onsuccess = () => {
                resolve();
            };

            request.onerror = () => {
                console.error(`Error saving verb "${verbInfo.infinitive}":`, request.error);
                reject(request.error);
            };
        } catch (error) {
            console.error(`Error creating transaction for saving verb "${verbInfo.infinitive}":`, error);
            reject(error);
        }
    });
}

export async function clearAllVerbs(): Promise<void> {
  const dbConnection = await openDb();
  return new Promise((resolve, reject) => {
    try {
      const transaction = dbConnection.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.clear();

      request.onsuccess = () => {
        console.log("Verb store cleared successfully.");
        resolve();
      };

      request.onerror = () => {
        console.error('Error clearing verb store:', request.error);
        reject(request.error);
      };
    } catch (error) {
      console.error('Error creating transaction for clearing verbs:', error);
      reject(error);
    }
  });
}
