import React from 'react';

const Team: React.FC = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-b border-brutal-line">
      <div className="p-12 border-b md:border-b-0 border-r border-brutal-line hover:bg-gray-900 transition-colors">
        <span className="font-mono text-xs text-gray-500 block mb-4">CORE SYSTEMS</span>
        <span className="font-sans font-bold text-xl">DANIEL</span>
      </div>
      <div className="p-12 border-b md:border-b-0 md:border-r border-brutal-line hover:bg-gray-900 transition-colors">
        <span className="font-mono text-xs text-gray-500 block mb-4">OPERATIONS</span>
        <span className="font-sans font-bold text-xl">AAHAN</span>
      </div>
      <div className="p-12 border-b md:border-b-0 border-r border-brutal-line hover:bg-gray-900 transition-colors">
        <span className="font-mono text-xs text-gray-500 block mb-4">PHYSICAL</span>
        <span className="font-sans font-bold text-xl">LUCAS</span>
      </div>
      <div className="p-12 hover:bg-gray-900 transition-colors">
        <span className="font-mono text-xs text-gray-500 block mb-4">MISSION CAP</span>
        <span className="font-sans font-bold text-xl">SAKETH</span>
      </div>
    </section>
  );
};

export default Team;