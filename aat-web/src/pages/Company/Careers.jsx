import React from 'react';
import { motion } from 'framer-motion';
import SEOHead from '../../components/SEOHead';

export default function Careers() {
  const positions = [
    { title: "Senior Cloud Architect", department: "Infrastructure", status: "Active" },
    { title: "Frontend Implementation Engineer", department: "Product", status: "Active" }
  ];

  return (
    <div className="w-full min-h-screen bg-[#000000] text-white py-24 px-8 md:px-16">
      <SEOHead title="Careers" description="Join our engineering and operations departments." canonicalUrl="https://anyastro.web.app/company/careers" />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-[1000px] mx-auto">
        <h1 className="text-[3rem] font-black mb-12 border-b border-[#333333] pb-6">Open Positions</h1>
        <div className="flex flex-col gap-6">
          {positions.map((job, idx) => (
            <div key={idx} className="flex items-center justify-between bg-[#111111] p-6 rounded-xl border border-[#333333]">
              <div>
                <h3 className="text-xl font-bold">{job.title}</h3>
                <span className="text-[#888888]">{job.department}</span>
              </div>
              <button className="px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors">Apply Now</button>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}