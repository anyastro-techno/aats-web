import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from 'firebase/auth';
import { db } from '../../firebaseConfig'; 
import { motion, AnimatePresence } from 'framer-motion';
import { FaceDetector, FilesetResolver } from '@mediapipe/tasks-vision';
import { MaintenanceOverlay } from '../../App';

const IS_MAINTENANCE = false;

export default function Home() {
  const [lang, setLang] = useState('en');
  const [showLangPrompt, setShowLangPrompt] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', role: 'Enterprise Client', city: '', industry: '' });
  const [status, setStatus] = useState('IDLE');
  
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, [auth]);

  const handleStandardAuth = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, e.target.email.value, e.target.password.value);
      setShowLoginPrompt(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    setStatus('SUBMITTING');
    try {
      await addDoc(collection(db, 'project_requests'), {
        ...formData,
        timestamp: serverTimestamp()
      });
      setStatus('SUCCESS');
    } catch (err) {
      setStatus('ERROR');
    }
  };

  if (IS_MAINTENANCE) {
    return <MaintenanceOverlay />;
  }

  return (
    <div className="w-full min-h-screen bg-white text-black font-sans">
      <header className="flex justify-between items-center px-16 py-8">
        <h1 className="font-black text-2xl">AnyAstro Techno Solutions</h1>
        <div className="flex gap-6 font-bold">
           <button onClick={() => setShowLoginPrompt(true)}>Log In</button>
           <button className="bg-black text-white px-6 py-2 rounded-full">Book Consultation</button>
        </div>
      </header>
      
      <main className="max-w-6xl mx-auto px-16 py-20">
        <h1 className="text-7xl font-bold tracking-tight mb-8">Engineering operational excellence.</h1>
        <p className="text-2xl text-gray-600 mb-16 max-w-2xl">Building industrial-grade software, GIS mapping, and autonomous systems for enterprises across India.</p>
        
        <form onSubmit={handleLeadSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl bg-gray-50 p-8 rounded-2xl">
          <input required type="text" placeholder="Full Name" className="p-4 rounded-xl border border-gray-300" onChange={(e) => setFormData({...formData, name: e.target.value})} />
          <input required type="email" placeholder="Corporate Email" className="p-4 rounded-xl border border-gray-300" onChange={(e) => setFormData({...formData, email: e.target.value})} />
          <input required type="text" placeholder="Industry" className="p-4 rounded-xl border border-gray-300" onChange={(e) => setFormData({...formData, industry: e.target.value})} />
          <button type="submit" className="bg-black text-white py-4 rounded-xl font-bold">
             {status === 'SUBMITTING' ? 'Processing...' : 'Submit Project Request'}
          </button>
        </form>
      </main>
    </div>
  );
}