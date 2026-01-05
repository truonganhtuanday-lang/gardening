
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Service, Inquiry } from '../types';

interface BookingFormProps {
  services?: Service[];
  onInquirySubmit?: (inquiry: Omit<Inquiry, 'id' | 'date' | 'status'>) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ services = [], onInquirySubmit }) => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const sectionRef = useScrollReveal();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('submitting');

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      location: formData.get('location') as string,
      service: formData.get('service') as string,
      vision: formData.get('vision') as string,
    };

    if (onInquirySubmit) {
      onInquirySubmit(payload);
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setFormState('success');
    } catch (error) {
      console.error('Submission error:', error);
      setFormState('idle');
      alert('There was an error sending your inquiry.');
    }
  };

  return (
    <section id="booking" ref={sectionRef as any} className="py-32 px-6 md:px-12 bg-[#F2F4F0]">
      <div className="max-w-4xl mx-auto bg-white p-12 md:p-24 shadow-2xl relative overflow-hidden reveal reveal-up">
        {formState === 'success' ? (
          <div className="text-center animate-fade-in-up">
            <div className="w-16 h-16 bg-[#1B2616] text-white rounded-full flex items-center justify-center mx-auto mb-8">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h2 className="text-4xl font-serif text-[#1B2616] mb-6">Inquiry Received</h2>
            <p className="text-[#1B2616]/70 mb-8 font-light leading-relaxed">
              Thank you for considering Josh Jones Gardening. Your project details have been sent to our lead consultant.
            </p>
            <button 
                onClick={() => setFormState('idle')}
                className="text-xs font-bold uppercase tracking-widest underline underline-offset-8 hover:text-[#4A5B63] transition-colors"
            >
                Send another message
            </button>
          </div>
        ) : (
          <>
            <div className="mb-16">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#4A5B63] mb-4 block">Consultation</span>
              <h2 className="text-4xl md:text-5xl font-serif text-[#1B2616] mb-6">Begin Your Project</h2>
              <p className="text-[#1B2616]/70 font-light">
                To ensure the highest quality of service, we accept a limited number of new projects each season. 
              </p>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest font-semibold text-[#1B2616]/40">Full Name</label>
                <input required name="name" type="text" className="bg-transparent border-b border-[#1B2616]/20 py-3 focus:border-[#1B2616] outline-none transition-colors" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest font-semibold text-[#1B2616]/40">Email Address</label>
                <input required name="email" type="email" className="bg-transparent border-b border-[#1B2616]/20 py-3 focus:border-[#1B2616] outline-none transition-colors" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest font-semibold text-[#1B2616]/40">Location</label>
                <input required name="location" type="text" className="bg-transparent border-b border-[#1B2616]/20 py-3 focus:border-[#1B2616] outline-none transition-colors" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest font-semibold text-[#1B2616]/40">Service Interested In</label>
                <select name="service" className="bg-transparent border-b border-[#1B2616]/20 py-3 focus:border-[#1B2616] outline-none transition-colors appearance-none cursor-pointer">
                  {services.map((s) => (
                    <option key={s.id} value={s.name}>{s.name}</option>
                  ))}
                  <option value="other">Other Inquiry</option>
                </select>
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-xs uppercase tracking-widest font-semibold text-[#1B2616]/40">Project Vision</label>
                <textarea name="vision" rows={4} className="bg-transparent border-b border-[#1B2616]/20 py-3 focus:border-[#1B2616] outline-none transition-colors resize-none" placeholder="Tell us about your garden goals..."></textarea>
              </div>
              <div className="md:col-span-2 pt-6">
                <button 
                  type="submit"
                  disabled={formState === 'submitting'}
                  className="w-full py-5 bg-[#1B2616] text-white uppercase tracking-[0.2em] text-sm font-semibold hover:bg-[#2c3d25] transition-all duration-300 disabled:opacity-50 group flex items-center justify-center gap-3"
                >
                  {formState === 'submitting' ? 'Processing...' : 'Send Inquiry'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </section>
  );
};

export default BookingForm;
