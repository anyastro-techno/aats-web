import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Real functional translation dictionaries for corporate navigation
const resources = {
  en: { translation: { nav: { about: "About", services: "Services", contact: "Contact", login: "Portal Access" } } },
  hi: { translation: { nav: { about: "हमारे बारे में", services: "सेवाएं", contact: "संपर्क करें", login: "पोर्टल एक्सेस" } } },
  bn: { translation: { nav: { about: "আমাদের সম্পর্কে", services: "পরিষেবা", contact: "যোগাযোগ", login: "পোর্টাল অ্যাক্সেস" } } },
  te: { translation: { nav: { about: "మా గురించి", services: "సేవలు", contact: "సంప్రదించండి", login: "పోర్టల్ యాక్సెస్" } } },
  ta: { translation: { nav: { about: "எங்களை பற்றி", services: "சேவைகள்", contact: "தொடர்பு கொள்ள", login: "போர்ட்டல் அணுகல்" } } },
  mr: { translation: { nav: { about: "आमच्याबद्दल", services: "सेवा", contact: "संपर्क साधा", login: "पोर्टल ऍक्सेस" } } },
  gu: { translation: { nav: { about: "અમારા વિશે", services: "સેવાઓ", contact: "સંપર્ક કરો", login: "પોર્ટલ ઍક્સેસ" } } }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;