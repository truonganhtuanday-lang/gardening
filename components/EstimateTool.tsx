/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useMemo } from 'react';
import { Service, EstimateSettings } from '../types';

interface EstimateToolProps {
  services: Service[];
  settings: EstimateSettings;
}

const EstimateTool: React.FC<EstimateToolProps> = ({ services, settings }) => {
  const [size, setSize] = useState(500);
  const [serviceId, setServiceId] = useState<string>(services[0]?.id || '');
  const [terrainId, setTerrainId] = useState<string>(settings.terrains[0]?.id || 'level');
  const [conditionId, setConditionId] = useState<string>(settings.conditions[0]?.id || 'cleared');
  const [atmosphereId, setAtmosphereId] = useState<string>(settings.atmospheres[0]?.id || 'minimal');

  const currentService = useMemo(() => 
    services.find(s => s.id === serviceId) || services[0]
  , [serviceId, services]);

  const currentTerrain = useMemo(() => 
    settings.terrains.find(t => t.id === terrainId) || settings.terrains[0]
  , [terrainId, settings]);

  const currentCondition = useMemo(() => 
    settings.conditions.find(c => c.id === conditionId) || settings.conditions[0]
  , [conditionId, settings]);

  const currentAtmosphere = useMemo(() => 
    settings.atmospheres.find(a => a.id === atmosphereId) || settings.atmospheres[0]
  , [atmosphereId, settings]);

  const calculation = useMemo(() => {
    const rate = currentService?.ratePerSqFt || 0;
    const basePrice = size * rate;
    
    // Aggregate multipliers
    const tMultiplier = currentTerrain?.multiplier || 1;
    const cMultiplier = currentCondition?.multiplier || 1;
    const aMultiplier = currentAtmosphere?.multiplier || 1;
    
    const finalPrice = basePrice * tMultiplier * cMultiplier * aMultiplier;
    
    const min = Math.round(finalPrice * settings.minBuffer);
    const max = Math.round(finalPrice * settings.maxBuffer);
    
    return {
      min: min.toLocaleString(),
      max: max.toLocaleString()
    };
  }, [size, currentService, currentTerrain, currentCondition, currentAtmosphere, settings]);

  if (!services.length || !settings.terrains.length) return null;

  return (
    <section id="estimate" className="py-32 bg-[#1B2616] text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
          </pattern>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-[1800px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          
          <div className="space-y-12">
            <div>
              <span className="text-white/40 uppercase tracking-[0.5em] text-[10px] font-bold mb-6 block">Investment Concierge</span>
              <h2 className="text-4xl md:text-6xl font-light font-serif leading-tight">Plan Your <br /><span className="italic text-white/80">Sanctuary.</span></h2>
            </div>

            <div className="space-y-10">
              {/* Scale */}
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-60">Property Scale (SQ FT)</label>
                  <span className="font-serif text-2xl">{size.toLocaleString()} <span className="text-sm opacity-50">ft²</span></span>
                </div>
                <input 
                  type="range" min="50" max="5000" step="50" value={size} 
                  onChange={(e) => setSize(parseInt(e.target.value))}
                  className="w-full h-[2px] bg-white/20 appearance-none cursor-pointer accent-white"
                />
              </div>

              {/* Services */}
              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-60">Service Intensity</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {services.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setServiceId(s.id)}
                      className={`px-4 py-4 text-[9px] text-left uppercase tracking-[0.2em] font-bold border transition-all duration-500 ${
                        serviceId === s.id ? 'bg-white text-[#1B2616] border-white' : 'border-white/20 hover:border-white/50'
                      }`}
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Site Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-4">
                  {/* Terrain */}
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-60">Site Terrain</label>
                    <div className="space-y-3">
                      {settings.terrains.map((tr) => (
                        <button key={tr.id} onClick={() => setTerrainId(tr.id)} className="flex items-center space-x-3 group w-full text-left">
                          <div className={`w-3 h-3 rounded-full border flex items-center justify-center transition-all ${terrainId === tr.id ? 'bg-white border-white' : 'border-white/30 group-hover:border-white'}`}>
                            {terrainId === tr.id && <div className="w-1 h-1 rounded-full bg-[#1B2616]"></div>}
                          </div>
                          <span className={`text-[10px] uppercase tracking-widest font-bold transition-opacity ${terrainId === tr.id ? 'opacity-100' : 'opacity-40'}`}>{tr.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Condition */}
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-60">Existing Condition</label>
                    <div className="space-y-3">
                      {settings.conditions.map((co) => (
                        <button key={co.id} onClick={() => setConditionId(co.id)} className="flex items-center space-x-3 group w-full text-left">
                          <div className={`w-3 h-3 rounded-full border flex items-center justify-center transition-all ${conditionId === co.id ? 'bg-white border-white' : 'border-white/30 group-hover:border-white'}`}>
                            {conditionId === co.id && <div className="w-1 h-1 rounded-full bg-[#1B2616]"></div>}
                          </div>
                          <span className={`text-[10px] uppercase tracking-widest font-bold transition-opacity ${conditionId === co.id ? 'opacity-100' : 'opacity-40'}`}>{co.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
              </div>

              {/* Atmosphere */}
              <div className="space-y-4 pt-4">
                <label className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-60">Aesthetic Atmosphere</label>
                <div className="flex flex-wrap gap-6">
                  {settings.atmospheres.map((at) => (
                    <button key={at.id} onClick={() => setAtmosphereId(at.id)} className="flex items-center space-x-3 group">
                      <div className={`w-3 h-3 rounded-full border flex items-center justify-center transition-all ${atmosphereId === at.id ? 'bg-white border-white' : 'border-white/30 group-hover:border-white'}`}>
                        {atmosphereId === at.id && <div className="w-1 h-1 rounded-full bg-[#1B2616]"></div>}
                      </div>
                      <span className={`text-[10px] uppercase tracking-widest font-bold transition-opacity ${atmosphereId === at.id ? 'opacity-100' : 'opacity-40'}`}>{at.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Price Output */}
          <div className="relative group">
            <div className="absolute -inset-4 border border-white/5 pointer-events-none rounded-sm"></div>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-12 md:p-16 text-center space-y-10 relative">
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.5em] text-white/40 font-bold block">Estimated Investment (CAD)</span>
                <div className="flex flex-col items-center">
                   <span className="text-4xl md:text-6xl lg:text-7xl font-serif font-light transition-all duration-500">
                    ${calculation.min}
                   </span>
                   <div className="h-10 w-[1px] bg-white/20 my-4"></div>
                   <span className="text-4xl md:text-6xl lg:text-7xl font-serif font-light opacity-60 transition-all duration-500">
                    ${calculation.max}
                   </span>
                </div>
              </div>
              <div className="pt-8">
                <p className="text-[10px] text-white/50 italic font-light mb-8 max-w-[300px] mx-auto leading-relaxed">
                  *Figures provided are professional estimates for high-quality craftsmanship in the North Shore region. Final quotes require a physical site assessment.
                </p>
                <a 
                  href="#booking" 
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-block bg-white text-[#1B2616] px-12 py-6 text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-stone-100 transition-all shadow-2xl"
                >
                  Confirm Your Estimate
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EstimateTool;
