/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { JournalArticle } from '../types';

interface JournalIndexProps {
  articles: JournalArticle[];
  onArticleClick: (article: JournalArticle) => void;
  onBack: () => void;
}

const JournalIndex: React.FC<JournalIndexProps> = ({ articles, onArticleClick, onBack }) => {
  return (
    <div className="min-h-screen bg-[#F2F4F0] pt-40 pb-32 px-6 md:px-12 animate-fade-in-up">
      <div className="max-w-[1800px] mx-auto">
        <header className="mb-24 text-center">
          <button 
            onClick={onBack}
            className="mb-8 text-[10px] uppercase tracking-[0.4em] font-bold text-[#1B2616]/40 hover:text-[#1B2616] transition-colors"
          >
            ← Back to Home
          </button>
          <h1 className="text-6xl md:text-8xl font-serif text-[#1B2616] mb-8">The Archives</h1>
          <p className="max-w-xl mx-auto text-[#1B2616]/60 font-light text-lg">
            A comprehensive collection of horticultural wisdom, project studies, and seasonal observations.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
          {articles.map((article) => (
            <article 
              key={article.id} 
              className="group cursor-pointer flex flex-col"
              onClick={() => onArticleClick(article)}
            >
              <div className="aspect-[16/10] overflow-hidden mb-8 bg-[#D9D4CC]">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-[#4A5B63]/60">
                  <span>{article.date}</span>
                  <span>4 Min Read</span>
                </div>
                <h2 className="text-3xl font-serif text-[#1B2616] leading-tight group-hover:underline decoration-1 underline-offset-8">
                  {article.title}
                </h2>
                <p className="text-[#1B2616]/70 font-light leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="pt-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#1B2616]">Read Entry</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JournalIndex;
