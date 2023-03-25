// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage"
import {setPersistence, browserSessionPersistence,inMemoryPersistence } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBBw5qKpMJq131-ixPZs7z84U0tA3jM2X8",
  authDomain: "urjas-bharat-gas.firebaseapp.com",
  projectId: "urjas-bharat-gas",
  storageBucket: "urjas-bharat-gas.appspot.com",
  messagingSenderId: "285482540735",
  appId: "1:285482540735:web:098b0cb018772e9de4700a",
  measurementId: "G-DBQW832YG5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

// setPersistence(auth, browserSessionPersistence)

