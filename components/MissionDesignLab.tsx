import React, { useState } from 'react';

// --- SHARED DATA ---
const missionData = {
   statement: "Aeris exists to make field decisions faster, safer, and smarter.",
   subtext: "When seconds matter and infrastructure fails, we provide the unified operating picture.",
   vision: "A world where no rescue team, inspector, or operator works without real-time situational awareness.",
   principles: [
      { title: "Reliability > Novelty", desc: "Works when the internet is dead." },
      { title: "Operator-First", desc: "One map. Prioritized alerts." },
      { title: "Safety By Design", desc: "Reduce human exposure." },
      { title: "Edge-Native", desc: "The swarm is the server." },
      { title: "Repeatable", desc: "Standardized surveys, consistent paths." }
   ],
   useCases: [
      { title: "Disaster Response", desc: "Rapid deployment in chaotic environments." },
      { title: "Infra Inspection", desc: "Automated threat detection at scale." },
      { title: "Precision Ag", desc: "Crop health and yield optimization." }
   ]
};

// --- VARIATION 1: THE MONOLITH (Heavy, Brutalist, Corporate) ---
const VariationMonolith: React.FC = () => {
   return (
      <section className="bg-[#F4F4F4] text-black min-h-screen border-b-8 border-black font-sans relative">
         <div className="absolute top-4 right-4 font-mono text-xs border border-black px-2 py-1">VAR_01: MONOLITH</div>

         {/* Massive Header */}
         <div className="pt-32 pb-16 px-6 md:px-12 border-b-2 border-black">
            <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-[0.85] mb-8">
               Mission<br />
               Critical<span className="text-brutal-accent">.</span>
            </h1>
            <div className="flex flex-col md:flex-row gap-12 items-start">
               <p className="text-2xl md:text-3xl font-bold max-w-2xl leading-tight">
                  {missionData.statement}
               </p>
               <div className="font-mono text-sm max-w-xs border-l-4 border-black pl-4">
                  {missionData.vision}
               </div>
            </div>
         </div>

         {/* Grid of Power */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-b-2 border-black">
            <div className="bg-black text-white p-8 flex flex-col justify-center border-r border-white/20">
               <h3 className="font-mono text-xl mb-2 text-brutal-accent">// CORE PROMISE</h3>
               <p className="text-sm text-gray-400">Non-negotiable operating standards.</p>
            </div>
            {missionData.principles.slice(0, 3).map((p, i) => (
               <div key={i} className="p-8 border-r-2 border-black hover:bg-brutal-accent hover:text-white transition-all group">
                  <span className="font-mono text-xs opacity-50 mb-4 block">0{i + 1}</span>
                  <h4 className="text-xl font-black uppercase mb-2">{p.title}</h4>
                  <p className="font-mono text-sm leading-tight group-hover:text-black">{p.desc}</p>
               </div>
            ))}
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <div className="hidden lg:block bg-black border-r border-white/20"></div> {/* Spacer */}
            {missionData.principles.slice(3, 5).map((p, i) => (
               <div key={i} className="p-8 border-r-2 border-black hover:bg-brutal-accent hover:text-white transition-all group">
                  <span className="font-mono text-xs opacity-50 mb-4 block">0{i + 4}</span>
                  <h4 className="text-xl font-black uppercase mb-2">{p.title}</h4>
                  <p className="font-mono text-sm leading-tight group-hover:text-black">{p.desc}</p>
               </div>
            ))}
            <div className="p-8 bg-black text-white flex items-center justify-center">
               <span className="font-mono text-brutal-accent animate-pulse">SYSTEM_ACTIVE</span>
            </div>
         </div>
      </section>
   );
};


// --- VARIATION 2: THE HUD (Tactical, Dark, Data-Dense) ---
const VariationHUD: React.FC = () => {
   return (
      <section className="bg-black text-white min-h-screen font-mono relative overflow-hidden border-b border-gray-800">
         <div className="absolute top-4 right-4 text-xs text-green-500 border border-green-900 px-2 py-1">VAR_02: TACTICAL_HUD</div>

         {/* Grid Background */}
         <div className="absolute inset-0 bg-[linear-gradient(rgba(0,50,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,50,0,0.1)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

         <div className="container mx-auto px-6 py-24 relative z-10">

            {/* Main Display */}
            <div className="flex flex-col lg:flex-row gap-16 mb-24">
               <div className="lg:w-2/3">
                  <div className="flex items-center gap-2 mb-4 text-green-500">
                     <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                     <span className="text-xs tracking-widest uppercase">Live Feed</span>
                  </div>
                  <h2 className="font-sans text-5xl md:text-7xl font-bold uppercase leading-none mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                     {missionData.statement}
                  </h2>
                  <p className="text-xl text-gray-400 font-light border-l border-green-500/50 pl-6">
                     {missionData.subtext}
                  </p>
               </div>
               <div className="lg:w-1/3 border border-gray-800 bg-gray-900/50 p-6 backdrop-blur-md">
                  <h3 className="text-xs text-gray-500 uppercase tracking-widest mb-6 border-b border-gray-800 pb-2">Deployment Vectors</h3>
                  <ul className="space-y-4">
                     {missionData.useCases.map((u, i) => (
                        <li key={i} className="flex justify-between items-center group cursor-pointer">
                           <span className="text-sm font-bold group-hover:text-green-400 transition-colors">[{u.title}]</span>
                           <span className="text-[10px] text-gray-600 group-hover:text-green-500">STATUS: READY</span>
                        </li>
                     ))}
                  </ul>
               </div>
            </div>

            {/* Principles Ticker */}
            <div className="border-t border-b border-gray-800 py-8">
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {missionData.principles.map((p, i) => (
                     <div key={i} className="flex gap-4 items-start">
                        <span className="text-green-600 font-bold text-lg">/0{i + 1}</span>
                        <div>
                           <h4 className="text-sm font-bold uppercase text-white mb-1">{p.title}</h4>
                           <p className="text-xs text-gray-500">{p.desc}</p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

         </div>
      </section>
   );
};


// --- VARIATION 3: THE MANIFESTO (Editorial, Clean, Swiss) ---
const VariationManifesto: React.FC = () => {
   return (
      <section className="bg-white text-black min-h-screen font-sans flex flex-col relative">
         <div className="absolute top-4 right-4 font-mono text-xs bg-black text-white px-2 py-1">VAR_03: MANIFESTO</div>

         <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 h-full">

            {/* Left: The "Why" */}
            <div className="lg:col-span-7 p-12 md:p-24 flex flex-col justify-center border-r border-gray-100">
               <h2 className="text-4xl md:text-6xl font-medium tracking-tight leading-[1.1] mb-12">
                  "We build for the moments when the map is blank and the comms are down."
               </h2>
               <div className="space-y-8 max-w-lg">
                  <p className="text-lg text-gray-600 leading-relaxed">
                     {missionData.statement} {missionData.subtext}
                  </p>
                  <a href="#" className="inline-block text-sm font-bold border-b-2 border-black pb-1 uppercase tracking-widest hover:text-brutal-accent hover:border-brutal-accent transition-colors">
                     Read Our Full Strategy
                  </a>
               </div>
            </div>

            {/* Right: The "How" */}
            <div className="lg:col-span-5 bg-gray-50 p-12 md:p-24 flex flex-col justify-center">
               <h3 className="font-mono text-xs uppercase tracking-widest text-gray-400 mb-12">Operating Principles</h3>
               <ul className="space-y-12">
                  {missionData.principles.map((p, i) => (
                     <li key={i} className="group cursor-default">
                        <h4 className="text-2xl font-bold mb-2 group-hover:text-brutal-accent transition-colors">{p.title}</h4>
                        <p className="text-gray-500 font-serif italic text-lg">{p.desc}</p>
                     </li>
                  ))}
               </ul>
            </div>
         </div>

         {/* Bottom Bar: Use Cases */}
         <div className="border-t border-gray-200 bg-white p-8">
            <div className="flex flex-wrap justify-between items-center gap-6">
               <span className="font-mono text-xs uppercase text-gray-400">Deployed In:</span>
               {missionData.useCases.map((u, i) => (
                  <span key={i} className="text-sm font-medium hover:underline cursor-pointer">{u.title}</span>
               ))}
            </div>
         </div>
      </section>
   );
};

const MissionDesignLab: React.FC = () => {
   return (
      <div className="bg-gray-200 min-h-screen pb-24">
         <div className="bg-brutal-accent text-black p-4 text-center font-mono text-sm font-bold sticky top-0 z-50">
            DESIGN LAB. SCROLL TO VIEW CONCEPTS
         </div>

         <VariationMonolith />
         <VariationHUD />
         <VariationManifesto />

         <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-3 rounded-full shadow-2xl z-50 flex gap-4 font-mono text-xs">
            <span>&uarr; &darr; SCROLL TO COMPARE</span>
         </div>
      </div>
   );
};

export default MissionDesignLab;
