import React from 'react';
import { motion } from 'framer-motion';
import SEOHead from '../../components/SEOHead';

export default function SecurityPolicy() {
  return (
    <div className="w-full min-h-screen bg-[#000000] text-white py-24 px-8 md:px-16">
      <SEOHead title="Security Policy" description="Overview of our infrastructure defense mechanisms and data protection standards." canonicalUrl="https://anyastro.web.app/legal/security-policy" />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-[800px] mx-auto">
        <h1 className="text-[3rem] font-black mb-8">Security Posture</h1>
        <p className="text-[#cccccc] leading-relaxed mb-6">Enterprise data is protected by continuous monitoring, automated threat detection, and encrypted transit tunnels. All physical and cloud assets operate under strict identity access management protocols.</p>
      </motion.div>
    </div>
  );
}