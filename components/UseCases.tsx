import React from 'react';

const UseCases: React.FC = () => {
  return (
    <section className="border-b border-brutal-line bg-white text-black">
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-black">
        <div className="p-12 h-64 flex flex-col justify-between hover:bg-brutal-accent transition-colors">
          <span className="font-mono text-xs font-bold">01</span>
          <h4 className="font-sans font-bold text-3xl uppercase leading-none">Disaster Response</h4>
          <p className="font-mono text-xs text-gray-500 max-w-sm">
            Rapid deployment in chaotic environments with autonomous swarm coordination.
          </p>
        </div>
        <div className="p-12 h-64 flex flex-col justify-between hover:bg-brutal-accent transition-colors">
          <span className="font-mono text-xs font-bold">02</span>
          <h4 className="font-sans font-bold text-3xl uppercase leading-none">Infra Inspection</h4>
          <p className="font-mono text-xs text-gray-500 max-w-sm">
            AI-powered asset monitoring and automated threat detection for critical infrastructure.
          </p>
        </div>
        <div className="p-12 h-64 flex flex-col justify-between hover:bg-brutal-accent transition-colors">
          <span className="font-mono text-xs font-bold">03</span>
          <h4 className="font-sans font-bold text-3xl uppercase leading-none">Precision Agriculture</h4>
          <p className="font-mono text-xs text-gray-500 max-w-sm">
            Computer vision and sensor fusion for automated crop health and yield optimization.
          </p>
        </div>
      </div>
    </section>
  );
};

export default UseCases;
