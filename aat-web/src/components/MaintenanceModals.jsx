import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function OnboardingModal({ showOnboarding, setShowOnboarding, currentT }) {
  return (
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
  );
}

export function DeveloperModal({ showDeveloper, setShowDeveloper, currentT }) {
  return (
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
  );
}

export function LanguageModal({ showLangPrompt, setShowLangPrompt, languageOptions, lang, setLang }) {
  return (
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
  );
}

export function HelpCenterModal({ showHelpCenter, setShowHelpCenter, currentT, helpStatus, helpName, setHelpName, helpEmail, setHelpEmail, helpIssue, setHelpIssue, handleHelpSubmit }) {
  return (
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
                  <p className="text-[#aaaaaa] text-[0.85rem] mb-1">Registered & Virtual Office:</p>
                  <p className="text-white font-bold text-[0.9rem]">AnyAstro Techno Solutions</p>
                  <p className="text-[#aaaaaa] text-[0.8rem] mb-3">Pune, Maharashtra, IN & Bengaluru, Karnataka, IN</p>
                  <p className="text-[#aaaaaa] text-[0.85rem] mb-1">E-mailing Address:</p>
                  <p className="text-white font-bold text-[0.9rem]">help.aat@tuta.io</p>
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
  );
}

export function SitemapModal({ showSitemap, setShowSitemap, navigate }) {
  const sitemapLinks = [
    { title: "Main Platform Dashboard", path: "/" },
    { title: "Organizational Leadership Team", path: "/team" },
    { title: "Career Opportunities", path: "/company/careers" },
    { title: "Brand Guidelines and Assets", path: "/company/brand-guidelines" },
    { title: "Media Kit and Press Resources", path: "/company/media-kit" },
    { title: "Press Releases and Announcements", path: "/company/press-kit" },
    { title: "Privacy Policy", path: "/legal/privacy-policy" },
    { title: "Terms of Service", path: "/legal/terms-of-service" },
    { title: "Cookie Policy", path: "/legal/cookie-policy" },
    { title: "Accessibility Statement", path: "/legal/accessibility-statement" },
    { title: "Security Policy", path: "/legal/security-policy" },
    { title: "Responsible Disclosure Protocol", path: "/legal/responsible-disclosure" },
    { title: "API Documentation", path: "/developers/api-documentation" },
    { title: "Developer Portal", path: "/developers/developer-portal" }
  ];

  return (
    <AnimatePresence>
      {showSitemap && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
            className="w-full max-w-[600px] bg-[#050505] border border-[#333333] rounded-3xl p-8 flex flex-col shadow-2xl relative max-h-[85vh] overflow-y-auto"
          >
            <button onClick={() => setShowSitemap(false)} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-[#888888] hover:text-white transition-colors outline-none">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            
            <h2 className="text-[1.8rem] font-black tracking-tight mb-2 text-white">Platform Directory</h2>
            <p className="text-[#888888] text-[0.95rem] mb-6">Select any section below to navigate directly to the requested page.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {sitemapLinks.map((link, idx) => (
                <button
                  key={idx}
                  onClick={() => { setShowSitemap(false); navigate(link.path); }}
                  className="p-4 rounded-xl bg-[#0a0a0a] border border-[#222222] hover:border-white text-left transition-colors flex items-center justify-between group outline-none"
                >
                  <span className="font-bold text-[0.95rem] text-[#cccccc] group-hover:text-white">{link.title}</span>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#555555] group-hover:text-white transition-colors"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}