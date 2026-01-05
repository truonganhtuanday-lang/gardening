
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { BRAND_NAME } from '../constants';

interface FooterProps {
  onLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onLinkClick }) => {
  return (
    <footer className="bg-[#1B2616] pt-24 pb-12 px-6 text-white/60">
      <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <h4 className="text-2xl font-serif text-white mb-6">{BRAND_NAME}</h4>
          <p className="max-w-xs font-light leading-relaxed mb-8">
            Elevating the Pacific Northwest landscape through artistry, ecological stewardship, and uncompromising quality.
          </p>
          <div className="flex gap-4">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-white/40">Instagram</span>
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-white/40">Pinterest</span>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-6 tracking-widest text-xs uppercase">Contact</h4>
          <ul className="space-y-4 text-sm font-light">
            <li>North Vancouver, BC</li>
            <li>hello@joshjonesgardening.ca</li>
            <li>+1 (604) 555-0192</li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold text-white mb-6 tracking-widest text-xs uppercase">Navigation</h4>
          <ul className="space-y-4 text-sm font-light">
            <li><a href="#services" onClick={(e) => onLinkClick(e, 'services')} className="hover:text-white transition-colors">Services</a></li>
            <li><a href="#portfolio" onClick={(e) => onLinkClick(e, 'portfolio')} className="hover:text-white transition-colors">Portfolio</a></li>
            <li><a href="#journal" onClick={(e) => onLinkClick(e, 'journal')} className="hover:text-white transition-colors">Journal</a></li>
            <li>
              <a 
                href="/admin" 
                onClick={(e) => onLinkClick(e, 'admin')} 
                className="opacity-40 hover:opacity-100 transition-opacity"
              >
                Management Studio
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-[0.3em] opacity-40">
        <p>© 2025 Josh Jones Gardening. All rights reserved.</p>
        <p>Expertly curated for the North Shore.</p>
      </div>
    </footer>
  );
};

export default Footer;
