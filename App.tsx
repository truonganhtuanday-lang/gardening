
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Portfolio from './components/Portfolio';
import PortfolioDetail from './components/PortfolioDetail';
import Testimonials from './components/Testimonials';
import BookingForm from './components/BookingForm';
import Assistant from './components/Assistant';
import EstimateTool from './components/EstimateTool';
import Footer from './components/Footer';
import Journal from './components/Journal';
import JournalIndex from './components/JournalIndex';
import JournalDetail from './components/JournalDetail';
import { ViewState, JournalArticle, Service, PortfolioProject, EstimateSettings } from './types';
import { SERVICES as INITIAL_SERVICES, PORTFOLIO as INITIAL_PORTFOLIO, JOURNAL_ARTICLES as INITIAL_JOURNAL, INITIAL_ESTIMATE_SETTINGS, INITIAL_AI_INSTRUCTIONS } from './constants';

function App() {
  const [view, setView] = useState<ViewState>({ type: 'home' });
  
  // Content State (Initialized with constants, ready for future WordPress integration)
  const [services] = useState<Service[]>(INITIAL_SERVICES);
  const [portfolio] = useState<PortfolioProject[]>(INITIAL_PORTFOLIO);
  const [journalArticles] = useState<JournalArticle[]>(INITIAL_JOURNAL);
  const [estimateSettings] = useState<EstimateSettings>(INITIAL_ESTIMATE_SETTINGS);
  const [aiInstructions] = useState<string>(INITIAL_AI_INSTRUCTIONS);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement> | null, targetId: string) => {
    if (e) e.preventDefault();
    
    // If user clicks "Journal" while not on home, show Index
    if (targetId === 'journal' && view.type !== 'home') {
      setView({ type: 'journal-index' });
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    if (view.type !== 'home') {
      setView({ type: 'home' });
      if (targetId) {
        setTimeout(() => scrollToSection(targetId), 10);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (targetId) {
      scrollToSection(targetId);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleArticleClick = (article: JournalArticle) => {
    setView({ type: 'article', article });
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleViewAllArticles = () => {
    setView({ type: 'journal-index' });
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleProjectClick = (project: PortfolioProject) => {
    setView({ type: 'project', project });
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleBackToHome = () => {
    setView({ type: 'home' });
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const scrollToSection = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 85;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F4F0] font-sans text-[#1B2616] selection:bg-[#D9D4CC]">
      <Navbar onNavClick={handleNavClick} />
      
      <main>
        {view.type === 'home' && (
          <>
            <Hero />
            <Services services={services} />
            <About />
            <EstimateTool services={services} settings={estimateSettings} />
            <Portfolio portfolio={portfolio} onProjectClick={handleProjectClick} />
            <Journal articles={journalArticles} onArticleClick={handleArticleClick} onViewAll={handleViewAllArticles} />
            <Testimonials />
            <BookingForm services={services} />
          </>
        )}

        {view.type === 'journal-index' && (
          <JournalIndex articles={journalArticles} onArticleClick={handleArticleClick} onBack={handleBackToHome} />
        )}

        {view.type === 'article' && (
          <JournalDetail 
            article={view.article} 
            allArticles={journalArticles}
            onArticleClick={handleArticleClick}
            onBack={handleBackToHome} 
          />
        )}

        {view.type === 'project' && (
          <PortfolioDetail project={view.project} onBack={handleBackToHome} />
        )}
      </main>

      <Footer onLinkClick={handleNavClick} />
      <Assistant systemInstruction={aiInstructions} />
    </div>
  );
}

export default App;
