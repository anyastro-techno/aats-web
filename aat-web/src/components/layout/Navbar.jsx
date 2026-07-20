import React, { useState, useEffect } from 'react';
import { Search, Menu, X, Globe, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

// Native corporate translation dictionary engineered to bypass external dependencies
const translationDictionary = {
  en: { 'nav.about': 'About', 'nav.services': 'Services', 'nav.contact': 'Contact', 'nav.login': 'Portal Access' },
  hi: { 'nav.about': 'हमारे बारे में', 'nav.services': 'सेवाएं', 'nav.contact': 'संपर्क करें', 'nav.login': 'पोर्टल एक्सेस' },
  bn: { 'nav.about': 'আমাদের সম্পর্কে', 'nav.services': 'পরিষেবা', 'nav.contact': 'যোগাযোগ', 'nav.login': 'পোর্টাল অ্যাক্সেস' },
  te: { 'nav.about': 'మా గురించి', 'nav.services': 'సేవలు', 'nav.contact': 'సంప్రదించండి', 'nav.login': 'పోర్టల్ యాక్సెస్' },
  ta: { 'nav.about': 'எங்களை பற்றி', 'nav.services': 'சேவைகள்', 'nav.contact': 'தொடர்பு கொள்ள', 'nav.login': 'போர்ட்டல் அணுகல்' },
  mr: { 'nav.about': 'आमच्याबद्दल', 'nav.services': 'सेवा', 'nav.contact': 'संपर्क साधा', 'nav.login': 'पोर्टल ऍक्सेस' },
  gu: { 'nav.about': 'અમારા વિશે', 'nav.services': 'સેવાઓ', 'nav.contact': 'સંપર્ક કરો', 'nav.login': 'પોર્ટલ ઍક્સેસ' }
};

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [localTime, setLocalTime] = useState(new Date());
  const [activeLanguage, setActiveLanguage] = useState('en');

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setLocalTime(new Date());
    }, 1000);
    return () => clearInterval(timeInterval);
  }, []);

  const indianLanguages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'Hindi' },
    { code: 'bn', label: 'Bengali' },
    { code: 'te', label: 'Telugu' },
    { code: 'mr', label: 'Marathi' },
    { code: 'ta', label: 'Tamil' },
    { code: 'ur', label: 'Urdu' },
    { code: 'gu', label: 'Gujarati' },
    { code: 'kn', label: 'Kannada' },
    { code: 'or', label: 'Odia' },
    { code: 'ml', label: 'Malayalam' },
    { code: 'pa', label: 'Punjabi' },
    { code: 'as', label: 'Assamese' },
    { code: 'mai', label: 'Maithili' }
  ];

  const handleLanguageChange = (event) => {
    setActiveLanguage(event.target.value);
  };

  // Internal functional logic to process real-time translations
  const t = (key, fallback) => {
    const activeDictionary = translationDictionary[activeLanguage] || translationDictionary['en'];
    return activeDictionary[key] || fallback;
  };

  return (
    <nav className="w-full bg-black border-b border-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Corporate Branding */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/">
              <img 
                src="/assets/branding/logo2.png" 
                alt="AAT Group Corporate Logo" 
                className="h-10 w-auto"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <span className="hidden text-white font-bold text-xl uppercase tracking-widest">
                AAT Group
              </span>
            </Link>
          </div>

          {/* Primary Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/about" className="text-white hover:underline uppercase text-sm tracking-wide">
              {t('nav.about', 'About')}
            </Link>
            <Link to="/services" className="text-white hover:underline uppercase text-sm tracking-wide">
              {t('nav.services', 'Services')}
            </Link>
            <Link to="/contact" className="text-white hover:underline uppercase text-sm tracking-wide">
              {t('nav.contact', 'Contact')}
            </Link>
            <Link to="/login" className="text-white hover:underline uppercase text-sm tracking-wide">
              {t('nav.login', 'Portal Access')}
            </Link>
          </div>

          {/* Functional Operations: Search, Clock, Language */}
          <div className="hidden md:flex items-center space-x-6">
            
            <div className="flex items-center space-x-2 text-white border border-white px-3 py-1">
              <Clock size={16} stroke="white" fill="none" />
              <span className="text-xs tabular-nums tracking-widest">
                {localTime.toLocaleTimeString([], { hour12: false })}
              </span>
            </div>

            <div className="flex items-center border border-white px-3 py-1">
              <Globe size={16} stroke="white" fill="none" className="mr-2" />
              <select 
                onChange={handleLanguageChange} 
                className="bg-black text-white text-xs uppercase outline-none cursor-pointer"
                defaultValue="en"
              >
                {indianLanguages.map((lang) => (
                  <option key={lang.code} value={lang.code} className="bg-black text-white">
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative flex items-center">
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-black border-b border-white text-white text-sm px-2 py-1 outline-none w-48 placeholder-white transition-all focus:border-b-2"
              />
              <Search size={18} stroke="white" fill="none" className="absolute right-0 cursor-pointer" />
            </div>
          </div>

          {/* Mobile Menu Activation */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={28} stroke="white" fill="none" /> : <Menu size={28} stroke="white" fill="none" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black border-t border-white px-4 pt-4 pb-8 space-y-4">
          <Link to="/about" className="block text-white uppercase tracking-wide py-2 border-b border-white">{t('nav.about', 'About')}</Link>
          <Link to="/services" className="block text-white uppercase tracking-wide py-2 border-b border-white">{t('nav.services', 'Services')}</Link>
          <Link to="/contact" className="block text-white uppercase tracking-wide py-2 border-b border-white">{t('nav.contact', 'Contact')}</Link>
          
          <div className="pt-4 flex flex-col space-y-4">
             <div className="flex items-center space-x-2 text-white">
              <Clock size={16} stroke="white" fill="none" />
              <span className="text-sm tabular-nums tracking-widest">
                {localTime.toLocaleTimeString([], { hour12: false })}
              </span>
            </div>
            <select 
              onChange={handleLanguageChange} 
              className="bg-black text-white border border-white p-2 text-sm uppercase outline-none"
            >
              {indianLanguages.map((lang) => (
                <option key={lang.code} value={lang.code}>{lang.label}</option>
              ))}
            </select>
            <div className="relative flex items-center pt-2">
              <input 
                type="text" 
                placeholder="Search directory..." 
                className="bg-black border border-white text-white p-2 w-full outline-none placeholder-white"
              />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;