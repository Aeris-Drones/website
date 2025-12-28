import React from 'react';

const advisors = [
  { name: 'Alex Schwarzkopf', image: '/Mr. Alex Schwarzkopf.jpg' },
  { name: 'Brandon Turk', image: '/Mr. Brandon Turk.jpg' },
  { name: 'Jin Abe', image: '/Mr. Jin Abe.png' },
  { name: 'Joe Cieslik', image: '/Mr. Joe Cieslik.png' },
  { name: 'Jeremy Wilkinson', image: '/Mr. Jeremy Wilkinson.jpg' },
];

const Team: React.FC = () => {
  return (
    <section id="team" className="border-b border-brutal-line bg-brutal-bg">
      {/* Section Header */}
      <div className="border-b border-brutal-line p-8 md:p-12">
        <h2 className="font-sans font-black text-4xl md:text-5xl uppercase tracking-tight">
          Team<span className="text-brutal-accent">.</span>
        </h2>
      </div>

      {/* Core Team */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-b border-brutal-line">
        <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-brutal-line hover:bg-gray-900 transition-colors group">
          <span className="font-mono text-xs text-gray-500 block mb-4 uppercase tracking-widest">Core Systems</span>
          <span className="font-sans font-black text-2xl uppercase group-hover:text-brutal-accent transition-colors">Daniel</span>
        </div>
        <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-brutal-line hover:bg-gray-900 transition-colors group">
          <span className="font-mono text-xs text-gray-500 block mb-4 uppercase tracking-widest">Operations</span>
          <span className="font-sans font-black text-2xl uppercase group-hover:text-brutal-accent transition-colors">Aahan</span>
        </div>
        <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-brutal-line hover:bg-gray-900 transition-colors group">
          <span className="font-mono text-xs text-gray-500 block mb-4 uppercase tracking-widest">Physical</span>
          <span className="font-sans font-black text-2xl uppercase group-hover:text-brutal-accent transition-colors">Lucas</span>
        </div>
        <div className="p-8 md:p-12 hover:bg-gray-900 transition-colors group">
          <span className="font-mono text-xs text-gray-500 block mb-4 uppercase tracking-widest">Mission Cap</span>
          <span className="font-sans font-black text-2xl uppercase group-hover:text-brutal-accent transition-colors">Saketh</span>
        </div>
      </div>

      {/* Advisors Header */}
      <div className="border-b border-brutal-line p-8 md:p-12 bg-brutal-gray">
        <h3 className="font-sans font-black text-2xl md:text-3xl uppercase tracking-tight">
          Advisors<span className="text-brutal-accent">.</span>
        </h3>
        <p className="font-mono text-sm text-gray-500 mt-2">Industry experts guiding our mission</p>
      </div>

      {/* Advisors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
        {advisors.map((advisor, index) => (
          <div 
            key={advisor.name}
            className={`group relative overflow-hidden border-b lg:border-b-0 ${index < advisors.length - 1 ? 'lg:border-r' : ''} border-brutal-line hover:bg-gray-900 transition-colors`}
          >
            {/* Image */}
            <div className="aspect-square overflow-hidden bg-brutal-gray">
              <img 
                src={advisor.image} 
                alt={advisor.name}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
              />
            </div>
            {/* Info */}
            <div className="p-6 md:p-8">
              <span className="font-mono text-xs text-brutal-accent block mb-2 uppercase tracking-widest">Advisor</span>
              <span className="font-sans font-bold text-lg block">{advisor.name}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Team;