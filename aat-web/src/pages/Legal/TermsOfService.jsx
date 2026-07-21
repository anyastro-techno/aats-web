import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import MaintenanceHeader from '../../components/MaintenanceHeader';
import MaintenanceFooter from '../../components/MaintenanceFooter';
import AccessibilityWidget from '../../components/AccessibilityWidget';
import { LanguageModal, HelpCenterModal, DeveloperModal } from '../../components/MaintenanceModals';
import { t, languageOptions } from '../../utils/translations';

export default function TermsOfService() {
  const [lang, setLang] = useState('en');
  const [showLangPrompt, setShowLangPrompt] = useState(false);
  const [showHelpCenter, setShowHelpCenter] = useState(false);
  const [showDeveloper, setShowDeveloper] = useState(false);
  const [showAccessibility, setShowAccessibility] = useState(false);
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
        title="Terms of Service" 
        description="The foundational rules and guidelines governing the use of our infrastructure." 
        canonicalUrl="https://anyastro.tech/legal/terms-of-service" 
      />

      {/* Global Modals and Widgets */}
      <DeveloperModal showDeveloper={showDeveloper} setShowDeveloper={setShowDeveloper} currentT={currentT} />
      <LanguageModal showLangPrompt={showLangPrompt} setShowLangPrompt={setShowLangPrompt} languageOptions={languageOptions} lang={lang} setLang={setLang} />
      <HelpCenterModal showHelpCenter={showHelpCenter} setShowHelpCenter={setShowHelpCenter} currentT={currentT} helpStatus={helpStatus} helpName={helpName} setHelpName={setHelpName} helpEmail={helpEmail} setHelpEmail={setHelpEmail} helpIssue={helpIssue} setHelpIssue={setHelpIssue} handleHelpSubmit={handleHelpSubmit} />
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
          <h1 className="text-[3rem] md:text-[4rem] font-black tracking-tighter mb-4">Terms of Service</h1>
          <p className="text-[#888888] font-medium text-[1rem]">Effective Date: Current Operational Quarter</p>
        </motion.div>

        {/* Section 1: Service Availability */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={SectionVariants} className="bg-[#050505] border border-[#222222] p-8 rounded-2xl flex flex-col gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#111111] border border-[#333333] flex items-center justify-center text-white mb-2">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
          </div>
          <h2 className="text-[1.75rem] font-black tracking-tight">1. Service Availability and Uptime Commitments</h2>
          <p className="text-[#cccccc] leading-relaxed text-[1.05rem]">
            We guarantee operational uptime according to our internal service level objectives and performance metrics. Scheduled maintenance periods are communicated in advance to minimize business disruption and ensure seamless operational continuity across all global nodes.
          </p>
        </motion.section>

        {/* Section 2: User Responsibilities */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={SectionVariants} className="bg-[#050505] border border-[#222222] p-8 rounded-2xl flex flex-col gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#111111] border border-[#333333] flex items-center justify-center text-white mb-2">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
          </div>
          <h2 className="text-[1.75rem] font-black tracking-tight">2. User Responsibilities and Acceptable Use</h2>
          <p className="text-[#cccccc] leading-relaxed text-[1.05rem]">
            Access to our platform requires strict adherence to corporate security standards. Attempting to bypass network restrictions, compromise system integrity, or engage in unauthorized data extraction will result in immediate termination of access rights and legal review.
          </p>
        </motion.section>

        {/* Section 3: Intellectual Property */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={SectionVariants} className="bg-[#050505] border border-[#222222] p-8 rounded-2xl flex flex-col gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#111111] border border-[#333333] flex items-center justify-center text-white mb-2">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83m13.79-4l-5.74 9.94"></path></svg>
          </div>
          <h2 className="text-[1.75rem] font-black tracking-tight">3. Intellectual Property and Licensing</h2>
          <p className="text-[#cccccc] leading-relaxed text-[1.05rem]">
            All proprietary software, brand assets, interface design elements, and documentation remain the exclusive intellectual property of the organization. Users are granted a limited, non-exclusive, non-transferable license to utilize the platform strictly for authorized business operations.
          </p>
        </motion.section>

        {/* Section 4: Limitation of Liability */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={SectionVariants} className="bg-[#050505] border border-[#222222] p-8 rounded-2xl flex flex-col gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#111111] border border-[#333333] flex items-center justify-center text-white mb-2">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
          </div>
          <h2 className="text-[1.75rem] font-black tracking-tight">4. Limitation of Liability and Indemnification</h2>
          <p className="text-[#cccccc] leading-relaxed text-[1.05rem]">
            The organization shall not be held liable for indirect, incidental, or consequential damages arising from service interruptions or third-party network failures. Participants agree to indemnify and hold harmless executive leadership and operational staff against claims resulting from policy violations.
          </p>
        </motion.section>

      </div>

      {/* Master Navigation Footer */}
      <MaintenanceFooter currentT={currentT} setShowDeveloper={setShowDeveloper} setShowHelpCenter={setShowHelpCenter} localCity={localCity} />

    </div>
  );
}