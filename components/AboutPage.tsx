import React, { useState, useRef, useEffect, useLayoutEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X, Play, Pause, SkipBack, SkipForward,
    Activity, BoxSelect, Users, Cpu, Globe, Target, Wind,
    ChevronRight, Mail, ExternalLink, Plus
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);
import Navbar from './Navbar';
import Contact from './Contact';

// --- MILESTONES DATA ---
const MILESTONES = [
    {
        id: 'M-01',
        date: 'OCT 2024',
        title: 'THE GENESIS',
        subtitle: 'Skool Community Meeting',
        desc: 'Aahan and Saketh connected through the Skool community. We identified a critical gap: existing drones fail in high-wind disaster scenarios.',
        details: 'Drafted the initial \"Swarm\" architecture on a napkin. The goal was infrastructure, not toys.',
        visual: 'formation',
        coords: '44.291, -102.1'
    },
    {
        id: 'M-02',
        date: 'MAY 2025',
        title: 'UNIT EXPANSION',
        subtitle: 'Roster Growth',
        desc: 'Daniel and Lucas joined the squadron. Hardware architecture defined. First theoretical swarm logic mapped.',
        details: 'Remote synchronization established. Two hardware engineers, one software architect, one ops lead.',
        visual: 'schematic',
        coords: '37.774, -122.4'
    },
    {
        id: 'M-03',
        date: 'JUL 2025',
        title: 'THE CRUCIBLE',
        subtitle: 'SDG Global Challenge',
        desc: 'First public deployment of the concept. "Autonomous Response Swarms for Climate Resilience".',
        details: 'Competed against 500+ global entries. Stress-tested the theoretical mesh network logic.',
        visual: 'globe',
        coords: '40.712, -74.00'
    },
    {
        id: 'M-04',
        date: 'AUG 2025',
        title: 'VALIDATION',
        subtitle: 'Global Runner-Up',
        desc: 'Secured Runner-Up status. Judges noted the "brutally efficient" design compared to complex legacy systems.',
        details: 'Proved that low-cost, expendable swarms outperform high-cost single units in simulation.',
        visual: 'medal',
        coords: '48.856, 2.3522'
    },
    {
        id: 'M-05',
        date: 'INTERSTITIAL',
        title: 'JIN ABE',
        subtitle: 'Inspiration Protocol',
        desc: ' Inspired by the philosophy of Jin Abe. His approach to resilient infrastructure drives our safety protocols.',
        details: 'Abe\'s work in early warning systems provides the foundational ethical framework for AERIS.',
        visual: 'portrait',
        coords: '35.676, 139.65'
    },
    {
        id: 'M-06',
        date: 'OCT 2025',
        title: 'CAPITAL',
        subtitle: '1517 Fund / Medici',
        desc: 'Grant secured: $50,000+. Resources allocated to prototype fabrication and propulsion testing.',
        details: 'Validated by 1517 Fund\'s rigorous "sci-fi to reality" criteria. Not just money—operational validation.',
        visual: 'chart',
        coords: '34.052, -118.2'
    },
    {
        id: 'M-07',
        date: 'DEC 2025',
        title: 'FIELD CONTACT',
        subtitle: 'SAR Commander Briefing',
        desc: 'Direct consultation with Search & Rescue leadership. "We don\'t need 4k video, we need location data."',
        details: 'Pivoted strategy to thermal-first telemetry based on real-world trauma data.',
        visual: 'thermal',
        coords: '47.606, -122.3'
    }
];

// --- TEAM DATA (The Founders) ---
const TEAM = [
    {
        id: 'T-01',
        name: 'Aahan Batra',
        role: 'Operations & Finance',
        initials: 'AB',
        image: '/aahan.png',
        bio: 'Leads operations and finance, ensuring the project\'s financial sustainability and outreach. Connected with Saketh through the Skool community, united by a shared concern about natural disaster response.',
        responsibilities: ['Operations', 'Finance', 'Outreach']
    },
    {
        id: 'T-02',
        name: 'Saketh Baddam',
        role: 'Software Lead',
        initials: 'S',
        image: '/saketh.png',
        bio: 'Builds the complex software that powers the drone\'s mission capabilities. Develops Aeris OS, the edge-native software stack that runs the entire system.',
        responsibilities: ['Software Architecture', 'Aeris OS', 'AI/ML Systems']
    },
    {
        id: 'T-03',
        name: 'Daniel Umemezie',
        role: 'Systems Design',
        initials: 'D',
        image: '/daniel.png',
        bio: 'Designs the core systems that allow drones to function intelligently and reliably. Responsible for coordination, deconfliction, and system architecture.',
        responsibilities: ['Systems Design', 'Coordination Logic', 'Integration']
    },
    {
        id: 'T-04',
        name: 'Lucas Halvorsen',
        role: 'Hardware Lead',
        initials: 'L',
        image: '/lucas.png',
        bio: 'Develops the drone\'s physical design and field-ready structure. Focuses on ruggedized platforms that can withstand extreme conditions.',
        responsibilities: ['Hardware Design', 'Airframe', 'Manufacturing']
    }
];

// --- ADVISORS DATA ---
const ADVISORS = [
    {
        id: 'A-01',
        name: 'Jin Abe',
        role: 'Honorary Advisor',
        image: '/Mr. Jin Abe.png',
        note: 'If such a system had existed—if that kind of information had been available—we could have been far better prepared. The drone can enter rubble, create maps, and provide vital information to rescue teams.'
    },
    {
        id: 'A-02',
        name: 'Jeremy Wilkinson',
        role: 'Firefighter / Paramedic',
        image: '/Mr. Jeremy Wilkinson.jpg',
        bio: 'Firefighter/Paramedic at the Plano Fire Department in Plano, Texas. Brings direct field experience in rapid response and emergency operations to the AERIS mission.'
    },
    {
        id: 'A-03',
        name: 'Joe Cieslik',
        role: 'Defense Tech Entrepreneur',
        image: '/Mr. Joe Cieslik.png',
        bio: 'Serial defense technology entrepreneur and self-taught software engineer. Previously at LaunchDarkly and COO of Modern Intelligence. Founder of Aeon and Longinus. Advisor to Foratus and AERIS Drones.'
    },
    {
        id: 'A-04',
        name: 'Alex Schwarzkopf',
        role: 'Venture Partner, 1517 Fund',
        image: '/Mr. Alex Schwarzkopf.jpg',
        bio: 'Venture Partner at 1517 Fund, backing early-stage founders. Co-founded Pillar Technologies (construction sensors). Facilitated AERIS Drones\' first investment—a grant from the 1517 Medici Fund.'
    },
    {
        id: 'A-05',
        name: 'Brandon Turk',
        role: 'Co-Founder, Rocket Drones',
        image: '/Mr. Brandon Turk.jpg',
        bio: 'Community Engagement Director and Co-founder of Rocket Drones. Self-taught aviation professional specializing in drone infrastructure inspections. Revolutionizing hands-on drone education.'
    },
    {
        id: 'A-06',
        name: 'Christopher Boyer',
        role: 'Exec. Director, NASAR',
        image: '/unnamed (3).webp',
        bio: 'Executive Director of the National Association for Search and Rescue (NASAR). 30+ years in SAR and emergency management. Court-recognized expert on scent behavior for search dogs.'
    }
];

// --- QUOTES DATA ---
const QUOTES = [
    {
        id: 'Q-01',
        text: '"AERIS can make things safer for everyone—the public, because we can reach them faster, and the fire department, because we know exactly what we’re walking into."',
        author: 'Jeremy Wilkinson',
        context: 'Chief of USAR, Iowa'
    },
    {
        id: 'Q-02',
        text: '"If such a system had existed—if that kind of information had been available—we could have been far better prepared."',
        author: 'Jin Abe',
        context: 'March 11th Tsunami Survivor'
    },
    {
        id: 'Q-03',
        text: '"From a helping people perspective, search and rescue is certainly it. Nobody\'s getting hurt, you\'re saving somebody\'s life, this is good."',
        author: 'Joe Cieslik',
        context: 'Aerospace Entrepreneur'
    }
];

// --- VALUES DATA ---
const VALUES = [
    {
        title: 'MISSION CRITICAL',
        desc: 'We do not build toys. We build infrastructure for the worst days of your life.'
    },
    {
        title: 'SPEED IS SAFETY',
        desc: 'Fast decisions save lives. We get you intel in seconds, not minutes.'
    },
    {
        title: 'EDGE NATIVE',
        desc: 'Works offline. No internet? No problem. The drones think for themselves.'
    }
];

const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

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
            // Split text animation logic would go here if we had SplitText, 
            // but for now we'll do a simple opacity/y fade up
            gsap.fromTo(".quote-word",
                { y: 20, opacity: 0, filter: "blur(10px)" },
                {
                    y: 0,
                    opacity: 1,
                    filter: "blur(0px)",
                    duration: 0.6,
                    ease: "power2.out",
                    stagger: 0.03,
                    delay: 0.2
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
        <div className="bg-black text-white min-h-screen relative overflow-hidden">
            <Navbar />

            <section
                ref={containerRef}
                className="relative h-screen w-full flex flex-col items-center border-b border-[#333] pt-14"
            >
                {/* 1. Background Video Layer (Video is masked by Layer 2) */}
                <div className="absolute inset-0 z-0 top-14">
                    <video
                        className="w-full h-full object-cover opacity-90"
                        autoPlay
                        muted
                        loop
                        playsInline
                        src="/Copy%20of%20AERIS%20Montage.mp4"
                    />
                </div>

                {/* 2. Mask Layer (Black BG + Multiply to create video-text effect) */}
                {/* 
                    Logic: This layer covers the video with black. 
                    The 'AERIS' text is transparent (white with multiply), letting video show through.
                    This layer MUST NOT contain standard white text elements, or they will also become transparent/video-masked.
                */}
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

                {/* 3. The Quote - Separate Layer (Sitting ON TOP of the black mask) */}
                {/* 
                    Since Layer 2 is black (blocked), this layer sits at Z-20 to be visible.
                    It has no mix-blend-mode, so it renders as solid white pixels.
                    Positioned absolutely to sit visually underneath the title area.
                */}
                <div className="absolute w-full top-[65vh] md:top-[70vh] z-20 flex justify-center pointer-events-none px-6">
                    <div ref={quoteRef} className="max-w-5xl text-center font-mono text-lg md:text-2xl lg:text-3xl leading-relaxed tracking-widest text-white/90 uppercase">
                        <p>
                            {renderQuote()}
                        </p>
                    </div>
                </div>

                {/* 4. High-End Technical Details Overlay */}
                {/* 4. High-End Technical Details Overlay - REMOVED */}

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

                {/* Footer / Scroll Indicator */}
                {!isPlaying && (
                    <div className="absolute bottom-8 w-full flex justify-between px-8 z-20 pointer-events-none mix-blend-difference text-white opacity-60 font-mono text-xs uppercase tracking-widest">
                    </div>
                )}
            </section>


            {/* Added: Plain Mission Section */}
            <PlainMissionSection />

            {/* Added: Interactive Timeline Console */}
            <TimelineConsole />

            {/* Team Section (includes Advisors) */}
            <TeamSection />

            {/* Values Section */}
            <ValuesSection />

            {/* Testimonials Section */}
            <TestimonialsSection />

            {/* Contact Section */}
            <Contact />
        </div>
    );
};

// Internal Component for the Mission Section
const PlainMissionSection: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const subRef = useRef<HTMLParagraphElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });

            tl.fromTo(textRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
            )
                .fromTo(subRef.current,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
                    "-=0.6"
                );

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="py-32 md:py-48 bg-brutal-bg text-white border-t border-brutal-line flex items-center justify-center relative z-10">
            <div className="container mx-auto px-6 max-w-5xl text-center">

                {/* Main Headline */}
                <h2
                    ref={textRef}
                    className="font-sans font-bold text-3xl md:text-5xl lg:text-6xl leading-tight md:leading-none tracking-tight mb-8"
                >
                    Aeris is a team of drones that helps responders <span className="text-brutal-accent">see everything at once</span>.
                </h2>

                {/* Plain English Subs */}
                <p
                    ref={subRef}
                    className="font-mono text-base md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
                >
                    Instead of scattered video feeds, Aeris merges them into <span className="text-white">one live map</span> and highlights what matters.
                </p>

            </div>
        </section>
    );
};

// =============================================================================
// PREMIUM COMMAND CENTER TIMELINE
// =============================================================================

// Animated floating particles
const Particles: React.FC = () => {
    const particles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5,
    }));

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full bg-[#ff3b00]/30"
                    style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%` }}
                    animate={{
                        y: [0, -100, 0],
                        opacity: [0, 0.8, 0],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: "linear",
                    }}
                />
            ))}
        </div>
    );
};

// Radar sweep animation
const RadarSweep: React.FC = () => (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden opacity-30">
        <div className="relative w-[500px] h-[500px]">
            {[1, 2, 3].map((ring) => (
                <div
                    key={ring}
                    className="absolute inset-0 border border-[#ff3b00]/20 rounded-full"
                    style={{ transform: `scale(${ring * 0.33})` }}
                />
            ))}
            <motion.div
                className="absolute top-1/2 left-1/2 w-1/2 h-[2px] origin-left"
                style={{ background: 'linear-gradient(90deg, #ff3b00 0%, transparent 100%)' }}
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute top-1/2 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 bg-[#ff3b00] rounded-full" />
        </div>
    </div>
);

// Simple text wrapper (glitch effect removed)
const GlitchText: React.FC<{ children: string; className?: string }> = ({ children, className }) => (
    <span className={className}>{children}</span>
);

// HUD Corner element
const HUDCorner: React.FC<{ position: 'tl' | 'tr' | 'bl' | 'br' }> = ({ position }) => {
    const corners = {
        tl: 'top-0 left-0 border-t-2 border-l-2',
        tr: 'top-0 right-0 border-t-2 border-r-2',
        bl: 'bottom-0 left-0 border-b-2 border-l-2',
        br: 'bottom-0 right-0 border-b-2 border-r-2',
    };

    return (
        <motion.div
            className={cn("absolute w-6 h-6 border-[#ff3b00]/40", corners[position])}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
        />
    );
};

// Progress ring
const ProgressRing: React.FC<{ progress: number; size?: number }> = ({ progress, size = 56 }) => {
    const strokeWidth = 2;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <svg width={size} height={size} className="transform -rotate-90">
            <circle cx={size / 2} cy={size / 2} r={radius} stroke="rgba(255,59,0,0.15)" strokeWidth={strokeWidth} fill="none" />
            <motion.circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="#ff3b00"
                strokeWidth={strokeWidth}
                fill="none"
                strokeLinecap="round"
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: offset }}
                transition={{ duration: 0.5 }}
                style={{ strokeDasharray: circumference }}
            />
        </svg>
    );
};

const TimelineConsole: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlayingTimeline, setIsPlayingTimeline] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const currentData = MILESTONES[currentIndex];
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const progress = ((currentIndex + 1) / MILESTONES.length) * 100;

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') nextStep();
            if (e.key === 'ArrowLeft') prevStep();
            if (e.key === ' ') { e.preventDefault(); togglePlay(); }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentIndex, isPlayingTimeline]);

    const nextStep = useCallback(() => {
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % MILESTONES.length);
            setIsTransitioning(false);
        }, 150);
    }, []);

    const prevStep = useCallback(() => {
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev - 1 + MILESTONES.length) % MILESTONES.length);
            setIsTransitioning(false);
        }, 150);
    }, []);

    const togglePlay = useCallback(() => {
        if (isPlayingTimeline) {
            if (timerRef.current) clearInterval(timerRef.current);
            setIsPlayingTimeline(false);
        } else {
            setIsPlayingTimeline(true);
            timerRef.current = setInterval(() => {
                setIsTransitioning(true);
                setTimeout(() => {
                    setCurrentIndex((prev) => (prev + 1) % MILESTONES.length);
                    setIsTransitioning(false);
                }, 150);
            }, 5000);
        }
    }, [isPlayingTimeline]);

    useEffect(() => {
        return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }, []);

    const jumpTo = (idx: number) => {
        if (idx === currentIndex) return;
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentIndex(idx);
            setIsTransitioning(false);
        }, 150);
    };

    return (
        <section className="relative min-h-screen bg-[#030303] border-y border-white/5 overflow-hidden">

            {/* Ambient Background */}
            <div className="absolute inset-0">
                <motion.div
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                        backgroundSize: '50px 50px',
                    }}
                    animate={{ backgroundPosition: ['0px 0px', '50px 50px'] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <Particles />
                <RadarSweep />
                <div className="absolute inset-0 opacity-[0.015] pointer-events-none"
                    style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)' }} />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#030303_70%)]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 lg:py-24">

                {/* Header */}
                <motion.div
                    className="mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >

                    <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.85]">
                        <GlitchText>OUR</GlitchText>
                        <br />
                        <span className="text-[#ff3b00]">STORY</span>
                    </h2>
                </motion.div>

                {/* Main Display */}
                <div className="relative">
                    <motion.div
                        className="relative aspect-[16/9] md:aspect-[21/9] w-full bg-black/80 backdrop-blur-sm border border-white/10 rounded-sm overflow-hidden"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        style={{ willChange: 'transform, opacity' }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <HUDCorner position="tl" />
                        <HUDCorner position="tr" />
                        <HUDCorner position="bl" />
                        <HUDCorner position="br" />

                        {/* Background Images for All Slides */}
                        {currentData.visual === 'formation' && (
                            <div className="absolute inset-0 opacity-35">
                                <div className="flex h-full">
                                    <img src="/aahan.png" alt="Aahan" className="w-1/2 h-full object-cover grayscale" />
                                    <img src="/saketh.png" alt="Saketh" className="w-1/2 h-full object-cover grayscale" />
                                </div>
                            </div>
                        )}
                        {currentData.visual === 'schematic' && (
                            <div className="absolute inset-0 opacity-35">
                                <div className="flex h-full">
                                    <img src="/daniel.png" alt="Daniel" className="w-1/2 h-full object-cover grayscale" style={{ objectPosition: 'center 15%' }} />
                                    <img src="/lucas.png" alt="Lucas" className="w-1/2 h-full object-cover grayscale" style={{ objectPosition: 'center 15%' }} />
                                </div>
                            </div>
                        )}
                        {currentData.visual === 'globe' && (
                            <div className="absolute inset-0 opacity-35">
                                <img
                                    src="/Comm. Material.png"
                                    alt="SDG Challenge Background"
                                    className="w-full h-full object-cover grayscale"
                                />
                            </div>
                        )}
                        {currentData.visual === 'medal' && (
                            <div className="absolute inset-0 opacity-35">
                                <img
                                    src="/validate.png"
                                    alt="Validation Background"
                                    className="w-full h-full object-cover grayscale"
                                />
                            </div>
                        )}
                        {currentData.visual === 'portrait' && (
                            <div className="absolute inset-0 opacity-35">
                                <img
                                    src="/jan abe.png"
                                    alt="Jin Abe Background"
                                    className="w-full h-full object-cover grayscale"
                                />
                            </div>
                        )}
                        {currentData.visual === 'chart' && (
                            <div className="absolute inset-0 opacity-35">
                                <img
                                    src="/1517.jpg"
                                    alt="1517 Fund Background"
                                    className="w-full h-full object-cover grayscale"
                                />
                            </div>
                        )}

                        {/* Top Bar */}
                        <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-black/90 to-transparent z-20 flex items-center justify-between px-6">
                            <div className="flex items-center gap-4">
                                <motion.div className="w-2 h-2 rounded-full bg-[#ff3b00]" animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1, repeat: Infinity }} />
                                <span className="font-mono text-[10px] text-white/50 uppercase tracking-widest">Log Playback</span>
                            </div>
                        </div>

                        {/* Visual Content */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentData.id}
                                className="absolute inset-0 flex items-center justify-center"
                                initial={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
                                animate={{ opacity: isTransitioning ? 0 : 1, scale: 1, filter: 'blur(0px)' }}
                                exit={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }}
                                transition={{ duration: 0.4 }}
                            >
                                {/* Visual content removed - backgrounds are now displayed */}
                            </motion.div>
                        </AnimatePresence>

                        {/* Bottom Content */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/95 to-transparent pt-24 pb-8 px-8 md:px-12">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentIndex}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.4 }}
                                    className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6"
                                >
                                    <div className="max-w-xl">
                                        <div className="flex items-center gap-4 mb-3">
                                            <span className="px-3 py-1 bg-[#ff3b00] text-black font-mono font-bold text-xs">{currentData.date}</span>
                                            <span className="font-mono text-xs text-[#ff3b00]/70 uppercase tracking-widest">{currentData.subtitle}</span>
                                        </div>
                                        <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-4 leading-[0.9]">
                                            <GlitchText>{currentData.title}</GlitchText>
                                        </h3>
                                        <p className="text-gray-400 text-base md:text-lg leading-relaxed">{currentData.desc}</p>
                                    </div>

                                    <motion.button
                                        onClick={() => setModalOpen(true)}
                                        className="group flex items-center gap-3 px-6 py-4 bg-[#ff3b00]/10 border border-[#ff3b00]/30 hover:bg-[#ff3b00] hover:border-[#ff3b00] transition-all"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <span className="font-mono text-xs uppercase text-white group-hover:text-black tracking-widest">Access Briefing</span>
                                        <BoxSelect className="w-4 h-4 text-[#ff3b00] group-hover:text-black" />
                                    </motion.button>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </motion.div>

                    {/* Controls */}
                    <motion.div
                        className="mt-8 flex flex-col lg:flex-row items-center gap-8"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                    >
                        <div className="flex items-center gap-6">
                            <div className="relative">
                                <ProgressRing progress={progress} />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="font-mono text-[10px] text-[#ff3b00]">{Math.round(progress)}%</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <motion.button onClick={prevStep} className="p-3 border border-white/10 hover:border-[#ff3b00] text-white transition-all" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <SkipBack className="w-4 h-4" />
                                </motion.button>
                                <motion.button
                                    onClick={togglePlay}
                                    className={cn("p-4 border transition-all", isPlayingTimeline ? "border-[#ff3b00] bg-[#ff3b00] text-black" : "border-[#ff3b00]/50 bg-[#ff3b00]/10 text-white hover:bg-[#ff3b00] hover:text-black")}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {isPlayingTimeline ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                                </motion.button>
                                <motion.button onClick={nextStep} className="p-3 border border-white/10 hover:border-[#ff3b00] text-white transition-all" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <SkipForward className="w-4 h-4" />
                                </motion.button>
                            </div>
                        </div>

                        {/* Scrubber */}
                        <div className="flex-1 w-full">
                            <div className="relative h-16 flex items-center">
                                <div className="absolute left-0 right-0 top-1/2 h-px bg-white/10" />
                                <motion.div
                                    className="absolute left-0 top-1/2 h-[2px] bg-gradient-to-r from-[#ff3b00] to-[#ff3b00]/50"
                                    initial={false}
                                    animate={{ width: `${(currentIndex / (MILESTONES.length - 1)) * 100}%` }}
                                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                                />

                                <div className="relative w-full flex justify-between">
                                    {MILESTONES.map((m, idx) => (
                                        <motion.button
                                            key={idx}
                                            onClick={() => jumpTo(idx)}
                                            className="group relative flex flex-col items-center focus:outline-none"
                                            whileHover={{ scale: 1.1 }}
                                        >
                                            <motion.div
                                                className={cn(
                                                    "w-3 h-3 rotate-45 border-2 transition-all relative",
                                                    idx === currentIndex ? "bg-[#ff3b00] border-[#ff3b00] scale-125" : idx < currentIndex ? "bg-[#ff3b00]/50 border-[#ff3b00]/50" : "bg-black border-white/20 group-hover:border-[#ff3b00]"
                                                )}
                                                animate={idx === currentIndex ? { boxShadow: ['0 0 0px #ff3b00', '0 0 15px #ff3b00', '0 0 0px #ff3b00'] } : {}}
                                                transition={{ duration: 1.5, repeat: Infinity }}
                                            />
                                            <span className={cn(
                                                "absolute top-6 font-mono text-[9px] uppercase tracking-wider whitespace-nowrap transition-all",
                                                idx === currentIndex ? "text-[#ff3b00] opacity-100" : "text-white/30 opacity-0 group-hover:opacity-100"
                                            )}>
                                                {m.date}
                                            </span>
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <div className="mt-4 flex justify-center">
                        <span className="font-mono text-[10px] text-white/20 uppercase tracking-widest">← → Navigate • Space Play/Pause</span>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {modalOpen && (
                    <motion.div className="fixed inset-0 z-[100] flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <motion.div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={() => setModalOpen(false)} />
                        <motion.div
                            className="relative max-w-2xl w-full bg-[#0a0a0a] border border-[#ff3b00]/30 overflow-hidden"
                            initial={{ opacity: 0, scale: 0.9, y: 40 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 40 }}
                            transition={{ type: "spring", damping: 25 }}
                        >
                            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)' }} />

                            <div className="relative p-6 border-b border-white/10">
                                <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 p-2 text-white/40 hover:text-[#ff3b00] transition-colors"><X className="w-5 h-5" /></button>
                                <div className="flex items-center gap-3 mb-2">
                                    <motion.div className="w-2 h-2 bg-[#ff3b00] rounded-full" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1, repeat: Infinity }} />
                                    <span className="font-mono text-[10px] text-[#ff3b00] uppercase tracking-[0.2em]">Classified // {currentData.id}</span>
                                </div>
                                <h3 className="text-3xl font-black text-white uppercase tracking-tight">{currentData.title}</h3>
                                <p className="font-mono text-xs text-white/40 mt-1">{currentData.date} • {currentData.subtitle}</p>
                            </div>

                            <div className="p-6">
                                <p className="text-white/80 leading-relaxed text-lg">{currentData.details}</p>
                            </div>

                            <div className="px-6 py-4 border-t border-white/10 flex justify-end items-center bg-black/50">
                                <span className="font-mono text-[10px] text-[#ff3b00] uppercase tracking-widest">Authorized Access</span>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

// =============================================================================
// TEAM SECTION (Original Brutalist Style)
// =============================================================================
// =============================================================================
// TEAM SECTION (Interactive Brutalist Style)
// =============================================================================
const TeamSection: React.FC = () => {
    const [selectedMember, setSelectedMember] = useState<any | null>(null);

    return (
        <section className="border-t border-white/10 bg-[#050505] relative">
            {/* Section Header */}
            <div className="border-b border-white/10 p-8 md:p-12">
                <h2 className="font-sans font-black text-4xl md:text-5xl uppercase tracking-tight text-white">
                    Team<span className="text-[#ff3b00]">.</span>
                </h2>
            </div>

            {/* Core Team Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-b border-white/10">
                {TEAM.map((member, idx) => (
                    <motion.div
                        key={member.id}
                        className={cn(
                            "group relative overflow-hidden border-b md:border-b-0 border-white/10 hover:bg-white/5 transition-colors cursor-pointer",
                            idx < TEAM.length - 1 && "lg:border-r"
                        )}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        onClick={() => setSelectedMember(member)}
                    >
                        {/* Image */}
                        <div className="aspect-square overflow-hidden bg-black relative">
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                                style={
                                    member.name === 'Daniel Umemezie' || member.name === 'Lucas Halvorsen' || member.name === 'Aahan Batra'
                                        ? { objectPosition: 'center 15%' }
                                        : {}
                                }
                            />
                            <div className="absolute inset-0 bg-[#ff3b00]/20 opacity-0 group-hover:opacity-100 transition-opacity mix-blend-overlay" />
                        </div>
                        {/* Info */}
                        <div className="p-6 md:p-8 relative">
                            <span className="font-mono text-xs text-gray-500 block mb-2 uppercase tracking-widest">{member.role}</span>
                            <span className="font-sans font-black text-xl uppercase text-white">{member.name}</span>
                            <Plus className="absolute top-8 right-8 w-4 h-4 text-white/20 group-hover:text-[#ff3b00] opacity-0 group-hover:opacity-100 transition-all" />
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Advisors Header */}
            <div className="border-b border-white/10 p-8 md:p-12 bg-white/[0.02]">
                <h3 className="font-sans font-black text-2xl md:text-3xl uppercase tracking-tight text-white">
                    Advisors<span className="text-[#ff3b00]">.</span>
                </h3>
                <p className="font-mono text-sm text-gray-500 mt-2">Industry experts guiding our mission</p>
            </div>

            {/* Advisors Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {ADVISORS.map((advisor, index) => (
                    <motion.div
                        key={advisor.id}
                        className={cn(
                            "group relative overflow-hidden border-b lg:border-b-0 border-white/10 hover:bg-white/5 transition-colors cursor-pointer",
                            index < ADVISORS.length - 1 && "lg:border-r"
                        )}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => setSelectedMember(advisor)}
                    >
                        {/* Image */}
                        <div className="aspect-square overflow-hidden bg-black relative">
                            <img
                                src={advisor.image}
                                alt={advisor.name}
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-[#ff3b00]/20 opacity-0 group-hover:opacity-100 transition-opacity mix-blend-overlay" />
                        </div>
                        {/* Info */}
                        <div className="p-6 md:p-8 relative">
                            <span className="font-mono text-xs text-[#ff3b00] block mb-2 uppercase tracking-widest">{advisor.role}</span>
                            <span className="font-sans font-bold text-lg block text-white">{advisor.name}</span>
                            <Plus className="absolute top-8 right-8 w-4 h-4 text-white/20 group-hover:text-[#ff3b00] opacity-0 group-hover:opacity-100 transition-all" />
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Unified Modal */}
            <AnimatePresence>
                {selectedMember && (
                    <motion.div
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="absolute inset-0 bg-black/95 backdrop-blur-md"
                            onClick={() => setSelectedMember(null)}
                        />
                        <motion.div
                            className="relative max-w-4xl w-full bg-[#0a0a0a] border border-[#ff3b00]/30 overflow-hidden"
                            initial={{ opacity: 0, scale: 0.9, y: 40 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 40 }}
                        >
                            <button
                                onClick={() => setSelectedMember(null)}
                                className="absolute top-4 right-4 p-2 text-white/40 hover:text-[#ff3b00] transition-colors z-10"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="flex flex-col md:flex-row">
                                <div className="md:w-1/3 bg-black border-r border-white/10 relative min-h-[250px] md:min-h-full">
                                    {selectedMember.image ? (
                                        <img
                                            src={selectedMember.image}
                                            alt={selectedMember.name}
                                            className="w-full h-full object-cover grayscale"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-[#ff3b00]/20 to-black flex items-center justify-center">
                                            <span className="text-8xl font-black text-[#ff3b00]/40 uppercase">{selectedMember.initials || selectedMember.name.charAt(0)}</span>
                                        </div>
                                    )}
                                </div>
                                <div className="md:w-2/3 p-8">
                                    <p className="font-mono text-[10px] text-[#ff3b00] uppercase tracking-widest mb-2">{selectedMember.role}</p>
                                    <h3 className="text-3xl font-black text-white uppercase mb-6">{selectedMember.name}</h3>

                                    {selectedMember.bio && (
                                        <p className="text-white/70 leading-relaxed mb-6 border-l-2 border-[#ff3b00]/30 pl-4">{selectedMember.bio}</p>
                                    )}

                                    {selectedMember.note && (
                                        <p className="text-white/70 leading-relaxed mb-6 italic border-l-2 border-[#ff3b00]/30 pl-4">"{selectedMember.note}"</p>
                                    )}

                                    {selectedMember.responsibilities && (
                                        <div className="border-t border-white/10 pt-6">
                                            <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-3">Focus Areas</p>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedMember.responsibilities.map((r: string, i: number) => (
                                                    <span key={i} className="px-3 py-1 bg-[#ff3b00]/10 border border-[#ff3b00]/30 font-mono text-[10px] text-[#ff3b00] uppercase">
                                                        {r}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

// =============================================================================
// VALUES SECTION
// =============================================================================
const ValuesSection: React.FC = () => (
    <section className="py-24 lg:py-32 bg-[#050505] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
            <motion.div
                className="mb-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter">
                    CORE <span className="text-[#ff3b00]">DOCTRINE</span>
                </h2>
                <p className="font-mono text-sm text-white/40 mt-4 uppercase tracking-widest">Operating Principles</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {VALUES.map((value, idx) => (
                    <motion.div
                        key={idx}
                        className="bg-white/[0.02] border border-white/10 p-8 hover:border-[#ff3b00]/30 transition-colors group"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        <div className="w-12 h-1 bg-[#ff3b00] mb-6 group-hover:w-24 transition-all" />
                        <h3 className="text-2xl font-black text-white uppercase mb-4">{value.title}</h3>
                        <p className="text-white/60 leading-relaxed font-mono text-sm">{value.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

// =============================================================================
// TESTIMONIALS SECTION
// =============================================================================
const TestimonialsSection: React.FC = () => (
    <section className="py-24 lg:py-32 bg-[#050505] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
            <motion.div
                className="mb-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter">
                    FIELD <span className="text-[#ff3b00]">NOTES</span>
                </h2>
                <p className="font-mono text-sm text-white/40 mt-4 uppercase tracking-widest">What They Said</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {QUOTES.map((quote, idx) => (
                    <motion.div
                        key={quote.id}
                        className="bg-black border border-white/10 p-8 hover:border-[#ff3b00]/30 transition-colors"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        <p className="text-white/80 text-lg leading-relaxed mb-6 italic">{quote.text}</p>
                        <div className="border-t border-white/10 pt-4">
                            <p className="font-mono text-xs text-[#ff3b00] uppercase tracking-widest">{quote.author}</p>
                            <p className="font-mono text-[10px] text-white/40 mt-1">{quote.context}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

// =============================================================================


export default AboutPage;
