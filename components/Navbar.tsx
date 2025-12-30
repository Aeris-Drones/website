import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const navLinks = [
    { to: '/timeline', label: 'Timeline' },
    { to: '/about', label: 'About Us' },
  ];

  return (
    <>
      <nav className="fixed top-0 w-full z-50 border-b border-brutal-line bg-brutal-bg/80 backdrop-blur-md">
        <div className="flex h-14 items-center justify-between px-4 md:grid md:grid-cols-12">
          <Link
            to="/"
            onClick={handleLogoClick}
            className="font-sans font-black tracking-tighter text-2xl hover:opacity-80 transition-opacity cursor-pointer md:col-span-4"
          >
            AERIS<span className="text-brutal-accent">.</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:col-span-8 items-center justify-end">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="h-14 px-6 border-l border-brutal-line flex items-center font-mono text-xs hover:bg-white hover:text-black transition-colors uppercase"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 -mr-2 hover:bg-white/10 transition-colors"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Slide-in Menu */}
      <div
        className={`fixed top-14 right-0 bottom-0 z-40 w-72 bg-brutal-bg border-l border-brutal-line transform transition-transform duration-300 ease-out md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex flex-col h-full">
          {navLinks.map((link, idx) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setIsMenuOpen(false)}
              className={`p-6 border-b border-brutal-line font-mono text-sm uppercase tracking-widest hover:bg-brutal-accent hover:text-black transition-colors ${location.pathname === link.to ? 'text-brutal-accent' : ''
                }`}
            >
              <span className="text-brutal-accent mr-3">0{idx + 1}</span>
              {link.label}
            </Link>
          ))}

          {/* Footer in mobile menu */}
          <div className="mt-auto p-6 border-t border-brutal-line">
            <p className="font-mono text-xs text-gray-500 uppercase">
              © 2026 AERIS SYSTEMS
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;