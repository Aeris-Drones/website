import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQ_DATA = [
    {
        question: "What is Aeris?",
        answer: "Aeris is a coordinated drone swarm system for rapid field operations. We deploy Scout (indoor/agile) and Ranger (outdoor/relay) drones that work together. A modular Ground Control Unit fuses their thermal and video feeds into a single live map, turning scattered footage into prioritized, actionable alerts."
    },
    {
        question: "What problem does it solve?",
        answer: "In disasters, decisions are often made with incomplete, delayed, and fragmented info. Teams lose time stitching together partial views. Aeris solves this 'coordination gap' by using multiple drones for multipoint coverage and a unified map, reducing wasted time and lowering human risk."
    },
    {
        question: "How does the technology work?",
        answer: "It's a hierarchical swarm. Small 'Scout' drones enter buildings or fly low, using SLAM to map without GPS. A larger 'Ranger' drone hovers high above, acting as a comms relay and data hub. Our edge-native software, Aeris OS, runs on the drones themselves, meaning they keep working even if connection to the ground is lost."
    },

];

const FAQ: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="bg-black text-white border-t border-white/20">
            <div className="grid grid-cols-1 lg:grid-cols-3">
                {/* Header */}
                <div className="col-span-1 p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-white/20 bg-white/5">
                    <h3 className="font-sans font-black text-4xl md:text-5xl uppercase tracking-tighter mb-4 text-[#ff3b00]">
                        FAQ
                    </h3>
                    <p className="font-mono text-sm text-gray-400 max-w-sm">
                        Answers to critical questions about the Aeris platform.
                    </p>
                </div>

                {/* Questions List */}
                <div className="col-span-1 lg:col-span-2">
                    {FAQ_DATA.map((item, index) => (
                        <div
                            key={index}
                            className="border-b border-white/20 last:border-b-0"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-8 md:p-10 hover:bg-white/5 transition-colors text-left group"
                            >
                                <span className="font-sans font-bold text-xl md:text-2xl uppercase group-hover:text-[#ff3b00] transition-colors pr-8">
                                    {item.question}
                                </span>
                                <div className="shrink-0 text-[#ff3b00]">
                                    {openIndex === index ? <Minus /> : <Plus />}
                                </div>
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="p-8 md:p-10 pt-0 text-gray-400 font-mono text-sm md:text-base leading-relaxed max-w-3xl">
                                            {item.answer}
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
