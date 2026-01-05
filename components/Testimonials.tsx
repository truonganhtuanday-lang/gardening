
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { TESTIMONIALS } from '../constants';

interface TestimonialsProps {
  content?: any;
}

const Testimonials: React.FC<TestimonialsProps> = ({ content }) => {
  return (
    <section id="testimonials" className="py-32 px-6 md:px-12 bg-white">
      <div className="max-w-[1800px] mx-auto text-center">
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#4A5B63] mb-4 block">Testimonials</span>
        <h2 className="text-4xl md:text-6xl font-serif text-[#1B2616] mb-24">Voices of Trust</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="flex flex-col items-center">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-[#D9D4CC] mb-8">
                <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C20.1216 16 21.017 15.1046 21.017 14V9C21.017 7.89543 20.1216 7 19.017 7H14.017C12.9124 7 12.017 7.89543 12.017 9V14C12.017 16.3912 12.6682 18.2323 14.017 21Z" fill="currentColor"/>
                <path d="M4.01703 21L4.01703 18C4.01703 16.8954 4.91246 16 6.01703 16H9.01703C10.1216 16 11.017 15.1046 11.017 14V9C11.017 7.89543 10.1216 7 9.01703 7H4.01703C2.91246 7 2.01703 7.89543 2.01703 9V14C2.01703 16.3912 2.66823 18.2323 4.01703 21Z" fill="currentColor"/>
              </svg>
              <p className="text-2xl md:text-3xl font-serif text-[#1B2616] italic leading-relaxed mb-8 max-w-xl">
                "{t.text}"
              </p>
              <div>
                <span className="block font-semibold uppercase tracking-widest text-[#1B2616]">{t.author}</span>
                <span className="text-xs uppercase tracking-widest text-[#4A5B63] opacity-60">{t.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
