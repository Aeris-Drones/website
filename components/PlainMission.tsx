import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PlainMission: React.FC = () => {
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
        <section ref={containerRef} className="py-32 md:py-48 bg-brutal-bg text-white border-b border-brutal-line flex items-center justify-center">
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

export default PlainMission;
