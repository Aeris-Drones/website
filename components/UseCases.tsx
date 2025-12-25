import React from 'react';

const UseCases: React.FC = () => {
  return (
    <section className="border-b border-brutal-line bg-white text-black">
      <div className="border-b border-black p-8 md:p-12">
        <h3 className="font-sans font-black text-4xl md:text-5xl uppercase">Mission</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-black">
        <div className="p-12 h-64 flex flex-col justify-between hover:bg-brutal-accent transition-colors">
          <h4 className="font-mono text-sm md:text-base font-bold uppercase">01 — Disaster Response</h4>
          <p className="font-sans text-lg leading-tight max-w-sm">
            Rapid deployment in chaotic environments with autonomous swarm coordination for real-time situational awareness.
          </p>
        </div>
        <div className="p-12 h-64 flex flex-col justify-between hover:bg-brutal-accent transition-colors">
          <h4 className="font-mono text-sm md:text-base font-bold uppercase">02 — Infra Inspection</h4>
          <p className="font-sans text-lg leading-tight max-w-sm">
            AI-powered asset monitoring and automated threat detection for critical infrastructure at scale.
          </p>
        </div>
        <div className="p-12 h-64 flex flex-col justify-between hover:bg-brutal-accent transition-colors">
          <h4 className="font-mono text-sm md:text-base font-bold uppercase">03 — Precision Agriculture</h4>
          <p className="font-sans text-lg leading-tight max-w-sm">
            Computer vision and sensor fusion for automated crop health monitoring and yield optimization.
          </p>
        </div>
      </div>
    </section>
  );
};

export default UseCases;
