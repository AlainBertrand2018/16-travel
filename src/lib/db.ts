import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDoc,
  onSnapshot, 
  query, 
  where,
  getDocs,
  Timestamp,
  serverTimestamp
} from "firebase/firestore";
import { db, storage } from "./firebase";
import { 
  ref, 
  uploadBytes, 
  getDownloadURL 
} from "firebase/storage";

// Generic CRUD services
export const dbService = {
  // Get all documents from a collection
  subscribeToCollection: (collectionName: string, callback: (data: any[]) => void) => {
    const q = query(collection(db, collectionName));
    return onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id // Ensure Firestore ID takes precedence
      }));
      callback(items);
    });
  },

  // Get a single document
  getSingleItem: async (collectionName: string, id: string) => {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { ...docSnap.data(), id: docSnap.id };
    }
    return null;
  },

  // Add a document
  addItem: async (collectionName: string, item: any) => {
    // Strip redundant internal ID if present to avoid Firestore record confusion
    const { id, ...dataToSave } = item;
    const docRef = await addDoc(collection(db, collectionName), {
      ...dataToSave,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  },

  // Update a document
  updateItem: async (collectionName: string, id: string, updates: any) => {
    const { id: internalId, ...dataToUpdate } = updates;
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, {
      ...dataToUpdate,
      updatedAt: serverTimestamp()
    });
  },

  // Delete a document
  deleteItem: async (collectionName: string, id: string) => {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
  }
};

export const storageService = {
  uploadFile: async (path: string, file: File) => {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  }
};
