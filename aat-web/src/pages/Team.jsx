import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import MaintenanceHeader from '../components/MaintenanceHeader';
import MaintenanceFooter from '../components/MaintenanceFooter';
import AccessibilityWidget from '../components/AccessibilityWidget';
import { LanguageModal, HelpCenterModal, DeveloperModal, SitemapModal } from '../components/MaintenanceModals';
import { t, languageOptions } from '../utils/translations';

export default function Team() {
  // Global Navigation and Integration States
  const [lang, setLang] = useState('en');
  const [showLangPrompt, setShowLangPrompt] = useState(false);
  const [showHelpCenter, setShowHelpCenter] = useState(false);
  const [showDeveloper, setShowDeveloper] = useState(false);
  const [showAccessibility, setShowAccessibility] = useState(false);
  const [showSitemap, setShowSitemap] = useState(false);
  const navigate = useNavigate();

  // Help Center Form States
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

  const currentT = t[lang] || t['en'];

  // Organizational Roster Data
  const executiveBoard = [
    { name: "Arun Ammisetty", role: "Founder, CTO & Lead Developer", focus: "Global Strategy & System Architecture" },
    { name: "Palak Bhosale", role: "Co-Founder & COO", focus: "Organizational Operations" }
  ];

  const advisoryCouncil = [
    { name: "Dr. Vikram Sharma", role: "Chief Strategic Advisor", focus: "Market Expansion" },
    { name: "Sarah Jenkins", role: "Financial Strategy Advisor", focus: "Capital Allocation" }
  ];

  const departmentHeads = [
    { name: "Rajesh Kumar", role: "Vice President of Engineering", focus: "Infrastructure Scaling" },
    { name: "Elena Rodriguez", role: "Global Head of Marketing", focus: "Brand Acquisition" },
    { name: "Kenji Sato", role: "Director of Product Design", focus: "User Experience" }
  ];

  const globalOperations = [
    { name: "Ananya Desai", role: "Head of APAC Operations", focus: "Regional Growth" },
    { name: "Marcus Thorne", role: "Director of EMEA Compliance", focus: "Regulatory Adherence" },
    { name: "Mei Lin", role: "Supply Chain Director", focus: "Resource Optimization" }
  ];

  const SectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.2 } }
  };

  const CardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="w-full min-h-screen bg-[#000000] text-white font-sans selection:bg-white selection:text-black overflow-x-hidden flex flex-col relative">
      
      <SEOHead 
        title="Leadership Team" 
        description="Meet the executive board and organizational leadership driving our technological innovations."
        canonicalUrl="https://anyastro.tech/team"
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

      {/* Main Content Container */}
      <div className="w-full max-w-[1400px] mx-auto px-8 md:px-16 py-16 flex flex-col gap-24 relative z-10 flex-1">
        
        {/* Section 1: Executive Board */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={SectionVariants} className="w-full">
          <h2 className="text-[2.5rem] md:text-[3.5rem] font-black mb-12 border-b border-[#333333] pb-6 flex items-center gap-4">
            <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
            Executive Board
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {executiveBoard.map((member, index) => (
              <motion.div key={index} variants={CardVariants} whileHover={{ scale: 1.02 }} className="bg-[#111111] border border-[#333333] p-8 rounded-xl shadow-2xl">
                <div className="w-20 h-20 bg-[#222222] rounded-full mb-6 border border-[#444444] flex items-center justify-center">
                  <span className="font-bold text-[#888888]">{member.name.charAt(0)}</span>
                </div>
                <h3 className="text-[1.8rem] font-bold mb-2">{member.name}</h3>
                <p className="text-[#aaaaaa] font-medium text-[1.1rem] mb-6">{member.role}</p>
                <div className="text-sm border-t border-[#333333] pt-4 uppercase tracking-widest text-[#888888]">{member.focus}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Section 2: Advisory Council */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={SectionVariants} className="w-full">
          <h2 className="text-[2.5rem] font-black mb-10 border-b border-[#333333] pb-6 flex items-center gap-4">
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
            Advisory Council
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {advisoryCouncil.map((member, index) => (
              <motion.div key={index} variants={CardVariants} className="bg-[#0a0a0a] border border-[#222222] p-8 rounded-xl">
                <h3 className="text-[1.5rem] font-bold mb-2">{member.name}</h3>
                <p className="text-[#888888] font-medium mb-4">{member.role}</p>
                <div className="text-xs uppercase tracking-widest text-[#666666]">{member.focus}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Section 3: Department Heads */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={SectionVariants} className="w-full">
          <h2 className="text-[2.5rem] font-black mb-10 border-b border-[#333333] pb-6 flex items-center gap-4">
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            Department Heads
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {departmentHeads.map((member, index) => (
              <motion.div key={index} variants={CardVariants} className="bg-[#050505] border border-[#222222] p-6 rounded-xl hover:border-[#444444] transition-colors">
                <h3 className="text-[1.3rem] font-bold mb-1">{member.name}</h3>
                <p className="text-[#888888] font-medium text-[0.9rem] mb-4">{member.role}</p>
                <div className="text-xs uppercase tracking-widest text-[#555555]">{member.focus}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Section 4: Global Operations */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={SectionVariants} className="w-full">
          <h2 className="text-[2.5rem] font-black mb-10 border-b border-[#333333] pb-6 flex items-center gap-4">
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
            Global Operations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {globalOperations.map((member, index) => (
              <motion.div key={index} variants={CardVariants} className="bg-[#050505] border border-[#222222] p-6 rounded-xl hover:border-[#444444] transition-colors">
                <h3 className="text-[1.3rem] font-bold mb-1">{member.name}</h3>
                <p className="text-[#888888] font-medium text-[0.9rem] mb-4">{member.role}</p>
                <div className="text-xs uppercase tracking-widest text-[#555555]">{member.focus}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

      </div>

      {/* Master Navigation Footer */}
      <MaintenanceFooter currentT={currentT} setShowDeveloper={setShowDeveloper} setShowHelpCenter={setShowHelpCenter} setShowSitemap={setShowSitemap} localCity={localCity} />
      
    </div>
  );
}