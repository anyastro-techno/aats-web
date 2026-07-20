import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebaseConfig'; 
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../../components/Footer';

export default function MaintenanceOverlay() {
  const [lang, setLang] = useState('en');
  const [showLangPrompt, setShowLangPrompt] = useState(false);
  const [showHelpCenter, setShowHelpCenter] = useState(false);
  const navigate = useNavigate();
  
  const [helpName, setHelpName] = useState('');
  const [helpEmail, setHelpEmail] = useState('');
  const [helpIssue, setHelpIssue] = useState('');
  const [helpStatus, setHelpStatus] = useState('IDLE');
  const [localCity, setLocalCity] = useState('Mumbai');

  useEffect(() => {
    const sysLang = navigator.language.slice(0, 2);
    const supported = ['en', 'hi', 'mr', 'gu', 'te', 'ta', 'pa', 'bho', 'ar', 'es', 'fr', 'de'];
    if (supported.includes(sysLang)) setLang(sysLang);

    const indianCities = ['Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad'];
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz === 'Asia/Kolkata') {
        const day = new Date().getDay();
        setLocalCity(indianCities[day % indianCities.length]);
      } else {
        setLocalCity('Mumbai');
      }
    } catch (e) {
      setLocalCity('Bengaluru');
    }
  }, []);

  const handleHelpSubmit = async (e) => {
    e.preventDefault();
    setHelpStatus('SUBMITTING');
    try {
      await addDoc(collection(db, 'platform_feedback'), {
        name: helpName,
        email: helpEmail,
        comment: helpIssue,
        category: 'Maintenance Inquiry',
        rating: 0,
        timestamp: serverTimestamp()
      });
      setHelpStatus('SUCCESS');
      setTimeout(() => {
        setShowHelpCenter(false);
        setHelpStatus('IDLE');
        setHelpName('');
        setHelpEmail('');
        setHelpIssue('');
      }, 3000);
    } catch (error) {
      console.error(error);
      setHelpStatus('ERROR');
      setTimeout(() => setHelpStatus('IDLE'), 3000);
    }
  };

  const t = {
    en: {
      help: "Help Center", lang: "English", back: "Contact", careers: "Careers",
      main_title: "System Update in Progress.",
      main_sub: "We are currently updating our systems to serve you better. We will be back online shortly.",
      val1_title: "Better Security", val1_sub: "Keeping your infrastructure and data safe.",
      val2_title: "Faster Deployments", val2_sub: "Improving our nodes for quicker service.",
      val3_title: "Accurate Telemetry", val3_sub: "Updating our tracking so you know exactly where your operations are.",
      val4_title: "Smoother Integration", val4_sub: "Making the platform run faster and without interruptions."
    },
    hi: {
      help: "सहायता केंद्र", lang: "हिन्दी", back: "संपर्क", careers: "करियर",
      main_title: "सिस्टम अपडेट चल रहा है।",
      main_sub: "हम आपको बेहतर सेवा देने के लिए अपने सिस्टम को अपडेट कर रहे हैं। हम जल्द ही वापस आएंगे।",
      val1_title: "बेहतर सुरक्षा", val1_sub: "आपके इन्फ्रास्ट्रक्चर और डेटा को सुरक्षित रखना।",
      val2_title: "तेज़ डिप्लॉयमेंट", val2_sub: "तेज़ सेवा के लिए हमारे नोड्स में सुधार करना।",
      val3_title: "सटीक टेलीमेट्री", val3_sub: "ट्रैकिंग अपडेट कर रहे हैं ताकि आपको अपने ऑपरेशन्स की सही जानकारी मिल सके।",
      val4_title: "आसान इंटीग्रेशन", val4_sub: "प्लेटफॉर्म को तेज़ और बिना किसी रुकावट के चलाना।"
    }
  };

  const currentT = t[lang] || t['en'];
  const languageOptions = [
    { code: 'en', label: 'English' }, { code: 'hi', label: 'हिन्दी' }
  ];

  return (
    <div className="w-full min-h-screen bg-[#000000] text-white font-sans selection:bg-white selection:text-black overflow-x-hidden flex flex-col relative">
      <style>
        {`
          @keyframes fadeIn { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
          .animate-fade { animation: fadeIn 0.8s ease-out forwards; }
          .stagger-1 { animation-delay: 0.1s; }
          .stagger-2 { animation-delay: 0.2s; }
          .stagger-3 { animation-delay: 0.3s; }
          input:focus, textarea:focus { border-color: #ffffff !important; }
        `}
      </style>
      <header className="w-full flex items-center justify-between px-8 md:px-16 py-8 animate-fade relative z-50">
        <div className="flex items-center gap-2">
          <img src="/assets/branding/logo.png" alt="AnyAstro" className="h-8 w-auto" onError={(e) => e.target.style.display = 'none'} />
          <span className="font-black text-[1.5rem] tracking-tighter ml-[-5px]"></span>
        </div>
        <div className="flex items-center gap-6 text-[0.9rem] font-bold">
          <button onClick={() => setShowHelpCenter(true)} className="hover:text-[#aaaaaa] transition-colors hidden sm:block outline-none">
            {currentT.help}
          </button>
          <button onClick={() => setShowLangPrompt(true)} className="flex items-center gap-2 hover:text-[#aaaaaa] transition-colors outline-none">
            {currentT.lang}
          </button>
          <button onClick={() => navigate('/')} className="bg-white text-black px-5 py-2 rounded-full flex items-center gap-2 hover:bg-[#e0e0e0] transition-colors outline-none">
            {currentT.back}
          </button>
        </div>
      </header>
      <div className="w-full max-w-[1400px] mx-auto px-8 md:px-16 py-12 flex flex-col lg:flex-row gap-20 items-start justify-between relative z-10 flex-1">
        <div className="flex-1 opacity-0 animate-fade stagger-1">
          <h1 className="text-[3.5rem] md:text-[5rem] lg:text-[5.5rem] font-black leading-[1] tracking-tighter mb-6 text-white max-w-[800px]">
            {currentT.main_title}
          </h1>
          <p className="text-[1.25rem] md:text-[1.5rem] text-[#aaaaaa] font-medium leading-[1.5] max-w-[600px] mb-12">
            {currentT.main_sub}
          </p>
        </div>
      </div>
      <div className="opacity-0 animate-fade stagger-3 mt-auto">
         <Footer localCity={localCity} onHelpClick={() => setShowHelpCenter(true)} />
      </div>
    </div>
  );
}