import React, { useRef, useEffect } from 'react';

const ScrollProgress: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const indicatorRef = useRef<HTMLDivElement>(null);
    const rafRef = useRef<number | null>(null);
    const currentProgress = useRef(0);
    const targetProgress = useRef(0);

    useEffect(() => {
        const updateTargetProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            targetProgress.current = docHeight > 0 ? scrollTop / docHeight : 0;
        };

        // Smooth animation loop using requestAnimationFrame
        const animate = () => {
            // Lerp (linear interpolation) for smooth animation
            const diff = targetProgress.current - currentProgress.current;
            currentProgress.current += diff * 0.12; // Adjust for smoothness (lower = smoother)

            // Apply transform for GPU-accelerated animation
            if (progressRef.current) {
                progressRef.current.style.transform = `scaleY(${currentProgress.current})`;
            }

            // Position indicator based on container height
            if (indicatorRef.current && containerRef.current) {
                const containerHeight = containerRef.current.offsetHeight;
                const indicatorPos = currentProgress.current * containerHeight;
                indicatorRef.current.style.transform = `translateY(${indicatorPos}px)`;
            }

            rafRef.current = requestAnimationFrame(animate);
        };

        // Initial calculation
        updateTargetProgress();

        // Start animation loop
        rafRef.current = requestAnimationFrame(animate);

        // Listen for scroll events
        window.addEventListener('scroll', updateTargetProgress, { passive: true });
        window.addEventListener('resize', updateTargetProgress, { passive: true });

        return () => {
            window.removeEventListener('scroll', updateTargetProgress);
            window.removeEventListener('resize', updateTargetProgress);
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed right-0 top-14 bottom-0 w-1 z-40 bg-brutal-line/20"
            aria-hidden="true"
        >
            {/* Progress fill - uses scaleY transform for smooth GPU-accelerated animation */}
            <div
                ref={progressRef}
                className="absolute top-0 left-0 w-full h-full bg-brutal-accent origin-top will-change-transform"
                style={{ transform: 'scaleY(0)' }}
            />

            {/* Current position indicator - positioned at the leading edge of the fill */}
            <div
                ref={indicatorRef}
                className="absolute top-0 left-0 w-full h-3 -translate-y-1/2 bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)] will-change-transform"
                style={{ transform: 'translateY(0px)' }}
            />
        </div>
    );
};

export default ScrollProgress;
