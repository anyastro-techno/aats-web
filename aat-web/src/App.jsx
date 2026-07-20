import React, { useState, useEffect, Suspense, createContext, useContext } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { WifiOff, AlertCircle } from 'lucide-react';

/**
 * ============================================================================
 * MODULE: MASTER ROUTER ARCHITECTURE
 * Features: 
 * 1. Global Scroll Restoration
 * 2. Real-Time Network Connection Monitor
 * 3. System Theme Sync Observer & Manual Override
 * 4. Route-based Document Title Updater
 * 5. Global Error Boundary (Pure Black Minimalist UI)
 * 6. Framer Motion Page Transitions
 * 7. Live Viewport Meta Management
 * 8. ANYASTRO TECHNO SOLUTIONS IMPORTS ONLY
 * 9. GLOBAL THEME & LOCALIZATION WIDGET (14 Languages)
 * 10. STRICT COMING SOON MAIN PAGE WITH DYNAMIC LOGOS
 * ============================================================================
 */

// --- ANYASTRO TECHNO SOLUTIONS IMPORTS ---
import Navbar from './components/layout/Navbar';
const Footer = React.lazy(() => import('./components/layout/Footer'));

// Business Modules
const Hero = React.lazy(() => import('./components/sections/Hero'));
const Partners = React.lazy(() => import('./components/sections/Partners'));
const Testimonial = React.lazy(() => import('./components/sections/Testimonial'));
const TechStack = React.lazy(() => import('./components/sections/TechStack'));
const Works = React.lazy(() => import('./components/sections/Works'));
const ContactForm = React.lazy(() => import('./components/sections/ContactForm'));

// Core Portals
const About = React.lazy(() => import('./pages/About/About'));
const Services = React.lazy(() => import('./pages/Services/Services'));
const Contact = React.lazy(() => import('./pages/Contact/Contact'));
const Login = React.lazy(() => import('./pages/Login/Login'));
const Admin = React.lazy(() => import('./pages/Admin/Admin'));

// ============================================================================
// ENTERPRISE CONTEXT & LOCALIZATION DICTIONARY
// ============================================================================
export const EnterpriseContext = createContext();

const enterpriseDictionary = {
  en: { soon: "Coming Soon", desc: "Enterprise Digital Transformation & Scalable Architecture", maintenance: "Core systems are currently undergoing scheduled upgrades prior to launch." },
  hi: { soon: "जल्द आ रहा है", desc: "एंटरप्राइज डिजिटल ट्रांसफॉर्मेशन और स्केलेबल आर्किटेक्चर", maintenance: "लॉन्च से पहले कोर सिस्टम वर्तमान में निर्धारित अपग्रेड से गुजर रहे हैं।" },
  bn: { soon: "শীঘ্রই আসছে", desc: "এন্টারপ্রাইজ ডিজিটাল ট্রান্সফরমেশন এবং স্কেলেবল আর্কিটেকচার", maintenance: "লঞ্চের আগে মূল সিস্টেমগুলি বর্তমানে আপগ্রেড করা হচ্ছে।" },
  te: { soon: "త్వరలో వస్తుంది", desc: "ఎంటర్‌ప్రైజ్ డిజిటల్ ట్రాన్స్‌ఫర్మేషన్ & స్కేలబుల్ ఆర్కిటెక్చర్", maintenance: "ప్రారంభానికి ముందు కోర్ సిస్టమ్‌లు ప్రస్తుతం అప్‌గ్రేడ్ అవుతున్నాయి." },
  ta: { soon: "விரைவில் வருகிறது", desc: "நிறுவன டிஜிட்டல் மாற்றம் மற்றும் அளவிடக்கூடிய கட்டமைப்பு", maintenance: "அறிமுகத்திற்கு முன் முக்கிய அமைப்புகள் தற்போது மேம்படுத்தப்பட்டு வருகின்றன." },
  mr: { soon: "लवकरच येत आहे", desc: "एंटरप्राइझ डिजिटल ट्रान्सफॉर्मेशन आणि स्केलेबल आर्किटेक्चर", maintenance: "लाँच होण्यापूर्वी कोर सिस्टममध्ये सध्या नियोजित अपग्रेड सुरू आहेत." },
  gu: { soon: "ટૂંક સમયમાં આવી રહ્યું છે", desc: "એન્ટરપ્રાઇઝ ડિજિટલ ટ્રાન્સફોર્મેશન અને સ્કેલેબલ આર્કિટેક્ચર", maintenance: "લૉન્ચ પહેલાં કોર સિસ્ટમ્સમાં હાલમાં અપગ્રેડ ચાલી રહ્યા છે." },
  kn: { soon: "ಶೀಘ್ರದಲ್ಲೇ ಬರಲಿದೆ", desc: "ಎಂಟರ್ಪ್ರೈಸ್ ಡಿಜಿಟಲ್ ಟ್ರಾನ್ಸ್ಫಾರ್ಮೇಶನ್ ಮತ್ತು ಸ್ಕೇಲೆಬಲ್ ಆರ್ಕಿಟೆಕ್ಚರ್", maintenance: "ಉಡಾವಣೆಯ ಮೊದಲು ಕೋರ್ ಸಿಸ್ಟಂಗಳು ಪ್ರಸ್ತುತ ಅಪ್‌ಗ್ರೇಡ್‌ಗೆ ಒಳಗಾಗುತ್ತಿವೆ." },
  or: { soon: "ଖୁବ୍ ଶୀଘ୍ର ଆସୁଛି", desc: "ଏଣ୍ଟରପ୍ରାଇଜ୍ ଡିଜିଟାଲ୍ ଟ୍ରାନ୍ସଫର୍ମେସନ୍ ଏବଂ ସ୍କେଲେବଲ୍ ଆର୍କିଟେକ୍ଚର୍", maintenance: "ଲଞ୍ଚ ପୂର୍ବରୁ କୋର୍ ସିଷ୍ଟମ୍ ବର୍ତ୍ତମାନ ଅପଗ୍ରେଡ୍ ଦେଇ ଗତି କରୁଛି |" },
  ml: { soon: "ഉടൻ വരുന്നു", desc: "എന്റർപ്രൈസ് ഡിജിറ്റൽ ട്രാൻസ്ഫോർമേഷൻ & സ്കേലബിൾ ആർക്കിടെക്ചർ", maintenance: "ലോഞ്ചിന് മുന്നോടിയായി കോർ സിസ്റ്റങ്ങൾ നവീകരണത്തിന് വിധേയമായിക്കൊണ്ടിരിക്കുകയാണ്." },
  pa: { soon: "ਜਲਦੀ ਆ ਰਿਹਾ ਹੈ", desc: "ਐਂਟਰਪ੍ਰਾਈਜ਼ ਡਿਜੀਟਲ ਟ੍ਰਾਂਸਫਾਰਮੇਸ਼ਨ ਅਤੇ ਸਕੇਲੇਬਲ ਆਰਕੀਟੈਕਚਰ", maintenance: "ਲਾਂਚ ਤੋਂ ਪਹਿਲਾਂ ਕੋਰ ਸਿਸਟਮ ਵਰਤਮਾਨ ਵਿੱਚ ਅੱਪਗਰੇਡਾਂ ਵਿੱਚੋਂ ਗੁਜ਼ਰ ਰਹੇ ਹਨ।" },
  as: { soon: "অতি সোনকালে আহি আছে", desc: "এণ্টাৰপ্ৰাইজ ডিজিটেল ট্ৰেন্সফৰমেচন আৰু স্কেলেবল আৰ্কিটেকচাৰ", maintenance: "লঞ্চৰ আগতে বৰ্তমান মূল চিষ্টেমসমূহৰ আপগ্ৰেড চলি আছে।" },
  ur: { soon: "جلد آرہا ہے", desc: "انٹرپرائز ڈیجیٹل ٹرانسفارمیشن اور اسکیل ایبل آرکیٹیکچر", maintenance: "لانچ سے پہلے بنیادی سسٹمز فی الحال اپ گریڈ سے گزر رہے ہیں۔" },
  mai: { soon: "जल्द आबि रहल अछि", desc: "एंटरप्राइज डिजिटल ट्रांसफॉर्मेशन आ स्केलेबल आर्किटेक्चर", maintenance: "लॉन्च सं पहिने कोर सिस्टम वर्तमान में अपग्रेड सं गुजरि रहल अछि।" }
};

// ============================================================================
// GLOBAL FEATURE COMPONENTS & HOOKS
// ============================================================================

const RouteController = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    
    const path = location.pathname === '/' ? 'Standby' : location.pathname.substring(1);
    const formattedTitle = path.charAt(0).toUpperCase() + path.slice(1);
    document.title = `AnyAstro Techno Solutions | ${formattedTitle.replace('-', ' ')}`;
  }, [location.pathname]);

  return null;
};

const NetworkMonitor = () => {
  const [isOffline, setIsOffline] = useState(typeof navigator !== 'undefined' ? !navigator.onLine : false);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <AnimatePresence>
      {isOffline && (
        <motion.div 
          initial={{ y: -100, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          exit={{ y: -100, opacity: 0 }}
          className="fixed top-0 left-0 right-0 z-[9999] bg-[#000000] text-white py-4 px-6 flex items-center justify-center gap-4 font-sans font-bold text-[0.85rem] border-b border-[#333333]"
        >
          <div className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center animate-pulse">
            <WifiOff size={14} strokeWidth={3} /> 
          </div>
          No internet connection. Displaying offline view.
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const SystemObservers = () => {
  useEffect(() => {
    const setVh = () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    setVh();
    window.addEventListener('resize', setVh);
    return () => window.removeEventListener('resize', setVh);
  }, []);
  return null;
};

class GlobalErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("Application Error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#000000] text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 bg-[#111111] border border-[#333333] rounded-full flex items-center justify-center mx-auto mb-8">
            <AlertCircle size={28} className="text-white" />
          </div>
          <h1 className="text-[2.5rem] font-black tracking-tighter mb-4 text-white">System Error.</h1>
          <p className="text-[#888888] font-sans text-[0.95rem] mb-10 max-w-md mx-auto">
            An unexpected application error has occurred. Our engineers have been notified.
          </p>
          <button onClick={() => window.location.reload()} className="bg-white text-black px-8 py-3 rounded-full font-bold text-[0.95rem] hover:bg-[#e0e0e0] transition-colors">
            Restart Session
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const AnimatedRoute = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="w-full min-h-screen flex flex-col"
    >
      {children}
    </motion.div>
  );
};

// ============================================================================
// GLOBAL OPERATIONS CONTROL WIDGET (Theme & Localization)
// ============================================================================
const GlobalOperationsWidget = () => {
  const { activeLanguage, setActiveLanguage, theme, toggleTheme } = useContext(EnterpriseContext);

  const languageOptions = [
    { code: 'en', label: 'English' }, { code: 'hi', label: 'हिंदी' },
    { code: 'bn', label: 'বাংলা' }, { code: 'te', label: 'తెలుగు' },
    { code: 'ta', label: 'தமிழ்' }, { code: 'mr', label: 'मराठी' },
    { code: 'gu', label: 'ગુજરાતી' }, { code: 'kn', label: 'ಕನ್ನಡ' },
    { code: 'or', label: 'ଓଡ଼ିଆ' }, { code: 'ml', label: 'മലയാളം' },
    { code: 'pa', label: 'ਪੰਜਾਬੀ' }, { code: 'as', label: 'অসমীয়া' },
    { code: 'ur', label: 'اردو' }, { code: 'mai', label: 'मैथिली' }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex items-center shadow-2xl bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 transition-colors duration-300 rounded-sm">
      <button 
        onClick={toggleTheme}
        className="px-4 py-3 text-xs md:text-sm font-bold uppercase tracking-widest text-black dark:text-white border-r border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
      </button>
      <select 
        value={activeLanguage}
        onChange={(e) => setActiveLanguage(e.target.value)}
        className="px-4 py-3 text-xs md:text-sm font-bold bg-transparent text-black dark:text-white outline-none cursor-pointer uppercase tracking-widest appearance-none"
      >
        {languageOptions.map(lang => (
          <option key={lang.code} value={lang.code} className="text-black bg-white">{lang.label}</option>
        ))}
      </select>
    </div>
  );
};

// ============================================================================
// PRIMARY ENTRY PORTAL: Coming Soon Landing Page
// ============================================================================
const ComingSoonLanding = () => {
  const { activeLanguage, theme } = useContext(EnterpriseContext);
  const t = enterpriseDictionary[activeLanguage] || enterpriseDictionary['en'];
  
  // Real logic: Strictly swapping corporate branding assets based on the active theme
  const currentLogo = theme === 'dark' ? '/assets/branding/logo2.png' : '/assets/branding/logo.png';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fcfcfc] dark:bg-[#000000] text-black dark:text-white transition-colors duration-300 relative overflow-hidden">
      
      {/* Background Ambient Mesh */}
      <div className="corporate-gradient-mesh opacity-40 dark:opacity-20 absolute inset-0 transition-opacity duration-300 pointer-events-none"></div>

      <div className="max-w-3xl px-6 text-center relative z-10">
        <img 
          src={currentLogo} 
          alt="AnyAstro Techno Solutions" 
          className="h-16 w-auto mx-auto mb-12 transition-opacity duration-300"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
        <div className="w-16 h-16 border-4 border-black dark:border-white border-t-transparent rounded-full animate-spin mx-auto mb-10"></div>
        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight uppercase">{t.soon}</h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-6 font-medium">{t.desc}</p>
        <p className="text-sm text-gray-500 dark:text-gray-500 uppercase tracking-widest">{t.maintenance}</p>
        
        {/* Hidden Gateway to internal corporate infrastructure */}
        <div className="mt-16">
          <Link to="/home" className="text-xs uppercase tracking-widest text-gray-400 hover:text-black dark:hover:text-white transition-colors">
            Developer Access
          </Link>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// SECONDARY ENTRY PORTAL: Internal Corporate Presentation
// ============================================================================
function CorporateHome() {
  return (
    <main className="w-full bg-white dark:bg-black relative transition-colors duration-300 min-h-screen">
      <Suspense fallback={<div className="text-black dark:text-white text-center py-20 font-bold uppercase tracking-widest">Loading corporate modules...</div>}>
        <Hero />
        <Partners />
        <Testimonial />
        <TechStack />
        <Works />
        <ContactForm />
      </Suspense>
    </main>
  );
}

// ============================================================================
// APP ENTRY POINT
// ============================================================================
export default function App() {
  const [activeLanguage, setActiveLanguage] = useState('en');
  const [theme, setTheme] = useState('light'); // Default to light mode for requested brand aesthetic

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <GlobalErrorBoundary>
      <EnterpriseContext.Provider value={{ activeLanguage, setActiveLanguage, theme, toggleTheme }}>
        <BrowserRouter>
          <GlobalOperationsWidget />
          <SystemObservers />
          <NetworkMonitor />
          <RouteController />

          <AnimatePresence mode="wait">
            <Routes>
              {/* Absolute Main Landing Route */}
              <Route path="/" element={<AnimatedRoute><ComingSoonLanding /></AnimatedRoute>} />
              
              {/* Internal / Secondary Routing Architecture */}
              <Route path="/home" element={
                <AnimatedRoute>
                  <Navbar />
                  <CorporateHome />
                  <Suspense fallback={null}><Footer /></Suspense>
                </AnimatedRoute>
              } />
              <Route path="/about" element={<AnimatedRoute><Navbar /><About /><Suspense fallback={null}><Footer /></Suspense></AnimatedRoute>} />
              <Route path="/services" element={<AnimatedRoute><Navbar /><Services /><Suspense fallback={null}><Footer /></Suspense></AnimatedRoute>} />
              <Route path="/contact" element={<AnimatedRoute><Navbar /><Contact /><Suspense fallback={null}><Footer /></Suspense></AnimatedRoute>} />
              <Route path="/login" element={<AnimatedRoute><Navbar /><Login /><Suspense fallback={null}><Footer /></Suspense></AnimatedRoute>} />
              <Route path="/admin" element={<AnimatedRoute><Admin /></AnimatedRoute>} />

              {/* Catch-all Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </EnterpriseContext.Provider>
    </GlobalErrorBoundary>
  );
}