// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
const firebaseConfig = {
  apiKey: "AIzaSyDbHBmbPqQw9jvKvrgtlUuMLwn8TQZ2jVc",
  authDomain: "abarrotes-clientes.firebaseapp.com",
  projectId: "abarrotes-clientes",
  storageBucket: "abarrotes-clientes.appspot.com",
  messagingSenderId: "284517708796",
  appId: "1:284517708796:web:ab855309a87b55dab0b879",
  measurementId: "G-TZWM307X14"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

const db = getFirestore(app);



export { app, auth, db, signInWithEmailAndPassword };
