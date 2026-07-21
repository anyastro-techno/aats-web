import React from 'react';
import { motion } from 'framer-motion';
import SEOHead from '../../components/SEOHead';

export default function MediaKit() {
  return (
    <div className="w-full min-h-screen bg-[#000000] text-white py-24 px-8 md:px-16">
      <SEOHead title="Media Kit" description="High-resolution photography, executive profiles, and company statistics." canonicalUrl="https://anyastro.web.app/company/media-kit" />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-[800px] mx-auto">
        <h1 className="text-[3rem] font-black mb-8">Media Kit</h1>
        <p className="text-[#cccccc] leading-relaxed mb-6">Authorized journalists and media partners may utilize the contents of this directory for reporting purposes. Modification of photographic assets is strictly prohibited.</p>
      </motion.div>
    </div>
  );
}