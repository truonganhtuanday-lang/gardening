/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { PortfolioProject } from '../types';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface PortfolioProps {
  portfolio: PortfolioProject[];
  onProjectClick: (project: PortfolioProject) => void;
}

const Portfolio: React.FC<PortfolioProps> = ({ portfolio, onProjectClick }) => {
  const sectionRef = useScrollReveal();

  return (
    <section id="portfolio" ref={sectionRef as any} className="py-32 px-6 md:px-12 bg-[#1B2616] text-white">
      <div className="max-w-[1800px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8 reveal reveal-up">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/40 mb-4 block">Selected Works</span>
            <h2 className="text-4xl md:text-6xl font-serif">A Legacy of Landscapes</h2>
          </div>
          <p className="max-w-md text-white/60 font-light leading-relaxed">
            Exploring our curated collection of estate gardens and structural masterpieces across the West Vancouver coastline.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {portfolio.map((project, index) => (
            <div 
              key={project.id} 
              className={`group cursor-pointer reveal reveal-scale delay-${(index + 1) * 150}`}
              onClick={() => onProjectClick(project)}
            >
              <div className="relative aspect-square overflow-hidden mb-6 bg-white/5">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-xs uppercase tracking-[0.3em] border border-white px-6 py-3 backdrop-blur-sm">View Project</span>
                </div>
              </div>
              <h3 className="text-xl font-serif mb-1 group-hover:text-white/80 transition-colors">{project.title}</h3>
              <p className="text-xs uppercase tracking-widest text-white/40">{project.location}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;