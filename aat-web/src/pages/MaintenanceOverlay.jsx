import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebaseConfig'; 
import { motion } from 'framer-motion';

import { t, languageOptions } from '../utils/translations';
import MaintenanceHeader from '../components/MaintenanceHeader';
import MaintenanceFooter from '../components/MaintenanceFooter';
import { OnboardingModal, DeveloperModal, LanguageModal, HelpCenterModal } from '../components/MaintenanceModals';
import AccessibilityWidget from '../components/AccessibilityWidget';

export default function MaintenanceOverlay() {
  const [lang, setLang] = useState('en');
  const [showLangPrompt, setShowLangPrompt] = useState(false);
  const [showHelpCenter, setShowHelpCenter] = useState(false);
  const [showDeveloper, setShowDeveloper] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [showAccessibility, setShowAccessibility] = useState(false);
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

  const currentT = t[lang] || t['en'];

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

      {/* MODALS */}
      <OnboardingModal showOnboarding={showOnboarding} setShowOnboarding={setShowOnboarding} currentT={currentT} />
      <DeveloperModal showDeveloper={showDeveloper} setShowDeveloper={setShowDeveloper} currentT={currentT} />
      <LanguageModal showLangPrompt={showLangPrompt} setShowLangPrompt={setShowLangPrompt} languageOptions={languageOptions} lang={lang} setLang={setLang} />
      <HelpCenterModal showHelpCenter={showHelpCenter} setShowHelpCenter={setShowHelpCenter} currentT={currentT} helpStatus={helpStatus} helpName={helpName} setHelpName={setHelpName} helpEmail={helpEmail} setHelpEmail={setHelpEmail} helpIssue={helpIssue} setHelpIssue={setHelpIssue} handleHelpSubmit={handleHelpSubmit} />

      {/* ACCESSIBILITY MODAL CONTAINER */}
      <AccessibilityWidget isOpen={showAccessibility} onClose={() => setShowAccessibility(false)} />

      {/* HEADER */}
      <MaintenanceHeader 
        currentT={currentT} 
        setShowHelpCenter={setShowHelpCenter} 
        setShowLangPrompt={setShowLangPrompt} 
        navigate={navigate} 
        onToggleAccessibility={() => setShowAccessibility(!showAccessibility)}
      />

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

      {/* FOOTER */}
      <MaintenanceFooter currentT={currentT} setShowDeveloper={setShowDeveloper} setShowHelpCenter={setShowHelpCenter} localCity={localCity} />

    </div>
  );
}