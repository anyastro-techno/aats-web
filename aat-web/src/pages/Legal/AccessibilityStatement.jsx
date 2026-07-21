import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import MaintenanceHeader from '../../components/MaintenanceHeader';
import MaintenanceFooter from '../../components/MaintenanceFooter';
import AccessibilityWidget from '../../components/AccessibilityWidget';
import { LanguageModal, HelpCenterModal, DeveloperModal, SitemapModal } from '../../components/MaintenanceModals';
import { t, languageOptions } from '../../utils/translations';

export default function AccessibilityStatement() {
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
        title="Accessibility Statement" 
        description="Our commitment to WCAG compliance and inclusive digital engineering." 
        canonicalUrl="https://anyastro.tech/legal/accessibility-statement" 
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
          <h1 className="text-[3rem] md:text-[4rem] font-black tracking-tighter mb-4">Accessibility Statement</h1>
          <p className="text-[#888888] font-medium text-[1rem]">Effective Date: Current Operational Quarter</p>
        </motion.div>

        {/* Section 1: Data Collection / Compliance Standards */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={SectionVariants} className="bg-[#050505] border border-[#222222] p-8 rounded-2xl flex flex-col gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#111111] border border-[#333333] flex items-center justify-center text-white mb-2">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          </div>
          <h2 className="text-[1.75rem] font-black tracking-tight">1. Compliance Standards and Inclusive Architecture</h2>
          <p className="text-[#cccccc] leading-relaxed text-[1.05rem]">
            We engineer our infrastructure to meet rigorous accessibility guidelines. Our digital interfaces support advanced keyboard navigation, screen reader compatibility, and integrated visual processing overrides to ensure unrestricted access for all personnel.
          </p>
        </motion.section>

        {/* Section 2: Retention Periods / Continuous Improvement */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={SectionVariants} className="bg-[#050505] border border-[#222222] p-8 rounded-2xl flex flex-col gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#111111] border border-[#333333] flex items-center justify-center text-white mb-2">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          </div>
          <h2 className="text-[1.75rem] font-black tracking-tight">2. Continuous Evaluation and Review Cycles</h2>
          <p className="text-[#cccccc] leading-relaxed text-[1.05rem]">
            Accessibility evaluations are integrated into our routine operational review cycles. We systematically assess interface elements and system updates to maintain high compatibility standards across all distributed nodes.
          </p>
        </motion.section>

        {/* Section 3: User Rights / Support Access */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={SectionVariants} className="bg-[#050505] border border-[#222222] p-8 rounded-2xl flex flex-col gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#111111] border border-[#333333] flex items-center justify-center text-white mb-2">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          </div>
          <h2 className="text-[1.75rem] font-black tracking-tight">3. User Feedback and Accessibility Support</h2>
          <p className="text-[#cccccc] leading-relaxed text-[1.05rem]">
            Participants encountering accessibility barriers or requiring assistance with interface controls can contact our support center directly. All inquiries regarding inclusive design are handled with prompt administrative priority.
          </p>
        </motion.section>

        {/* Section 4: International Standards */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={SectionVariants} className="bg-[#050505] border border-[#222222] p-8 rounded-2xl flex flex-col gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#111111] border border-[#333333] flex items-center justify-center text-white mb-2">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
          </div>
          <h2 className="text-[1.75rem] font-black tracking-tight">4. Global Accessibility Alignment</h2>
          <p className="text-[#cccccc] leading-relaxed text-[1.05rem]">
            Our commitment to inclusive digital engineering extends across all international operational sectors, ensuring uniform access standards regardless of geographic location or assistive technology utilization.
          </p>
        </motion.section>

      </div>

      {/* Master Navigation Footer */}
      <MaintenanceFooter currentT={currentT} setShowDeveloper={setShowDeveloper} setShowHelpCenter={setShowHelpCenter} setShowSitemap={setShowSitemap} localCity={localCity} />

    </div>
  );
}