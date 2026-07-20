import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebaseConfig'; 
import { motion, AnimatePresence } from 'framer-motion';
import Footer from './components/Footer';

export default function MaintenanceOverlay() {
  const [lang, setLang] = useState('en');
  const [showLangPrompt, setShowLangPrompt] = useState(false);
  const [showHelpCenter, setShowHelpCenter] = useState(false);
  const navigate = useNavigate();
  
  // Help Center Form States
  const [helpName, setHelpName] = useState('');
  const [helpEmail, setHelpEmail] = useState('');
  const [helpIssue, setHelpIssue] = useState('');
  const [helpStatus, setHelpStatus] = useState('IDLE'); // IDLE, SUBMITTING, SUCCESS, ERROR
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

      {/* TOP HEADER */}
      <header className="w-full flex items-center justify-between px-8 md:px-16 py-8 animate-fade relative z-50">
        <div className="flex items-center gap-2">
          <img src="/assets/branding/logo.png" alt="AnyAstro" className="h-8 w-auto" onError={(e) => e.target.style.display = 'none'} />
          <span className="font-black text-[1.5rem] tracking-tighter ml-[-5px]"></span>
        </div>
        
        <div className="flex items-center gap-6 text-[0.9rem] font-bold">
          <button onClick={() => setShowHelpCenter(true)} className="hover:text-[#aaaaaa] transition-colors hidden sm:block outline-none">
            {currentT.help}
          </button>
          
          <button 
            onClick={() => setShowLangPrompt(true)}
            className="flex items-center gap-2 hover:text-[#aaaaaa] transition-colors outline-none"
          >
            {currentT.lang}
          </button>

          <button onClick={() => navigate('/')} className="bg-white text-black px-5 py-2 rounded-full flex items-center gap-2 hover:bg-[#e0e0e0] transition-colors outline-none">
            {currentT.back}
          </button>
        </div>
      </header>

      {/* LANGUAGE SELECTOR MODAL */}
      <AnimatePresence>
        {showLangPrompt && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-[400px] bg-[#050505] border border-[#333333] rounded-3xl p-8 flex flex-col shadow-2xl relative"
            >
              <button onClick={() => setShowLangPrompt(false)} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-[#888888] hover:text-white transition-colors">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
              
              <div className="w-12 h-12 mx-auto rounded-full border border-[#333333] flex items-center justify-center mb-4">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
              </div>

              <h2 className="text-[1.5rem] font-black tracking-tight mb-2 text-white text-center">Select Language</h2>
              <p className="text-[#888888] text-[0.9rem] text-center mb-8">Choose your preferred viewing language.</p>
              
              <div className="flex flex-col gap-2">
                {languageOptions.map((option) => (
                  <button 
                    key={option.code}
                    onClick={() => { setLang(option.code); setShowLangPrompt(false); }}
                    className={`w-full p-4 rounded-xl flex items-center justify-between group transition-colors ${lang === option.code ? 'bg-[#222222] border border-white' : 'bg-[#0a0a0a] border border-[#333333] hover:border-white'}`}
                  >
                    <span className={`font-bold text-[1rem] ${lang === option.code ? 'text-white' : 'text-[#888888] group-hover:text-white'}`}>{option.label}</span>
                    {lang === option.code && <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HELP CENTER COMMUNICATION MODAL */}
      <AnimatePresence>
        {showHelpCenter && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-[500px] bg-[#050505] border border-[#333333] rounded-3xl p-8 flex flex-col shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <button onClick={() => setShowHelpCenter(false)} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-[#888888] hover:text-white transition-colors">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>

              {helpStatus === 'SUCCESS' ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#00ff88" strokeWidth="2" className="mb-4"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  <h3 className="text-[1.5rem] font-black mb-2 text-white">Message Sent</h3>
                  <p className="text-[#888888] text-[0.9rem]">Our support team has received your message.</p>
                </div>
              ) : helpStatus === 'ERROR' ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <h3 className="text-[1.5rem] font-black mb-2 text-[#ff4444]">Message Failed</h3>
                  <p className="text-[#888888] text-[0.9rem]">Please check your internet connection and try again.</p>
                </div>
              ) : (
                <>
                  <h2 className="text-[1.5rem] font-black tracking-tight mb-2 text-white text-center mt-2">Contact Support</h2>
                  <p className="text-[#888888] text-[0.9rem] text-center mb-6">Send your questions or issues directly to our support team.</p>
                  
                  <div className="bg-[#111111] border border-[#333333] rounded-xl p-4 mb-6">
                    <p className="text-[#aaaaaa] text-[0.85rem] mb-1">Registered Office:</p>
                    <p className="text-white font-bold text-[0.9rem]">AnyAstro Techno Solutions</p>
                    <p className="text-[#aaaaaa] text-[0.8rem] mb-3">Pune, Maharashtra, IN</p>
                    <p className="text-[#aaaaaa] text-[0.85rem] mb-1">E-mailing Address:</p>
                    <p className="text-white font-bold text-[0.9rem]">engineering@anyastro.tech</p>
                  </div>

                  <form onSubmit={handleHelpSubmit} className="flex flex-col gap-4">
                    <input type="text" required placeholder="Your Full Name" value={helpName} onChange={e => setHelpName(e.target.value)} className="w-full bg-[#000000] border border-[#333333] text-white px-4 py-3.5 rounded-xl outline-none focus:border-white transition-colors text-[0.9rem]" />
                    <input type="email" required placeholder="Your Email Address" value={helpEmail} onChange={e => setHelpEmail(e.target.value)} className="w-full bg-[#000000] border border-[#333333] text-white px-4 py-3.5 rounded-xl outline-none focus:border-white transition-colors text-[0.9rem]" />
                    <textarea required placeholder="Describe your issue or question..." value={helpIssue} onChange={e => setHelpIssue(e.target.value)} rows="4" className="w-full bg-[#000000] border border-[#333333] text-white px-4 py-3.5 rounded-xl outline-none focus:border-white transition-colors text-[0.9rem] resize-none"></textarea>
                    
                    <button disabled={helpStatus === 'SUBMITTING'} type="submit" className="w-full bg-white text-black py-3.5 rounded-xl font-black mt-2 hover:bg-[#e0e0e0] transition-colors disabled:opacity-50">
                      {helpStatus === 'SUBMITTING' ? 'SENDING...' : 'Send Message'}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN CONTAINER */}
      <div className="w-full max-w-[1400px] mx-auto px-8 md:px-16 py-12 flex flex-col lg:flex-row gap-20 items-start justify-between relative z-10 flex-1">
        
        {/* SECTION 1: MAINTENANCE MESSAGING */}
        <div className="flex-1 opacity-0 animate-fade stagger-1">
          <div className="w-16 h-16 rounded-full bg-[#111111] border border-[#333333] flex items-center justify-center mb-6">
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="animate-[spin_4s_linear_infinite]">
              <path d="M12 2v4"></path>
              <path d="M12 18v4"></path>
              <path d="M4.93 4.93l2.83 2.83"></path>
              <path d="M16.24 16.24l2.83 2.83"></path>
              <path d="M2 12h4"></path>
              <path d="M18 12h4"></path>
              <path d="M4.93 19.07l2.83-2.83"></path>
              <path d="M16.24 7.76l2.83-2.83"></path>
            </svg>
          </div>
          
          <h1 className="text-[3.5rem] md:text-[5rem] lg:text-[5.5rem] font-black leading-[1] tracking-tighter mb-6 text-white max-w-[800px]">
            {currentT.main_title}
          </h1>
          <p className="text-[1.25rem] md:text-[1.5rem] text-[#aaaaaa] font-medium leading-[1.5] max-w-[600px] mb-12">
            {currentT.main_sub}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="flex flex-col gap-2">
               <div className="w-10 h-10 rounded-full border border-[#333333] flex items-center justify-center mb-2"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="white" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg></div>
               <h4 className="font-black text-[1.2rem]">{currentT.val1_title}</h4>
               <p className="text-[#888888] text-[0.95rem] leading-relaxed">{currentT.val1_sub}</p>
            </div>
            <div className="flex flex-col gap-2">
               <div className="w-10 h-10 rounded-full border border-[#333333] flex items-center justify-center mb-2"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="white" strokeWidth="2"><polygon points="3 11 22 2 13 21 11 13 3 11"></polygon></svg></div>
               <h4 className="font-black text-[1.2rem]">{currentT.val2_title}</h4>
               <p className="text-[#888888] text-[0.95rem] leading-relaxed">{currentT.val2_sub}</p>
            </div>
            <div className="flex flex-col gap-2">
               <div className="w-10 h-10 rounded-full border border-[#333333] flex items-center justify-center mb-2"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="white" strokeWidth="2"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg></div>
               <h4 className="font-black text-[1.2rem]">{currentT.val3_title}</h4>
               <p className="text-[#888888] text-[0.95rem] leading-relaxed">{currentT.val3_sub}</p>
            </div>
            <div className="flex flex-col gap-2">
               <div className="w-10 h-10 rounded-full border border-[#333333] flex items-center justify-center mb-2"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="white" strokeWidth="2"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg></div>
               <h4 className="font-black text-[1.2rem]">{currentT.val4_title}</h4>
               <p className="text-[#888888] text-[0.95rem] leading-relaxed">{currentT.val4_sub}</p>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER ALIGNMENT */}
      <div className="opacity-0 animate-fade stagger-3 mt-auto">
         <Footer localCity={localCity} onHelpClick={() => setShowHelpCenter(true)} />
      </div>

    </div>
  );
}