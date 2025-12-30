import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQ_DATA = [
    {
        question: "How does the technology work?",
        answer: "It's a hierarchical swarm. Small 'Scout' drones enter buildings or fly low, using SLAM to map without GPS. A larger 'Ranger' drone hovers high above, acting as a comms relay and data hub. Our edge-native software, Aeris OS, runs on the drones themselves, meaning they keep working even if connection to the ground is lost."
    },
    {
        question: "Do I need technical knowledge to use Aeris?",
        answer: "No. Aeris is designed to be operator-friendly. Once deployed, the drones handle navigation, obstacle avoidance, and data fusion autonomously. Operators see a simple unified map with visual alerts—no piloting or technical expertise required. Training takes hours, not weeks."
    },
    {
        question: "Can you integrate with our existing systems?",
        answer: "Yes. Aeris is built to complement your current tools, not replace them. We provide standard data outputs (video feeds, GPS coordinates, thermal overlays) that plug into existing command center software. Our API allows custom integrations for larger organizations."
    },
    {
        question: "Is Aeris secure and reliable?",
        answer: "Absolutely. All communications are encrypted end-to-end. The drones operate on a private mesh network, not public internet. If one drone goes down, the swarm automatically redistributes tasks. Aeris OS is designed for GPS-denied and offline scenarios—reliability in chaos is our core promise."
    },
];


const FAQ: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="bg-black text-white border-t border-white/20">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-24">
                {/* Header */}
                <div className="mb-8 lg:mb-0">
                    <h2 className="font-sans font-black text-4xl md:text-8xl leading-[0.85] mb-4 md:mb-8 text-white">
                        FAQ<span className="text-[#ff3b00]">+</span>
                    </h2>
                    <p className="font-mono text-sm text-gray-500 border-l border-white/20 pl-4 uppercase tracking-widest">
                        Common Inquiries
                    </p>
                </div>

                {/* Questions */}
                <div className="lg:col-span-2 space-y-4">
                    {FAQ_DATA.map((faq, idx) => (
                        <div
                            key={idx}
                            className="border-b border-white/10"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                                className="w-full py-5 md:py-8 flex items-start justify-between text-left group"
                            >
                                <div className="pr-4 md:pr-8">
                                    <span className="font-mono text-[10px] md:text-xs text-[#ff3b00] block mb-2 uppercase tracking-widest">0{idx + 1} //</span>
                                    <h3 className="font-sans font-bold text-lg md:text-2xl text-white group-hover:text-[#ff3b00] transition-colors uppercase leading-tight">
                                        {faq.question}
                                    </h3>
                                </div>
                                <div className={`mt-1 transform transition-transform duration-300 ${openIndex === idx ? 'rotate-45' : 'rotate-0'}`}>
                                    <Plus className="w-5 h-5 md:w-6 md:h-6 text-white/40 group-hover:text-[#ff3b00]" />
                                </div>
                            </button>
                            <AnimatePresence>
                                {openIndex === idx && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="p-8 md:p-10 pt-0 text-gray-400 font-mono text-sm md:text-base leading-relaxed max-w-3xl">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
