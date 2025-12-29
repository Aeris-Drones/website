import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import gsap from 'gsap';

interface BrutalModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    subtitle?: string;
    children: React.ReactNode;
}

const BrutalModal: React.FC<BrutalModalProps> = ({ isOpen, onClose, title, subtitle, children }) => {
    const overlayRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            // Lock body scroll
            document.body.style.overflow = 'hidden';

            // Animate In
            const tl = gsap.timeline();
            tl.to(overlayRef.current, {
                opacity: 1,
                duration: 0.3,
                ease: "power2.out",
                display: "flex"
            })
                .fromTo(contentRef.current,
                    { y: 50, opacity: 0, scale: 0.95 },
                    { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "expo.out" },
                    "-=0.2"
                );
        } else {
            // Unlock body scroll
            document.body.style.overflow = 'auto';

            // Animate Out (handled by conditional rendering in parent usually, 
            // but for smooth exit we might need a dedicated exit state or AnimatePresence-like wrapper.
            // For simplicity in this brutalist setup, we'll just leverage the parent's unmount 
            // or if the parent keeps it mounted but hidden, we react here.
            // If the parent strictly unmounts on !isOpen, this cleanup won't run visually.
            // Assuming strict unmount for now to keep DOM light, 
            // but we can add an 'isActive' internal state if we need exit animations later.
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm hidden items-center justify-center p-4 md:p-6 opacity-0"
            onClick={onClose}
        >
            <div
                ref={contentRef}
                className="w-full max-w-2xl bg-[#0a0a0a] border border-[#333] shadow-2xl relative flex flex-col max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-[#333] bg-[#0f0f0f]">
                    <div>
                        <h2 className="font-sans font-bold text-xl md:text-2xl uppercase tracking-tight text-white">
                            {title}
                        </h2>
                        {subtitle && (
                            <p className="font-mono text-xs text-[#FF2A00] mt-1 tracking-widest uppercase">
                                {subtitle}
                            </p>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        className="text-white/50 hover:text-[#FF2A00] transition-colors p-2 -mr-2"
                        aria-label="Close Modal"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Content - Scrollable */}
                <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                    {children}
                </div>

                {/* Footer / Decor */}
                <div className="p-3 border-t border-[#333] bg-[#050505] flex justify-between items-center text-[10px] font-mono text-white/30 uppercase tracking-widest">
                    <span>SECURE::CONNECTION</span>
                    <span>// END TRANSMISSION</span>
                </div>
            </div>
        </div>
    );
};

export default BrutalModal;
