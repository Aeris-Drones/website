import React from 'react';

const Comparison: React.FC = () => {
  return (
    <section className="p-6 md:p-24 border-b border-brutal-line">
      <h2 className="font-sans font-black text-4xl mb-12 uppercase">The Stark Reality</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full font-mono text-sm text-left border-collapse">
          <thead>
            <tr className="border-b border-brutal-line text-gray-500">
              <th className="py-4 uppercase font-normal">Metric</th>
              <th className="py-4 uppercase font-normal text-brutal-accent">AERIS SWARM</th>
              <th className="py-4 uppercase font-normal">Consumer Drones</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-800">
              <td className="py-6 font-bold">Connectivity</td>
              <td className="py-6 text-brutal-accent">100% OFFLINE MESH</td>
              <td className="py-6 text-gray-500">Cloud Dependent</td>
            </tr>
            <tr className="border-b border-gray-800">
              <td className="py-6 font-bold">Pilot Ratio</td>
              <td className="py-6 text-brutal-accent">1 : SWARM</td>
              <td className="py-6 text-gray-500">1 : 1</td>
            </tr>
            <tr className="border-b border-gray-800">
              <td className="py-6 font-bold">Payload</td>
              <td className="py-6 text-brutal-accent">MODULAR / HOT-SWAP</td>
              <td className="py-6 text-gray-500">Fixed</td>
            </tr>
            <tr>
              <td className="py-6 font-bold">Output</td>
              <td className="py-6 text-brutal-accent">ACTIONABLE ALERTS</td>
              <td className="py-6 text-gray-500">Raw Video</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Comparison;