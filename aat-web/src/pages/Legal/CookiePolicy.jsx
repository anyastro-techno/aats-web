import React from 'react';
import { motion } from 'framer-motion';
import SEOHead from '../../components/SEOHead';

export default function CookiePolicy() {
  return (
    <div className="w-full min-h-screen bg-[#000000] text-white py-24 px-8 md:px-16">
      <SEOHead title="Cookie Policy" description="Details regarding local storage mechanisms and session tracking protocols." canonicalUrl="https://anyastro.web.app/legal/cookie-policy" />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-[800px] mx-auto">
        <h1 className="text-[3rem] font-black mb-8">Cookie Policy</h1>
        <p className="text-[#cccccc] leading-relaxed mb-6">Our platform utilizes essential local storage tokens to maintain authenticated sessions and preserve user interface preferences. We strictly deploy necessary operational cookies and decline the use of invasive tracking networks.</p>
      </motion.div>
    </div>
  );
}