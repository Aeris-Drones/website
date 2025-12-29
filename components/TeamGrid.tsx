import React, { useState } from 'react';
import BrutalModal from './ui/BrutalModal';

interface Founder {
    id: string;
    name: string;
    role: string;
    modalSubtitle: string;
    responsibilities: string[];
    contribution: string;
}

const founders: Founder[] = [
    {
        id: 'daniel',
        name: 'Daniel',
        role: 'CORE SYSTEMS',
        modalSubtitle: 'SYSTEM ARCHITECT // PHYSICS ENGINE',
        responsibilities: [
            "Aeris OS Kernel Development",
            "Swarm Behavior Algorithms",
            "Hardware-Software Integration"
        ],
        contribution: "Architected the distributed mesh network protocol allowing offline swarm coordination in GPS-denied environments."
    },
    {
        id: 'aahan',
        name: 'Aahan',
        role: 'OPERATIONS',
        modalSubtitle: 'FIELD OPS // STRATEGY',
        responsibilities: [
            "Deployment Logistics",
            "Partnership Acquisition",
            "Regulatory Compliance"
        ],
        contribution: "Secured our first pilot program with a major West Coast fire department, validating the tech in live burn scenarios."
    },
    {
        id: 'lucas',
        name: 'Lucas',
        role: 'PHYSICAL',
        modalSubtitle: 'HARDWARE ENG // AERODYNAMICS',
        responsibilities: [
            "Airframe Design",
            "Propulsion Systems",
            "Durability Testing"
        ],
        contribution: "Engineered the 'Scout' drone chassis to withstand 40mph wind gusts while maintaining sub-millimeter hover stability."
    },
    {
        id: 'saketh',
        name: 'Saketh',
        role: 'MISSION CAP',
        modalSubtitle: 'MISSION CONTROL // UX',
        responsibilities: [
            "Command Interface Design",
            "Data Visualization",
            "Human-Swarm Interaction"
        ],
        contribution: "Designed the 'God-View' interface that condenses thousands of data points into a single actionable heatmap for commanders."
    }
];

const TeamGrid: React.FC = () => {
    const [selectedFounder, setSelectedFounder] = useState<Founder | null>(null);

    return (
        <section className="border-t border-brutal-line">
            <div className="grid grid-cols-1 md:grid-cols-2">
                {founders.map((founder, idx) => (
                    <div
                        key={founder.id}
                        onClick={() => setSelectedFounder(founder)}
                        className={`
                            group relative h-[400px] border-b border-brutal-line p-12 cursor-pointer transition-colors duration-300 hover:bg-[#0a0a0a]
                            ${idx % 2 === 0 ? 'md:border-r' : ''}
                        `}
                    >
                        {/* Background Hover Effect */}
                        <div className="absolute inset-0 bg-[url('/img/noise.png')] opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none"></div>

                        <div className="flex flex-col h-full justify-between relative z-10">
                            <div>
                                <span className="font-mono text-xs text-[#FF2A00] tracking-widest uppercase mb-4 block">
                                    0{idx + 1} // {founder.role}
                                </span>
                                <h3 className="font-sans font-black text-4xl md:text-5xl uppercase text-white group-hover:text-brutal-accent transition-colors">
                                    {founder.name}
                                </h3>
                            </div>

                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                                <span className="font-mono text-xs text-white/60 uppercase border-b border-white/20 pb-1">
                                    Access Dossier →
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Configured Modal */}
            <BrutalModal
                isOpen={!!selectedFounder}
                onClose={() => setSelectedFounder(null)}
                title={selectedFounder?.name || ''}
                subtitle={selectedFounder?.modalSubtitle}
            >
                <div className="space-y-8 font-mono text-white/80">
                    <div>
                        <h4 className="text-white text-xs uppercase tracking-widest border-b border-[#333] pb-2 mb-3">
                            Primary Directives
                        </h4>
                        <ul className="space-y-2 text-sm">
                            {selectedFounder?.responsibilities.map((resp, i) => (
                                <li key={i} className="flex items-start">
                                    <span className="text-[#FF2A00] mr-2">›</span>
                                    {resp}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white text-xs uppercase tracking-widest border-b border-[#333] pb-2 mb-3">
                            Key Contribution
                        </h4>
                        <p className="text-sm leading-relaxed text-[#FF2A00]">
                            {selectedFounder?.contribution}
                        </p>
                    </div>

                    <div className="pt-4 border-t border-[#333] border-dashed">
                        <div className="flex justify-between text-[10px] uppercase text-white/30">
                            <span>Status: ACTIVE</span>
                            <span>ID: {selectedFounder?.id.toUpperCase()}_001</span>
                        </div>
                    </div>
                </div>
            </BrutalModal>
        </section>
    );
};

export default TeamGrid;
