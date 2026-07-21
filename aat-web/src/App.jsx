import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Core Platform
import MaintenanceOverlay from './pages/MaintenanceOverlay';

// Corporate Directory
import Team from './pages/Team';

// Legal and Compliance Sector
import PrivacyPolicy from './pages/Legal/PrivacyPolicy';
import TermsOfService from './pages/Legal/TermsOfService';
import CookiePolicy from './pages/Legal/CookiePolicy';
import AccessibilityStatement from './pages/Legal/AccessibilityStatement';
import SecurityPolicy from './pages/Legal/SecurityPolicy';
import ResponsibleDisclosure from './pages/Legal/ResponsibleDisclosure';

// Company Information Sector
import Careers from './pages/Company/Careers';
import BrandGuidelines from './pages/Company/BrandGuidelines';
import MediaKit from './pages/Company/MediaKit';
import PressKit from './pages/Company/PressKit';

// Developer Infrastructure
import APIDocumentation from './pages/Developers/APIDocumentation';
import DeveloperPortal from './pages/Developers/DeveloperPortal';

export default function App() {
  return (
    <Routes>
      {/* Core Platform */}
      <Route path="/" element={<MaintenanceOverlay />} />

      {/* Corporate Directory */}
      <Route path="/team" element={<Team />} />

      {/* Legal and Compliance Sector */}
      <Route path="/legal/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/legal/terms-of-service" element={<TermsOfService />} />
      <Route path="/legal/cookie-policy" element={<CookiePolicy />} />
      <Route path="/legal/accessibility-statement" element={<AccessibilityStatement />} />
      <Route path="/legal/security-policy" element={<SecurityPolicy />} />
      <Route path="/legal/responsible-disclosure" element={<ResponsibleDisclosure />} />

      {/* Company Information Sector */}
      <Route path="/company/careers" element={<Careers />} />
      <Route path="/company/brand-guidelines" element={<BrandGuidelines />} />
      <Route path="/company/media-kit" element={<MediaKit />} />
      <Route path="/company/press-kit" element={<PressKit />} />

      {/* Developer Infrastructure */}
      <Route path="/developers/api-documentation" element={<APIDocumentation />} />
      <Route path="/developers/developer-portal" element={<DeveloperPortal />} />
    </Routes>
  );
}