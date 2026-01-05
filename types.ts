
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export interface Service {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  features: string[];
  ratePerSqFt: number;
}

export interface MultiplierOption {
  id: string;
  label: string;
  multiplier: number;
}

export interface EstimateSettings {
  minBuffer: number;
  maxBuffer: number;
  terrains: MultiplierOption[];
  conditions: MultiplierOption[];
  atmospheres: MultiplierOption[];
}

export interface PortfolioProject {
  id: string;
  title: string;
  location: string;
  description: string;
  image: string;
  scope?: string;
  materials?: string[];
  gallery?: string[];
}

export interface Testimonial {
  id: string;
  author: string;
  location: string;
  text: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface JournalArticle {
  id: string;
  title: string;
  date: string;
  image: string;
  excerpt: string;
  content: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  location: string;
  service: string;
  vision: string;
  date: number;
  status: 'new' | 'read' | 'archived';
}

export type AdminTab = 'dashboard' | 'services' | 'portfolio' | 'journal' | 'inquiries' | 'settings' | 'visual';

export type ViewState = 
  | { type: 'home' }
  | { type: 'project', project: PortfolioProject }
  | { type: 'article', article: JournalArticle }
  | { type: 'journal-index' }
  | { type: 'admin', tab: AdminTab };

export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  description: string;
  longDescription?: string;
  features: string[];
}

export interface EstimateParams {
  size: string;
  service: string;
  condition: string;
  atmosphere: string;
}

export interface EstimateResult {
  range: string;
  consultantNote: string;
  considerations: string[];
}

export interface SiteAnalysisResult extends EstimateResult {
  detectedFeatures: string[];
  terrainAssessment: string;
}

/** Added HomeContent for dynamic section management */
export interface HomeContent {
  hero: {
    title: string;
    subtitle: string;
    image: string;
  };
  about: {
    tagline: string;
    title: string;
    p1: string;
  };
  testimonials: any;
}
