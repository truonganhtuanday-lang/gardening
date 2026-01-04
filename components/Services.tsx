
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { Service } from '../types';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface ServicesProps {
  services: Service[];
}

const Services: React.FC<ServicesProps> = ({ services }) => {
  const sectionRef = useScrollReveal();

  return (
    <section id="services" ref={sectionRef as any} className="py-32 px-6 md:px-12 bg-[#F2F4F0]">
      <div className="max-w-[1800px] mx-auto text-center">
        <div className="reveal reveal-up">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#4A5B63] mb-4 block">Expertise</span>
          <h2 className="text-4xl md:text-6xl font-serif text-[#1B2616] mb-24">The Service Suite</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {services.map((service, index) => (
            <div 
              key={service.id} 
              className={`group flex flex-col items-start text-left reveal reveal-up delay-${(index % 3 + 1) * 100}`}
            >
              <div className="w-full aspect-[4/5] overflow-hidden mb-8 bg-[#D9D4CC]">
                <img 
                  src={service.imageUrl} 
                  alt={service.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
              </div>
              <h3 className="text-2xl font-serif text-[#1B2616] mb-4">{service.name}</h3>
              <p className="text-[#1B2616]/70 font-light leading-relaxed mb-6">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-xs uppercase tracking-widest font-medium text-[#4A5B63]">
                    <span className="w-1 h-1 bg-[#1B2616] rounded-full"></span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
