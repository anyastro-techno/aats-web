import React from 'react';
import { motion } from 'framer-motion';
import SEOHead from '../components/SEOHead';

export default function Team() {
  const leadership = [
    { name: "Executive Operations", role: "Chief Executive Officer", focus: "Global Strategy" },
    { name: "Technical Infrastructure", role: "Chief Technology Officer", focus: "System Architecture" },
    { name: "Product Development", role: "Head of Engineering", focus: "Application Delivery" }
  ];

  return (
    <div className="w-full min-h-screen bg-[#000000] text-white py-24 px-8 md:px-16">
      <SEOHead 
        title="Leadership Team" 
        description="Meet the executive board and organizational leadership driving our technological innovations."
        canonicalUrl="https://anyastro.web.app/team"
      />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-[1200px] mx-auto">
        <h1 className="text-[3rem] font-black mb-12 border-b border-[#333333] pb-6">Organizational Leadership</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {leadership.map((member, index) => (
            <motion.div key={index} whileHover={{ scale: 1.02 }} className="bg-[#111111] border border-[#333333] p-8 rounded-xl">
              <div className="w-16 h-16 bg-[#222222] rounded-full mb-6"></div>
              <h2 className="text-[1.5rem] font-bold mb-2">{member.name}</h2>
              <p className="text-[#888888] font-medium mb-4">{member.role}</p>
              <div className="text-sm border-t border-[#333333] pt-4 uppercase tracking-widest">{member.focus}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}