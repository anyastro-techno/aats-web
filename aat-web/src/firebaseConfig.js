import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// AnyAstro Techno Solutions Firebase Configuration
// NOTE: Ensure these values match your actual Firebase project settings.
const firebaseConfig = {
  apiKey: "AIzaSyAwVHDwlzJ_kBmWFbLwqYLQW-kf402yXr4",
  authDomain: "aatgroup.firebaseapp.com",
  projectId: "aatgroup",
  storageBucket: "aatgroup.firebasestorage.ap",
  messagingSenderId: "367194698604",
  appId: "367194698604:web:9e276683da208c1100f949"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Authentication Security Gateway
export const auth = getAuth(app);