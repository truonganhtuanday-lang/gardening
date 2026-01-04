/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { BRAND_NAME } from '../constants';

interface NavbarProps {
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    setMobileMenuOpen(false);
    onNavClick(e, targetId);
  };

  const isDark = scrolled || mobileMenuOpen;

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isDark ? 'bg-[#F2F4F0] py-4 shadow-sm' : 'bg-transparent py-8'
        }`}
      >
        <div className="max-w-[1800px] mx-auto px-8 flex items-center justify-between">
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); onNavClick(e, ''); }}
            className={`flex items-center gap-3 z-50 transition-colors duration-500 ${isDark ? 'text-[#1B2616]' : 'text-white'}`}
          >
            <svg width="40" height="40" viewBox="0 0 100 100" className="fill-current" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M50 10 C27.9 10, 10 27.9, 10 50 C10 72.1, 27.9 90, 50 90 C72.1 90, 90 72.1, 90 50 C90 27.9, 72.1 10, 50 10 Z"
                stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"
              />
              <path
                d="M50 32 C40 32, 32 40, 32 50 C32 61, 40 70, 50 74 C50 60, 50 46, 50 32 Z"
                stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"
              />
              <path
                d="M50 32 C60 32, 68 40, 68 50 C68 61, 60 70, 50 74 C50 60, 50 46, 50 32 Z"
                stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"
              />
              <path d="M50 32 L50 74" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              <path d="M38 78 C44 76, 56 76, 62 78" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.8" />
            </svg>
            <span className="text-xl font-serif font-medium tracking-tight hidden sm:block">
              {BRAND_NAME}
            </span>
          </a>
          
          <div className={`hidden md:flex items-center gap-6 text-xs font-semibold tracking-widest uppercase transition-colors duration-500 ${isDark ? 'text-[#1B2616]' : 'text-white'}`}>
            <a href="#services" onClick={(e) => handleLinkClick(e, 'services')} className="hover:opacity-60 transition-opacity">Services</a>
            <a href="#about" onClick={(e) => handleLinkClick(e, 'about')} className="hover:opacity-60 transition-opacity">About</a>
            <a href="#portfolio" onClick={(e) => handleLinkClick(e, 'portfolio')} className="hover:opacity-60 transition-opacity">Portfolio</a>
            <a href="#journal" onClick={(e) => handleLinkClick(e, 'journal')} className="hover:opacity-60 transition-opacity">Journal</a>
            <a href="#testimonials" onClick={(e) => handleLinkClick(e, 'testimonials')} className="hover:opacity-60 transition-opacity">Testimonials</a>

            <a 
                href="#booking" 
                onClick={(e) => handleLinkClick(e, 'booking')}
                className={`px-6 py-3 rounded-full border transition-all ${isDark ? 'border-[#1B2616] hover:bg-[#1B2616] hover:text-white' : 'border-white hover:bg-white hover:text-[#1B2616]'}`}
            >
                Consultation
            </a>
          </div>

          <button 
            className={`md:hidden z-50 transition-colors duration-500 ${isDark ? 'text-[#1B2616]' : 'text-white'}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
             {mobileMenuOpen ? (
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
             ) : (
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
             )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-[#F2F4F0] z-40 flex flex-col justify-center items-center transition-all duration-500 ease-in-out ${mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
          <div className="flex flex-col items-center space-y-8 text-2xl font-serif text-[#1B2616]">
            <a href="#services" onClick={(e) => handleLinkClick(e, 'services')}>Services</a>
            <a href="#about" onClick={(e) => handleLinkClick(e, 'about')}>About</a>
            <a href="#portfolio" onClick={(e) => handleLinkClick(e, 'portfolio')}>Portfolio</a>
            <a href="#journal" onClick={(e) => handleLinkClick(e, 'journal')}>Journal</a>
            <a href="#testimonials" onClick={(e) => handleLinkClick(e, 'testimonials')}>Testimonials</a>

            <a href="#booking" onClick={(e) => handleLinkClick(e, 'booking')} className="text-base font-sans uppercase tracking-[0.2em] font-semibold pt-4">Book Consultation</a>
          </div>
      </div>
    </>
  );
};

export default Navbar;