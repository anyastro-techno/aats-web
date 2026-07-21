import React from 'react';
import { motion } from 'framer-motion';
import SEOHead from '../../components/SEOHead';

export default function PrivacyPolicy() {
  return (
    <div className="w-full min-h-screen bg-[#000000] text-white py-24 px-8 md:px-16">
      <SEOHead title="Privacy Policy" description="Information regarding how we collect, process, and secure your personal data." canonicalUrl="https://anyastro.web.app/legal/privacy-policy" />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-[800px] mx-auto prose prose-invert">
        <h1 className="text-[3rem] font-black mb-8">Privacy Policy</h1>
        <p className="text-[#aaaaaa] mb-8">Effective Date: Current Operational Quarter</p>
        <section className="mb-12">
          <h2 className="text-[2rem] font-bold mb-4">1. Data Collection Framework</h2>
          <p className="text-[#cccccc] leading-relaxed mb-4">We strictly gather information essential for providing core platform functionality. This includes authentication credentials, usage metrics, and direct communications.</p>
        </section>
        <section className="mb-12">
          <h2 className="text-[2rem] font-bold mb-4">2. Security Perimeter</h2>
          <p className="text-[#cccccc] leading-relaxed mb-4">All stored data is protected via industry-standard encryption protocols. We do not distribute, sell, or compromise user data to third-party marketing networks.</p>
        </section>
      </motion.div>
    </div>
  );
}