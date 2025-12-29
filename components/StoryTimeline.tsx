import React, { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import BrutalModal from './ui/BrutalModal';

// Register Plugin
gsap.registerPlugin(ScrollTrigger);

interface Chapter {
    id: string;
    date: string;
    title: string;
    description: string;
    image: string; // URL for the visual panel
    modalContent: {
        title: string;
        body: string;
    };
}

const chapters: Chapter[] = [
    {
        id: 'origin',
        date: 'OCT 2024',
        title: 'The Meeting',
        description: 'Daniel and Aahan meet at Skool. A shared frustration with reactive disaster tech sparks the initial concept.',
        image: '/img/timeline/origin.jpg', // Placeholder, will default to a color block or generic if missing
        modalContent: {
            title: 'Origin Point',
            body: "It started with a simple observation: why do we still rely on 2D maps for 3D disasters? Daniel's background in distributed systems met Aahan's operational focus. The 'Aeris' concept was born on a napkin sketch—literally."
        }
    },
    {
        id: 'team',
        date: 'MAY 2025',
        title: 'Unit Formation',
        description: 'The core roster assembles. Lucas joins for aero-mechanical, Saketh for mission command UX.',
        image: '/img/timeline/team.jpg',
        modalContent: {
            title: 'Roster Complete',
            body: "We knew we needed more than just software. Lucas brought the hardware expertise to build custom airframes that could survive gale-force winds. Saketh brought the ability to translate complex swarm data into human-readable intelligence."
        }
    },
    {
        id: 'comp',
        date: 'JUL-AUG 2025',
        title: 'SDG Challenge',
        description: 'Aeris enters the SDG competition. We take Runner-Up, validating the critical need for our solution.',
        image: '/img/timeline/sdg.jpg',
        modalContent: {
            title: 'Validation',
            body: "The judges were initially skeptical about autonomous swarms. By the finals, they were asking when they could buy it. Taking Runner-Up wasn't a loss; it was proof that the market was hungry for this technology."
        }
    },
    {
        id: 'funding',
        date: 'OCT 2025',
        title: 'Initial Capital',
        description: '1517 Fund and Medici provide the first $1,000 grant. It’s not much, but it builds the first prototype.',
        image: '/img/timeline/funding.jpg',
        modalContent: {
            title: 'Pre-Seed Injection',
            body: "With backing from 1517 and Medici, we moved from simulation to physical reality. That $1,000 bought the carbon fiber, the first flight controllers, and the coffee that fueled the all-nighters building the 'Scout' Mark I."
        }
    },
    {
        id: 'inspiration',
        date: 'INSPIRATION',
        title: 'The Jin Abe Factor',
        description: 'Guidance from a legend. Jin Abe’s philosophy on "calm technology" reshapes our interface design.',
        image: '/Mr. Jin Abe.png',
        modalContent: {
            title: 'Philosophy Shift',
            body: "Jin taught us that in a disaster, more data is often worse. The goal isn't to show everything; it's to show only what matters. This meeting fundamentally changed our UX approach from 'Cockpit' to 'Commander'."
        }
    },
    {
        id: 'sar',
        date: 'LATE 2025',
        title: 'Command Briefing',
        description: 'Meeting with SAR Commanders. The feedback is brutal and invaluable. "Don’t give me a joystick, give me answers."',
        image: '/img/timeline/sar.jpg',
        modalContent: {
            title: 'Field Feedback',
            body: "We walked in with a drone controller. We walked out knowing we needed to build an autonomous agent. The Commander made it clear: if he has to fly it, he won't use it. It has to fly itself."
        }
    }
];

const StoryTimeline: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const panelsContainerRef = useRef<HTMLDivElement>(null);
    const [activeChapter, setActiveChapter] = useState<number>(0);
    const [modalData, setModalData] = useState<Chapter | null>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const panels = gsap.utils.toArray('.timeline-panel');

            // We create a ScrollTrigger that pins the container
            // and scrubs through the "timeline" of panels
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top top",
                end: `+=${chapters.length * 100}%`, // Scroll distance proportional to items
                pin: true,
                scrub: 0.5,
                onUpdate: (self) => {
                    // Calculate active index based on progress
                    const idx = Math.min(
                        chapters.length - 1,
                        Math.floor(self.progress * chapters.length)
                    );
                    setActiveChapter(idx);
                }
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative h-screen bg-black overflow-hidden flex flex-col md:flex-row border-t border-[#333]">

            {/* LEFT: Visual Command Canvas (Responsive: Hidden on mobile start, or stacked) */}
            <div className="w-full md:w-1/2 h-1/2 md:h-full relative border-b md:border-b-0 md:border-r border-[#333] bg-[#050505]">
                {/* Grid Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

                {/* Images Layer */}
                {chapters.map((chapter, idx) => (
                    <div
                        key={chapter.id}
                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out flex items-center justify-center p-12
                            ${activeChapter === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'}
                        `}
                    >
                        {/* If image fails, fallback to noise/color. 
                            In production we'd use a real Image component with fallback.
                            For this aesthetic, we can use a stylized placeholder container.
                        */}
                        <div className="w-full h-full relative border border-[#333] bg-[#111] overflow-hidden group">
                            <img
                                src={chapter.image}
                                alt={chapter.title}
                                className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                }}
                            />
                            {/* Fallback pattern if img missing */}
                            <div className="absolute inset-0 bg-[url('/img/noise.png')] opacity-10 pointer-events-none mix-blend-overlay"></div>

                            {/* Corner markings */}
                            <div className="absolute top-4 left-4 text-[#FF2A00] font-mono text-[10px] tracking-widest">
                                IMG_REF::{chapter.id.toUpperCase()}
                            </div>
                        </div>
                    </div>
                ))}

                {/* Vertical Progress Rail (Desktop) */}
                <div className="absolute right-0 top-0 bottom-0 w-1 bg-[#111] hidden md:flex flex-col justify-between py-12 items-center">
                    {chapters.map((_, idx) => (
                        <div
                            key={idx}
                            className={`w-1 transition-all duration-300 ${activeChapter >= idx ? 'h-full bg-[#FF2A00]' : 'h-2 bg-[#333]'}`}
                        ></div>
                    ))}
                </div>
            </div>

            {/* RIGHT: Content Scroller */}
            <div
                className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden flex flex-col justify-center px-8 md:px-24"
            >
                <div>
                    {/* We only render the ACTIVE chapter text here for the specific interaction requested.
                       Wait, the user requested "Scroll driven". 
                       Usually pinned scrollytelling means the TEXT scrolls naturally while image sticks.
                       However, since I pinned the WHOLE container and am calculating index manually,
                       I should simulate the text entry/exit.
                   */}
                    {chapters.map((chapter, idx) => (
                        <div
                            key={chapter.id}
                            className={`transition-all duration-500 absolute w-full max-w-lg left-8 md:left-24
                                ${activeChapter === idx
                                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                                    : 'opacity-0 translate-y-8 pointer-events-none'}
                            `}
                        >
                            <span className="font-mono text-[#FF2A00] text-xs tracking-[0.2em] mb-4 block">
                                {chapter.date}
                            </span>
                            <h2 className="font-sans font-black text-4xl md:text-6xl text-white uppercase leading-[0.9] mb-6">
                                {chapter.title}
                            </h2>
                            <p className="font-mono text-sm md:text-base text-gray-400 leading-relaxed mb-8 border-l border-[#333] pl-4">
                                {chapter.description}
                            </p>

                            <button
                                onClick={() => setModalData(chapter)}
                                className="group flex items-center gap-2 text-white font-bold uppercase tracking-tight hover:text-[#FF2A00] transition-colors"
                            >
                                <span>Open Briefing</span>
                                <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 right-8 font-mono text-[10px] text-gray-600 tracking-widest hidden md:block">
                    SCROLL TO NAVIGATE // {activeChapter + 1}/{chapters.length}
                </div>
            </div>

            {/* Modal */}
            <BrutalModal
                isOpen={!!modalData}
                onClose={() => setModalData(null)}
                title={modalData?.title || ''}
                subtitle={`INTEL DATE: ${modalData?.date}`}
            >
                <div className="font-mono text-sm text-gray-300 leading-relaxed">
                    <h4 className="text-[#FF2A00] text-xs uppercase tracking-widest mb-4">
                        {modalData?.modalContent.title}
                    </h4>
                    <p>
                        {modalData?.modalContent.body}
                    </p>
                </div>
            </BrutalModal>

        </section>
    );
};

export default StoryTimeline;
