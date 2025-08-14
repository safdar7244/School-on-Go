import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  Timestamp,
  QueryConstraint,
  DocumentData,
  CollectionReference,
  DocumentReference,
} from 'firebase/firestore';
import { db } from './firebase';

export interface FirestoreDocument {
  id: string;
  [key: string]: any;
}

export interface QueryOptions {
  where?: Array<{
    field: string;
    operator: '==' | '!=' | '<' | '<=' | '>' | '>=' | 'array-contains' | 'in' | 'array-contains-any';
    value: any;
  }>;
  orderBy?: Array<{
    field: string;
    direction: 'asc' | 'desc';
  }>;
  limit?: number;
}

class FirestoreService {
  /**
   * Add a new document to a collection
   */
  async addDocument<T extends DocumentData>(
    collectionName: string,
    data: T
  ): Promise<{ success: boolean; id?: string; error?: string }> {
    try {
      const docRef = await addDoc(collection(db, collectionName), {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error(`Error adding document to ${collectionName}:`, error);
      return { success: false, error: (error as Error).message };
    }
  }

  /**
   * Set a document with a specific ID
   */
  async setDocument<T extends DocumentData>(
    collectionName: string,
    documentId: string,
    data: T,
    merge = false
  ): Promise<{ success: boolean; error?: string }> {
    try {
      await setDoc(
        doc(db, collectionName, documentId),
        {
          ...data,
          updatedAt: serverTimestamp(),
        },
        { merge }
      );
      return { success: true };
    } catch (error) {
      console.error(`Error setting document ${documentId} in ${collectionName}:`, error);
      return { success: false, error: (error as Error).message };
    }
  }

  /**
   * Get a single document by ID
   */
  async getDocument<T extends FirestoreDocument>(
    collectionName: string,
    documentId: string
  ): Promise<{ success: boolean; data?: T; error?: string }> {
    try {
      const docRef = doc(db, collectionName, documentId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          success: true,
          data: {
            id: docSnap.id,
            ...this.convertTimestamps(data),
          } as T,
        };
      } else {
        return { success: false, error: 'Document not found' };
      }
    } catch (error) {
      console.error(`Error getting document ${documentId} from ${collectionName}:`, error);
      return { success: false, error: (error as Error).message };
    }
  }

  /**
   * Get multiple documents from a collection with optional query constraints
   */
  async getDocuments<T extends FirestoreDocument>(
    collectionName: string,
    options?: QueryOptions
  ): Promise<{ success: boolean; data?: T[]; error?: string }> {
    try {
      const collectionRef = collection(db, collectionName);
      const constraints: QueryConstraint[] = [];

      // Add where constraints
      if (options?.where) {
        options.where.forEach(({ field, operator, value }) => {
          constraints.push(where(field, operator as any, value));
        });
      }

      // Add orderBy constraints
      if (options?.orderBy) {
        options.orderBy.forEach(({ field, direction }) => {
          constraints.push(orderBy(field, direction));
        });
      }

      // Add limit constraint
      if (options?.limit) {
        constraints.push(limit(options.limit));
      }

      const q = query(collectionRef, ...constraints);
      const querySnapshot = await getDocs(q);

      const documents: T[] = [];
      querySnapshot.forEach((doc) => {
        documents.push({
          id: doc.id,
          ...this.convertTimestamps(doc.data()),
        } as T);
      });

      return { success: true, data: documents };
    } catch (error) {
      console.error(`Error getting documents from ${collectionName}:`, error);
      return { success: false, error: (error as Error).message };
    }
  }

  /**
   * Update a document
   */
  async updateDocument<T extends Partial<DocumentData>>(
    collectionName: string,
    documentId: string,
    data: T
  ): Promise<{ success: boolean; error?: string }> {
    try {
      await updateDoc(doc(db, collectionName, documentId), {
        ...data,
        updatedAt: serverTimestamp(),
      });
      return { success: true };
    } catch (error) {
      console.error(`Error updating document ${documentId} in ${collectionName}:`, error);
      return { success: false, error: (error as Error).message };
    }
  }

  /**
   * Delete a document
   */
  async deleteDocument(
    collectionName: string,
    documentId: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      await deleteDoc(doc(db, collectionName, documentId));
      return { success: true };
    } catch (error) {
      console.error(`Error deleting document ${documentId} from ${collectionName}:`, error);
      return { success: false, error: (error as Error).message };
    }
  }

  /**
   * Listen to real-time updates for a single document
   */
  subscribeToDocument<T extends FirestoreDocument>(
    collectionName: string,
    documentId: string,
    callback: (data: T | null, error?: string) => void
  ): () => void {
    const docRef = doc(db, collectionName, documentId);
    
    return onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = {
            id: docSnap.id,
            ...this.convertTimestamps(docSnap.data()),
          } as T;
          callback(data);
        } else {
          callback(null, 'Document not found');
        }
      },
      (error) => {
        console.error(`Error listening to document ${documentId} in ${collectionName}:`, error);
        callback(null, error.message);
      }
    );
  }

  /**
   * Listen to real-time updates for a collection
   */
  subscribeToCollection<T extends FirestoreDocument>(
    collectionName: string,
    callback: (data: T[], error?: string) => void,
    options?: QueryOptions
  ): () => void {
    const collectionRef = collection(db, collectionName);
    const constraints: QueryConstraint[] = [];

    // Add query constraints
    if (options?.where) {
      options.where.forEach(({ field, operator, value }) => {
        constraints.push(where(field, operator as any, value));
      });
    }

    if (options?.orderBy) {
      options.orderBy.forEach(({ field, direction }) => {
        constraints.push(orderBy(field, direction));
      });
    }

    if (options?.limit) {
      constraints.push(limit(options.limit));
    }

    const q = query(collectionRef, ...constraints);

    return onSnapshot(
      q,
      (querySnapshot) => {
        const documents: T[] = [];
        querySnapshot.forEach((doc) => {
          documents.push({
            id: doc.id,
            ...this.convertTimestamps(doc.data()),
          } as T);
        });
        callback(documents);
      },
      (error) => {
        console.error(`Error listening to collection ${collectionName}:`, error);
        callback([], error.message);
      }
    );
  }

  /**
   * Get a reference to a collection
   */
  getCollectionRef(collectionName: string): CollectionReference {
    return collection(db, collectionName);
  }

  /**
   * Get a reference to a document
   */
  getDocumentRef(collectionName: string, documentId: string): DocumentReference {
    return doc(db, collectionName, documentId);
  }

  /**
   * Convert Firestore Timestamps to JavaScript Dates
   */
  private convertTimestamps(data: DocumentData): DocumentData {
    const converted: DocumentData = {};
    
    for (const [key, value] of Object.entries(data)) {
      if (value instanceof Timestamp) {
        converted[key] = value.toDate();
      } else if (value && typeof value === 'object' && !Array.isArray(value)) {
        converted[key] = this.convertTimestamps(value);
      } else {
        converted[key] = value;
      }
    }
    
    return converted;
  }

  /**
   * Batch operations helper
   */
  async batchWrite(
    operations: Array<{
      type: 'set' | 'update' | 'delete';
      collection: string;
      document: string;
      data?: DocumentData;
    }>
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const { writeBatch } = await import('firebase/firestore');
      const batch = writeBatch(db);

      operations.forEach(({ type, collection: collectionName, document: documentId, data }) => {
        const docRef = doc(db, collectionName, documentId);
        
        switch (type) {
          case 'set':
            if (data) {
              batch.set(docRef, { ...data, updatedAt: serverTimestamp() });
            }
            break;
          case 'update':
            if (data) {
              batch.update(docRef, { ...data, updatedAt: serverTimestamp() });
            }
            break;
          case 'delete':
            batch.delete(docRef);
            break;
        }
      });

      await batch.commit();
      return { success: true };
    } catch (error) {
      console.error('Error executing batch write:', error);
      return { success: false, error: (error as Error).message };
    }
  }
}

export const firestoreService = new FirestoreService();
export default firestoreService;