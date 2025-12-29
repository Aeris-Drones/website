import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="min-h-screen border-b border-brutal-line relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 h-full min-h-[90vh]">
        {/* Big Type Area */}
        <div className="lg:col-span-12 p-6 flex flex-col justify-end relative">
          <h1 className="font-sans font-black text-giant leading-[0.8] tracking-tighter mb-4 -ml-2">
            AERIS <span className="text-brutal-accent">.</span>
          </h1>
        </div>
      </div>

      {/* Marquee Strip */}
      <div className="border-y border-brutal-line py-2 bg-white text-black font-mono text-sm uppercase overflow-hidden marquee-container">
        <div className="marquee-content">
          Funded by the 1517 Medici Fund /// Runners-Up for the 2025 Global Innovation SDGs Challenge /// Funded by the 1517 Medici Fund /// Runners-Up for the 2025 Global Innovation SDGs Challenge /// Funded by the 1517 Medici Fund /// Runners-Up for the 2025 Global Innovation SDGs Challenge ///
        </div>
      </div>
    </section>
  );
};

export default Hero;