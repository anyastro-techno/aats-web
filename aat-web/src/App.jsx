import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Globe, ChevronDown, 
  MapPin, Search, Calendar, Clock, CreditCard
} from 'lucide-react';

// Custom SVG Icons to replace removed Lucide brand icons
const IconLinkedIn = ({ size = 22, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect width="4" height="12" x="2" y="9"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const IconYouTube = ({ size = 22, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2.5 7.1C2.5 7.1 2.3 5.4 3.1 4.6C4 3.6 5.2 3.6 5.8 3.5C9.2 3.3 12 3.3 12 3.3C12 3.3 14.8 3.3 18.2 3.5C18.8 3.6 20 3.6 20.9 4.6C21.7 5.4 21.5 7.1 21.5 7.1C21.7 8.7 21.8 10.4 21.8 12C21.8 13.6 21.7 15.3 21.5 16.9C21.5 16.9 21.7 18.6 20.9 19.4C20 20.4 18.6 20.4 18 20.5C14.9 20.8 12 20.7 12 20.7C12 20.7 9.2 20.7 5.8 20.5C5.2 20.4 4 20.4 3.1 19.4C2.3 18.6 2.5 16.9 2.5 16.9C2.3 15.3 2.2 13.6 2.2 12C2.2 10.4 2.3 8.7 2.5 7.1ZM9.8 15.3L15.8 12L9.8 8.7V15.3Z"></path>
  </svg>
);

const IconInstagram = ({ size = 22, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
  </svg>
);

const IconX = ({ size = 22, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 4l11.733 16h4.267l-11.733 -16z"></path>
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path>
  </svg>
);

const PRODUCTS = [
  { id: 1, name: 'AtlasGrid', desc: 'Deploy enterprise GIS mapping anywhere with AnyAstro. Request a node, integrate, and go.', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400' },
  { id: 2, name: 'GeoPulse', desc: 'Real-time topography analytics makes mapping items easier than ever.', img: 'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&q=80&w=400' },
  { id: 3, name: 'SecureStack', desc: 'Reserve a zero-trust gateway up to 90 days in advance so your network is secure.', img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=400' },
  { id: 4, name: 'AutoPilot AI', desc: 'Get autonomous ML edge pipelines for your facility. Learn more about Edge.', img: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=400' },
];

const NAV_LINKS = [
  { name: 'Products', hasDropdown: true },
  { name: 'Solutions', hasDropdown: true },
  { name: 'Industries', hasDropdown: false },
  { name: 'Company', hasDropdown: true },
  { name: 'About', hasDropdown: true },
];

const FOOTER_LINKS = {
  Company: ['About us', 'Our offerings', 'Newsroom', 'Investors', 'Blog', 'Careers'],
  Products: ['AtlasGrid', 'GeoPulse', 'SecureStack', 'AutoPilot AI', 'FactoryOS'],
  Citizenship: ['Safety', 'Sustainability', 'Diversity'],
  Deployments: ['Reserve', 'Data Centers', 'Cities']
};

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop & Mobile Header */}
      <header className="bg-black text-white h-16 flex items-center justify-between px-4 md:px-12 fixed top-0 w-full z-50">
        <div className="flex items-center">
          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden mr-4"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
          
          {/* Strictly Image Logo */}
          <a href="#" className="mr-8 flex items-center">
             <img 
              src="/assets/branding/logo.png" 
              alt="AnyAstro Logo" 
              className="h-5 object-contain"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <button 
                key={link.name} 
                className="flex items-center text-sm font-medium hover:text-gray-300 transition-colors py-2"
              >
                {link.name}
                {link.hasDropdown && <ChevronDown size={16} className="ml-1" />}
              </button>
            ))}
          </nav>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          <button className="hidden md:flex items-center text-sm font-medium hover:text-gray-300 transition-colors">
            <Globe size={16} className="mr-1" /> EN
          </button>
          <button className="hidden md:block text-sm font-medium hover:text-gray-300 transition-colors">
            Help
          </button>
          <button className="hidden md:block text-sm font-medium hover:text-gray-300 transition-colors">
            Log in
          </button>
          <button className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
            Contact us
          </button>
        </div>
      </header>

      {/* Mobile Full Screen Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 bg-white z-[60] flex flex-col overflow-y-auto"
          >
            <div className="bg-black text-white h-16 flex items-center justify-between px-4 sticky top-0">
               <img 
                src="/assets/branding/logo.png" 
                alt="AnyAstro Logo" 
                className="h-5 object-contain"
              />
              <div className="flex items-center gap-4">
                 <button className="bg-white text-black px-4 py-1.5 rounded-full text-sm font-medium">
                  Contact
                </button>
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <X size={24} />
                </button>
              </div>
            </div>
            
            <div className="p-6 flex flex-col gap-6">
              {NAV_LINKS.map((link) => (
                <button key={link.name} className="flex items-center justify-between text-3xl font-bold text-black border-b border-transparent">
                  {link.name}
                  {link.hasDropdown && <ChevronDown size={24} />}
                </button>
              ))}
              <div className="mt-8">
                <button className="flex items-center text-lg font-bold text-black mb-4">
                  Help
                </button>
                <button className="flex items-center text-base font-medium text-black">
                  <Globe size={20} className="mr-2" /> EN
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Hero = () => {
  return (
    <section className="pt-24 pb-16 px-4 md:px-12 md:pt-32 max-w-[1400px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        
        {/* Left Column: Text & Form */}
        <div className="flex flex-col max-w-xl">
          <div className="flex items-center gap-2 mb-6 text-sm font-medium text-black">
            <MapPin size={16} fill="black" /> United States, HQ <span className="underline cursor-pointer">Change region</span>
          </div>
          
          <h1 className="text-5xl md:text-[64px] leading-[1.1] font-bold tracking-tight text-black mb-8">
            Deploy infrastructure anywhere with AnyAstro
          </h1>

          <div className="bg-white rounded-2xl w-full">
            <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 w-fit mb-6">
               <Clock size={16} className="text-black" />
               <span className="text-sm font-medium">Deploy now</span>
               <ChevronDown size={16} />
            </div>

            <div className="relative flex flex-col gap-3">
              {/* Vertical connecting line */}
              <div className="absolute left-[23px] top-[24px] bottom-[24px] w-[2px] bg-black z-0"></div>

              {/* Input 1 */}
              <div className="relative z-10 flex items-center bg-[#F6F6F6] rounded-lg p-3">
                <div className="w-6 flex justify-center mr-3">
                   <div className="w-2.5 h-2.5 rounded-full bg-black"></div>
                </div>
                <input 
                  type="text" 
                  placeholder="Select Industry" 
                  className="bg-transparent border-none outline-none w-full text-base placeholder-gray-500"
                />
                <Search size={20} className="text-black ml-2" />
              </div>

              {/* Input 2 */}
              <div className="relative z-10 flex items-center bg-[#F6F6F6] rounded-lg p-3">
                <div className="w-6 flex justify-center mr-3">
                   <div className="w-2.5 h-2.5 bg-black"></div>
                </div>
                <input 
                  type="text" 
                  placeholder="Project Scope" 
                  className="bg-transparent border-none outline-none w-full text-base placeholder-gray-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-4 mt-6">
              <button className="bg-black text-white px-6 py-3.5 rounded-lg text-base font-medium hover:bg-gray-800 transition-colors">
                See solutions
              </button>
              <button className="text-base font-medium text-black underline underline-offset-4 hover:text-gray-600 transition-colors">
                Log in to see your recent deployments
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Illustration/Image */}
        <div className="relative w-full aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-sm">
          <img 
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200" 
            alt="Infrastructure Illustration" 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md rounded-xl p-4 flex items-center justify-between shadow-lg">
            <span className="font-medium text-black text-lg">Ready to build?</span>
            <button className="bg-white text-black border border-gray-200 px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:bg-gray-50 transition-colors">
              Schedule consult
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

const ExploreServices = () => {
  return (
    <section className="py-16 px-4 md:px-12 max-w-[1400px] mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black mb-8">
        Explore what you can build
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {PRODUCTS.map((product) => (
          <div 
            key={product.id} 
            className="bg-[#F6F6F6] rounded-2xl p-4 md:p-6 flex flex-col justify-between hover:bg-gray-200 transition-colors cursor-pointer group"
          >
            <div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-black">{product.name}</h3>
                <img 
                  src={product.img} 
                  alt={product.name} 
                  className="w-16 h-12 object-cover rounded shadow-sm mix-blend-multiply group-hover:scale-105 transition-transform"
                />
              </div>
              <p className="text-sm text-gray-700 leading-snug mb-6">
                {product.desc}
              </p>
            </div>
            <button className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium w-fit shadow-sm">
              Details
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

const PlanForLater = () => {
  return (
    <section className="py-16 px-4 md:px-12 max-w-[1400px] mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black mb-8">
        Architect for the future
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Image Card */}
        <div className="lg:col-span-3 bg-[#E2ECEF] rounded-2xl p-8 relative overflow-hidden flex flex-col justify-center min-h-[400px]">
           <div className="flex gap-2 mb-4 relative z-10">
              <button className="bg-black text-white px-4 py-1.5 rounded-full text-sm font-medium">Enterprise</button>
              <button className="bg-white text-black px-4 py-1.5 rounded-full text-sm font-medium">Edge</button>
           </div>
           <h3 className="text-4xl md:text-5xl font-bold text-black leading-tight max-w-md relative z-10">
              Get your infrastructure right with AnyAstro OS
           </h3>
           <div className="mt-8 flex gap-4 relative z-10">
              <div className="bg-white/80 backdrop-blur rounded-lg p-3 flex items-center gap-3 w-48">
                 <Calendar size={20} /> <span className="font-medium text-sm">Deployment Date</span>
              </div>
              <div className="bg-white/80 backdrop-blur rounded-lg p-3 flex items-center gap-3 w-48">
                 <Clock size={20} /> <span className="font-medium text-sm">Timeframe</span>
              </div>
           </div>
           {/* Decorative image background */}
           <img 
              src="https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&q=80&w=800" 
              alt="Background" 
              className="absolute right-0 top-0 bottom-0 w-1/2 object-cover opacity-40 mix-blend-overlay"
           />
        </div>

        {/* Benefits List */}
        <div className="lg:col-span-2 flex flex-col justify-center">
          <h3 className="text-2xl font-bold text-black mb-6">Benefits</h3>
          <ul className="space-y-6">
            <li className="flex gap-4">
              <Calendar size={24} className="text-black shrink-0 mt-1" />
              <p className="text-base text-gray-800">Choose your exact deployment zone and specifications up to 90 days in advance.</p>
            </li>
            <li className="flex gap-4">
              <Clock size={24} className="text-black shrink-0 mt-1" />
              <p className="text-base text-gray-800">Extra integration time included to meet your complex architecture needs.</p>
            </li>
            <li className="flex gap-4">
              <CreditCard size={24} className="text-black shrink-0 mt-1" />
              <p className="text-base text-gray-800">Cancel project scoping at no charge up to 60 days before kickoff.</p>
            </li>
          </ul>
          <button className="text-base font-medium text-black underline underline-offset-4 mt-8 hover:text-gray-600 w-fit">
            See enterprise terms
          </button>
        </div>
      </div>
    </section>
  );
};

const GlobalImpact = () => {
  return (
    <section className="py-16 px-4 md:px-12 max-w-[1400px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        <div className="flex flex-col">
          <h2 className="text-4xl md:text-[42px] leading-tight font-bold tracking-tight text-black mb-4">
            Planning your next digital transformation?
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-md">
            From single facility automation to international multi-node deployments, we've got you covered. Explore GIS options, points of interest, and more with our new Platform Hub.
          </p>
          <button className="bg-black text-white px-6 py-3 rounded-full text-base font-medium hover:bg-gray-800 transition-colors w-fit flex items-center gap-2">
            <MapPin size={18} fill="white" className="text-black" /> Explore Solutions
          </button>
        </div>

        <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-sm">
          <img 
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200" 
            alt="Global Impact" 
            className="w-full h-full object-cover"
          />
        </div>

      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-16 pb-8 px-4 md:px-12 mt-16">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Top Section: Logo & Help */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-8">
           <img 
              src="/assets/branding/logo.png" 
              alt="AnyAstro Logo" 
              className="h-5 object-contain"
            />
          <div className="flex flex-col md:items-end gap-2 text-sm">
            <a href="#" className="hover:underline">Do not sell or share my personal information</a>
            <a href="#" className="hover:underline">Google Data Policy</a>
          </div>
        </div>
        
        <div className="mb-16">
          <a href="#" className="text-xl font-medium hover:underline">Visit Help Center</a>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-lg font-medium mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-300 hover:text-white hover:underline text-sm transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section: Perfect Social SVGs, Language, Legal */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 pt-8 border-t border-gray-800">
          
          <div className="flex items-center gap-6">
            <a href="#" className="text-white hover:text-gray-400 transition-colors"><IconLinkedIn /></a>
            <a href="#" className="text-white hover:text-gray-400 transition-colors"><IconYouTube /></a>
            <a href="#" className="text-white hover:text-gray-400 transition-colors"><IconInstagram /></a>
            <a href="#" className="text-white hover:text-gray-400 transition-colors"><IconX /></a>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
             <button className="flex items-center text-sm font-medium hover:text-gray-300 transition-colors">
                <Globe size={16} className="mr-2" /> English
             </button>
             <button className="flex items-center text-sm font-medium hover:text-gray-300 transition-colors">
                <MapPin size={16} className="mr-2" fill="white" stroke="black" /> United States
             </button>
          </div>

          <div className="flex flex-wrap gap-6 text-xs text-gray-400">
            <p>© 2026 AnyAstro Techno Solutions Inc.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Accessibility</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-black">
      <Navbar />
      <main>
        <Hero />
        <ExploreServices />
        <PlanForLater />
        <GlobalImpact />
      </main>
      <Footer />
    </div>
  );
}