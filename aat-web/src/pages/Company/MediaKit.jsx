import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import MaintenanceHeader from '../../components/MaintenanceHeader';
import MaintenanceFooter from '../../components/MaintenanceFooter';
import AccessibilityWidget from '../../components/AccessibilityWidget';
import { LanguageModal, HelpCenterModal, DeveloperModal, SitemapModal } from '../../components/MaintenanceModals';
import { t, languageOptions } from '../../utils/translations';

export default function MediaKit() {
  const [lang, setLang] = useState('en');
  const [showLangPrompt, setShowLangPrompt] = useState(false);
  const [showHelpCenter, setShowHelpCenter] = useState(false);
  const [showDeveloper, setShowDeveloper] = useState(false);
  const [showAccessibility, setShowAccessibility] = useState(false);
  const [showSitemap, setShowSitemap] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState('IDLE');
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

  const handleDownloadPackage = () => {
    setDownloadStatus('DOWNLOADING');
    try {
      const link = document.createElement('a');
      link.href = '/assets/branding/logo.png';
      link.download = 'AnyAstro-Media-Kit-Assets.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloadStatus('SUCCESS');
      setTimeout(() => setDownloadStatus('IDLE'), 3000);
    } catch (error) {
      setDownloadStatus('ERROR');
      setTimeout(() => setDownloadStatus('IDLE'), 3000);
    }
  };

  const currentT = t[lang] || t['en'];

  const executiveProfiles = [
    { name: "Arun Ammisetty", role: "Founder, CTO & Lead Developer", description: "Directs global technical strategy, cloud infrastructure scaling, and system architecture." },
    { name: "Palak Bhosale", role: "Co-Founder & COO", description: "Oversees enterprise operations, strategic partnerships, and organizational growth." }
  ];

  const companyStats = [
    { label: "Global Operational Nodes", value: "Distributed Infrastructure" },
    { label: "Uptime Commitment", value: "High Availability Standards" },
    { label: "Regional Offices", value: "Pune & Bengaluru, India" }
  ];

  return (
    <div className="w-full min-h-screen bg-[#000000] text-white font-sans selection:bg-white selection:text-black overflow-x-hidden flex flex-col relative">
      
      <SEOHead 
        title="Media Kit" 
        description="High-resolution photography, executive profiles, and company statistics." 
        canonicalUrl="https://anyastro.tech/company/media-kit" 
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
          <h1 className="text-[3rem] md:text-[4.5rem] font-black tracking-tighter mb-4">Media Kit</h1>
          <p className="text-[#888888] font-medium text-[1.1rem] max-w-[700px]">
            Authorized journalists and media partners may utilize the contents of this directory for reporting purposes. Modification of photographic assets is strictly prohibited.
          </p>
        </motion.div>

        {/* Section 1: Executive Profiles */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="w-full">
          <h2 className="text-[2.2rem] font-black mb-8 border-b border-[#333333] pb-4">Executive Leadership Profiles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {executiveProfiles.map((exec, idx) => (
              <div key={idx} className="bg-[#050505] border border-[#222222] p-8 rounded-2xl flex flex-col gap-3">
                <h3 className="text-[1.5rem] font-bold text-white">{exec.name}</h3>
                <p className="text-[#aaaaaa] font-semibold text-[1rem]">{exec.role}</p>
                <p className="text-[#888888] leading-relaxed text-[0.95pn]">{exec.description}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Section 2: Company Statistics */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="w-full">
          <h2 className="text-[2.2rem] font-black mb-8 border-b border-[#333333] pb-4">Company Overview Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {companyStats.map((stat, idx) => (
              <div key={idx} className="bg-[#050505] border border-[#222222] p-8 rounded-2xl flex flex-col gap-2">
                <span className="text-[#888888] text-[0.85rem] font-bold uppercase tracking-wider">{stat.label}</span>
                <span className="text-[1.3rem] font-black text-white">{stat.value}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Section 3: Asset Package Download */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="w-full">
          <div className="p-8 md:p-12 bg-[#050505] border border-[#333333] rounded-3xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-2xl">
            <div className="flex flex-col gap-2">
              <h3 className="text-[1.5rem] font-black text-white">Media Asset Package</h3>
              <p className="text-[#888888] text-[0.95rem]">Download official brand graphics, high-resolution logos, and press photography archives.</p>
            </div>
            <button 
              onClick={handleDownloadPackage}
              disabled={downloadStatus === 'DOWNLOADING'}
              className="px-8 py-4 bg-white text-black font-black rounded-xl hover:bg-[#e0e0e0] transition-colors outline-none whitespace-nowrap disabled:opacity-50"
            >
              {downloadStatus === 'DOWNLOADING' ? 'DOWNLOADING...' : downloadStatus === 'SUCCESS' ? 'DOWNLOADED SUCCESSFULLY' : 'Download Media Package'}
            </button>
          </div>
        </motion.section>

      </div>

      {/* Master Navigation Footer */}
      <MaintenanceFooter currentT={currentT} setShowDeveloper={setShowDeveloper} setShowHelpCenter={setShowHelpCenter} setShowSitemap={setShowSitemap} localCity={localCity} />
      
    </div>
  );
}