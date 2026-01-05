
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
import AdminDashboard from './components/AdminDashboard';
import { ViewState, JournalArticle, Service, PortfolioProject, EstimateSettings, Inquiry, HomeContent } from './types';
import { SERVICES as INITIAL_SERVICES, PORTFOLIO as INITIAL_PORTFOLIO, JOURNAL_ARTICLES as INITIAL_JOURNAL, INITIAL_ESTIMATE_SETTINGS, INITIAL_AI_INSTRUCTIONS, INITIAL_HOME_CONTENT } from './constants';

const STORAGE_KEY = 'jjg_cms_data';

function App() {
  const [view, setView] = useState<ViewState>({ type: 'home' });
  
  // CMS Dynamic State
  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);
  const [portfolio, setPortfolio] = useState<PortfolioProject[]>(INITIAL_PORTFOLIO);
  const [journalArticles, setJournalArticles] = useState<JournalArticle[]>(INITIAL_JOURNAL);
  const [estimateSettings, setEstimateSettings] = useState<EstimateSettings>(INITIAL_ESTIMATE_SETTINGS);
  const [aiInstructions, setAiInstructions] = useState<string>(INITIAL_AI_INSTRUCTIONS);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [homeContent, setHomeContent] = useState<HomeContent>(INITIAL_HOME_CONTENT);

  // Load Persisted Data
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.services) setServices(data.services);
        if (data.portfolio) setPortfolio(data.portfolio);
        if (data.journal) setJournalArticles(data.journal);
        if (data.inquiries) setInquiries(data.inquiries);
        if (data.aiInstructions) setAiInstructions(data.aiInstructions);
        if (data.homeContent) setHomeContent(data.homeContent);
      } catch (e) {
        console.error("Failed to load CMS data", e);
      }
    }
  }, []);

  // Save to LocalStorage on Change
  useEffect(() => {
    const data = {
      services,
      portfolio,
      journal: journalArticles,
      inquiries,
      aiInstructions,
      homeContent
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [services, portfolio, journalArticles, inquiries, aiInstructions, homeContent]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement> | null, targetId: string) => {
    if (e) e.preventDefault();
    
    if (targetId === 'admin') {
      setView({ type: 'admin', tab: 'dashboard' });
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

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
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  // Inquiry Handler
  const addInquiry = (inquiry: Omit<Inquiry, 'id' | 'date' | 'status'>) => {
    const newInquiry: Inquiry = {
      ...inquiry,
      id: Math.random().toString(36).substr(2, 9),
      date: Date.now(),
      status: 'new'
    };
    setInquiries(prev => [newInquiry, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#F2F4F0] font-sans text-[#1B2616] selection:bg-[#D9D4CC]">
      {view.type !== 'admin' && <Navbar onNavClick={handleNavClick} />}
      
      <main>
        {view.type === 'home' && (
          <>
            <Hero content={homeContent.hero} />
            <Services services={services} />
            <About content={homeContent.about} />
            <EstimateTool services={services} settings={estimateSettings} />
            <Portfolio portfolio={portfolio} onProjectClick={handleProjectClick} />
            <Journal articles={journalArticles} onArticleClick={handleArticleClick} onViewAll={() => setView({ type: 'journal-index' })} />
            <Testimonials content={homeContent.testimonials} />
            <BookingForm services={services} onInquirySubmit={addInquiry} />
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

        {view.type === 'admin' && (
          <AdminDashboard 
            services={services} 
            setServices={setServices}
            portfolio={portfolio}
            setPortfolio={setPortfolio}
            journal={journalArticles}
            setJournal={setJournalArticles}
            inquiries={inquiries}
            setInquiries={setInquiries}
            aiInstructions={aiInstructions}
            setAiInstructions={setAiInstructions}
            homeContent={homeContent}
            setHomeContent={setHomeContent}
            onExit={handleBackToHome}
          />
        )}
      </main>

      {view.type !== 'admin' && <Footer onLinkClick={handleNavClick} />}
      {view.type !== 'admin' && <Assistant systemInstruction={aiInstructions} />}
    </div>
  );
}

export default App;
