
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { Service, PortfolioProject, JournalArticle, Inquiry, AdminTab, HomeContent } from '../types';
import Hero from './Hero';
import About from './About';
import Testimonials from './Testimonials';

interface AdminDashboardProps {
  services: Service[];
  setServices: React.Dispatch<React.SetStateAction<Service[]>>;
  portfolio: PortfolioProject[];
  setPortfolio: React.Dispatch<React.SetStateAction<PortfolioProject[]>>;
  journal: JournalArticle[];
  setJournal: React.Dispatch<React.SetStateAction<JournalArticle[]>>;
  inquiries: Inquiry[];
  setInquiries: React.Dispatch<React.SetStateAction<Inquiry[]>>;
  aiInstructions: string;
  setAiInstructions: React.Dispatch<React.SetStateAction<string>>;
  homeContent: HomeContent;
  setHomeContent: React.Dispatch<React.SetStateAction<HomeContent>>;
  onExit: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  services, setServices, portfolio, setPortfolio, 
  journal, setJournal, inquiries, setInquiries,
  aiInstructions, setAiInstructions, 
  homeContent, setHomeContent, onExit 
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('visual');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [editingSection, setEditingSection] = useState<'hero' | 'about' | 'testimonials' | null>('hero');
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);

  const ACCESS_KEY = "stewardship2025";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ACCESS_KEY) {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      setPassword('');
      setTimeout(() => setError(false), 2000);
    }
  };

  const navItems = [
    { id: 'visual', label: 'Visual Studio', icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' },
    { id: 'dashboard', label: 'Inquiry Log', icon: 'M12 6v6m0 0v6m0-6h6m-6 0H6' },
    { id: 'services', label: 'Services', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { id: 'portfolio', label: 'Curator', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { id: 'journal', label: 'Editorial', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' },
    { id: 'settings', label: 'AI Studio', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
  ];

  const updateHome = (section: keyof HomeContent, field: string, value: string) => {
    setHomeContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  // Journal Helpers
  const addJournalEntry = () => {
    const newEntry: JournalArticle = {
      id: Math.random().toString(36).substr(2, 9),
      title: 'New Field Note',
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=800',
      excerpt: 'A brief observation from the soil...',
      content: 'Start writing your legacy here...'
    };
    setJournal([newEntry, ...journal]);
    setEditingArticleId(newEntry.id);
  };

  const updateArticle = (id: string, updates: Partial<JournalArticle>) => {
    setJournal(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
  };

  // Portfolio Helpers
  const addPortfolioProject = () => {
    const newProject: PortfolioProject = {
      id: Math.random().toString(36).substr(2, 9),
      title: 'New Estate Project',
      location: 'West Vancouver',
      description: 'Describe the transformation of this landscape...',
      image: 'https://images.unsplash.com/photo-1557429287-b2e26467fc2b?auto=format&fit=crop&q=80&w=1200',
      materials: [],
      gallery: [],
      scope: 'Full Estate Redesign'
    };
    setPortfolio([...portfolio, newProject]);
    setEditingProjectId(newProject.id);
  };

  const updateProject = (id: string, updates: Partial<PortfolioProject>) => {
    setPortfolio(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const addMaterial = (id: string) => {
    const proj = portfolio.find(p => p.id === id);
    if (proj) {
      updateProject(id, { materials: [...(proj.materials || []), 'New Material'] });
    }
  };

  const addGalleryImage = (id: string) => {
    const proj = portfolio.find(p => p.id === id);
    if (proj) {
      updateProject(id, { gallery: [...(proj.gallery || []), 'https://images.unsplash.com/photo-1592150621344-22d50897ba3b?q=80&w=800'] });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#1B2616] flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center space-y-12 animate-fade-in-up">
           <div className="space-y-4">
              <span className="text-white/40 text-[10px] uppercase tracking-[0.5em] font-bold">Stewardship Portal</span>
              <h2 className="text-white text-5xl font-serif leading-tight">Access <br/> <span className="italic">Restricted.</span></h2>
           </div>
           
           <form onSubmit={handleLogin} className="space-y-8">
              <div className="relative">
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Management Key"
                  className={`w-full bg-transparent border-b ${error ? 'border-red-500 animate-pulse' : 'border-white/20'} py-4 text-center text-white outline-none focus:border-white transition-all placeholder-white/20`}
                  autoFocus
                />
                {error && (
                  <p className="absolute top-full left-0 w-full text-[9px] uppercase tracking-widest text-red-400 mt-4 font-bold">Invalid Stewardship Key</p>
                )}
              </div>
              <button 
                type="submit"
                className="px-12 py-5 bg-white text-[#1B2616] text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-[#F2F4F0] transition-all"
              >
                Sign In
              </button>
           </form>

           <button 
             onClick={onExit}
             className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-bold hover:text-white transition-colors"
           >
             ← Return to Estate
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <aside className="w-64 bg-[#1B2616] text-white flex flex-col z-20 shadow-2xl">
        <div className="p-8 border-b border-white/10">
          <h1 className="font-serif text-2xl tracking-tight">Studio</h1>
          <p className="text-[10px] uppercase tracking-widest text-white/40 mt-1">Josh Jones Gardening</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as AdminTab)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-sm text-xs font-bold uppercase tracking-widest transition-all ${
                activeTab === item.id ? 'bg-white/10 text-white border-l-2 border-white' : 'text-white/40 hover:text-white hover:bg-white/5'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
              </svg>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-8 border-t border-white/10">
          <button 
            onClick={onExit}
            className="w-full py-4 border border-white/20 text-[10px] uppercase tracking-[0.3em] hover:bg-white hover:text-[#1B2616] transition-all"
          >
            Public View
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden bg-[#F9F9F7]">
        {activeTab === 'visual' && (
          <div className="flex-1 flex overflow-hidden">
            <div className="w-[380px] bg-white border-r border-[#1B2616]/10 flex flex-col shadow-xl z-10 animate-fade-in-up">
               <div className="p-8 border-b border-[#1B2616]/5 bg-[#F9F9F7]">
                  <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-[#1B2616]">Visual Settings</h2>
                  <p className="text-[10px] opacity-40 uppercase tracking-widest mt-1">Editing Section: {editingSection}</p>
               </div>
               
               <div className="flex-1 overflow-y-auto p-8 space-y-12">
                  {editingSection === 'hero' && (
                    <div className="space-y-8 animate-fade-in-up">
                       <div className="space-y-2">
                          <label className="text-[9px] uppercase tracking-widest font-bold opacity-40">Hero Title</label>
                          <textarea 
                            value={homeContent.hero.title}
                            onChange={(e) => updateHome('hero', 'title', e.target.value)}
                            rows={3}
                            className="w-full bg-[#F2F4F0] border-none p-4 text-sm font-serif focus:ring-1 focus:ring-[#1B2616] transition-all resize-none"
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[9px] uppercase tracking-widest font-bold opacity-40">Subtitle Narrative</label>
                          <textarea 
                            value={homeContent.hero.subtitle}
                            onChange={(e) => updateHome('hero', 'subtitle', e.target.value)}
                            rows={3}
                            className="w-full bg-[#F2F4F0] border-none p-4 text-xs font-light leading-relaxed focus:ring-1 focus:ring-[#1B2616] transition-all resize-none"
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[9px] uppercase tracking-widest font-bold opacity-40">Hero Backdrop (URL)</label>
                          <input 
                            value={homeContent.hero.image}
                            onChange={(e) => updateHome('hero', 'image', e.target.value)}
                            className="w-full bg-[#F2F4F0] border-none p-4 text-[10px] focus:ring-1 focus:ring-[#1B2616] transition-all"
                          />
                       </div>
                    </div>
                  )}

                  {editingSection === 'about' && (
                    <div className="space-y-8 animate-fade-in-up">
                       <div className="space-y-2">
                          <label className="text-[9px] uppercase tracking-widest font-bold opacity-40">Tagline</label>
                          <input 
                            value={homeContent.about.tagline}
                            onChange={(e) => updateHome('about', 'tagline', e.target.value)}
                            className="w-full bg-[#F2F4F0] border-none p-4 text-[10px] font-bold uppercase tracking-widest focus:ring-1 focus:ring-[#1B2616]"
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[9px] uppercase tracking-widest font-bold opacity-40">Main Headline</label>
                          <textarea 
                            value={homeContent.about.title}
                            onChange={(e) => updateHome('about', 'title', e.target.value)}
                            rows={2}
                            className="w-full bg-[#F2F4F0] border-none p-4 text-lg font-serif focus:ring-1 focus:ring-[#1B2616] resize-none"
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[9px] uppercase tracking-widest font-bold opacity-40">Body Narrative</label>
                          <textarea 
                            value={homeContent.about.p1}
                            onChange={(e) => updateHome('about', 'p1', e.target.value)}
                            rows={4}
                            className="w-full bg-[#F2F4F0] border-none p-4 text-xs font-light leading-relaxed focus:ring-1 focus:ring-[#1B2616] resize-none"
                          />
                       </div>
                    </div>
                  )}
               </div>
               <div className="p-8 border-t border-[#1B2616]/5 bg-white">
                  <button 
                    onClick={() => alert('Changes are auto-saved to your local vault.')}
                    className="w-full py-5 bg-[#1B2616] text-white text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-stone-900 transition-all shadow-lg"
                  >
                    Sync to Production
                  </button>
               </div>
            </div>

            <div className="flex-1 bg-[#D9D4CC]/20 overflow-y-auto p-12 custom-scrollbar">
               <div className="max-w-5xl mx-auto shadow-2xl border-x border-[#1B2616]/5 pointer-events-none select-none relative bg-white">
                  <div className="absolute inset-0 z-30 pointer-events-auto">
                     <div 
                        className={`group cursor-pointer border-4 transition-all h-[700px] ${editingSection === 'hero' ? 'border-[#1B2616]' : 'border-transparent hover:border-[#1B2616]/20'}`}
                        onClick={() => setEditingSection('hero')}
                     >
                        <Hero content={homeContent.hero} />
                     </div>
                     <div 
                        className={`group cursor-pointer border-4 transition-all ${editingSection === 'about' ? 'border-[#1B2616]' : 'border-transparent hover:border-[#1B2616]/20'}`}
                        onClick={() => setEditingSection('about')}
                     >
                        <About content={homeContent.about} />
                     </div>
                  </div>
                  <div className="opacity-100">
                    <Hero content={homeContent.hero} />
                    <About content={homeContent.about} />
                    <Testimonials content={homeContent.testimonials} />
                  </div>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div className="flex-1 flex overflow-hidden">
            {/* Master List */}
            <div className="w-[400px] border-r border-[#1B2616]/5 bg-white flex flex-col">
              <div className="p-8 border-b border-[#1B2616]/5 flex justify-between items-center">
                <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-[#1B2616]">Project Curator</h2>
                <button 
                  onClick={addPortfolioProject}
                  className="w-8 h-8 rounded-full bg-[#1B2616] text-white flex items-center justify-center hover:scale-110 transition-transform"
                >
                  +
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                {portfolio.map(proj => (
                  <button
                    key={proj.id}
                    onClick={() => setEditingProjectId(proj.id)}
                    className={`w-full text-left p-6 border-b border-[#1B2616]/5 transition-all ${editingProjectId === proj.id ? 'bg-[#F2F4F0] border-l-4 border-l-[#1B2616]' : 'hover:bg-[#F9F9F7]'}`}
                  >
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-stone-200 flex-shrink-0">
                        <img src={proj.image} className="w-full h-full object-cover" />
                      </div>
                      <div className="truncate">
                        <h4 className="font-serif text-[#1B2616] truncate">{proj.title}</h4>
                        <p className="text-[10px] uppercase tracking-widest opacity-40 font-bold">{proj.location}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Detail Editor */}
            <div className="flex-1 bg-white overflow-y-auto p-12">
              {editingProjectId ? (
                <div className="max-w-4xl mx-auto space-y-12 animate-fade-in-up">
                  {portfolio.find(p => p.id === editingProjectId) && (() => {
                    const proj = portfolio.find(p => p.id === editingProjectId)!;
                    return (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                          <div className="space-y-8">
                             <div>
                                <label className="text-[9px] uppercase tracking-widest font-bold opacity-40 block mb-2">Project Title</label>
                                <input 
                                  value={proj.title}
                                  onChange={(e) => updateProject(proj.id, { title: e.target.value })}
                                  className="w-full text-3xl font-serif text-[#1B2616] bg-transparent border-b border-[#1B2616]/10 py-2 focus:ring-0 focus:border-[#1B2616]"
                                />
                             </div>
                             <div>
                                <label className="text-[9px] uppercase tracking-widest font-bold opacity-40 block mb-2">Location</label>
                                <input 
                                  value={proj.location}
                                  onChange={(e) => updateProject(proj.id, { location: e.target.value })}
                                  className="w-full text-sm font-bold uppercase tracking-widest text-[#4A5B63] bg-transparent border-b border-[#1B2616]/10 py-2 focus:ring-0 focus:border-[#1B2616]"
                                />
                             </div>
                             <div>
                                <label className="text-[9px] uppercase tracking-widest font-bold opacity-40 block mb-2">Primary Narrative</label>
                                <textarea 
                                  value={proj.description}
                                  onChange={(e) => updateProject(proj.id, { description: e.target.value })}
                                  rows={6}
                                  className="w-full text-sm font-light leading-relaxed text-[#1B2616] border border-[#1B2616]/10 p-6 bg-[#F9F9F7] resize-none"
                                />
                             </div>
                             <div>
                                <label className="text-[9px] uppercase tracking-widest font-bold opacity-40 block mb-2">Technical Scope</label>
                                <input 
                                  value={proj.scope}
                                  onChange={(e) => updateProject(proj.id, { scope: e.target.value })}
                                  className="w-full text-xs font-light text-[#1B2616] border border-[#1B2616]/10 p-4 bg-[#F9F9F7]"
                                />
                             </div>
                          </div>

                          <div className="space-y-8">
                            <div className="space-y-4">
                              <label className="text-[9px] uppercase tracking-widest font-bold opacity-40 block">Main Image</label>
                              <div className="aspect-square bg-stone-100 border border-[#1B2616]/10 overflow-hidden">
                                <img src={proj.image} className="w-full h-full object-cover" />
                              </div>
                              <input 
                                value={proj.image}
                                onChange={(e) => updateProject(proj.id, { image: e.target.value })}
                                placeholder="Image URL"
                                className="w-full text-[10px] font-mono p-3 bg-stone-50 border border-[#1B2616]/10"
                              />
                            </div>
                            
                            <div className="space-y-4">
                               <div className="flex justify-between items-center">
                                 <label className="text-[9px] uppercase tracking-widest font-bold opacity-40">Materials Used</label>
                                 <button onClick={() => addMaterial(proj.id)} className="text-[9px] font-bold text-[#1B2616] uppercase hover:underline">+ Add</button>
                               </div>
                               <div className="flex flex-wrap gap-2">
                                 {proj.materials?.map((m, idx) => (
                                   <div key={idx} className="flex items-center bg-[#F2F4F0] px-3 py-1 gap-2 border border-[#1B2616]/5">
                                      <input 
                                        value={m}
                                        onChange={(e) => {
                                          const nm = [...(proj.materials || [])];
                                          nm[idx] = e.target.value;
                                          updateProject(proj.id, { materials: nm });
                                        }}
                                        className="text-[9px] font-bold uppercase tracking-widest bg-transparent border-none p-0 w-24"
                                      />
                                      <button onClick={() => updateProject(proj.id, { materials: proj.materials?.filter((_, i) => i !== idx) })} className="text-red-800">×</button>
                                   </div>
                                 ))}
                               </div>
                            </div>
                          </div>
                        </div>

                        {/* Gallery Section */}
                        <div className="pt-12 border-t border-[#1B2616]/10 space-y-6">
                           <div className="flex justify-between items-center">
                              <h3 className="text-xs uppercase tracking-[0.4em] font-bold text-[#4A5B63]">Project Study Gallery</h3>
                              <button onClick={() => addGalleryImage(proj.id)} className="px-6 py-2 bg-[#1B2616] text-white text-[9px] uppercase tracking-widest font-bold">+ Add Gallery Photo</button>
                           </div>
                           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              {proj.gallery?.map((img, idx) => (
                                <div key={idx} className="group relative aspect-square bg-stone-100 border border-[#1B2616]/10 overflow-hidden">
                                   <img src={img} className="w-full h-full object-cover" />
                                   <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col p-4">
                                      <textarea 
                                        value={img}
                                        onChange={(e) => {
                                          const ng = [...(proj.gallery || [])];
                                          ng[idx] = e.target.value;
                                          updateProject(proj.id, { gallery: ng });
                                        }}
                                        className="w-full flex-1 bg-transparent text-[8px] text-white border-none font-mono resize-none focus:ring-0 p-0"
                                      />
                                      <button 
                                        onClick={() => updateProject(proj.id, { gallery: proj.gallery?.filter((_, i) => i !== idx) })}
                                        className="text-red-400 text-[8px] font-bold uppercase mt-2 hover:underline"
                                      >
                                        Remove
                                      </button>
                                   </div>
                                </div>
                              ))}
                           </div>
                        </div>

                        <div className="pt-12 border-t border-[#1B2616]/10 flex justify-between">
                           <button 
                             onClick={() => {
                               if (confirm('Archive this project and remove it from the public portfolio?')) {
                                 setPortfolio(portfolio.filter(p => p.id !== proj.id));
                                 setEditingProjectId(null);
                               }
                             }}
                             className="text-red-800 text-[10px] uppercase tracking-[0.3em] font-bold hover:underline"
                           >
                             Archive Project
                           </button>
                           <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#4A5B63]/40 italic">Syncing to vault...</p>
                        </div>
                      </>
                    )
                  })()}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-30">
                   <svg className="w-16 h-16 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                   <p className="font-serif italic text-xl">Select an estate to begin curation.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'journal' && (
          <div className="flex-1 flex overflow-hidden">
            <div className="w-[400px] border-r border-[#1B2616]/5 bg-white flex flex-col">
              <div className="p-8 border-b border-[#1B2616]/5 flex justify-between items-center">
                <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-[#1B2616]">Field Note Archives</h2>
                <button 
                  onClick={addJournalEntry}
                  className="w-8 h-8 rounded-full bg-[#1B2616] text-white flex items-center justify-center hover:scale-110 transition-transform"
                >
                  +
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                {journal.map(article => (
                  <button
                    key={article.id}
                    onClick={() => setEditingArticleId(article.id)}
                    className={`w-full text-left p-6 border-b border-[#1B2616]/5 transition-all ${editingArticleId === article.id ? 'bg-[#F2F4F0] border-l-4 border-l-[#1B2616]' : 'hover:bg-[#F9F9F7]'}`}
                  >
                    <span className="text-[9px] uppercase tracking-widest font-bold opacity-40 block mb-1">{article.date}</span>
                    <h4 className="font-serif text-[#1B2616] truncate">{article.title}</h4>
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-1 bg-white overflow-y-auto p-12">
              {editingArticleId ? (
                <div className="max-w-3xl mx-auto space-y-12">
                  {journal.find(a => a.id === editingArticleId) && (() => {
                    const art = journal.find(a => a.id === editingArticleId)!;
                    return (
                      <div className="space-y-8">
                         <input 
                            value={art.title}
                            onChange={(e) => updateArticle(art.id, { title: e.target.value })}
                            className="w-full text-4xl font-serif text-[#1B2616] border-none p-0 focus:ring-0"
                         />
                         <textarea 
                            value={art.content}
                            onChange={(e) => updateArticle(art.id, { content: e.target.value })}
                            rows={15}
                            className="w-full text-base font-light leading-relaxed border border-[#1B2616]/10 p-8 focus:border-[#1B2616] outline-none"
                         />
                      </div>
                    )
                  })()}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center opacity-30">
                  <p className="font-serif italic text-xl">Select a note to begin editorial stewardship.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Traditional Dashboard / Inquiries */}
        {activeTab === 'dashboard' && (
          <div className="p-12 max-w-6xl animate-fade-in-up">
            <h3 className="text-xs uppercase tracking-[0.4em] font-bold text-[#4A5B63] mb-8">Inquiry Registry</h3>
            <div className="bg-white border border-[#1B2616]/5 shadow-sm overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-[#1B2616] text-white text-[10px] uppercase tracking-widest">
                  <tr>
                    <th className="p-6 font-semibold">Date</th>
                    <th className="p-6 font-semibold">Sender</th>
                    <th className="p-6 font-semibold">Location</th>
                    <th className="p-6 font-semibold">Service</th>
                    <th className="p-6 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {inquiries.map(inq => (
                    <tr key={inq.id} className="border-b border-[#1B2616]/5 hover:bg-[#F2F4F0] transition-colors">
                      <td className="p-6 text-[10px] font-bold opacity-40">{new Date(inq.date).toLocaleDateString()}</td>
                      <td className="p-6 font-semibold text-[#1B2616]">{inq.name}<br/><span className="text-xs font-normal opacity-60">{inq.email}</span></td>
                      <td className="p-6 opacity-60">{inq.location}</td>
                      <td className="p-6"><span className="px-3 py-1 bg-[#D9D4CC] text-[9px] font-bold uppercase tracking-widest rounded-full">{inq.service}</span></td>
                      <td className="p-6">
                        <button onClick={() => setInquiries(inquiries.filter(i => i.id !== inq.id))} className="text-red-800 hover:underline text-[10px] font-bold uppercase tracking-widest">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
