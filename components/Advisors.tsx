import React from 'react';

interface Advisor {
    name: string;
    image: string;
    tags: string[];
}

const advisorsList: Advisor[] = [
    { name: 'Alex Schwarzkopf', image: '/Mr. Alex Schwarzkopf.jpg', tags: ['STRATEGY', 'LOGISTICS'] },
    { name: 'Brandon Turk', image: '/Mr. Brandon Turk.jpg', tags: ['DEFENSE', 'TACTICAL'] },
    { name: 'Jeremy Wilkinson', image: '/Mr. Jeremy Wilkinson.jpg', tags: ['INTELLIGENCE', 'SECURITY'] },
    { name: 'Jin Abe', image: '/Mr. Jin Abe.png', tags: ['ROBOTICS', 'AUTONOMY'] },
    { name: 'Joe Cieslik', image: '/Mr. Joe Cieslik.png', tags: ['SYSTEMS', 'OPS'] },
];

const Advisors: React.FC = () => {
    return (
        <section className="py-24 bg-brutal-gray border-b border-brutal-line">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-[#333] pb-8">
                    <div>
                        <h3 className="font-sans font-black text-3xl md:text-5xl text-white uppercase tracking-tighter">
                            Advisory Board
                        </h3>
                        <p className="font-mono text-sm text-white/50 mt-2 max-w-md">
                            Guidance from leaders in defense, logistics, and autonomous systems.
                        </p>
                    </div>
                    <div className="font-mono text-xs text-[#FF2A00] tracking-widest uppercase mt-4 md:mt-0">
                        // CLEARANCE: PUBLIC
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {advisorsList.map((advisor) => (
                        <div key={advisor.name} className="group relative">
                            {/* Image Container */}
                            <div className="aspect-[3/4] overflow-hidden bg-black/50 grayscale hover:grayscale-0 transition-all duration-500 border border-[#333] group-hover:border-white/50 relative">
                                <img
                                    src={advisor.image}
                                    alt={advisor.name}
                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                />

                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80"></div>

                                {/* Content Overlay */}
                                <div className="absolute bottom-0 left-0 w-full p-4">
                                    <div className="font-sans font-bold text-white text-sm md:text-base leading-tight uppercase mb-2">
                                        {advisor.name}
                                    </div>
                                    <div className="flex flex-wrap gap-1">
                                        {advisor.tags.map(tag => (
                                            <span key={tag} className="text-[9px] font-mono bg-[#FF2A00]/20 text-[#FF2A00] px-1 py-0.5 border border-[#FF2A00]/30">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Advisors;
