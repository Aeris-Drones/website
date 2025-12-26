import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-brutal-line bg-brutal-bg/80 backdrop-blur-md">
      <div className="grid grid-cols-12 h-14 items-center">
        <div className="col-span-4 pl-4 font-sans font-black tracking-tighter text-2xl">
          AERIS<span className="text-brutal-accent">.</span>
        </div>
        <div className="col-span-8 flex items-center justify-end">
          <a href="#team" className="h-14 px-6 border-l border-brutal-line flex items-center font-mono text-xs hover:bg-white hover:text-black transition-colors uppercase">Teams</a>
          <a href="#story" className="h-14 px-6 border-l border-brutal-line flex items-center font-mono text-xs hover:bg-white hover:text-black transition-colors uppercase">Our Story</a>
          <a href="#timeline" className="h-14 px-6 border-l border-brutal-line flex items-center font-mono text-xs hover:bg-white hover:text-black transition-colors uppercase">Timeline</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;