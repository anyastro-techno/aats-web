import React from 'react';
import { motion } from 'framer-motion';
import SEOHead from '../../components/SEOHead';

export default function BrandGuidelines() {
  return (
    <div className="w-full min-h-screen bg-[#000000] text-white py-24 px-8 md:px-16">
      <SEOHead title="Brand Guidelines" description="Official corporate identity assets and usage parameters." canonicalUrl="https://anyastro.web.app/company/brand-guidelines" />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-[800px] mx-auto">
        <h1 className="text-[3rem] font-black mb-8">Brand Architecture</h1>
        <p className="text-[#cccccc] leading-relaxed mb-8">Strict adherence to these visual parameters is required for all internal and external communications representing the organization.</p>
        <div className="p-8 bg-[#111111] border border-[#333333] rounded-xl flex justify-between items-center">
          <span className="font-bold">Primary Logo Assets (SVG/PNG)</span>
          <button className="px-4 py-2 border border-white rounded hover:bg-white hover:text-black transition-colors">Download Package</button>
        </div>
      </motion.div>
    </div>
  );
}