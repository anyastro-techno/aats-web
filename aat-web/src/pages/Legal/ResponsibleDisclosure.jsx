import React from 'react';
import { motion } from 'framer-motion';
import SEOHead from '../../components/SEOHead';

export default function ResponsibleDisclosure() {
  return (
    <div className="w-full min-h-screen bg-[#000000] text-white py-24 px-8 md:px-16">
      <SEOHead title="Responsible Disclosure" description="Protocol for reporting security vulnerabilities to our engineering department." canonicalUrl="https://anyastro.web.app/legal/responsible-disclosure" />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-[800px] mx-auto">
        <h1 className="text-[3rem] font-black mb-8">Responsible Disclosure</h1>
        <p className="text-[#cccccc] leading-relaxed mb-6">We welcome collaboration with independent security researchers. Should you identify a vulnerability within our perimeter, please submit a detailed technical brief to our security operations center prior to public disclosure.</p>
      </motion.div>
    </div>
  );
}