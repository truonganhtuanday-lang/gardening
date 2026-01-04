/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { JournalArticle } from '../types';

interface JournalDetailProps {
  article: JournalArticle;
  allArticles: JournalArticle[];
  onArticleClick: (article: JournalArticle) => void;
  onBack: () => void;
}

const JournalDetail: React.FC<JournalDetailProps> = ({ article, allArticles, onArticleClick, onBack }) => {
  const relatedArticles = allArticles
    .filter(a => a.id !== article.id)
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-[#F2F4F0] animate-fade-in-up">
       {/* High-End Hero */}
       <div className="w-full h-[60vh] md:h-[80vh] relative overflow-hidden bg-[#1B2616]">
          <img 
             src={article.image} 
             alt={article.title} 
             className="w-full h-full object-cover opacity-90 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F2F4F0] via-transparent to-transparent"></div>
       </div>

       {/* Article Body Container */}
       <div className="max-w-4xl mx-auto px-6 md:px-12 -mt-40 relative z-10 pb-32">
          <div className="bg-white p-10 md:p-24 shadow-2xl border border-[#1B2616]/5">
             
             {/* Editorial Metadata */}
             <div className="flex flex-col items-center text-center mb-16 space-y-6">
                <button 
                  onClick={onBack}
                  className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#4A5B63] hover:text-[#1B2616] transition-colors mb-4"
                >
                  ← Journal Index
                </button>
                <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-[#4A5B63]/60">
                  <span>{article.date}</span>
                  <span className="w-1 h-1 bg-[#4A5B63]/20 rounded-full"></span>
                  <span>Written by Josh Jones</span>
                  <span className="w-1 h-1 bg-[#4A5B63]/20 rounded-full"></span>
                  <span>5 Min Read</span>
                </div>
                <h1 className="text-4xl md:text-7xl font-serif text-[#1B2616] leading-tight">
                  {article.title}
                </h1>
                <div className="w-12 h-px bg-[#1B2616]/20 mt-8"></div>
             </div>

             {/* Main Narrative */}
             <div className="prose prose-stone prose-lg max-w-none font-light leading-relaxed text-[#1B2616]/80 text-justify md:text-left">
               {article.content.split('\n').map((paragraph, i) => (
                 <p key={i} className="mb-10 first-letter:text-5xl first-letter:font-serif first-letter:mr-3 first-letter:float-left first-letter:text-[#1B2616]">
                   {paragraph}
                 </p>
               ))}
               
               {/* Editorial Pull Quote */}
               <blockquote className="my-16 border-l-0 text-center">
                  <p className="text-3xl font-serif italic text-[#1B2616] leading-relaxed">
                    "Authentic design requires listening to the terrain long before the first shovel hits the soil."
                  </p>
                  <cite className="block mt-4 text-[10px] uppercase tracking-widest font-bold opacity-40 not-italic">— On Stewardship</cite>
               </blockquote>

               <p>
                 Our philosophy remains consistent: we are not just gardeners, but stewards of a legacy. Each decision, from the selection of native flora to the strategic placement of basalt boulders, is made with a century-long horizon in mind.
               </p>
             </div>
             
             {/* Footer Interaction */}
             <div className="mt-24 pt-16 border-t border-[#1B2616]/10 flex flex-col items-center">
                 <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#4A5B63]/40 mb-8">Share Insight</span>
                 <div className="flex gap-10">
                    <button className="text-[#1B2616]/60 hover:text-[#1B2616] transition-colors">
                      <span className="text-xs uppercase tracking-widest font-bold">Instagram</span>
                    </button>
                    <button className="text-[#1B2616]/60 hover:text-[#1B2616] transition-colors">
                      <span className="text-xs uppercase tracking-widest font-bold">Pinterest</span>
                    </button>
                    <button className="text-[#1B2616]/60 hover:text-[#1B2616] transition-colors">
                      <span className="text-xs uppercase tracking-widest font-bold">Email</span>
                    </button>
                 </div>
             </div>
          </div>
       </div>

       {/* Related Articles Section */}
       <section className="bg-stone-100 py-32 px-6 md:px-12 border-t border-black/5">
          <div className="max-w-4xl mx-auto">
             <div className="text-center mb-20">
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#4A5B63]/40 mb-4 block">Keep Exploring</span>
                <h3 className="text-4xl font-serif">Related Field Notes</h3>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {relatedArticles.map(rel => (
                  <div 
                    key={rel.id} 
                    className="group cursor-pointer space-y-4"
                    onClick={() => onArticleClick(rel)}
                  >
                    <div className="aspect-video overflow-hidden bg-white shadow-lg">
                       <img src={rel.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    <h4 className="text-2xl font-serif group-hover:underline underline-offset-4">{rel.title}</h4>
                    <p className="text-sm font-light text-[#1B2616]/60 line-clamp-2">{rel.excerpt}</p>
                  </div>
                ))}
             </div>
          </div>
       </section>

       {/* Bottom Navigation */}
       <div className="py-20 text-center">
          <button 
            onClick={onBack}
            className="px-12 py-5 border border-[#1B2616]/20 text-xs font-bold uppercase tracking-[0.3em] hover:bg-[#1B2616] hover:text-white transition-all"
          >
            Back to Journal Archives
          </button>
       </div>
    </div>
  );
};

export default JournalDetail;
