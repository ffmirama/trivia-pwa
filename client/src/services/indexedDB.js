import { openDB } from 'idb';

const DB_NAME = 'TriviaDB';
const STORE_NAME = 'questions';

// Inicializa la base de datos
export const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    },
  });
};

// Guarda una o más preguntas
export const saveQuestions = async (questions) => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  questions.forEach((q) => store.put(q));
  await tx.done;
};

// Obtiene todas las preguntas locales
export const getQuestions = async () => {
  const db = await initDB();
  return db.getAll(STORE_NAME);
};
