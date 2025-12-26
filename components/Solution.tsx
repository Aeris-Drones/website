import React from 'react';

const Solution: React.FC = () => {

  return (
    <section className="border-b border-brutal-line bg-brutal-bg text-brutal-fg relative">
      <div className="grid grid-cols-1 lg:grid-cols-4 min-h-[80vh]">
        {/* Sidebar Header Column */}
        <div className="col-span-1 lg:col-span-1 p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-brutal-line flex flex-col justify-center sticky top-0 h-auto lg:h-screen z-10 bg-brutal-bg">
          <div>
            <h3 className="font-sans font-black text-4xl md:text-5xl uppercase tracking-tighter leading-none mb-6">
              The<br/>Solution<span className="text-brutal-accent">.</span>
            </h3>
            <p className="font-mono text-gray-400 text-sm leading-relaxed border-l-2 border-brutal-accent pl-4">
              Aeris replaces chaos with clarity. Fusing multi-spectral data at the edge to turn fragmented feeds into a single command map.
            </p>
          </div>
        </div>

        {/* Features Column */}
        <div className="col-span-1 lg:col-span-3 relative">
          {/* Feature 1 */}
          <div className="group border-b border-brutal-line min-h-[33vh] flex flex-col justify-center transition-colors cursor-crosshair hover:bg-white hover:text-black relative">
            <div className="p-12 lg:p-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
                <h3 className="font-sans font-black text-4xl md:text-6xl uppercase">
                    One Map.
                </h3>
                <div className="flex flex-col items-end text-right opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="font-mono text-xs uppercase tracking-widest mb-2 text-brutal-accent">01 /// FUSION</span>
                    <p className="font-mono text-base max-w-md text-gray-400 group-hover:text-black">
                        Fuses thermal, LiDAR, and RGB into a single operational picture.
                    </p>
                </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="group border-b border-brutal-line min-h-[33vh] flex flex-col justify-center transition-colors cursor-crosshair hover:bg-white hover:text-black relative">
            <div className="p-12 lg:p-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
                <h3 className="font-sans font-black text-4xl md:text-6xl uppercase">
                    No Cloud.
                </h3>
                <div className="flex flex-col items-end text-right opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="font-mono text-xs uppercase tracking-widest mb-2 text-brutal-accent">02 /// OFFLINE</span>
                    <p className="font-mono text-base max-w-md text-gray-400 group-hover:text-black">
                        Works when the internet is dead. Local mesh network.
                    </p>
                </div>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="group min-h-[33vh] flex flex-col justify-center transition-colors cursor-crosshair hover:bg-white hover:text-black relative">
            <div className="p-12 lg:p-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
                <h3 className="font-sans font-black text-4xl md:text-6xl uppercase">
                    Swarm IQ.
                </h3>
                <div className="flex flex-col items-end text-right opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="font-mono text-xs uppercase tracking-widest mb-2 text-brutal-accent">03 /// AUTONOMY</span>
                    <p className="font-mono text-base max-w-md text-gray-400 group-hover:text-black">
                        Scouts search autonomously. Ranger relays the data.
                    </p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solution;