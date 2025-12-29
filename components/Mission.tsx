import React, { useState } from 'react';

const Mission: React.FC = () => {
  return (
    <section className="flex flex-col">
      {/* 1. THE MISSION STATEMENT (Dark Mode) */}
      {/* Acts as a continuation of the technical/dark aesthetic of the previous section */}
      <div className="bg-brutal-bg text-brutal-fg border-b border-brutal-line min-h-[60vh] flex flex-col justify-center relative overflow-hidden">

        {/* Background Ambient Effect */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brutal-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

        <div className="container mx-auto px-6 md:px-12 py-24 relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 border-b border-gray-800 pb-8">
            <span className="font-mono text-brutal-accent text-sm tracking-[0.2em] uppercase">
              /// 003. Directive
            </span>
            <span className="font-mono text-xs text-gray-500 hidden md:block">
              EST. 2024. FIELD INTELLIGENCE
            </span>
          </div>

          <h2 className="font-sans font-black text-5xl md:text-7xl lg:text-8xl leading-[0.9] uppercase tracking-tighter max-w-5xl">
            Make field decisions <br />
            <span className="text-brutal-accent">faster</span>, safer, <br />
            and smarter.
          </h2>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-6 lg:col-span-5">
              <p className="font-sans text-xl md:text-2xl text-gray-300 leading-relaxed">
                When seconds matter and infrastructure fails, Aeris provides the unified operating picture.
              </p>
            </div>
            <div className="md:col-span-6 lg:col-span-7 flex items-end justify-end">
              {/* Vision Statement */}
              <div className="bg-gray-900/50 p-6 border-l-2 border-brutal-accent backdrop-blur-sm max-w-md">
                <span className="font-mono text-xs text-gray-500 block mb-2">VISION PROTOCOL</span>
                <p className="font-mono text-sm text-gray-300">
                  "A world where no rescue team, inspector, or operator works without real-time situational awareness."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. THE PRINCIPLES (Light Mode) */}
      {/* Stark transition to white to bridge into the next section */}
      <div className="bg-white text-black">
        <div className="grid grid-cols-1 lg:grid-cols-3">

          {/* Header Column */}
          <div className="col-span-1 p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-black bg-gray-50 flex flex-col justify-between">
            <div>
              <h3 className="font-sans font-black text-4xl uppercase mb-2">Core<br />Promise</h3>
              <p className="font-mono text-sm text-gray-500 mt-4">
                OPERATING PRINCIPLES<br />
                FOR CHAOTIC ENVIRONMENTS.
              </p>
            </div>
            <div className="hidden lg:block">
              {/* Decorative Element */}
              <div className="w-12 h-12 border border-black rounded-full flex items-center justify-center animate-spin-slow">
                <div className="w-full h-px bg-black"></div>
                <div className="h-full w-px bg-black"></div>
              </div>
            </div>
          </div>

          {/* List Column */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex flex-col">
              {principles.map((item, index) => (
                <PrincipleItem key={index} index={index + 1} {...item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const principles = [
  {
    title: "Reliability > Novelty",
    desc: "Works when the internet is dead. No fragile dependencies."
  },
  {
    title: "Operator-First Clarity",
    desc: "One map. Prioritized alerts. Complexity hidden behind the glass."
  },
  {
    title: "Safety By Design",
    desc: "Reduce human exposure. Send the machine where the human shouldn't go."
  },
  {
    title: "Repeatable Workflows",
    desc: "Standardized surveys. Consistent paths. Data you can trust over time."
  },
  {
    title: "Edge-Native Autonomy",
    desc: "The swarm is the server. Intelligence lives on the frame, not in the cloud."
  }
];

const PrincipleItem: React.FC<{ index: number; title: string; desc: string }> = ({ index, title, desc }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group border-b border-black last:border-b-0 relative overflow-hidden transition-colors duration-300 hover:bg-black hover:text-white cursor-crosshair"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
        <div className="flex items-baseline gap-6">
          <span className={`font-mono text-sm transition-colors duration-300 ${isHovered ? 'text-brutal-accent' : 'text-gray-400'}`}>
            0{index}
          </span>
          <h4 className="font-sans font-bold text-2xl md:text-3xl uppercase tracking-tight">
            {title}
          </h4>
        </div>
        <div className="pl-10 md:pl-0 md:text-right">
          <p className={`font-mono text-sm md:text-base max-w-sm transition-colors duration-300 ${isHovered ? 'text-gray-300' : 'text-gray-600'}`}>
            {desc}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Mission;