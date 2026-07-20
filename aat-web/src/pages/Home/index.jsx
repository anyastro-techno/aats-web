import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import MaintenanceOverlay from '../Maintenance';

// Set this to false to reveal the full AnyAstro landing page
const IS_MAINTENANCE = false; 

const LandingView = () => (
  <div className="w-full min-h-screen bg-white text-black p-12">
    <h1 className="text-6xl font-bold tracking-tight mb-6">AnyAstro Techno Solutions</h1>
    <p className="text-xl mb-12">Building the industrial operating system for the future.</p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="p-6 border border-black rounded-xl">
        <h3 className="font-bold text-2xl mb-2">GIS & Mapping</h3>
        <p>Enterprise grade mapping infrastructure.</p>
      </div>
      <div className="p-6 border border-black rounded-xl">
        <h3 className="font-bold text-2xl mb-2">Applied AI</h3>
        <p>Autonomous pipelines for your facility.</p>
      </div>
      <div className="p-6 border border-black rounded-xl">
        <h3 className="font-bold text-2xl mb-2">Cybersecurity</h3>
        <p>Zero-trust gateway architecture.</p>
      </div>
    </div>
  </div>
);

export default function Home() {
  return (
    <>
      {IS_MAINTENANCE ? (
        <MaintenanceOverlay />
      ) : (
        <LandingView />
      )}
    </>
  );
}