import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="min-h-screen border-b border-brutal-line relative overflow-hidden" aria-label="AERIS Drones - Autonomous Field Intelligence">
      <div className="grid grid-cols-1 lg:grid-cols-12 h-full min-h-[90vh]">
        {/* Big Type Area */}
        <div className="lg:col-span-12 p-4 md:p-6 flex flex-col justify-end relative">
          <h1 className="font-sans font-black text-[15vw] md:text-giant leading-[0.8] tracking-tighter mb-4 -ml-1 md:-ml-2">
            <span className="sr-only">AERIS Drones - Autonomous Drone Swarm Technology for Field Intelligence</span>
            <span aria-hidden="true">AERIS <span className="text-brutal-accent">.</span></span>
          </h1>
          <p className="sr-only">AERIS builds autonomous drone swarm systems delivering real-time field intelligence through AI-powered edge processing. Our UAV technology serves defense, disaster response, and critical infrastructure monitoring with industry-leading swarm coordination.</p>
        </div>
      </div>

      {/* Marquee Strip */}
      <div className="border-y border-brutal-line py-2 bg-white text-black font-mono text-xs md:text-sm uppercase overflow-hidden marquee-container">
        <div className="marquee-content">
          Funded by the 1517 Medici Fund /// Runners-Up for the 2025 Global Innovation SDGs Challenge /// Funded by the 1517 Medici Fund /// Runners-Up for the 2025 Global Innovation SDGs Challenge /// Funded by the 1517 Medici Fund /// Runners-Up for the 2025 Global Innovation SDGs Challenge ///
        </div>
      </div>
    </section>
  );
};

export default Hero;