import React from 'react';

const UseCases: React.FC = () => {
  return (
    <section className="border-b border-brutal-line bg-white text-black">
      <div className="border-b border-black p-8 md:p-12">
        <h3 className="font-sans font-black text-4xl md:text-5xl uppercase">Operational Missions</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-black">
        <a
          href="#"
          className="p-8 md:p-12 h-auto min-h-[250px] md:h-64 flex flex-col justify-between hover:bg-brutal-accent transition-colors cursor-pointer group"
          onClick={(e) => {
            e.preventDefault();
            // Will be replaced with actual links later
          }}
        >
          <h4 className="font-mono text-sm md:text-base font-bold uppercase mb-4 md:mb-0">01. Disaster Response</h4>
          <p className="font-sans text-base md:text-lg leading-tight max-w-sm group-hover:text-black transition-colors">
            Find survivors faster. See through smoke and debris. Give responders a live map when the internet is down.
          </p>
        </a>
        <a
          href="#"
          className="p-8 md:p-12 h-auto min-h-[250px] md:h-64 flex flex-col justify-between hover:bg-gray-200 transition-colors cursor-pointer group relative"
          onClick={(e) => {
            e.preventDefault();
            // Will be replaced with actual links later
          }}
        >
          <div className="flex items-center gap-3 mb-4 md:mb-0">
            <h4 className="font-mono text-sm md:text-base font-bold uppercase">02. Infra Inspection</h4>
            <span className="font-mono text-[10px] px-2 py-0.5 bg-gray-300 text-gray-600 uppercase tracking-wider">Future</span>
          </div>
          <p className="font-sans text-base md:text-lg leading-tight max-w-sm text-gray-500 group-hover:text-gray-700 transition-colors">
            Check bridges and roads automatically. Spot cracks and defects early. Repeat exact flight paths every time.
          </p>
        </a>
        <a
          href="#"
          className="p-8 md:p-12 h-auto min-h-[250px] md:h-64 flex flex-col justify-between hover:bg-gray-200 transition-colors cursor-pointer group relative"
          onClick={(e) => {
            e.preventDefault();
            // Will be replaced with actual links later
          }}
        >
          <div className="flex items-center gap-3 mb-4 md:mb-0">
            <h4 className="font-mono text-sm md:text-base font-bold uppercase">03. Precision Agriculture</h4>
            <span className="font-mono text-[10px] px-2 py-0.5 bg-gray-300 text-gray-600 uppercase tracking-wider">Future</span>
          </div>
          <p className="font-sans text-base md:text-lg leading-tight max-w-sm text-gray-500 group-hover:text-gray-700 transition-colors">
            Scout thousands of acres quickly. Find sick crops before they spread. Turn aerial data into clear action.
          </p>
        </a>
      </div>
    </section>
  );
};

export default UseCases;
