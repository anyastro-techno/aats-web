import React, { createContext, useState, useEffect, useContext } from 'react';

const AccessibilityContext = createContext();

export const AccessibilityProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState('base');
  const [highContrast, setHighContrast] = useState(false);
  const [colorBlindness, setColorBlindness] = useState('none');
  const [dyslexiaFont, setDyslexiaFont] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-font-size', fontSize);
  }, [fontSize]);

  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [highContrast]);

  useEffect(() => {
    document.documentElement.setAttribute('data-color-filter', colorBlindness);
  }, [colorBlindness]);

  useEffect(() => {
    if (dyslexiaFont) {
      document.documentElement.classList.add('dyslexia-font');
    } else {
      document.documentElement.classList.remove('dyslexia-font');
    }
  }, [dyslexiaFont]);

  const announce = (text) => {
    if (voiceEnabled && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel(); 
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <AccessibilityContext.Provider value={{
      fontSize, setFontSize,
      highContrast, setHighContrast,
      colorBlindness, setColorBlindness,
      dyslexiaFont, setDyslexiaFont,
      voiceEnabled, setVoiceEnabled,
      announce
    }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => useContext(AccessibilityContext);