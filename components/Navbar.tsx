import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  const isTimelinePage = location.pathname === '/timeline';

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const hero = document.getElementById('hero');
      if (hero) {
        hero.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-brutal-line bg-brutal-bg/80 backdrop-blur-md">
      <div className="grid grid-cols-12 h-14 items-center">
        <Link
          to="/"
          onClick={handleLogoClick}
          className="col-span-4 pl-4 font-sans font-black tracking-tighter text-2xl hover:opacity-80 transition-opacity cursor-pointer"
        >
          AERIS<span className="text-brutal-accent">.</span>
        </Link>
        <div className="col-span-8 flex items-center justify-end">
          <Link
            to="/timeline"
            className="h-14 px-6 border-l border-brutal-line flex items-center font-mono text-xs hover:bg-white hover:text-black transition-colors uppercase"
          >
            Timeline
          </Link>
          <Link
            to="/about"
            className="h-14 px-6 border-l border-brutal-line flex items-center font-mono text-xs hover:bg-white hover:text-black transition-colors uppercase"
          >
            About Us
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;