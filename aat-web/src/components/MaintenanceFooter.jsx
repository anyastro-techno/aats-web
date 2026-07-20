import React from 'react';

export default function MaintenanceFooter({ currentT, setShowDeveloper, setShowHelpCenter, localCity }) {
  return (
    <footer className="w-full max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8 px-8 md:px-16 py-8 border-t border-[#111111] opacity-0 animate-fade stagger-3 relative z-10">
      
      {/* Custom SVG Social Icons */}
      <div className="flex items-center gap-8 text-[#555555]">
        <a href="https://www.linkedin.com/company/anyastro-techno/" className="hover:text-white transition-colors"><svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
        <a href="#youtube" className="hover:text-white transition-colors"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg></a>
        <a href="#instagram" className="hover:text-white transition-colors"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>
        <a href="#x" className="hover:text-white transition-colors"><svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.006 4.15H5.078z"/></svg></a>
      </div>
      
      <div className="flex items-center gap-6 text-[0.8rem] font-bold text-[#555555]">
        <button onClick={() => setShowDeveloper(true)} className="hover:text-white transition-colors outline-none">{currentT.developer_contact}</button>
        <span className="w-1 h-1 bg-[#333333] rounded-full"></span>
        <a href="https://www.linkedin.com/company/anyastro-techno/services/request-proposal/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors outline-none">{currentT.service_req}</a>
        <span className="w-1 h-1 bg-[#333333] rounded-full"></span>
        <button onClick={() => setShowHelpCenter(true)} className="hover:text-white transition-colors outline-none">{currentT.help}</button>
        <span className="w-1 h-1 bg-[#333333] rounded-full"></span>
        <div className="flex items-center gap-2 hover:text-white transition-colors cursor-default">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          {localCity}, IN
        </div>
      </div>

    </footer>
  );
}