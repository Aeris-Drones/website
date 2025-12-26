import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ScrollyTelling from './components/ScrollyTelling';
import Solution from './components/Solution';
import Architecture from './components/Architecture';
import UseCases from './components/UseCases';
import Comparison from './components/Comparison';
import Video from './components/Video';
import Contact from './components/Contact';
import Timeline from './components/Timeline';

function MainPage() {
  return (
    <>
      <Navbar />
      <main className="pt-14">
        <Hero />
        <ScrollyTelling />
        <Solution />
        <Architecture />
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
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/timeline" element={<Timeline />} />
      </Routes>
    </Router>
  );
}

export default App;
