import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const advisors = [
    { name: 'Alex Schwarzkopf', image: '/Mr. Alex Schwarzkopf.jpg' },
    { name: 'Brandon Turk', image: '/Mr. Brandon Turk.jpg' },
    { name: 'Jin Abe', image: '/Mr. Jin Abe.png' },
    { name: 'Joe Cieslik', image: '/Mr. Joe Cieslik.png' },
    { name: 'Jeremy Wilkinson', image: '/Mr. Jeremy Wilkinson.jpg' },
];

const AboutUs: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const storyRef = useRef<HTMLDivElement>(null);
    const teamRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Fade in story elements
            gsap.from(".story-item", {
                scrollTrigger: {
                    trigger: storyRef.current,
                    start: "top 80%",
                },
                y: 50,
                opacity: 0,
                stagger: 0.2,
                duration: 1,
                ease: "power3.out"
            });

            // Stagger team members
            gsap.from(".team-member", {
                scrollTrigger: {
                    trigger: teamRef.current,
                    start: "top 80%",
                },
                y: 40,
                opacity: 0,
                stagger: 0.1,
                duration: 0.8,
                ease: "power2.out"
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} id="about" className="bg-brutal-bg text-brutal-fg">
            {/* SECTION: OUR STORY */}
            <section ref={storyRef} id="story" className="border-b border-brutal-line py-24 md:py-32">
                <div className="container mx-auto px-6 md:px-12">
                    <span className="font-mono text-brutal-accent text-xs tracking-[0.3em] uppercase block mb-12 story-item">
            /// OUR STORY
                    </span>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                        <div className="lg:col-span-8">
                            <h2 className="font-sans font-black text-5xl md:text-7xl lg:text-8xl leading-none uppercase tracking-tighter mb-12 story-item">
                                FIELD INTEL <br />
                                <span className="text-brutal-accent">REIMAGINED.</span>
                            </h2>

                            <div className="space-y-8 max-w-3xl story-item">
                                <p className="font-sans text-xl md:text-2xl text-gray-300 leading-relaxed">
                                    Aeris was born from a simple, frustrating truth: in the field, data is often a burden rather than an asset. When seconds matter, operators shouldn't be fighting with connectivity or digging through raw video.
                                </p>
                                <p className="font-sans text-lg md:text-xl text-gray-400 leading-relaxed">
                                    We built a system that thinks like an operator. True swarm intelligence that works 100% offline, turning chaotic environments into clear, actionable operating pictures. We don't just sell drones; we provide the unified vision that saves missions and lives.
                                </p>
                            </div>
                        </div>

                        <div className="lg:col-span-4 flex flex-col justify-end">
                            <div className="border-l-2 border-brutal-accent p-8 bg-gray-900/50 backdrop-blur-sm story-item">
                                <span className="font-mono text-[10px] text-gray-500 block mb-4 tracking-widest uppercase">The Directive</span>
                                <p className="font-mono text-sm text-gray-300 leading-relaxed italic">
                                    "A world where no rescue team, inspector, or operator works without real-time situational awareness."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION: OUR TEAM */}
            <section ref={teamRef} id="team" className="border-b border-brutal-line">
                <div className="border-b border-brutal-line p-8 md:p-12">
                    <div className="flex items-center justify-between">
                        <h2 className="font-sans font-black text-4xl md:text-5xl uppercase tracking-tight">
                            THE TEAM<span className="text-brutal-accent">.</span>
                        </h2>
                        <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest hidden md:block">OPERATIONAL CAPACITY: 100%</span>
                    </div>
                </div>

                {/* Core Team */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-b border-brutal-line">
                    {[
                        { role: 'Core Systems', name: 'Daniel' },
                        { role: 'Operations', name: 'Aahan' },
                        { role: 'Physical', name: 'Lucas' },
                        { role: 'Mission Cap', name: 'Saketh' },
                    ].map((member) => (
                        <div key={member.name} className="p-8 md:p-12 border-b md:border-b-0 md:border-r last:border-r-0 border-brutal-line hover:bg-gray-900 transition-colors group team-member">
                            <span className="font-mono text-[10px] text-gray-500 block mb-4 uppercase tracking-widest group-hover:text-brutal-accent transition-colors">{member.role}</span>
                            <span className="font-sans font-black text-3xl uppercase">{member.name}</span>
                        </div>
                    ))}
                </div>

                {/* Advisors Header */}
                <div className="border-b border-brutal-line p-8 md:p-12 bg-[#0A0A0A]">
                    <h3 className="font-sans font-black text-2xl md:text-3xl uppercase tracking-tight">
                        Advisors<span className="text-brutal-accent">.</span>
                    </h3>
                    <p className="font-mono text-xs text-gray-500 mt-2 uppercase tracking-wide">Industry experts guiding our strategic flight path</p>
                </div>

                {/* Advisors Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
                    {advisors.map((advisor, index) => (
                        <div
                            key={advisor.name}
                            className={`group relative overflow-hidden border-b lg:border-b-0 ${index < advisors.length - 1 ? 'lg:border-r' : ''} border-brutal-line hover:bg-gray-900 transition-colors team-member`}
                        >
                            <div className="aspect-square overflow-hidden bg-gray-900">
                                <img
                                    src={advisor.image}
                                    alt={advisor.name}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                                />
                            </div>
                            <div className="p-6 md:p-8">
                                <span className="font-mono text-[10px] text-brutal-accent block mb-2 uppercase tracking-widest">Strategic Advisor</span>
                                <span className="font-sans font-bold text-lg block uppercase tracking-tight">{advisor.name}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
