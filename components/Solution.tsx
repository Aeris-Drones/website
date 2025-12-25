import React from 'react';

const Solution: React.FC = () => {
  return (
    <section className="border-b border-brutal-line">
      <div className="grid grid-cols-1 lg:grid-cols-4">
        <div className="col-span-1 lg:col-span-1 p-6 border-b lg:border-b-0 lg:border-r border-brutal-line">
          <span className="font-mono text-xs text-brutal-accent">01 /// SOLUTION</span>
        </div>
        <div className="col-span-1 lg:col-span-3">
          {/* Feature 1 */}
          <div className="group border-b border-brutal-line hover:bg-white hover:text-black transition-colors cursor-crosshair">
            <div className="p-12 lg:p-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <h3 className="font-sans font-black text-4xl md:text-6xl uppercase">One Map.</h3>
              <p className="font-mono text-base max-w-md md:text-right group-hover:text-black text-gray-500">
                Fuses thermal, LiDAR, and RGB into a single operational picture.
              </p>
            </div>
          </div>
          {/* Feature 2 */}
          <div className="group border-b border-brutal-line hover:bg-white hover:text-black transition-colors cursor-crosshair">
            <div className="p-12 lg:p-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <h3 className="font-sans font-black text-4xl md:text-6xl uppercase">No Cloud.</h3>
              <p className="font-mono text-base max-w-md md:text-right group-hover:text-black text-gray-500">
                Works when the internet is dead. Local mesh network.
              </p>
            </div>
          </div>
          {/* Feature 3 */}
          <div className="group hover:bg-white hover:text-black transition-colors cursor-crosshair">
            <div className="p-12 lg:p-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <h3 className="font-sans font-black text-4xl md:text-6xl uppercase">Swarm IQ.</h3>
              <p className="font-mono text-base max-w-md md:text-right group-hover:text-black text-gray-500">
                Scouts search autonomously. Ranger relays the data.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solution;