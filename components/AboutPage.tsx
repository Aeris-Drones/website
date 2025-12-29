import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, Play } from 'lucide-react';
import Navbar from './Navbar';
import PlainMission from './PlainMission';
import StoryTimeline from './StoryTimeline';
import TeamGrid from './TeamGrid';
import Advisors from './Advisors';
import Testimonials from './Testimonials';
import Contact from './Contact';

gsap.registerPlugin(ScrollTrigger);

const AboutPage: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    // Refs
    const cursorRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const quoteRef = useRef<HTMLDivElement>(null);

    // GSAP quickTo refs for optimized movement
    const xTo = useRef<gsap.QuickToFunc>();
    const yTo = useRef<gsap.QuickToFunc>();

    // 1. Setup GSAP & Mouse Listeners
    useEffect(() => {
        if (!cursorRef.current) return;

        // Set initial alignment (center the cursor on the mouse point)
        gsap.set(cursorRef.current, { xPercent: -50, yPercent: -50 });

        // Initialize quickTo for high-performance following
        // Using a slight duration provides that "weighty" premium feel
        xTo.current = gsap.quickTo(cursorRef.current, "x", { duration: 0.15, ease: "power2.out" });
        yTo.current = gsap.quickTo(cursorRef.current, "y", { duration: 0.15, ease: "power2.out" });

        // Mouse Move Handler
        const moveCursor = (e: MouseEvent) => {
            if (xTo.current && yTo.current) {
                xTo.current(e.clientX);
                yTo.current(e.clientY);
            }
        };

        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, []);

    // 2. Handle Hover State (Scale & Opacity)
    // Separate effect to handle entering/leaving the "AERIS" text area
    useEffect(() => {
        if (!cursorRef.current) return;

        if (isHovering) {
            gsap.to(cursorRef.current, {
                opacity: 1,
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        } else {
            gsap.to(cursorRef.current, {
                opacity: 0,
                scale: 0.5,
                duration: 0.3,
                ease: "power2.out"
            });
        }
    }, [isHovering]);

    // 3. Staggered Text Reveal for the Quote
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".quote-word",
                { y: 20, opacity: 0, filter: "blur(10px)" },
                {
                    y: 0,
                    opacity: 1,
                    filter: "blur(0px)",
                    duration: 1.5,
                    stagger: 0.05,
                    ease: "power4.out",
                    delay: 0.5
                }
            );

            // Animate the line
            gsap.fromTo(".quote-line",
                { scaleX: 0 },
                { scaleX: 1, duration: 1.5, ease: "expo.out", delay: 1 }
            );

        }, containerRef);
        return () => ctx.revert();
    }, []);

    const handleOpenVideo = () => {
        setIsPlaying(true);
    };

    const handleCloseVideo = () => {
        setIsPlaying(false);
    };

    // Helper to split text for animation
    const renderQuote = () => {
        const text = "When chaos made action impossible, we looked upward";
        const emphasis = "and began building.";

        return (
            <div className="relative inline-block">
                <span className="text-white/80 font-normal">
                    {text.split(" ").map((word, i) => (
                        <span key={i} className="quote-word inline-block mr-[0.3em]">{word}</span>
                    ))}
                </span>
                <span className="text-white font-bold relative inline-block">
                    {/* The emphasized part */}
                    {emphasis.split(" ").map((word, i) => (
                        <span key={`emp-${i}`} className="quote-word inline-block mr-[0.3em]">{word}</span>
                    ))}
                    {/* Underline for emphasis */}
                    <div className="quote-line absolute -bottom-1 left-0 w-full h-[1px] bg-[#FF2A00] origin-left"></div>
                </span>
            </div>
        );
    };

    return (
        <div className="bg-black text-white min-h-screen relative overflow-x-hidden">
            <Navbar />

            {/* HERO SECTION */}
            <section
                ref={containerRef}
                className="relative h-screen w-full flex flex-col items-center border-b border-[#333] pt-14"
            >
                {/* 1. Background Video Layer (Masked) */}
                <div className="absolute inset-0 z-0 top-14">
                    <video
                        className="w-full h-full object-cover opacity-90"
                        autoPlay
                        muted
                        loop
                        playsInline
                        src="/AERIS%20Montage.mp4"
                    />
                </div>

                {/* 2. Mask Layer */}
                <div
                    className="absolute inset-0 top-14 z-10 bg-black mix-blend-multiply flex flex-col items-center justify-start pt-[12vh] select-none"
                >
                    <h1
                        className="font-black text-[23vw] leading-[0.8] tracking-tighter text-white cursor-none transition-transform duration-700 hover:scale-[1.01] active:scale-95 origin-top"
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                        onClick={handleOpenVideo}
                    >
                        AERIS
                    </h1>
                </div>

                {/* 3. The Quote */}
                <div className="absolute w-full top-[65vh] md:top-[70vh] z-20 flex justify-center pointer-events-none px-6">
                    <div ref={quoteRef} className="max-w-5xl text-center font-mono text-lg md:text-2xl lg:text-3xl leading-relaxed tracking-widest text-white/90 uppercase">
                        <p>
                            {renderQuote()}
                        </p>
                    </div>
                </div>

                {/* 5. Custom Cursor (Z-30) */}
                <div
                    ref={cursorRef}
                    className="fixed top-0 left-0 w-32 h-32 bg-[#FF2A00] rounded-full z-30 pointer-events-none mix-blend-difference flex items-center justify-center opacity-0 scale-50"
                >
                    <div className="flex flex-col items-center justify-center gap-1">
                        <Play size={24} fill="white" className="text-white" />
                        <span className="text-white font-mono font-bold text-xs tracking-widest pl-1">INITIATE</span>
                    </div>
                </div>

                {/* 6. Full Screen Video Modal (Z-100) */}
                {isPlaying && (
                    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center animate-in fade-in duration-300">
                        <button
                            onClick={handleCloseVideo}
                            className="absolute top-8 right-8 text-white/50 hover:text-[#FF2A00] transition-colors z-50 p-2"
                        >
                            <X size={48} strokeWidth={1} />
                        </button>

                        <div className="w-full h-full p-4 md:p-12 flex items-center justify-center">
                            <video
                                className="w-full h-full max-h-[90vh] object-contain shadow-2xl shadow-[#FF2A00]/20 rounded-sm bg-black border border-[#222]"
                                autoPlay
                                controls
                                src="/AERIS%20Montage.mp4"
                                crossOrigin="anonymous"
                            >
                                <track
                                    kind="captions"
                                    src="/aeris_captions.vtt"
                                    srcLang="en"
                                    label="English"
                                    default
                                />
                            </video>
                        </div>
                    </div>
                )}
            </section>

            {/* MISSION */}
            <PlainMission />

            {/* STORY TIMELINE */}
            <StoryTimeline />

            {/* TEAM & FOUNDERS */}
            <TeamGrid />

            {/* ADVISORS */}
            <Advisors />

            {/* TESTIMONIALS */}
            <Testimonials />

            {/* CTA */}
            <Contact />

        </div>
    );
};

export default AboutPage;
