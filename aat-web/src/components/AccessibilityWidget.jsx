import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAccessibility } from '../contexts/AccessibilityContext';

export default function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const widgetRef = useRef(null);
  const {
    fontSize, setFontSize,
    highContrast, setHighContrast,
    colorBlindness, setColorBlindness,
    dyslexiaFont, setDyslexiaFont,
    voiceEnabled, setVoiceEnabled,
    announce
  } = useAccessibility();

  // Focus Trap and Keyboard Navigation Management
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isOpen) return;

      if (event.key === 'Escape') {
        setIsOpen(false);
        announce("Accessibility menu closed.");
      }

      if (event.key === 'Tab') {
        const focusableElements = widgetRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            event.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            event.preventDefault();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, announce]);

  const toggleWidget = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    announce(newState ? "Accessibility menu opened." : "Accessibility menu closed.");
  };

  return (
    <div className="fixed bottom-6 left-6 z-[9999]" ref={widgetRef}>
      
      {/* Widget Trigger Button */}
      <button
        onClick={toggleWidget}
        aria-expanded={isOpen}
        aria-controls="accessibility-panel"
        aria-label="Open Accessibility Menu"
        className="w-14 h-14 bg-white text-black rounded-full flex items-center justify-center shadow-2xl hover:bg-gray-200 transition-colors outline-none focus:ring-4 focus:ring-blue-600"
      >
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
      </button>

      {/* Interactive Interface Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="accessibility-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Accessibility Settings"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-20 left-0 w-[320px] bg-[#050505] border border-[#333333] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            <div className="p-5 border-b border-[#222222] flex items-center justify-between bg-[#111111]">
              <h2 className="text-white font-black text-[1.1rem]">Accessibility</h2>
              <button 
                onClick={toggleWidget}
                aria-label="Close Accessibility Menu"
                className="text-[#888888] hover:text-white transition-colors outline-none focus:ring-2 focus:ring-white rounded"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            <div className="p-5 flex flex-col gap-6 max-h-[60vh] overflow-y-auto">
              
              {/* Visual Adjustments */}
              <div className="flex flex-col gap-3">
                <h3 className="text-[#888888] text-[0.8rem] font-bold uppercase tracking-widest">Visual Adjustments</h3>
                
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium text-[0.95rem]">High Contrast</span>
                  <button 
                    role="switch"
                    aria-checked={highContrast}
                    onClick={() => {
                      setHighContrast(!highContrast);
                      announce(highContrast ? "High contrast disabled" : "High contrast enabled");
                    }}
                    className={`w-12 h-6 rounded-full flex items-center transition-colors px-1 outline-none focus:ring-2 focus:ring-white ${highContrast ? 'bg-white' : 'bg-[#333333]'}`}
                  >
                    <div className={`w-4 h-4 rounded-full transition-transform ${highContrast ? 'bg-black transform translate-x-6' : 'bg-white'}`}></div>
                  </button>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-white font-medium text-[0.95rem]">Color Blindness Filter</span>
                  <select 
                    aria-label="Select color blindness profile"
                    value={colorBlindness}
                    onChange={(e) => {
                      setColorBlindness(e.target.value);
                      announce(`Color filter set to ${e.target.value}`);
                    }}
                    className="w-full bg-[#111111] border border-[#333333] text-white p-3 rounded-lg outline-none focus:border-white text-[0.9rem]"
                  >
                    <option value="none">Standard Display</option>
                    <option value="protanopia">Protanopia (Red-Blind)</option>
                    <option value="deuteranopia">Deuteranopia (Green-Blind)</option>
                    <option value="tritanopia">Tritanopia (Blue-Blind)</option>
                  </select>
                </div>
              </div>

              {/* Typography */}
              <div className="flex flex-col gap-3 pt-4 border-t border-[#222222]">
                <h3 className="text-[#888888] text-[0.8rem] font-bold uppercase tracking-widest">Typography</h3>
                
                <div className="flex flex-col gap-2">
                  <span className="text-white font-medium text-[0.95rem]">Text Scaling</span>
                  <div className="grid grid-cols-3 gap-2">
                    {['base', 'large', 'xlarge'].map((size) => (
                      <button
                        key={size}
                        aria-pressed={fontSize === size}
                        onClick={() => {
                          setFontSize(size);
                          announce(`Font size set to ${size}`);
                        }}
                        className={`py-2 rounded-lg border font-bold text-[0.9rem] transition-colors outline-none focus:ring-2 focus:ring-white ${fontSize === size ? 'bg-white text-black border-white' : 'bg-[#111111] text-[#888888] border-[#333333] hover:text-white'}`}
                      >
                        {size === 'base' ? 'A' : size === 'large' ? 'A+' : 'A++'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <span className="text-white font-medium text-[0.95rem]">Dyslexia Friendly</span>
                  <button 
                    role="switch"
                    aria-checked={dyslexiaFont}
                    onClick={() => {
                      setDyslexiaFont(!dyslexiaFont);
                      announce(dyslexiaFont ? "Dyslexia font disabled" : "Dyslexia font enabled");
                    }}
                    className={`w-12 h-6 rounded-full flex items-center transition-colors px-1 outline-none focus:ring-2 focus:ring-white ${dyslexiaFont ? 'bg-white' : 'bg-[#333333]'}`}
                  >
                    <div className={`w-4 h-4 rounded-full transition-transform ${dyslexiaFont ? 'bg-black transform translate-x-6' : 'bg-white'}`}></div>
                  </button>
                </div>
              </div>

              {/* Auditory Assistance */}
              <div className="flex flex-col gap-3 pt-4 border-t border-[#222222]">
                <h3 className="text-[#888888] text-[0.8rem] font-bold uppercase tracking-widest">Auditory</h3>
                
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium text-[0.95rem]">Voice Announcements</span>
                  <button 
                    role="switch"
                    aria-checked={voiceEnabled}
                    onClick={() => {
                      setVoiceEnabled(!voiceEnabled);
                      announce(voiceEnabled ? "Voice announcements disabled" : "Voice announcements enabled");
                    }}
                    className={`w-12 h-6 rounded-full flex items-center transition-colors px-1 outline-none focus:ring-2 focus:ring-white ${voiceEnabled ? 'bg-white' : 'bg-[#333333]'}`}
                  >
                    <div className={`w-4 h-4 rounded-full transition-transform ${voiceEnabled ? 'bg-black transform translate-x-6' : 'bg-white'}`}></div>
                  </button>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}