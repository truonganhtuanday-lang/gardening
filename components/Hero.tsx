
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

interface HeroProps {
  content?: {
    title: string;
    subtitle: string;
    image: string;
  };
}

const Hero: React.FC<HeroProps> = ({ content }) => {
  const displayTitle = content?.title || "Artistry in the Soil.";
  const displaySubtitle = content?.subtitle || "Curated landscaping and garden stewardship for the Pacific Northwest's most distinguished homes.";
  const displayImage = content?.image || "https://images.unsplash.com/photo-1624018202248-82864cb0f36d?q=80&w=2942";

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 85;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full h-screen min-h-[700px] overflow-hidden bg-[#1B2616]">
      <div className="absolute inset-0 w-full h-full">
        <img 
            src={displayImage} 
            alt="Lush Pacific Northwest Garden" 
            className="w-full h-full object-cover brightness-[0.7]"
            loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1B2616]/20 to-[#1B2616]/60"></div>
      </div>

      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
        <div className="animate-fade-in-up">
          <span className="block text-xs font-semibold uppercase tracking-[0.3em] text-white/80 mb-6 px-4 py-2 border border-white/20 rounded-full w-fit mx-auto">
            North Vancouver | West Vancouver
          </span>
          <h1 className="text-5xl md:text-8xl font-serif text-white tracking-tight mb-8">
            {displayTitle}
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/90 font-light leading-relaxed mb-12">
            {displaySubtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#booking" 
              onClick={(e) => handleNavClick(e, 'booking')}
              className="px-10 py-4 bg-white text-[#1B2616] rounded-full text-sm font-semibold uppercase tracking-widest hover:bg-[#F2F4F0] transition-all duration-300 shadow-xl"
            >
              Request a Consultation
            </a>
            <a 
              href="#portfolio" 
              onClick={(e) => handleNavClick(e, 'portfolio')}
              className="px-10 py-4 border border-white text-white rounded-full text-sm font-semibold uppercase tracking-widest hover:bg-white/10 transition-all duration-300"
            >
              View Portfolio
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce text-white/40">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
