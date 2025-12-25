import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-brutal-line bg-brutal-bg mix-blend-difference">
      <div className="grid grid-cols-12 h-14 items-center">
        <div className="col-span-4 pl-4 font-sans font-black tracking-tighter text-2xl">
          AERIS<span className="text-brutal-accent">.</span>
        </div>
        <div className="col-span-4 text-center font-mono text-[10px] uppercase hidden md:block">
          Systems Status: Nominal
        </div>
        <div className="col-span-8 md:col-span-4 flex justify-end">
          <a 
            href="#contact" 
            className="h-14 px-8 border-l border-brutal-line flex items-center font-mono text-xs hover:bg-white hover:text-black transition-colors uppercase"
          >
            Get Intel -&gt;
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;