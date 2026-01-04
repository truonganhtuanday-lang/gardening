/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const About: React.FC = () => {
  const sectionRef = useScrollReveal();

  return (
    <section id="about" ref={sectionRef as any} className="bg-[#D9D4CC] py-32 px-6 md:px-12 overflow-hidden">
      <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row items-center gap-16">
        <div className="md:w-1/2 reveal reveal-left">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#4A5B63] mb-6 block">Our Heritage</span>
          <h2 className="text-4xl md:text-6xl font-serif text-[#1B2616] leading-tight mb-8">
            Defined by the <br/> North Shore landscape.
          </h2>
          <div className="space-y-6 text-lg text-[#1B2616]/80 font-light leading-relaxed">
            <p>
              Josh Jones Gardening was founded on a deep respect for the rugged beauty of the West Coast. We believe that a garden should not just sit upon the land, but emerge from it.
            </p>
            <p>
              Serving North and West Vancouver, our team specializes in high-end maintenance and custom builds that harmonize architectural precision with the organic wildness of the Pacific Northwest.
            </p>
          </div>
          <div className="mt-12 flex items-center gap-6">
            <div className="text-center">
              <span className="block text-4xl font-serif text-[#1B2616]">15+</span>
              <span className="text-xs uppercase tracking-widest text-[#4A5B63]">Years Experience</span>
            </div>
            <div className="w-px h-12 bg-[#1B2616]/20"></div>
            <div className="text-center">
              <span className="block text-4xl font-serif text-[#1B2616]">200+</span>
              <span className="text-xs uppercase tracking-widest text-[#4A5B63]">Bespoke Estates</span>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 relative reveal reveal-right delay-200">
          <div className="aspect-[4/5] overflow-hidden rounded-sm shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1689728222087-6984f72460c4?q=80&w=1200" 
              alt="Josh Jones Gardening work in progress" 
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="absolute -bottom-8 -left-8 bg-[#1B2616] text-white p-8 max-w-xs hidden lg:block reveal reveal-up delay-400">
            <p className="font-serif italic text-xl mb-4">"Nature is the architect; we are simply the stewards of its beauty."</p>
            <p className="text-xs uppercase tracking-widest opacity-60">— Josh Jones, Founder</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;