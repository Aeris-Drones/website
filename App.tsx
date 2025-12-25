import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Solution from './components/Solution';
import Architecture from './components/Architecture';
import UseCases from './components/UseCases';
import Comparison from './components/Comparison';
import Team from './components/Team';
import Video from './components/Video';
import Contact from './components/Contact';

function App() {
  return (
    <>
      <Navbar />
      <main className="pt-14">
        <Hero />
        <Problem />
        <Solution />
        <Architecture />
        <UseCases />
        <Comparison />
        <Team />
        <Video />
        <Contact />
      </main>
    </>
  );
}

export default App;