import React from 'react';
import { motion } from 'framer-motion';
import SEOHead from '../../components/SEOHead';

export default function TermsOfService() {
  return (
    <div className="w-full min-h-screen bg-[#000000] text-white py-24 px-8 md:px-16">
      <SEOHead title="Terms of Service" description="The foundational rules and guidelines governing the use of our infrastructure." canonicalUrl="https://anyastro.web.app/legal/terms-of-service" />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-[800px] mx-auto">
        <h1 className="text-[3rem] font-black mb-8">Terms of Service</h1>
        <div className="flex flex-col gap-8 text-[#cccccc] leading-relaxed">
          <div>
            <h3 className="text-white font-bold text-xl mb-2">Service Availability</h3>
            <p>We guarantee operational uptime according to our internal service level objectives. Maintenance periods are scheduled and communicated in advance to minimize business disruption.</p>
          </div>
          <div>
            <h3 className="text-white font-bold text-xl mb-2">User Responsibilities</h3>
            <p>Access to our platform requires adherence to strict security practices. Attempting to bypass network restrictions or compromise system integrity will result in immediate termination of access rights.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}