import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ScrollyTelling from './components/ScrollyTelling';
import Solution from './components/Solution';
import Architecture from './components/Architecture';
import UseCases from './components/UseCases';
import Comparison from './components/Comparison';
import Video from './components/Video';
import Contact from './components/Contact';

function App() {
  return (
    <>
      <Navbar />
      <main className="pt-14">
        <Hero />
        <ScrollyTelling />
        <Solution />
        <Architecture />
        <UseCases />
        <Comparison />
        <Video />
        <Contact />
      </main>
    </>
  );
}

export default App;