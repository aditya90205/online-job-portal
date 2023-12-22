// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmwlB6IsHo5poS9MrnnXOCtASCEVwAyr8",
  authDomain: "online-job-portal-8678b.firebaseapp.com",
  projectId: "online-job-portal-8678b",
  storageBucket: "online-job-portal-8678b.appspot.com",
  messagingSenderId: "726339627292",
  appId: "1:726339627292:web:331d4eba7c7c95f355f2d9",
  measurementId: "G-S1K8TP49J4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};