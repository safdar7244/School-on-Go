// firebase.js
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore"

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyAN3Uli8IXQZKzcvG_gs38R2Cqj1ztO3ck",
  authDomain: "student-on-the-move-4383f.firebaseapp.com",
  projectId: "student-on-the-move-4383f",
  storageBucket: "student-on-the-move-4383f.appspot.com",
  messagingSenderId: "496105969901",
  appId: "1:496105969901:web:92bdc9490a35f64dc354e4",
  measurementId: "G-8XBJB4PBST",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

const db = getFirestore(app)