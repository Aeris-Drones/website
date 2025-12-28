import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: 'One Map.',
    tag: '01 /// FUSION',
    description: 'Fuses thermal, LiDAR, and RGB into a single operational picture.',
  },
  {
    title: 'No Cloud.',
    tag: '02 /// OFFLINE',
    description: 'Works when the internet is dead. Local mesh network.',
  },
  {
    title: 'Swarm IQ.',
    tag: '03 /// AUTONOMY',
    description: 'Scouts search autonomously. Ranger relays the data.',
  },
  {
    title: 'Modular Pods.',
    tag: '04 /// HOT-SWAP',
    description: 'Universal frame. Mission-specific pods. Click in, auto-configure, fly.',
  },
];

const Solution: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const featuresContainerRef = useRef<HTMLDivElement>(null);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        // Set initial state - all features hidden
        gsap.set(featureRefs.current, {
          opacity: 0,
          y: 60,
        });

        // Create the main timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=200%", // Pin for 2x viewport height of scrolling
            pin: true,
            pinSpacing: true,
            scrub: 0.5,
          },
        });

        // Animate each feature in sequence
        featureRefs.current.forEach((feature, index) => {
          if (feature) {
            // Each feature takes up a portion of the scroll
            const startProgress = index * 0.2;
            const midProgress = startProgress + 0.1;
            const endProgress = startProgress + 0.2;

            // Fade in and slide up
            tl.to(feature, {
              opacity: 1,
              y: 0,
              duration: 0.15,
              ease: "power2.out",
            }, startProgress);
          }
        });

        // Keep the last state visible
        tl.to({}, { duration: 0.2 });
      });

      // Mobile: Simple stagger animation on scroll
      mm.add("(max-width: 1023px)", () => {
        featureRefs.current.forEach((feature) => {
          if (feature) {
            gsap.set(feature, { opacity: 0, y: 40 });

            ScrollTrigger.create({
              trigger: feature,
              start: "top 85%",
              onEnter: () => {
                gsap.to(feature, {
                  opacity: 1,
                  y: 0,
                  duration: 0.6,
                  ease: "power2.out",
                });
              },
              once: true,
            });
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen border-b border-brutal-line bg-brutal-bg text-brutal-fg relative"
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 min-h-screen">
        {/* Sidebar Header Column */}
        <div className="col-span-1 lg:col-span-1 p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-brutal-line flex flex-col justify-center bg-brutal-bg">
          <div>
            <h3 className="font-sans font-black text-5xl md:text-6xl uppercase tracking-tighter leading-none mb-6">
              The<br/>Solution<span className="text-brutal-accent">.</span>
            </h3>
            <p className="font-mono text-gray-400 text-base leading-relaxed border-l-2 border-brutal-accent pl-4">
              Aeris replaces chaos with clarity. Fusing multi-spectral data at the edge to turn fragmented feeds into a single command map.
            </p>
          </div>
        </div>

        {/* Features Column */}
        <div
          ref={featuresContainerRef}
          className="col-span-1 lg:col-span-3 relative flex flex-col"
        >
          {features.map((feature, index) => (
            <a
              key={feature.tag}
              href="#"
              ref={(el) => { featureRefs.current[index] = el; }}
              className={`group flex-1 flex flex-col justify-center transition-all duration-300 cursor-pointer bg-brutal-bg text-brutal-fg hover:bg-white hover:text-black relative ${
                index < features.length - 1 ? 'border-b border-brutal-line' : ''
              }`}
              style={{ minHeight: '22vh' }}
              onClick={(e) => {
                e.preventDefault();
                // Will be replaced with actual links later
              }}
            >
              <div className="p-8 lg:p-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
                <h3 className="font-sans font-black text-3xl md:text-5xl uppercase group-hover:text-black transition-colors">
                  {feature.title}
                </h3>
                <div className="flex flex-col items-start md:items-end md:text-right">
                  <span className="font-mono text-xs uppercase tracking-widest mb-2 text-brutal-accent group-hover:text-brutal-accent">
                    {feature.tag}
                  </span>
                  <p className="font-mono text-base max-w-md text-gray-400 group-hover:text-black transition-colors">
                    {feature.description}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solution;
