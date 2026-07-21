import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import MaintenanceHeader from '../../components/MaintenanceHeader';
import MaintenanceFooter from '../../components/MaintenanceFooter';
import AccessibilityWidget from '../../components/AccessibilityWidget';
import { LanguageModal, HelpCenterModal, DeveloperModal, SitemapModal } from '../../components/MaintenanceModals';
import { t, languageOptions } from '../../utils/translations';

export default function PressKit() {
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

  const pressReleases = [
    { date: "Current Operational Quarter", title: "Global Infrastructure Expansion and Architecture Scaling", description: "Announcement regarding distributed server node enhancements across Pune and Bengaluru operational centers." },
    { date: "Previous Operational Quarter", title: "Executive Leadership Restructuring and Governance Update", description: "Formal disclosures detailing strategic appointments within the engineering and compliance divisions." },
    { date: "Annual Strategic Review", title: "Security Perimeter Hardening and Compliance Protocols", description: "Comprehensive overview of data governance frameworks and uncompromised security standards." }
  ];

  const cultureValues = [
    { title: "Operational Excellence", description: "Maintaining rigorous standards across all global nodes to ensure zero interruption." },
    { title: "Autonomous Ownership", description: "Empowering every team member with direct accountability for strategic deliverables." }
  ];

  const benefits = [
    { title: "Comprehensive Coverage", description: "Full medical and professional insurance plans for all organizational members." },
    { title: "Flexible Operational Models", description: "Structured hybrid and remote environments supporting peak professional productivity." }
  ];

  const hiringOverview = {
    title: "Direct Talent Acquisition",
    description: "Our organization hires directly through founder-led evaluations. Visit our careers portal to submit professional portfolios and direct inquiries."
  };

  return (
    <div className="w-full min-h-screen bg-[#000000] text-white font-sans selection:bg-white selection:text-black overflow-x-hidden flex flex-col relative">
      
      <SEOHead 
        title="Press Releases" 
        description="Official corporate announcements and press distributions." 
        canonicalUrl="https://anyastro.tech/company/press-kit" 
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
      <div className="w-full max-w-[1200px] mx-auto px-8 md:px-16 py-16 flex flex-col gap-24 relative z-10 flex-1">
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-[3rem] md:text-[4.5rem] font-black tracking-tighter mb-4">Press Releases</h1>
          <p className="text-[#888888] font-medium text-[1.1rem] max-w-[700px]">
            A chronological archive of official organizational statements, technological milestones, and financial disclosures.
          </p>
        </motion.div>

        {/* Section 1: Press Releases Archive */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="w-full">
          <h2 className="text-[2.2rem] font-black mb-8 border-b border-[#333333] pb-4">Chronological Archive</h2>
          <div className="flex flex-col gap-6">
            {pressReleases.map((press, idx) => (
              <div key={idx} className="bg-[#050505] border border-[#222222] p-8 rounded-2xl flex flex-col gap-2">
                <span className="text-[#888888] text-[0.85rem] font-mono font-bold">{press.date}</span>
                <h3 className="text-[1.4rem] font-bold text-white">{press.title}</h3>
                <p className="text-[#cccccc] leading-relaxed text-[0.95rem]">{press.description}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Section 2: Company Culture */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="w-full">
          <h2 className="text-[2.2rem] font-black mb-8 border-b border-[#333333] pb-4">Company Culture</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cultureValues.map((item, idx) => (
              <div key={idx} className="bg-[#050505] border border-[#222222] p-8 rounded-2xl flex flex-col gap-3">
                <h3 className="text-[1.3rem] font-bold text-white">{item.title}</h3>
                <p className="text-[#888888] leading-relaxed text-[0.95rem]">{item.description}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Section 3: Benefits and Hiring Process */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="w-full">
          <h2 className="text-[2.2rem] font-black mb-8 border-b border-[#333333] pb-4">Benefits and Hiring Architecture</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((item, idx) => (
              <div key={idx} className="bg-[#050505] border border-[#222222] p-8 rounded-2xl flex flex-col gap-3">
                <h3 className="text-[1.3rem] font-bold text-white">{item.title}</h3>
                <p className="text-[#888888] leading-relaxed text-[0.95rem]">{item.description}</p>
              </div>
            ))}
            <div className="bg-[#050505] border border-[#222222] p-8 rounded-2xl flex flex-col gap-3">
              <h3 className="text-[1.3rem] font-bold text-white">{hiringOverview.title}</h3>
              <p className="text-[#888888] leading-relaxed text-[0.95rem]">{hiringOverview.description}</p>
              <button 
                onClick={() => navigate('/company/careers')}
                className="mt-4 px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-[#e0e0e0] transition-colors outline-none self-start text-[0.9rem]"
              >
                View Open Roles
              </button>
            </div>
          </div>
        </motion.section>

      </div>

      {/* Master Navigation Footer */}
      <MaintenanceFooter currentT={currentT} setShowDeveloper={setShowDeveloper} setShowHelpCenter={setShowHelpCenter} setShowSitemap={setShowSitemap} localCity={localCity} />
      
    </div>
  );
}