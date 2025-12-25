import React from 'react';

const Problem: React.FC = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 border-b border-brutal-line">
      <div className="p-12 lg:p-24 border-b lg:border-b-0 lg:border-r border-brutal-line">
        <h2 className="font-sans font-bold text-5xl md:text-7xl leading-[0.9] mb-12">
          CHAOS IS<br />
          THE ENEMY.
        </h2>
        <div className="w-12 h-12 bg-brutal-accent animate-pulse"></div>
      </div>
      <div className="p-12 lg:p-24 flex flex-col justify-center">
        <p className="font-mono text-sm md:text-base leading-relaxed text-gray-400 max-w-md">
          <span className="text-white block mb-4">// THE PROBLEM</span>
          In crisis, data is fragmented. Time is lost stitching together single-drone feeds. Decisions are made in the dark.
          <br /><br />
          <span className="text-white block mb-4">// THE CONSEQUENCE</span>
          Slow response. Missed survivors. Preventable failure.
        </p>
      </div>
    </section>
  );
};

export default Problem;
