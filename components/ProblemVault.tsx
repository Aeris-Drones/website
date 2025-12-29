import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * PROBLEM VAULT
 * A high-end, premium "Humaan-style" problem section.
 * Theme: Light, Engineered, Blueprint-Aesthetic (matching Kinetic Grid)
 * 
 * Features:
 * - Fluid Text Masking
 * - Minimalist Typography
 * - Blueprint Grid System
 * - Smooth Parallax "Data Objects"
 */

const ProblemVault: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const maskTextRef = useRef<HTMLHeadingElement>(null);
    const videoContainerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // 1. PINNING & MAIN TIMELINE
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=300%",
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1,
                }
            });

            // 2. THE REVEAL LOOP
            // Initial state: "CHAOS" text is visible, video is masked by it

            // Step A: Text Scales up slightly as we scroll
            tl.to(maskTextRef.current, {
                scale: 1.2,
                duration: 2,
                ease: "none"
            }, 0);

            // Step B: The Mask opens up (Humaan style)
            // We'll use a circular reveal or a rectangular expand
            tl.to(videoContainerRef.current, {
                clipPath: "inset(0% 0% 0% 0%)",
                duration: 4,
                ease: "power2.inOut"
            }, 0);

            // Step C: Text fades out as video fills screen
            tl.to(maskTextRef.current, {
                opacity: 0,
                y: -100,
                filter: "blur(20px)",
                duration: 2,
                ease: "power2.in"
            }, 1);

            // 3. CONTENT ARRIVAL (Parallax Cards)
            tl.fromTo(contentRef.current,
                { autoAlpha: 0, y: 100 },
                { autoAlpha: 1, y: 0, duration: 2 },
                "-=1"
            );

            cardRefs.current.forEach((card, i) => {
                tl.fromTo(card,
                    { y: 200, opacity: 0, rotateX: 10 },
                    { y: 0, opacity: 1, rotateX: 0, duration: 1.5, ease: "power3.out" },
                    "-=1.5"
                );
            });

            // Subtle parallax for all cards after they arrive
            gsap.to(cardRefs.current, {
                y: (i) => -60 * (i + 1),
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative h-screen bg-[#F5F5F7] text-black overflow-hidden font-sans"
        >
            {/* 1. BLUEPRINT GRID (Subtle background) */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: `radial-gradient(#000 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

            {/* 2. THE MASKED VIDEO LAYER */}
            <div
                ref={videoContainerRef}
                className="absolute inset-0 z-10 bg-black overflow-hidden flex items-center justify-center transition-all"
                style={{ clipPath: "inset(25% 35% 25% 35%)" }} // Starting "window"
            >
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover opacity-70 scale-110"
                >
                    <source src="/AERIS Montage.mp4" type="video/mp4" />
                </video>

                {/* Overlay for legibility */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
            </div>

            {/* 3. HERO TEXT (THE MASK TARGET) */}
            <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                <h2
                    ref={maskTextRef}
                    className="text-[14vw] font-black uppercase tracking-tighter leading-none text-white mix-blend-difference text-center"
                >
                    CHAOS <br /> <span className="text-transparent" style={{ WebkitTextStroke: '2px white' }}>REIGNS</span>
                </h2>
            </div>

            {/* 4. CONTENT CARDS (Visible after reveal) */}
            <div
                ref={contentRef}
                className="absolute inset-0 z-30 flex flex-col items-center justify-end pb-24 md:pb-32 px-6 pointer-events-none"
            >
                <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 pointer-events-auto">

                    {/* Card 01 */}
                    <div
                        ref={el => cardRefs.current[0] = el}
                        className="group bg-white/10 backdrop-blur-xl border border-white/20 p-8 md:p-10 shadow-2xl"
                    >
                        <div className="w-8 h-[2px] bg-red-600 mb-6 group-hover:w-full transition-all duration-500" />
                        <span className="font-mono text-xs text-red-500 uppercase tracking-[0.3em] font-bold block mb-4">01 // THE BLINDNESS</span>
                        <h3 className="text-white text-3xl font-bold mb-4 tracking-tight uppercase">Fragmented Feeds</h3>
                        <p className="text-gray-400 text-sm leading-relaxed font-light">
                            In high-stakes environments, intelligence is often isolated. Decision makers are forced to piece together a puzzle while the clock is ticking.
                        </p>
                    </div>

                    {/* Card 02 */}
                    <div
                        ref={el => cardRefs.current[1] = el}
                        className="group bg-white/10 backdrop-blur-xl border border-white/20 p-8 md:p-10 shadow-2xl"
                    >
                        <div className="w-8 h-[2px] bg-red-600 mb-6 group-hover:w-full transition-all duration-500" />
                        <span className="font-mono text-xs text-red-500 uppercase tracking-[0.3em] font-bold block mb-4">02 // THE LATENCY</span>
                        <h3 className="text-white text-3xl font-bold mb-4 tracking-tight uppercase">Critical Delay</h3>
                        <p className="text-gray-400 text-sm leading-relaxed font-light">
                            Current systems rely on centralized infrastructure that fails when you need it most. Seconds lost in transmission are measured in mission failure.
                        </p>
                    </div>

                    {/* Card 03 */}
                    <div
                        ref={el => cardRefs.current[2] = el}
                        className="group bg-white/10 backdrop-blur-xl border border-white/20 p-8 md:p-10 shadow-2xl"
                    >
                        <div className="w-8 h-[2px] bg-red-600 mb-6 group-hover:w-full transition-all duration-500" />
                        <span className="font-mono text-xs text-red-500 uppercase tracking-[0.3em] font-bold block mb-4">03 // THE VOID</span>
                        <h3 className="text-white text-3xl font-bold mb-4 tracking-tight uppercase">The Dark Zone</h3>
                        <p className="text-gray-400 text-sm leading-relaxed font-light">
                            When communication drops, you are flying blind. We are sending professionals into the dark because our technology hasn't caught up.
                        </p>
                    </div>

                </div>

                {/* HUD ELEMENT: BOTTOM LEFT */}
                <div className="absolute bottom-8 left-8 flex flex-col gap-2 font-mono text-[10px] text-white/40 uppercase tracking-widest hidden md:block">
                    <div>LOC_LAT: 34.0522 N</div>
                    <div>LOC_LNG: 118.2437 W</div>
                    <div>STATUS: ANALYZING_THREAT_MODEL</div>
                </div>

                {/* HUD ELEMENT: BOTTOM RIGHT */}
                <div className="absolute bottom-8 right-8 text-right hidden md:block">
                    <div className="w-32 h-[1px] bg-white/20 mb-2" />
                    <div className="font-mono text-[10px] text-white/40 uppercase tracking-widest">AERIS /// DEFENSE_INTEL</div>
                </div>
            </div>

        </section>
    );
};

export default ProblemVault;
