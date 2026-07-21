import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig';
import SEOHead from '../../components/SEOHead';
import MaintenanceHeader from '../../components/MaintenanceHeader';
import MaintenanceFooter from '../../components/MaintenanceFooter';
import AccessibilityWidget from '../../components/AccessibilityWidget';
import { LanguageModal, HelpCenterModal, DeveloperModal, SitemapModal } from '../../components/MaintenanceModals';
import { t, languageOptions } from '../../utils/translations';

export default function DeveloperPortal() {
  const [lang, setLang] = useState('en');
  const [showLangPrompt, setShowLangPrompt] = useState(false);
  const [showHelpCenter, setShowHelpCenter] = useState(false);
  const [showDeveloper, setShowDeveloper] = useState(false);
  const [showAccessibility, setShowAccessibility] = useState(false);
  const [showSitemap, setShowSitemap] = useState(false);
  const navigate = useNavigate();

  // Authentication & Session States
  const [currentUser, setCurrentUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('LOGIN'); // 'LOGIN' or 'REQUEST'
  
  // Inactivity Timer States
  const [showLogoutWarning, setShowLogoutWarning] = useState(false);
  const [countdownTime, setCountdownTime] = useState(15);

  // Login Form States
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Request Access Form States
  const [reqName, setReqName] = useState('');
  const [reqEmail, setReqEmail] = useState('');
  const [reqOrg, setReqOrg] = useState('');
  const [reqPurpose, setReqPurpose] = useState('');
  const [consentGiven, setConsentGiven] = useState(false);
  const [spamAnswer, setSpamAnswer] = useState('');
  const [num1] = useState(Math.floor(Math.random() * 10) + 1);
  const [num2] = useState(Math.floor(Math.random() * 10) + 1);
  const [reqStatus, setReqStatus] = useState('IDLE');
  const [reqError, setReqError] = useState('');

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

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Verify if user exists in approved registry collection in Firestore
        try {
          const q = query(collection(db, 'approved_developers'), where('email', '==', user.email));
          const querySnapshot = await getDocs(q);
          if (querySnapshot.empty) {
            await signOut(auth);
            setCurrentUser(null);
            setLoginError('Account credentials not found or access has not been approved by the founder yet.');
          } else {
            setCurrentUser(user);
          }
        } catch (err) {
          console.error(err);
          setCurrentUser(user);
        }
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // 15-Second Inactivity Auto-Logout Timer with Global Warning
  useEffect(() => {
    let inactivityTimer;
    let warningTimer;
    let countdownInterval;

    const resetTimers = () => {
      if (!currentUser) return;
      setShowLogoutWarning(false);
      setCountdownTime(15);

      clearTimeout(inactivityTimer);
      clearTimeout(warningTimer);
      clearInterval(countdownInterval);

      // Trigger warning banner at 10 seconds of inactivity
      warningTimer = setTimeout(() => {
        setShowLogoutWarning(true);
        let timeLeft = 5;
        setCountdownTime(timeLeft);
        countdownInterval = setInterval(() => {
          timeLeft -= 1;
          setCountdownTime(timeLeft);
          if (timeLeft <= 0) {
            clearInterval(countdownInterval);
          }
        }, 1000);
      }, 10000);

      // Execute logout at 15 seconds of inactivity
      inactivityTimer = setTimeout(() => {
        signOut(auth);
        setShowLogoutWarning(false);
        alert('Session terminated due to inactivity for security purposes.');
      }, 15000);
    };

    const events = ['mousemove', 'keydown', 'scroll', 'click', 'touchstart'];
    if (currentUser) {
      events.forEach(event => window.addEventListener(event, resetTimers));
      resetTimers();
    }

    return () => {
      events.forEach(event => window.removeEventListener(event, resetTimers));
      clearTimeout(inactivityTimer);
      clearTimeout(warningTimer);
      clearInterval(countdownInterval);
    };
  }, [currentUser]);

  const handleHelpSubmit = async (e) => {
    e.preventDefault();
    setHelpStatus('SUBMITTING');
    try {
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
      setHelpStatus('ERROR');
      setTimeout(() => setHelpStatus('IDLE'), 3000);
    }
  };

  const verifyAccountApprovalAndSet = async (user) => {
    try {
      const q = query(collection(db, 'approved_developers'), where('email', '==', user.email));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        await signOut(auth);
        setLoginError('Account credentials not found or access has not been approved by the founder yet. Please request access.');
        return false;
      }
      return true;
    } catch (error) {
      console.error(error);
      return true;
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      const isApproved = await verifyAccountApprovalAndSet(userCredential.user);
      if (isApproved) {
        alert('Authentication successful. Welcome to the management dashboard.');
        setShowAuthModal(false);
      }
    } catch (error) {
      console.error(error);
      setLoginError('Account credentials not found or you are not registered yet. Please register here by requesting access.');
    }
  };

  const handleGoogleAuth = async () => {
    setLoginError('');
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const isApproved = await verifyAccountApprovalAndSet(userCredential.user);
      if (isApproved) {
        alert('Google authentication successful. Welcome to the management dashboard.');
        setShowAuthModal(false);
      }
    } catch (error) {
      console.error(error);
      setLoginError('Account credentials not found or you are not registered yet. Please register here by requesting access.');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      alert('You have been securely signed out.');
    } catch (error) {
      console.error(error);
    }
  };

  const handleRequestAccessSubmit = async (e) => {
    e.preventDefault();
    setReqError('');

    // Anti-spam verification check
    if (parseInt(spamAnswer) !== num1 + num2) {
      setReqError('Incorrect anti-spam verification answer. Please resolve the arithmetic calculation correctly.');
      return;
    }

    if (!consentGiven) {
      setReqError('You must agree to the mandatory consent terms before submitting your access request.');
      return;
    }

    setReqStatus('SUBMITTING');
    try {
      // Store access request in Firestore database
      await addDoc(collection(db, 'access_requests'), {
        name: reqName,
        email: reqEmail,
        organization: reqOrg,
        purpose: reqPurpose,
        status: 'PENDING',
        createdAt: new Date().toISOString()
      });

      // Transmit details directly to founder WhatsApp
      const text = `*Developer Portal Access Request*\nName: ${reqName}\nEmail: ${reqEmail}\nOrganization: ${reqOrg}\nPurpose: ${reqPurpose}`;
      const waUrl = `https://wa.me/918329004424?text=${encodeURIComponent(text)}`;
      window.open(waUrl, '_blank');

      setReqStatus('SUCCESS');
      setTimeout(() => {
        setShowAuthModal(false);
        setReqStatus('IDLE');
        setReqName('');
        setReqEmail('');
        setReqOrg('');
        setReqPurpose('');
        setConsentGiven(false);
        setSpamAnswer('');
      }, 3000);
    } catch (error) {
      console.error(error);
      setReqStatus('ERROR');
      setReqError('Failed to record request in database. Please verify your connection.');
      setTimeout(() => setReqStatus('IDLE'), 3000);
    }
  };

  const currentT = t[lang] || t['en'];

  const SectionVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="w-full min-h-screen bg-[#000000] text-white font-sans selection:bg-white selection:text-black overflow-x-hidden flex flex-col relative">
      
      {/* Global Inactivity Auto-Logout Warning Banner */}
      <AnimatePresence>
        {showLogoutWarning && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }}
            className="fixed top-0 left-0 w-full z-[100] bg-[#ff4444] text-black py-3 px-6 text-center font-black flex items-center justify-center gap-4 shadow-2xl"
          >
            <span>SECURITY WARNING: Inactivity detected. Your session will be terminated in {countdownTime} seconds for protection purposes. Move your mouse or interact to remain signed in.</span>
          </motion.div>
        )}
      </AnimatePresence>

      <SEOHead 
        title="Developer Portal" 
        description="Authentication gateway for application programming interface access." 
        canonicalUrl="https://anyastro.tech/developers/developer-portal" 
      />

      {/* Global Modals and Widgets */}
      <DeveloperModal showDeveloper={showDeveloper} setShowDeveloper={setShowDeveloper} currentT={currentT} />
      <LanguageModal showLangPrompt={showLangPrompt} setShowLangPrompt={setShowLangPrompt} languageOptions={languageOptions} lang={lang} setLang={setLang} />
      <HelpCenterModal showHelpCenter={showHelpCenter} setShowHelpCenter={setShowHelpCenter} currentT={currentT} helpStatus={helpStatus} helpName={helpName} setHelpName={setHelpName} helpEmail={helpEmail} setHelpEmail={setHelpEmail} helpIssue={helpIssue} setHelpIssue={setHelpIssue} handleHelpSubmit={handleHelpSubmit} />
      <SitemapModal showSitemap={showSitemap} setShowSitemap={setShowSitemap} navigate={navigate} />
      <AccessibilityWidget isOpen={showAccessibility} onClose={() => setShowAccessibility(false)} />

      {/* Master Navigation Header */}
      <MaintenanceHeader 
        currentT={currentT} 
        setShowHelpCenter={setShowHelpCenter} 
        setShowLangPrompt={setShowLangPrompt} 
        navigate={navigate} 
        onToggleAccessibility={() => setShowAccessibility(!showAccessibility)}
      />

      {/* Authentication / Request Access Modal */}
      <AnimatePresence>
        {showAuthModal && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-black/85 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-[550px] bg-[#050505] border border-[#333333] rounded-3xl p-8 flex flex-col shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <button onClick={() => setShowAuthModal(false)} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-[#888888] hover:text-white transition-colors">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>

              <div className="flex border-b border-[#333333] mb-6">
                <button 
                  onClick={() => setAuthMode('LOGIN')} 
                  className={`flex-1 pb-3 font-bold text-[1rem] transition-colors border-b-2 ${authMode === 'LOGIN' ? 'border-white text-white' : 'border-transparent text-[#888888]'}`}
                >
                  Sign In
                </button>
                <button 
                  onClick={() => setAuthMode('REQUEST')} 
                  className={`flex-1 pb-3 font-bold text-[1rem] transition-colors border-b-2 ${authMode === 'REQUEST' ? 'border-white text-white' : 'border-transparent text-[#888888]'}`}
                >
                  Request Access
                </button>
              </div>

              {authMode === 'LOGIN' ? (
                <div className="flex flex-col gap-6">
                  <button 
                    onClick={handleGoogleAuth}
                    className="w-full bg-white text-black py-3.5 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-[#e0e0e0] transition-colors"
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18"><path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/><path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.95H1.2v3.15C3.16 21.32 7.22 24 12 24z"/><path fill="#FBBC05" d="M5.28 14.25c-.25-.72-.38-1.49-.38-2.25s.13-1.53.38-2.25V6.6H1.2C.44 8.13 0 9.87 0 12s.44 3.87 1.2 5.4l4.08-3.15z"/><path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.22 0 3.16 2.68 1.2 6.6l4.08 3.15c.95-2.84 3.6-4.95 6.72-4.95z"/></svg>
                    Continue with Google
                  </button>

                  <div className="flex items-center gap-4 text-[#555555]">
                    <div className="h-px bg-[#333333] flex-1"></div>
                    <span className="text-xs uppercase tracking-widest font-bold">Or Email Sign In</span>
                    <div className="h-px bg-[#333333] flex-1"></div>
                  </div>

                  <form onSubmit={handleEmailLogin} className="flex flex-col gap-4">
                    {loginError && (
                      <div className="p-4 bg-[#220000] border border-[#ff4444] rounded-xl text-[#ff8888] text-[0.9rem] leading-relaxed">
                        {loginError}
                      </div>
                    )}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[0.85rem] font-bold text-[#aaaaaa]">Email Address</label>
                      <input type="email" required placeholder="name@organization.com" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} className="w-full bg-[#000000] border border-[#333333] text-white px-4 py-3.5 rounded-xl outline-none focus:border-white transition-colors text-[0.95rem]" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[0.85rem] font-bold text-[#aaaaaa]">Password</label>
                      <input type="password" required placeholder="Enter your password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} className="w-full bg-[#000000] border border-[#333333] text-white px-4 py-3.5 rounded-xl outline-none focus:border-white transition-colors text-[0.95rem]" />
                    </div>
                    <button type="submit" className="w-full bg-white text-black py-4 rounded-xl font-black mt-2 hover:bg-[#e0e0e0] transition-colors">
                      Sign In to Portal
                    </button>
                  </form>
                </div>
              ) : (
                <div>
                  {reqStatus === 'SUCCESS' ? (
                    <div className="flex flex-col items-center justify-center py-10 text-center">
                      <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#00ff88" strokeWidth="2" className="mb-4"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                      <h3 className="text-[1.8rem] font-black mb-2 text-white">Access Request Transmitted</h3>
                      <p className="text-[#888888] text-[0.95rem]">Your details have been saved in our database and sent directly to the founder via WhatsApp.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleRequestAccessSubmit} className="flex flex-col gap-4">
                      {reqError && (
                        <div className="p-4 bg-[#220000] border border-[#ff4444] rounded-xl text-[#ff8888] text-[0.9rem] leading-relaxed">
                          {reqError}
                        </div>
                      )}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[0.85rem] font-bold text-[#aaaaaa]">Full Name</label>
                        <input type="text" required placeholder="Enter your full name" value={reqName} onChange={e => setReqName(e.target.value)} className="w-full bg-[#000000] border border-[#333333] text-white px-4 py-3.5 rounded-xl outline-none focus:border-white transition-colors text-[0.95rem]" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[0.85rem] font-bold text-[#aaaaaa]">Corporate Email</label>
                        <input type="email" required placeholder="name@organization.com" value={reqEmail} onChange={e => setReqEmail(e.target.value)} className="w-full bg-[#000000] border border-[#333333] text-white px-4 py-3.5 rounded-xl outline-none focus:border-white transition-colors text-[0.95rem]" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[0.85rem] font-bold text-[#aaaaaa]">Organization Name</label>
                        <input type="text" required placeholder="Enter organization name" value={reqOrg} onChange={e => setReqOrg(e.target.value)} className="w-full bg-[#000000] border border-[#333333] text-white px-4 py-3.5 rounded-xl outline-none focus:border-white transition-colors text-[0.95rem]" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[0.85rem] font-bold text-[#aaaaaa]">Purpose of API Access</label>
                        <textarea required placeholder="Describe your technical integration requirements..." value={reqPurpose} onChange={e => setReqPurpose(e.target.value)} rows="3" className="w-full bg-[#000000] border border-[#333333] text-white px-4 py-3.5 rounded-xl outline-none focus:border-white transition-colors text-[0.95rem] resize-none"></textarea>
                      </div>

                      {/* Anti-Spam Protection Field */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[0.85rem] font-bold text-[#aaaaaa]">Anti-Spam Verification: What is {num1} + {num2}?</label>
                        <input type="number" required placeholder="Enter sum" value={spamAnswer} onChange={e => setSpamAnswer(e.target.value)} className="w-full bg-[#000000] border border-[#333333] text-white px-4 py-3.5 rounded-xl outline-none focus:border-white transition-colors text-[0.95rem]" />
                      </div>

                      {/* Mandatory Consent Checkbox */}
                      <div className="flex items-start gap-3 mt-2">
                        <input type="checkbox" required checked={consentGiven} onChange={e => setConsentGiven(e.target.checked)} id="consent" className="mt-1 w-4 h-4 accent-white rounded cursor-pointer" />
                        <label htmlFor="consent" className="text-[0.85rem] text-[#aaaaaa] cursor-pointer leading-relaxed">
                          I agree to share my organizational details for administrative review and security verification by the founder.
                        </label>
                      </div>

                      <button disabled={reqStatus === 'SUBMITTING'} type="submit" className="w-full bg-white text-black py-4 rounded-xl font-black mt-2 hover:bg-[#e0e0e0] transition-colors disabled:opacity-50">
                        {reqStatus === 'SUBMITTING' ? 'TRANSMITTING AND SAVING...' : 'Submit Request to Founder'}
                      </button>
                    </form>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Container */}
      <div className="w-full max-w-[1000px] mx-auto px-8 md:px-16 py-16 flex flex-col gap-16 flex-1 relative z-10">
        
        {/* Hero Section */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center max-w-[600px] mx-auto mb-4">
          <div className="w-20 h-20 bg-[#111111] border border-[#333333] rounded-2xl mx-auto mb-8 flex items-center justify-center">
            <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="white" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
          </div>
          <h1 className="text-[2.5rem] md:text-[3.5rem] font-black tracking-tighter mb-4">Engineering Access</h1>
          <p className="text-[#888888] font-medium text-[1.1rem] mb-8">
            {currentUser ? `Signed in as ${currentUser.email}` : "Authenticate with your pre-approved enterprise credentials or request access."}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            {currentUser ? (
              <button onClick={handleSignOut} className="w-full py-4 bg-[#220000] border border-[#ff4444] text-[#ff8888] font-black rounded-xl hover:bg-[#330000] transition-colors outline-none text-[1.05rem]">
                Sign Out ({currentUser.email})
              </button>
            ) : (
              <>
                <button onClick={() => { setAuthMode('LOGIN'); setShowAuthModal(true); }} className="flex-1 py-4 bg-white text-black font-black rounded-xl hover:bg-[#e0e0e0] transition-colors outline-none text-[1.05rem]">
                  Sign In
                </button>
                <button onClick={() => { setAuthMode('REQUEST'); setShowAuthModal(true); }} className="flex-1 py-4 bg-[#111111] border border-[#333333] text-white font-black rounded-xl hover:bg-[#222222] transition-colors outline-none text-[1.05rem]">
                  Request Access
                </button>
              </>
            )}
          </div>
        </motion.div>

        {/* Section 1: Authentication Logic */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={SectionVariants} className="bg-[#050505] border border-[#222222] p-8 rounded-2xl flex flex-col gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#111111] border border-[#333333] flex items-center justify-center text-white mb-2">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
          </div>
          <h2 className="text-[1.75rem] font-black tracking-tight">1. Authentication and Access Control Logic</h2>
          <p className="text-[#cccccc] leading-relaxed text-[1.05rem]">
            All gateway requests require verified institutional credentials approved directly by the founder. Enterprise administrators manage permission scopes and security parameters through the secure portal interface.
          </p>
        </motion.section>

        {/* Section 2: Rate Limiting */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={SectionVariants} className="bg-[#050505] border border-[#222222] p-8 rounded-2xl flex flex-col gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#111111] border border-[#333333] flex items-center justify-center text-white mb-2">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          </div>
          <h2 className="text-[1.75rem] font-black tracking-tight">2. Rate Limiting and Traffic Thresholds</h2>
          <p className="text-[#cccccc] leading-relaxed text-[1.05rem]">
            Network traffic is monitored continuously to guarantee balanced load distribution across distributed server nodes. Automated throttling safeguards maintain stable transaction execution during peak operating hours.
          </p>
        </motion.section>

        {/* Section 3: Endpoint References */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={SectionVariants} className="bg-[#050505] border border-[#222222] p-8 rounded-2xl flex flex-col gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#111111] border border-[#333333] flex items-center justify-center text-white mb-2">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
          </div>
          <h2 className="text-[1.75rem] font-black tracking-tight">3. Endpoint References and Integration Standards</h2>
          <p className="text-[#cccccc] leading-relaxed text-[1.05rem]">
            Standardized API endpoints enable seamless integration with internal software architectures. Comprehensive documentation outlines payload structures, header parameters, and response schemas.
          </p>
        </motion.section>

        {/* Section 4: Error Handling */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={SectionVariants} className="bg-[#050505] border border-[#222222] p-8 rounded-2xl flex flex-col gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#111111] border border-[#333333] flex items-center justify-center text-white mb-2">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          </div>
          <h2 className="text-[1.75rem] font-black tracking-tight">4. Error Handling and Diagnostic Protocols</h2>
          <p className="text-[#cccccc] leading-relaxed text-[1.05rem]">
            Structured response codes provide immediate diagnostic feedback upon encountering invalid parameters or connection timeouts, ensuring rapid identification and resolution of integration anomalies.
          </p>
        </motion.section>

        {/* Section 5: Security Compliance */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={SectionVariants} className="bg-[#050505] border border-[#222222] p-8 rounded-2xl flex flex-col gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#111111] border border-[#333333] flex items-center justify-center text-white mb-2">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
          </div>
          <h2 className="text-[1.75rem] font-black tracking-tight">5. Security Compliance and Encryption Standards</h2>
          <p className="text-[#cccccc] leading-relaxed text-[1.05rem]">
            All data exchanges adhere to military-grade encryption in transit and at rest. Security compliance audits are executed regularly to maintain uncompromised perimeter integrity.
          </p>
        </motion.section>

        {/* Section 6: Support Infrastructure */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={SectionVariants} className="bg-[#050505] border border-[#222222] p-8 rounded-2xl flex flex-col gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#111111] border border-[#333333] flex items-center justify-center text-white mb-2">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          </div>
          <h2 className="text-[1.75rem] font-black tracking-tight">6. Dedicated Engineering Support Infrastructure</h2>
          <p className="text-[#cccccc] leading-relaxed text-[1.05rem]">
            Enterprise partners receive direct access to our core architectural team for custom integrations, performance tuning, and continuous infrastructure scaling consultations.
          </p>
        </motion.section>

      </div>

      {/* Master Navigation Footer */}
      <MaintenanceFooter currentT={currentT} setShowDeveloper={setShowDeveloper} setShowHelpCenter={setShowHelpCenter} setShowSitemap={setShowSitemap} localCity={localCity} />

    </div>
  );
}