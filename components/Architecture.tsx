import React from 'react';

const Architecture: React.FC = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 border-b border-brutal-line h-screen max-h-[900px]">
      {/* Scout */}
      <div className="relative border-b lg:border-b-0 lg:border-r border-brutal-line p-12 flex flex-col justify-between group overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative z-10">
          <h3 className="font-sans font-black text-6xl outline-text text-transparent stroke-white" style={{ WebkitTextStroke: '1px white' }}>SCOUT</h3>
          <div className="font-mono text-xs mt-4 space-y-2">
            <p>&gt; ROLE: PENETRATION</p>
            <p>&gt; SENSOR: THERMAL/RGB/LIDAR</p>
            <p>&gt; NAV: SLAM (GPS-DENIED)</p>
          </div>
        </div>
        <div className="relative z-10 aspect-square border border-gray-800 rounded-full flex items-center justify-center">
          <div className="w-full h-px bg-white/20"></div>
          <div className="h-full w-px bg-white/20"></div>
        </div>
      </div>

      {/* Ranger */}
      <div className="relative p-12 flex flex-col justify-between group overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative z-10 text-right">
          <h3 className="font-sans font-black text-6xl text-white">RANGER</h3>
          <div className="font-mono text-xs mt-4 space-y-2 ml-auto inline-block text-left">
            <p>&gt; ROLE: OVERWATCH</p>
            <p>&gt; SENSOR: DATA FUSION HUB</p>
            <p>&gt; COMMS: MESH RELAY</p>
          </div>
        </div>
        <div className="relative z-10 aspect-square border border-gray-800 rounded-full flex items-center justify-center ml-auto animate-[spin_15s_linear_infinite_reverse]">
          <div className="w-full h-px bg-white/20"></div>
          <div className="h-full w-px bg-white/20"></div>
          <div className="absolute inset-0 border border-dashed border-white/20 rounded-full scale-75"></div>
        </div>
      </div>
    </section>
  );
};

export default Architecture;