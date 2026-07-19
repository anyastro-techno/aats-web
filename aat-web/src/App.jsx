import React, { Suspense, useState, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import heroImg from './assets/hero.png';

// Establish secure, global state management for enterprise localization
export const LanguageContext = createContext();

// Establishing secure, optimized loading pathways for business portals
const About = React.lazy(() => import('./pages/About/About'));
const Services = React.lazy(() => import('./pages/Services/Services'));
const Contact = React.lazy(() => import('./pages/Contact/Contact'));
const Login = React.lazy(() => import('./pages/Login/Login'));
const Admin = React.lazy(() => import('./pages/Admin/Admin'));

function CorporateHome() {
  const [count, setCount] = useState(0);

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="Corporate Hero" />
          <img src={reactLogo} className="framework" alt="React Architecture" />
          <img src={viteLogo} className="vite" alt="Vite Engine" />
        </div>
        <div>
          <h1>AnyAstro Techno Solutions</h1>
          <p>
            Enterprise digital transformation and scalable performance architecture.
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Active Client Engagements: {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Corporate Capabilities</h2>
          <p>Strategic technology solutions</p>
          <ul>
            <li>
              <a href="/services" target="_self">
                <img className="logo" src={viteLogo} alt="" />
                Explore Engineering Services
              </a>
            </li>
            <li>
              <a href="/about" target="_self">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn About Our Mission
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect With Management</h2>
          <p>Join the AnyAstro enterprise network</p>
          <ul>
            <li>
              <a href="https://github.com" target="_blank" rel="noreferrer">
                <svg className="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                Corporate GitHub
              </a>
            </li>
            <li>
              <a href="/contact" target="_self">
                <svg className="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Client Support Portal
              </a>
            </li>
            <li>
              <a href="https://x.com" target="_blank" rel="noreferrer">
                <svg className="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                Executive Updates
              </a>
            </li>
            <li>
              <a href="/login" target="_self">
                <svg className="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Staff Access
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  );
}

function App() {
  // Global language state initialized to default corporate language
  const [activeLanguage, setActiveLanguage] = useState('en');

  return (
    <LanguageContext.Provider value={{ activeLanguage, setActiveLanguage }}>
      <Router>
        <Navbar />
        <Suspense fallback={<div className="text-white text-center py-20">Loading business portal...</div>}>
          <Routes>
            <Route path="/" element={<CorporateHome />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Suspense>
      </Router>
    </LanguageContext.Provider>
  );
}

export default App;