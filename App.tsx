import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ScrollyTelling from './components/ScrollyTelling';
import Solution from './components/Solution';
import Architecture from './components/Architecture';
import MissionKinetic from './components/MissionKinetic';
import UseCases from './components/UseCases';
import Comparison from './components/Comparison';
import Video from './components/Video';
import Team from './components/Team';
import Contact from './components/Contact';
import Timeline from './components/Timeline';
import KineticLab from './components/KineticLab';
import ProblemLab from './components/ProblemLab';

function MainPage() {
  return (
    <>
      <Navbar />
      <main className="pt-14">
        <Hero />
        <ScrollyTelling />
        <Solution />
        <Architecture />
        <MissionKinetic />
        <UseCases />
        <Video />
        <Team />
        <Contact />
      </main>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/design-lab" element={<KineticLab />} />
        <Route path="/problem-lab" element={<ProblemLab />} />
      </Routes>
    </Router>
  );
}

export default App;
