import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import MaintenanceHeader from '../../components/MaintenanceHeader';
import MaintenanceFooter from '../../components/MaintenanceFooter';
import AccessibilityWidget from '../../components/AccessibilityWidget';
import { LanguageModal, HelpCenterModal, DeveloperModal, SitemapModal } from '../../components/MaintenanceModals';
import { t, languageOptions } from '../../utils/translations';

export default function APIDocumentation() {
  const [lang, setLang] = useState('en');
  const [showLangPrompt, setShowLangPrompt] = useState(false);
  const [showHelpCenter, setShowHelpCenter] = useState(false);
  const [showDeveloper, setShowDeveloper] = useState(false);
  const [showAccessibility, setShowAccessibility] = useState(false);
  const [showSitemap, setShowSitemap] = useState(false);
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

  const SectionVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="w-full min-h-screen bg-[#000000] text-white font-sans selection:bg-white selection:text-black overflow-x-hidden flex flex-col relative">
      
      <SEOHead 
        title="API Documentation" 
        description="Technical integration parameters for network endpoints." 
        canonicalUrl="https://anyastro.tech/developers/api-documentation" 
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
      <div className="w-full max-w-[1000px] mx-auto px-8 md:px-16 py-16 flex flex-col gap-16 flex-1 relative z-10">
        
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-[3rem] md:text-[4rem] font-black tracking-tighter mb-4 border-b border-[#333333] pb-6">Endpoint Architecture V1</h1>
          <p className="text-[#888888] font-medium text-[1rem]">Effective Operational Standards</p>
        </motion.div>

        {/* Section 1: Authentication Logic */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={SectionVariants} className="bg-[#050505] border border-[#222222] p-8 rounded-2xl flex flex-col gap-4">
          <h2 className="text-[1.75rem] font-black tracking-tight">1. Authentication and Access Control Logic</h2>
          <p className="text-[#cccccc] leading-relaxed text-[1.05rem]">
            All inbound requests require verified credentials through secure header tokens. Requests lacking proper authorization parameters are automatically rejected by our gateway perimeter to ensure system integrity.
          </p>
        </motion.section>

        {/* Section 2: Rate Limiting */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={SectionVariants} className="bg-[#050505] border border-[#222222] p-8 rounded-2xl flex flex-col gap-4">
          <h2 className="text-[1.75rem] font-black tracking-tight">2. Rate Limiting and Traffic Thresholds</h2>
          <p className="text-[#cccccc] leading-relaxed text-[1.05rem]">
            To maintain optimal performance across all global infrastructure nodes, request frequencies are governed by strict operational thresholds. Exceeding designated limits triggers temporary throttling responses.
          </p>
        </motion.section>

        {/* Section 3: Endpoint References */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={SectionVariants} className="bg-[#050505] border border-[#222222] p-8 rounded-2xl flex flex-col gap-4">
          <h2 className="text-[1.75rem] font-black tracking-tight">3. Endpoint References and System Status</h2>
          <div className="bg-[#111111] p-6 rounded-xl border border-[#333333] mt-2">
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-green-600 text-white px-3 py-1 font-black text-sm rounded">GET</span>
              <code className="text-[#aaaaaa]">/api/v1/system/status</code>
            </div>
            <p className="text-[#cccccc]">Retrieves the current operational health of the core infrastructure and distributed server nodes.</p>
          </div>
        </motion.section>

        {/* Section 4: Error Handling */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={SectionVariants} className="bg-[#050505] border border-[#222222] p-8 rounded-2xl flex flex-col gap-4">
          <h2 className="text-[1.75rem] font-black tracking-tight">4. Error Handling and Response Protocols</h2>
          <p className="text-[#cccccc] leading-relaxed text-[1.05rem]">
            Standardized status codes accompany all error responses to facilitate rapid diagnosis and resolution. Unhandled exceptions are logged securely within our monitoring pipeline for administrative review.
          </p>
        </motion.section>

      </div>

      {/* Master Navigation Footer */}
      <MaintenanceFooter currentT={currentT} setShowDeveloper={setShowDeveloper} setShowHelpCenter={setShowHelpCenter} setShowSitemap={setShowSitemap} localCity={localCity} />

    </div>
  );
}