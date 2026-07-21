import React from 'react';
import { motion } from 'framer-motion';
import SEOHead from '../../components/SEOHead';

export default function DeveloperPortal() {
  return (
    <div className="w-full min-h-screen bg-[#000000] text-white py-24 px-8 md:px-16">
      <SEOHead title="Developer Portal" description="Authentication gateway for application programming interface access." canonicalUrl="https://anyastro.web.app/developers/developer-portal" />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-[600px] mx-auto mt-20 text-center">
        <div className="w-20 h-20 bg-[#111111] border border-[#333333] rounded-2xl mx-auto mb-8 flex items-center justify-center">
          <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="white" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
        </div>
        <h1 className="text-[2.5rem] font-black mb-4">Engineering Access</h1>
        <p className="text-[#888888] mb-8">Authenticate with your enterprise credentials to generate and manage production API keys.</p>
        <button className="w-full py-4 bg-white text-black font-black rounded-xl hover:bg-gray-200 transition-colors">Authenticate</button>
      </motion.div>
    </div>
  );
}