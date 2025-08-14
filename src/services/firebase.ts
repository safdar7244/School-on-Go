import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

// Firebase configuration for student-on-the-move project
const firebaseConfig = {
  apiKey: "AIzaSyAN3Uli8IXQZKzcvG_gs38R2Cqj1ztO3ck",
  authDomain: "student-on-the-move-4383f.firebaseapp.com",
  projectId: "student-on-the-move-4383f",
  storageBucket: "student-on-the-move-4383f.appspot.com",
  messagingSenderId: "496105969901",
  appId: "1:496105969901:web:92bdc9490a35f64dc354e4",
  measurementId: "G-8XBJB4PBST"
};

// Initialize Firebase app (avoid duplicate initialization)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase Auth
// For Expo/React Native, getAuth() automatically handles persistence
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Storage
const storage = getStorage(app);

// Connect to emulators in development
if (__DEV__ && process.env.EXPO_PUBLIC_USE_FIREBASE_EMULATOR === 'true') {
  try {
    connectFirestoreEmulator(db, 'localhost', 8080);
    connectStorageEmulator(storage, 'localhost', 9199);
  } catch (error) {
    console.log('Firebase emulators already connected or not available');
  }
}

export { auth, db, storage };
export default app;
