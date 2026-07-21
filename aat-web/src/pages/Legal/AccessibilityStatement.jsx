import React from 'react';
import { motion } from 'framer-motion';
import SEOHead from '../../components/SEOHead';

export default function AccessibilityStatement() {
  return (
    <div className="w-full min-h-screen bg-[#000000] text-white py-24 px-8 md:px-16">
      <SEOHead title="Accessibility Statement" description="Our commitment to WCAG compliance and inclusive digital engineering." canonicalUrl="https://anyastro.web.app/legal/accessibility-statement" />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-[800px] mx-auto">
        <h1 className="text-[3rem] font-black mb-8">Accessibility Statement</h1>
        <p className="text-[#cccccc] leading-relaxed mb-6">We engineer our infrastructure to meet WCAG 2.2 guidelines. Our digital interfaces support advanced keyboard navigation, screen reader compatibility, and integrated visual processing overrides to ensure unrestricted access for all personnel.</p>
      </motion.div>
    </div>
  );
}