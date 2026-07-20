import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MaintenanceOverlay from './pages/MaintenanceOverlay';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MaintenanceOverlay />} />
    </Routes>
  );
}