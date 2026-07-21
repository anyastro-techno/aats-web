import React from 'react';
import { motion } from 'framer-motion';
import SEOHead from '../../components/SEOHead';

export default function PressKit() {
  return (
    <div className="w-full min-h-screen bg-[#000000] text-white py-24 px-8 md:px-16">
      <SEOHead title="Press Releases" description="Official corporate announcements and press distributions." canonicalUrl="https://anyastro.web.app/company/press-kit" />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-[800px] mx-auto">
        <h1 className="text-[3rem] font-black mb-8">Press Releases</h1>
        <p className="text-[#cccccc] leading-relaxed mb-6">A chronological archive of official organizational statements, technological milestones, and financial disclosures.</p>
      </motion.div>
    </div>
  );
}