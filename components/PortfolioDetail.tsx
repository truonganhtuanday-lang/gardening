/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { PortfolioProject } from '../types';

interface PortfolioDetailProps {
  project: PortfolioProject;
  onBack: () => void;
}

const PortfolioDetail: React.FC<PortfolioDetailProps> = ({ project, onBack }) => {
  return (
    <div className="min-h-screen bg-[#F2F4F0] animate-fade-in-up pb-32">
      {/* Hero Header */}
      <div className="w-full h-[70vh] relative overflow-hidden bg-[#1B2616]">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1B2616]/40"></div>
        
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center w-full px-6">
          <span className="text-xs font-bold uppercase tracking-[0.4em] text-white/60 mb-4 block">Project Gallery</span>
          <h1 className="text-5xl md:text-8xl font-serif text-white tracking-tight">{project.title}</h1>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-6 md:px-12 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">
          
          {/* Back Action & Metadata */}
          <div className="lg:col-span-4 space-y-16">
            <button 
              onClick={onBack}
              className="group flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-[#4A5B63] hover:text-[#1B2616] transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 group-hover:-translate-x-1 transition-transform">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
              Return to Gallery
            </button>

            <div className="space-y-12">
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-widest font-bold opacity-40 block">Location</span>
                <p className="text-xl font-serif">{project.location}</p>
              </div>
              
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-widest font-bold opacity-40 block">Scope</span>
                <p className="text-sm font-light leading-relaxed">
                  {project.scope || 'Complete Estate Design & Restoration, Custom Hardscape, and Horticultural Stewardship.'}
                </p>
              </div>

              {(project.materials && project.materials.length > 0) ? (
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-widest font-bold opacity-40 block">Materials</span>
                  <ul className="text-xs uppercase tracking-widest font-medium space-y-2">
                    {project.materials.map((m, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1 h-1 bg-[#1B2616] rounded-full"></span> {m}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-widest font-bold opacity-40 block">Materials</span>
                  <ul className="text-xs uppercase tracking-widest font-medium space-y-2">
                    <li className="flex items-center gap-2"><span className="w-1 h-1 bg-[#1B2616] rounded-full"></span> Basalt Columns</li>
                    <li className="flex items-center gap-2"><span className="w-1 h-1 bg-[#1B2616] rounded-full"></span> Reclaimed Timber</li>
                    <li className="flex items-center gap-2"><span className="w-1 h-1 bg-[#1B2616] rounded-full"></span> Architectural Concrete</li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Project Narrative */}
          <div className="lg:col-span-8">
            <div className="bg-white p-12 md:p-20 shadow-xl border border-[#1B2616]/5 mb-24">
              <h2 className="text-xs uppercase tracking-[0.4em] font-bold text-[#4A5B63] mb-12">The Narrative</h2>
              <div className="prose prose-stone prose-lg max-w-none font-light leading-relaxed text-[#1B2616]/80">
                <p className="text-2xl font-serif italic mb-10 text-[#1B2616]">
                  A transformation of terrain into a living legacy.
                </p>
                {project.description.split('\n').map((paragraph, i) => (
                  <p key={i} className="mb-8">{paragraph}</p>
                ))}
                {!project.description.includes('commitment to the West Coast aesthetic') && (
                  <p className="mb-8">
                    This project represents our commitment to the West Coast aesthetic—utilizing raw local materials to create spaces that feel both newly discovered and as though they have always been there.
                  </p>
                )}
              </div>
            </div>

            {/* The Gallery - New Section */}
            {project.gallery && project.gallery.length > 0 && (
              <div className="space-y-12">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold uppercase tracking-[0.4em] text-[#4A5B63]">A Study in Detail</span>
                  <div className="h-px flex-1 bg-[#1B2616]/10"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {project.gallery.map((img, idx) => (
                    <div 
                      key={idx} 
                      className={`overflow-hidden bg-[#D9D4CC] ${
                        idx % 3 === 0 ? 'md:col-span-2 aspect-video' : 'aspect-square'
                      }`}
                    >
                      <img 
                        src={img} 
                        alt={`Project Detail ${idx + 1}`} 
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-100 hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Section */}
            <div className="mt-24 text-center lg:text-left">
              <a 
                href="#booking" 
                onClick={(e) => {
                  e.preventDefault();
                  onBack();
                  setTimeout(() => {
                    const el = document.getElementById('booking');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="inline-block bg-[#1B2616] text-white px-12 py-6 text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-[#2c3d25] transition-all shadow-xl"
              >
                Inquire About a Similar Build
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioDetail;
