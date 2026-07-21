import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import MaintenanceHeader from '../../components/MaintenanceHeader';
import MaintenanceFooter from '../../components/MaintenanceFooter';
import AccessibilityWidget from '../../components/AccessibilityWidget';
import { LanguageModal, HelpCenterModal, DeveloperModal, SitemapModal } from '../../components/MaintenanceModals';
import { t, languageOptions } from '../../utils/translations';

export default function Careers() {
  const [lang, setLang] = useState('en');
  const [showLangPrompt, setShowLangPrompt] = useState(false);
  const [showHelpCenter, setShowHelpCenter] = useState(false);
  const [showDeveloper, setShowDeveloper] = useState(false);
  const [showAccessibility, setShowAccessibility] = useState(false);
  const [showSitemap, setShowSitemap] = useState(false);
  const navigate = useNavigate();

  // Application Modal State
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState('');
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantExperience, setApplicantExperience] = useState('');
  const [applicantPortfolio, setApplicantPortfolio] = useState('');
  const [applicantAnswers, setApplicantAnswers] = useState('');
  const [applyStatus, setApplyStatus] = useState('IDLE');

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

  const handleApplySubmit = (e) => {
    e.preventDefault();
    setApplyStatus('SUBMITTING');
    try {
      const text = `*Direct Employment Application*\nPosition: ${selectedJob}\nName: ${applicantName}\nEmail: ${applicantEmail}\nExperience: ${applicantExperience}\nPortfolio: ${applicantPortfolio}\nWhy Join/Answers: ${applicantAnswers}`;
      const waUrl = `https://wa.me/918329004424?text=${encodeURIComponent(text)}`;
      window.open(waUrl, '_blank');

      setApplyStatus('SUCCESS');
      setTimeout(() => {
        setShowApplyModal(false);
        setApplyStatus('IDLE');
        setApplicantName('');
        setApplicantEmail('');
        setApplicantExperience('');
        setApplicantPortfolio('');
        setApplicantAnswers('');
      }, 3000);
    } catch (error) {
      setApplyStatus('ERROR');
      setTimeout(() => setApplyStatus('IDLE'), 3000);
    }
  };

  const currentT = t[lang] || t['en'];

  const positions = [
    { title: "Senior Cloud Architect", department: "Infrastructure", type: "Full Time", status: "Active" },
    { title: "Frontend Implementation Engineer", department: "Product", type: "Full Time", status: "Active" },
    { title: "Global Operations Manager", department: "Operations", type: "Full Time", status: "Active" }
  ];

  const cultureValues = [
    { title: "Operational Excellence", description: "We maintain rigorous standards across all global nodes to ensure zero disruption." },
    { title: "Autonomous Ownership", description: "Every team member possesses direct accountability and drives impactful strategic decisions." },
    { title: "Continuous Innovation", description: "We consistently refine our software architecture to stay ahead of industry demands." }
  ];

  const benefits = [
    { title: "Comprehensive Health Coverage", description: "Full medical, dental, and vision insurance plans for employees and dependents." },
    { title: "Flexible Working Structure", description: "Hybrid and remote operational models designed to support work-life balance." },
    { title: "Professional Development", description: "Dedicated annual budget for certifications, training programs, and conferences." }
  ];

  const processSteps = [
    { step: "01", title: "Application Review", description: "Our executive founder and talent team review your background and portfolio directly." },
    { step: "02", title: "Initial Discussion", description: "A conversational evaluation to discuss your professional history and alignment." },
    { step: "03", title: "Technical Assessment", description: "A practical evaluation of your core competencies and problem-solving abilities." },
    { step: "04", title: "Direct Interview", description: "Final strategic alignment discussion with leadership before official onboarding." }
  ];

  return (
    <div className="w-full min-h-screen bg-[#000000] text-white font-sans selection:bg-white selection:text-black overflow-x-hidden flex flex-col relative">
      
      <SEOHead 
        title="Careers and Open Positions" 
        description="Join our engineering and operations departments to drive global technological innovation." 
        canonicalUrl="https://anyastro.tech/company/careers" 
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

      {/* Application Modal */}
      <AnimatePresence>
        {showApplyModal && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-black/85 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-[600px] bg-[#050505] border border-[#333333] rounded-3xl p-8 flex flex-col shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <button onClick={() => setShowApplyModal(false)} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-[#888888] hover:text-white transition-colors">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>

              {applyStatus === 'SUCCESS' ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#00ff88" strokeWidth="2" className="mb-4"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  <h3 className="text-[1.8rem] font-black mb-2 text-white">Application Submitted</h3>
                  <p className="text-[#888888] text-[1rem]">Your application has been transmitted directly to our founder via WhatsApp.</p>
                </div>
              ) : applyStatus === 'ERROR' ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <h3 className="text-[1.8rem] font-black mb-2 text-[#ff4444]">Submission Failed</h3>
                  <p className="text-[#888888] text-[1rem]">Please verify your connection and try submitting again.</p>
                </div>
              ) : (
                <>
                  <h2 className="text-[1.8rem] font-black tracking-tight mb-2 text-white">Apply for Position</h2>
                  <p className="text-[#888888] text-[0.95rem] mb-6">Position: <span className="text-white font-bold">{selectedJob}</span></p>
                  
                  <form onSubmit={handleApplySubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[0.85rem] font-bold text-[#aaaaaa]">Full Name</label>
                      <input type="text" required placeholder="Enter your full name" value={applicantName} onChange={e => setApplicantName(e.target.value)} className="w-full bg-[#000000] border border-[#333333] text-white px-4 py-3.5 rounded-xl outline-none focus:border-white transition-colors text-[0.95rem]" />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[0.85rem] font-bold text-[#aaaaaa]">Email Address</label>
                      <input type="email" required placeholder="Enter your email address" value={applicantEmail} onChange={e => setApplicantEmail(e.target.value)} className="w-full bg-[#000000] border border-[#333333] text-white px-4 py-3.5 rounded-xl outline-none focus:border-white transition-colors text-[0.95rem]" />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[0.85rem] font-bold text-[#aaaaaa]">Years of Professional Experience</label>
                      <input type="text" required placeholder="e.g., 5 Years" value={applicantExperience} onChange={e => setApplicantExperience(e.target.value)} className="w-full bg-[#000000] border border-[#333333] text-white px-4 py-3.5 rounded-xl outline-none focus:border-white transition-colors text-[0.95rem]" />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[0.85rem] font-bold text-[#aaaaaa]">Portfolio or LinkedIn URL</label>
                      <input type="url" required placeholder="https://yourportfolio.com" value={applicantPortfolio} onChange={e => setApplicantPortfolio(e.target.value)} className="w-full bg-[#000000] border border-[#333333] text-white px-4 py-3.5 rounded-xl outline-none focus:border-white transition-colors text-[0.95rem]" />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[0.85rem] font-bold text-[#aaaaaa]">Why do you want to join our organization?</label>
                      <textarea required placeholder="Provide brief answers regarding your background and motivation..." value={applicantAnswers} onChange={e => setApplicantAnswers(e.target.value)} rows="4" className="w-full bg-[#000000] border border-[#333333] text-white px-4 py-3.5 rounded-xl outline-none focus:border-white transition-colors text-[0.95rem] resize-none"></textarea>
                    </div>
                    
                    <button disabled={applyStatus === 'SUBMITTING'} type="submit" className="w-full bg-white text-black py-4 rounded-xl font-black mt-4 hover:bg-[#e0e0e0] transition-colors disabled:opacity-50">
                      {applyStatus === 'SUBMITTING' ? 'TRANSMITTING APPLICATION...' : 'Submit Application'}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Container */}
      <div className="w-full max-w-[1200px] mx-auto px-8 md:px-16 py-16 flex flex-col gap-24 relative z-10 flex-1">
        
        {/* Header Title */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-[3rem] md:text-[4.5rem] font-black tracking-tighter mb-4">Careers at Our Organization</h1>
          <p className="text-[#888888] font-medium text-[1.1rem] max-w-[700px]">
            Join our elite engineering and operations teams. We build robust systems and scale global infrastructure with uncompromising standards.
          </p>
        </motion.div>

        {/* Section 1: Company Culture */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="w-full">
          <h2 className="text-[2.2rem] font-black mb-8 border-b border-[#333333] pb-4">Our Culture</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cultureValues.map((item, idx) => (
              <div key={idx} className="bg-[#050505] border border-[#222222] p-8 rounded-2xl flex flex-col gap-3">
                <h3 className="text-[1.3rem] font-bold text-white">{item.title}</h3>
                <p className="text-[#888888] leading-relaxed text-[0.95rem]">{item.description}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Section 2: Benefits */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="w-full">
          <h2 className="text-[2.2rem] font-black mb-8 border-b border-[#333333] pb-4">Benefits and Perks</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((item, idx) => (
              <div key={idx} className="bg-[#050505] border border-[#222222] p-8 rounded-2xl flex flex-col gap-3">
                <h3 className="text-[1.3rem] font-bold text-white">{item.title}</h3>
                <p className="text-[#888888] leading-relaxed text-[0.95rem]">{item.description}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Section 3: Hiring Process */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="w-full">
          <h2 className="text-[2.2rem] font-black mb-8 border-b border-[#333333] pb-4">Hiring Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((item, idx) => (
              <div key={idx} className="bg-[#0a0a0a] border border-[#222222] p-6 rounded-2xl flex flex-col gap-3">
                <span className="text-white font-mono text-[1.2rem] font-bold">{item.step}</span>
                <h3 className="text-[1.1rem] font-bold text-white">{item.title}</h3>
                <p className="text-[#888888] text-[0.9rem] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Section 4: Open Roles */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="w-full">
          <h2 className="text-[2.2rem] font-black mb-8 border-b border-[#333333] pb-4">Open Positions</h2>
          <div className="flex flex-col gap-6">
            {positions.map((job, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-[#111111] p-8 rounded-2xl border border-[#333333] gap-6">
                <div className="flex flex-col gap-1">
                  <h3 className="text-[1.5rem] font-bold text-white">{job.title}</h3>
                  <div className="flex items-center gap-4 text-[#888888] text-[0.95rem]">
                    <span>{job.department}</span>
                    <span>-</span>
                    <span>{job.type}</span>
                  </div>
                </div>
                <button 
                  onClick={() => { setSelectedJob(job.title); setShowApplyModal(true); }}
                  className="px-8 py-3.5 bg-white text-black font-black rounded-xl hover:bg-[#e0e0e0] transition-colors outline-none"
                >
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </motion.section>

      </div>

      {/* Master Navigation Footer */}
      <MaintenanceFooter currentT={currentT} setShowDeveloper={setShowDeveloper} setShowHelpCenter={setShowHelpCenter} setShowSitemap={setShowSitemap} localCity={localCity} />
      
    </div>
  );
}