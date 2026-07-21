import React from 'react';
import { motion } from 'framer-motion';
import SEOHead from '../../components/SEOHead';

export default function APIDocumentation() {
  return (
    <div className="w-full min-h-screen bg-[#000000] text-white py-24 px-8 md:px-16">
      <SEOHead title="API Documentation" description="Technical integration parameters for network endpoints." canonicalUrl="https://anyastro.web.app/developers/api-documentation" />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-[1000px] mx-auto">
        <h1 className="text-[3rem] font-black mb-8 border-b border-[#333333] pb-6">Endpoint Architecture V1</h1>
        <div className="bg-[#111111] p-6 rounded-xl border border-[#333333] mb-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="bg-green-600 text-white px-3 py-1 font-black text-sm rounded">GET</span>
            <code className="text-[#aaaaaa]">/api/v1/system/status</code>
          </div>
          <p className="text-[#cccccc]">Retrieves the current operational health of the core infrastructure.</p>
        </div>
      </motion.div>
    </div>
  );
}