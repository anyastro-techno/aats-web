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
  const [showDeveloper, setShowDeveloper] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const navigate = useNavigate();
  
  // Help Center Form States
  const [helpName, setHelpName] = useState('');
  const [helpEmail, setHelpEmail] = useState('');
  const [helpIssue, setHelpIssue] = useState('');
  const [helpStatus, setHelpStatus] = useState('IDLE'); // IDLE, SUBMITTING, SUCCESS, ERROR
  const [localCity, setLocalCity] = useState('Mumbai');

  // New Contact Form States
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactStatus, setContactStatus] = useState('IDLE');

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
      // Submitting via WhatsApp strictly
      const text = `*Maintenance Inquiry*\nName: ${helpName}\nEmail: ${helpEmail}\nIssue: ${helpIssue}`;
      const waUrl = `https://wa.me/918329004424?text=${encodeURIComponent(text)}`;
      window.open(waUrl, '_blank');
      
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

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactStatus('SUBMITTING');
    try {
      // Submitting via WhatsApp strictly
      const text = `*General Contact*\nName: ${contactName}\nEmail: ${contactEmail}\nMessage: ${contactMessage}`;
      const waUrl = `https://wa.me/918329004424?text=${encodeURIComponent(text)}`;
      window.open(waUrl, '_blank');

      setContactStatus('SUCCESS');
      setTimeout(() => {
        setContactStatus('IDLE');
        setContactName('');
        setContactEmail('');
        setContactMessage('');
      }, 3000);
    } catch (error) {
      console.error(error);
      setContactStatus('ERROR');
      setTimeout(() => setContactStatus('IDLE'), 3000);
    }
  };

  const t = {
    en: {
      help: "Help Center", lang: "English", back: "Contact", careers: "Careers",
      main_title: "We'll be back soon.",
      main_sub: "Keeping it minimal. We are making a few essential upgrades and will return shortly.",
      val1_title: "Better Security", val1_sub: "Keeping your infrastructure and data safe.",
      val2_title: "Faster Deployments", val2_sub: "Improving our nodes for quicker service.",
      val3_title: "Accurate Telemetry", val3_sub: "Updating our tracking so you know exactly where your operations are.",
      val4_title: "Smoother Integration", val4_sub: "Making the platform run faster and without interruptions.",
      developer_contact: "Contact Developer",
      dev_title: "Founder, CTO & Lead Developer",
      dev_name: "Arun Ammisetty",
      dev_phone: "+91 83290 04424",
      dev_wa: "Contact via WhatsApp",
      service_req: "Service Request",
      onboarding_title: "Service Request",
      onboarding_sub: "Looking for custom services, maintenance, or project inquiries? Connect with us via LinkedIn.",
      continue: "Continue to Site"
    },
    hi: {
      help: "सहायता केंद्र", lang: "हिन्दी", back: "संपर्क", careers: "करियर",
      main_title: "हम जल्द वापस आएंगे।",
      main_sub: "हम कुछ आवश्यक अपडेट कर रहे हैं। हम जल्द ही आपकी सेवा में फिर से हाज़िर होंगे।",
      val1_title: "बेहतर सुरक्षा", val1_sub: "आपके इन्फ्रास्ट्रक्चर और डेटा को सुरक्षित रखना।",
      val2_title: "तेज़ डिप्लॉयमेंट", val2_sub: "तेज़ सेवा के लिए हमारे नोड्स में सुधार करना।",
      val3_title: "सटीक टेलीमेट्री", val3_sub: "ट्रैकिंग अपडेट कर रहे हैं ताकि आपको अपने ऑपरेशन्स की सही जानकारी मिल सके।",
      val4_title: "आसान इंटीग्रेशन", val4_sub: "प्लेटफॉर्म को तेज़ और बिना किसी रुकावट के चलाना।",
      developer_contact: "डेवलपर से संपर्क करें",
      dev_title: "संस्थापक, सीटीओ और लीड डेवलपर",
      dev_name: "अरुण अम्मीसेट्टी",
      dev_phone: "+91 83290 04424",
      dev_wa: "व्हाट्सएप के माध्यम से संपर्क करें",
      service_req: "सेवा अनुरोध",
      onboarding_title: "सेवा अनुरोध",
      onboarding_sub: "कस्टम सेवाओं, रखरखाव या प्रोजेक्ट पूछताछ की तलाश में हैं? लिंक्डइन के माध्यम से हमसे जुड़ें।",
      continue: "साइट पर जारी रखें"
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

      {/* ONBOARDING FADE SCREEN */}
      <AnimatePresence>
        {showOnboarding && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full max-w-[500px] bg-[#0a0a0a] border border-[#333333] rounded-3xl p-10 flex flex-col items-center text-center shadow-2xl relative"
            >
              <h1 className="text-[2rem] font-black tracking-tight mb-4 text-white">{currentT.onboarding_title}</h1>
              <p className="text-[#888888] text-[1.1rem] leading-relaxed mb-8">{currentT.onboarding_sub}</p>
              <a href="https://www.linkedin.com/company/anyastro-techno/services/request-proposal/" target="_blank" rel="noreferrer" className="w-full bg-[#0077b5] text-white py-4 rounded-xl font-black mb-4 hover:bg-[#005582] transition-colors">
                {currentT.service_req}
              </a>
              <button onClick={() => setShowOnboarding(false)} className="w-full bg-transparent border border-[#333333] text-white py-4 rounded-xl font-bold hover:bg-[#111111] transition-colors">
                {currentT.continue}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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

      {/* DEVELOPER CONTACT MODAL */}
      <AnimatePresence>
        {showDeveloper && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-[400px] bg-[#050505] border border-[#333333] rounded-3xl p-8 flex flex-col shadow-2xl relative items-center text-center"
            >
              <button onClick={() => setShowDeveloper(false)} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-[#888888] hover:text-white transition-colors">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
              
              <h2 className="text-[1.3rem] font-black tracking-tight mb-4 text-white">{currentT.dev_title}</h2>
              <p className="text-[1.5rem] font-bold text-white mb-1">{currentT.dev_name}</p>
              <p className="text-[#888888] text-[1.1rem] mb-8 font-medium">{currentT.dev_phone}</p>
              
              <a href={`https://wa.me/918329004424?text=${encodeURIComponent('Hello Arun, I would like to connect.')}`} target="_blank" rel="noreferrer" className="w-full bg-[#25D366] text-white py-3.5 rounded-xl font-black hover:bg-[#1ebc59] transition-colors flex items-center justify-center gap-3">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                {currentT.dev_wa}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
      <div className="w-full max-w-[1400px] mx-auto px-8 md:px-16 py-12 flex flex-col gap-20 relative z-10 flex-1">
        
        {/* SECTION 1: MAINTENANCE MESSAGING */}
        <div className="flex flex-col lg:flex-row gap-20 items-start justify-between opacity-0 animate-fade stagger-1">
          <div className="flex-1">
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

        {/* SECTION 2: SYSTEM STATUS */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full pt-16 border-t border-[#111111]"
        >
          <h3 className="text-[2rem] font-black mb-6">System Status</h3>
          <div className="flex flex-col gap-4 max-w-2xl">
            <div className="flex items-center justify-between p-5 bg-[#0a0a0a] rounded-xl border border-[#333333]">
              <span className="font-bold text-[1.1rem]">Core Infrastructure</span>
              <span className="text-[#888888] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
                Updating
              </span>
            </div>
            <div className="flex items-center justify-between p-5 bg-[#0a0a0a] rounded-xl border border-[#333333]">
              <span className="font-bold text-[1.1rem]">Database Nodes</span>
              <span className="text-[#888888] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
                Optimizing
              </span>
            </div>
            <div className="flex items-center justify-between p-5 bg-[#0a0a0a] rounded-xl border border-[#333333]">
              <span className="font-bold text-[1.1rem]">API Services</span>
              <span className="text-[#888888] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                Offline
              </span>
            </div>
          </div>
        </motion.div>

        {/* SECTION 3: WHAT TO EXPECT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-full pt-8"
        >
          <h3 className="text-[2rem] font-black mb-4">What to Expect</h3>
          <p className="text-[#aaaaaa] max-w-2xl text-[1.1rem] leading-relaxed mb-6">
            Once we conclude our routine maintenance, you will experience significantly reduced latency across all global nodes and a cleaner overall interface. Absolutely no action is required on your part.
          </p>
        </motion.div>

        {/* SECTION 4: FREQUENTLY ASKED QUESTIONS */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full pt-8"
        >
          <h3 className="text-[2rem] font-black mb-6">Common Questions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
             <div className="bg-[#050505] p-8 rounded-2xl border border-[#222222]">
                <h4 className="font-bold text-[1.2rem] mb-3">Is my data secure right now?</h4>
                <p className="text-[#888888] text-[0.95rem] leading-relaxed">Yes, all user data is securely backed up across distributed storage nodes prior to initiating any platform updates.</p>
             </div>
             <div className="bg-[#050505] p-8 rounded-2xl border border-[#222222]">
                <h4 className="font-bold text-[1.2rem] mb-3">How long will this downtime last?</h4>
                <p className="text-[#888888] text-[0.95rem] leading-relaxed">System upgrades typically conclude within a few hours. We appreciate your patience while we tune the engines.</p>
             </div>
          </div>
        </motion.div>

        {/* SECTION 5: INLINE CONTACT FORM */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full max-w-2xl pt-16 pb-8"
        >
          <h3 className="text-[2.5rem] font-black mb-4 tracking-tight">Need to reach us?</h3>
          <p className="text-[#aaaaaa] text-[1.1rem] mb-8">Drop us a message below. Our support personnel will respond as soon as the systems are fully restored.</p>
          
          <form onSubmit={handleContactSubmit} className="flex flex-col gap-5">
             <div className="flex flex-col md:flex-row gap-5">
               <input type="text" required placeholder="Full Name" value={contactName} onChange={e => setContactName(e.target.value)} className="w-full bg-[#050505] border border-[#333333] text-white px-5 py-4 rounded-xl outline-none focus:border-white transition-colors" />
               <input type="email" required placeholder="Email Address" value={contactEmail} onChange={e => setContactEmail(e.target.value)} className="w-full bg-[#050505] border border-[#333333] text-white px-5 py-4 rounded-xl outline-none focus:border-white transition-colors" />
             </div>
             <textarea required placeholder="How can we assist you today?" value={contactMessage} onChange={e => setContactMessage(e.target.value)} rows="5" className="w-full bg-[#050505] border border-[#333333] text-white px-5 py-4 rounded-xl outline-none focus:border-white transition-colors resize-none"></textarea>
             
             <button disabled={contactStatus === 'SUBMITTING'} type="submit" className="w-full md:w-auto self-start bg-white text-black px-10 py-4 rounded-xl font-black mt-2 hover:bg-[#e0e0e0] transition-colors disabled:opacity-50 text-[1.1rem]">
               {contactStatus === 'SUBMITTING' ? 'SENDING...' : contactStatus === 'SUCCESS' ? 'SENT SUCCESSFULLY' : contactStatus === 'ERROR' ? 'FAILED, TRY AGAIN' : 'Submit Message'}
             </button>
          </form>
        </motion.div>

      </div>

      {/* FOOTER ALIGNMENT */}
      <footer className="w-full max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8 px-8 md:px-16 py-8 border-t border-[#111111] opacity-0 animate-fade stagger-3 relative z-10">
        
        {/* Custom SVG Social Icons */}
        <div className="flex items-center gap-8 text-[#555555]">
          <a href="https://www.linkedin.com/company/anyastro/" className="hover:text-white transition-colors"><svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
          <a href="#youtube" className="hover:text-white transition-colors"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg></a>
          <a href="https://www.instagram.com/" className="hover:text-white transition-colors"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>
          <a href="#x" className="hover:text-white transition-colors"><svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.006 4.15H5.078z"/></svg></a>
        </div>
        
        <div className="flex items-center gap-6 text-[0.8rem] font-bold text-[#555555]">
          <button onClick={() => setShowDeveloper(true)} className="hover:text-white transition-colors outline-none">{currentT.developer_contact}</button>
          <span className="w-1 h-1 bg-[#333333] rounded-full"></span>
          <a href="https://www.linkedin.com/company/anyastro-techno/services/request-proposal/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors outline-none">{currentT.service_req}</a>
          <span className="w-1 h-1 bg-[#333333] rounded-full"></span>
          <button onClick={() => setShowHelpCenter(true)} className="hover:text-white transition-colors outline-none">{currentT.help}</button>
          <span className="w-1 h-1 bg-[#333333] rounded-full"></span>
          <div className="flex items-center gap-2 hover:text-white transition-colors cursor-default">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            {localCity}, IN
          </div>
        </div>

      </footer>
    </div>
  );
}