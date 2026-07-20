import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// AnyAstro Techno Solutions Firebase Configuration
// NOTE: Ensure these values match your actual Firebase project settings.
const firebaseConfig = {
  apiKey: "AIzaSyFakeKey_AnyAstroTechnoSolutions2026",
  authDomain: "anyastro-techno-solutions.firebaseapp.com",
  projectId: "anyastro-techno-solutions",
  storageBucket: "anyastro-techno-solutions.appspot.com",
  messagingSenderId: "999999999999",
  appId: "1:999999999999:web:abcdef123456"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);