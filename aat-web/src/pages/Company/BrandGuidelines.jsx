import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import MaintenanceHeader from '../../components/MaintenanceHeader';
import MaintenanceFooter from '../../components/MaintenanceFooter';
import AccessibilityWidget from '../../components/AccessibilityWidget';
import { LanguageModal, HelpCenterModal, DeveloperModal, SitemapModal } from '../../components/MaintenanceModals';
import { t, languageOptions } from '../../utils/translations';

export default function BrandGuidelines() {
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
      link.download = 'AnyAstro-Brand-Guidelines-Package.png';
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

  const brandSections = [
    { title: "Visual Identity Standards", description: "Official corporate identity assets, logo placement rules, and spacing parameters required for all internal and external communications." },
    { title: "Color Palette Specifications", description: "Strict monochrome and high-contrast color codes ensuring absolute visual consistency across all digital and print media channels." },
    { title: "Typography Hierarchies", description: "Font weight guidelines, scaling proportions, and structural formatting rules for professional corporate publishing." }
  ];

  return (
    <div className="w-full min-h-screen bg-[#000000] text-white font-sans selection:bg-white selection:text-black overflow-x-hidden flex flex-col relative">
      
      <SEOHead 
        title="Brand Guidelines" 
        description="Official corporate identity assets and usage parameters." 
        canonicalUrl="https://anyastro.tech/company/brand-guidelines" 
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
          <h1 className="text-[3rem] md:text-[4.5rem] font-black tracking-tighter mb-4">Brand Architecture</h1>
          <p className="text-[#888888] font-medium text-[1.1rem] max-w-[700px]">
            Strict adherence to these visual parameters is required for all internal and external communications representing the organization.
          </p>
        </motion.div>

        {/* Brand Sections */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {brandSections.map((section, idx) => (
              <div key={idx} className="bg-[#050505] border border-[#222222] p-8 rounded-2xl flex flex-col gap-3">
                <h3 className="text-[1.3rem] font-bold text-white">{section.title}</h3>
                <p className="text-[#888888] leading-relaxed text-[0.95rem]">{section.description}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Download Asset Package Section */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="w-full">
          <div className="p-8 md:p-12 bg-[#050505] border border-[#333333] rounded-3xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-2xl">
            <div className="flex flex-col gap-2">
              <h3 className="text-[1.5rem] font-black text-white">Primary Logo Assets Package</h3>
              <p className="text-[#888888] text-[0.95rem]">Download official vector graphics, high-resolution branding assets, and formatting guidelines.</p>
            </div>
            <button 
              onClick={handleDownloadPackage}
              disabled={downloadStatus === 'DOWNLOADING'}
              className="px-8 py-4 bg-white text-black font-black rounded-xl hover:bg-[#e0e0e0] transition-colors outline-none whitespace-nowrap disabled:opacity-50"
            >
              {downloadStatus === 'DOWNLOADING' ? 'DOWNLOADING...' : downloadStatus === 'SUCCESS' ? 'DOWNLOADED SUCCESSFULLY' : 'Download Package'}
            </button>
          </div>
        </motion.section>

      </div>

      {/* Master Navigation Footer */}
      <MaintenanceFooter currentT={currentT} setShowDeveloper={setShowDeveloper} setShowHelpCenter={setShowHelpCenter} setShowSitemap={setShowSitemap} localCity={localCity} />
      
    </div>
  );
}