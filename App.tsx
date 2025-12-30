import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ScrollyTelling from './components/ScrollyTelling';
import SolutionCinematic from './components/SolutionCinematic';
// Legacy components kept for reference:
// import Solution from './components/Solution';
// import Architecture from './components/Architecture';
import MissionKinetic from './components/MissionKinetic';
import UseCases from './components/UseCases';
import Comparison from './components/Comparison';
import Video from './components/Video';
import Team from './components/Team';
import Contact from './components/Contact';
import Timeline from './components/Timeline';
import KineticLab from './components/KineticLab';
import ProblemLab from './components/ProblemLab';
import FAQ from './components/FAQ';
import AboutPage from './components/AboutPage';
import OneMapPage from './components/features/OneMapPage';
import NoCloudPage from './components/features/NoCloudPage';
import SwarmIQPage from './components/features/SwarmIQPage';
import ModularPodsPage from './components/features/ModularPodsPage';

// Scroll to top on route change, with scroll position restoration for feature pages
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Check if we're returning from a feature page
    const savedPosition = sessionStorage.getItem('scrollPosition');
    const returnToFeatures = sessionStorage.getItem('returnToFeatures');

    if (pathname === '/' && returnToFeatures === 'true' && savedPosition) {
      // Restore the saved scroll position
      const position = parseInt(savedPosition, 10);
      sessionStorage.removeItem('returnToFeatures');
      sessionStorage.removeItem('scrollPosition');
      // Small delay to ensure the page has rendered
      setTimeout(() => {
        window.scrollTo({ top: position, behavior: 'instant' });
      }, 50);
    } else if (hash) {
      // If there's a hash, scroll to that element
      const element = document.querySelector(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      // No hash and not restoring, scroll to top
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

function MainPage() {
  return (
    <>
      <Navbar />
      <main className="pt-14">
        <Hero />
        {/* PlainMission removed from here */}
        <ScrollyTelling />
        <SolutionCinematic />
        <MissionKinetic />
        <Comparison />
        <UseCases />
        <Video />
        <Contact />
      </main>
    </>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/design-lab" element={<KineticLab />} />
        <Route path="/problem-lab" element={<ProblemLab />} />
        <Route path="/one-map" element={<OneMapPage />} />
        <Route path="/no-cloud" element={<NoCloudPage />} />
        <Route path="/swarm-iq" element={<SwarmIQPage />} />
        <Route path="/modular-pods" element={<ModularPodsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
