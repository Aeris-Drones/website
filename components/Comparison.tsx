import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Comparison: React.FC = () => {
  const componentRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop: Pin the section
      mm.add("(min-width: 1024px)", () => {
        ScrollTrigger.create({
          trigger: componentRef.current,
          start: "top top",
          end: "+=50%", // Hold for 50% of viewport height
          pin: true,
          pinSpacing: true,
        });
      });
      
    }, componentRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={componentRef} className="lg:min-h-screen p-6 md:p-24 border-b border-brutal-line bg-brutal-bg flex flex-col justify-center">
      <h2 className="font-sans font-black text-4xl mb-12 uppercase">The Stark Reality</h2>

      <div className="overflow-x-auto w-full">
        <table className="w-full font-mono text-sm text-left border-collapse min-w-[800px] lg:min-w-full">
          <thead>
            <tr className="border-b border-brutal-line text-gray-500">
              <th className="py-4 uppercase font-normal">Metric</th>
              <th className="py-4 uppercase font-normal text-brutal-accent">AERIS SWARM</th>
              <th className="py-4 uppercase font-normal">Competitors</th>
              <th className="py-4 uppercase font-normal">Consumer Drones</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-800">
              <td className="py-6 font-bold">Autonomy</td>
              <td className="py-6 text-brutal-accent">TRUE SWARM INTELLIGENCE</td>
              <td className="py-6 text-gray-500">Single-Drone Autonomy</td>
              <td className="py-6 text-gray-500">Manual Control</td>
            </tr>
            <tr className="border-b border-gray-800">
              <td className="py-6 font-bold">Connectivity</td>
              <td className="py-6 text-brutal-accent">100% OFFLINE MESH</td>
              <td className="py-6 text-gray-500">Enterprise Cloud</td>
              <td className="py-6 text-gray-500">Direct Radio Link</td>
            </tr>
            <tr className="border-b border-gray-800">
              <td className="py-6 font-bold">Pilot Ratio</td>
              <td className="py-6 text-brutal-accent">1 : SWARM</td>
              <td className="py-6 text-gray-500">1 : Multi-Drone</td>
              <td className="py-6 text-gray-500">1 : 1</td>
            </tr>
            <tr className="border-b border-gray-800">
              <td className="py-6 font-bold">GPS Dependency</td>
              <td className="py-6 text-brutal-accent">GPS-DENIED CAPABLE</td>
              <td className="py-6 text-gray-500">GPS-Denied Capable</td>
              <td className="py-6 text-gray-500">GPS-Dependent</td>
            </tr>
            <tr className="border-b border-gray-800">
              <td className="py-6 font-bold">Payload</td>
              <td className="py-6 text-brutal-accent">MODULAR / HOT-SWAP</td>
              <td className="py-6 text-gray-500">Fixed</td>
              <td className="py-6 text-gray-500">Fixed</td>
            </tr>
            <tr className="border-b border-gray-800">
              <td className="py-6 font-bold">Output</td>
              <td className="py-6 text-brutal-accent">ACTIONABLE AI ALERTS</td>
              <td className="py-6 text-gray-500">Autonomous Nav Data</td>
              <td className="py-6 text-gray-500">Raw Video</td>
            </tr>
            <tr>
              <td className="py-6 font-bold">Scalability</td>
              <td className="py-6 text-brutal-accent">EXPONENTIAL SWARM</td>
              <td className="py-6 text-gray-500">Linear Addition</td>
              <td className="py-6 text-gray-500">Linear Addition</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Comparison;