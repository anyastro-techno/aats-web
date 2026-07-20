import React from 'react';

export default function MaintenanceHeader({ currentT, setShowHelpCenter, setShowLangPrompt, navigate, onToggleAccessibility }) {
  return (
    <header className="w-full flex items-center justify-between px-8 md:px-16 py-8 animate-fade relative z-50">
      <div className="flex items-center gap-2">
        <img src="/assets/branding/logo.png" alt="AnyAstro" className="h-8 w-auto" onError={(e) => e.target.style.display = 'none'} />
        <span className="font-black text-[1.5rem] tracking-tighter ml-[-5px]"></span>
      </div>
      
      <div className="flex items-center gap-6 text-[0.9rem] font-bold">
        <button 
          onClick={onToggleAccessibility} 
          aria-label="Open Accessibility Menu" 
          className="hover:text-[#aaaaaa] transition-colors outline-none"
        >
          <img src="/a.svg" alt="Accessibility Menu" className="w-6 h-6" />
        </button>

        <button onClick={() => setShowHelpCenter(true)} className="hover:text-[#aaaaaa] transition-colors hidden sm:block outline-none">
          {currentT.help}
        </button>
        
        <button 
          onClick={() => setShowLangPrompt(true)}
          className="flex items-center gap-2 hover:text-[#aaaaaa] transition-colors outline-none"
        >
          {currentT.lang}
        </button>

        <button onClick={() => navigate('/')} className="bg-white text-black px-5 py-2 rounded-full flex items-center gap-2 hover:bg-[#e0e0e0] transition-colors outline-none">
          {currentT.back}
        </button>
      </div>
    </header>
  );
}