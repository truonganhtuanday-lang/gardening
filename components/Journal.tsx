/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useRef } from 'react';
import { JournalArticle } from '../types';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface JournalProps {
  articles: JournalArticle[];
  onArticleClick: (article: JournalArticle) => void;
  onViewAll: () => void;
}

const Journal: React.FC<JournalProps> = ({ articles, onArticleClick, onViewAll }) => {
  const sectionRef = useScrollReveal();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, articles.length - itemsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <section id="journal" ref={sectionRef as any} className="bg-[#F2F4F0] py-32 px-6 md:px-12 overflow-hidden">
      <div className="max-w-[1800px] mx-auto">
        {/* Header with Navigation Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 pb-8 border-b border-[#1B2616]/10 reveal reveal-up">
            <div className="flex-1">
                <span className="block text-xs font-bold uppercase tracking-[0.3em] text-[#4A5B63] mb-4">The Journal</span>
                <h2 className="text-4xl md:text-6xl font-serif text-[#1B2616]">Field Notes & <span className="italic">Insights</span></h2>
            </div>
            
            <div className="flex flex-col items-start md:items-end mt-8 md:mt-0 gap-6">
              <button 
                onClick={onViewAll}
                className="text-xs font-bold uppercase tracking-[0.3em] text-[#1B2616] hover:opacity-60 transition-opacity border-b border-[#1B2616]/40 pb-1"
              >
                View Full Collection
              </button>
              
              <div className="flex gap-4">
                <button 
                  onClick={prevSlide}
                  disabled={currentIndex === 0}
                  className={`w-12 h-12 rounded-full border border-[#1B2616]/20 flex items-center justify-center transition-all ${
                    currentIndex === 0 ? 'opacity-20 cursor-not-allowed' : 'hover:bg-[#1B2616] hover:text-white'
                  }`}
                  aria-label="Previous articles"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </button>
                <button 
                  onClick={nextSlide}
                  disabled={currentIndex === maxIndex}
                  className={`w-12 h-12 rounded-full border border-[#1B2616]/20 flex items-center justify-center transition-all ${
                    currentIndex === maxIndex ? 'opacity-20 cursor-not-allowed' : 'hover:bg-[#1B2616] hover:text-white'
                  }`}
                  aria-label="Next articles"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              </div>
            </div>
        </div>

        {/* Slider Container */}
        <div className="relative">
          <div 
            className="flex transition-transform duration-[800ms] cubic-bezier(0.65, 0, 0.35, 1)"
            style={{ 
              transform: `translateX(-${currentIndex * (100 / Math.max(1, itemsPerView))}%)`,
            }}
          >
            {articles.map((article, index) => (
              <div 
                key={article.id} 
                className={`flex-none px-4 reveal reveal-up delay-${(index % 3 + 1) * 100}`}
                style={{ width: `${100 / Math.max(1, itemsPerView)}%` }}
              >
                <div 
                  className="group cursor-pointer flex flex-col text-left h-full"
                  onClick={() => onArticleClick(article)}
                >
                    <div className="w-full aspect-[16/10] overflow-hidden mb-8 bg-[#D9D4CC]">
                        <img 
                            src={article.image} 
                            alt={article.title} 
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                    </div>
                    <div className="flex flex-col flex-1">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#4A5B63] mb-3 opacity-60">{article.date}</span>
                        <h3 className="text-2xl font-serif text-[#1B2616] mb-4 leading-tight group-hover:underline decoration-1 underline-offset-4">{article.title}</h3>
                        <p className="text-[#1B2616]/70 font-light leading-relaxed line-clamp-3">{article.excerpt}</p>
                    </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-16 w-full h-[1px] bg-[#1B2616]/10 relative">
          <div 
            className="absolute top-0 left-0 h-full bg-[#1B2616] transition-all duration-500"
            style={{ 
              width: `${((currentIndex + Math.min(itemsPerView, articles.length)) / Math.max(1, articles.length)) * 100}%`,
              left: 0
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Journal;
