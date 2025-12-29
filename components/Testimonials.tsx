import React from 'react';

const Testimonials: React.FC = () => {
    const quotes = [
        {
            text: "The speed at which Aeris maps a disaster zone isn't just an improvement; it's a paradigm shift in first response logistics.",
            author: "Chief Batt. Operations",
            org: "LAFD (Retired)",
            classification: "UNCLASSIFIED // FIELD NOTE"
        },
        {
            text: "Infrastructure monitoring has always been reactive. Aeris gives us the predictive capability we've been missing for decades.",
            author: "Civil Engineering Lead",
            org: "Caltrans Advisory",
            classification: "CONFIDENTIAL // INTERNAL MEMO"
        }
    ];

    return (
        <section className="py-24 bg-brutal-bg border-b border-brutal-line">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="mb-12 border-l-4 border-brutal-accent pl-6">
                    <h3 className="font-sans font-black text-3xl md:text-4xl text-white uppercase tracking-tighter">
                        Field Reports
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {quotes.map((quote, idx) => (
                        <div key={idx} className="relative group">
                            {/* Card Look */}
                            <div className="border border-[#333] bg-[#0a0a0a] p-8 h-full transition-colors duration-300 hover:border-white/20">
                                {/* Header / Classification */}
                                <div className="font-mono text-[10px] text-[#FF2A00] tracking-widest mb-6 uppercase border-b border-[#333] pb-2 w-fit">
                                    {quote.classification}
                                </div>

                                {/* Body */}
                                <p className="font-mono text-sm md:text-base text-white/80 leading-relaxed mb-8">
                                    "{quote.text}"
                                </p>

                                {/* Footer */}
                                <div className="mt-auto">
                                    <div className="font-sans font-bold text-white uppercase tracking-tight">
                                        {quote.author}
                                    </div>
                                    <div className="font-mono text-xs text-white/40 uppercase mt-1">
                                        {quote.org}
                                    </div>
                                </div>
                            </div>

                            {/* Corner Accents */}
                            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/30 hidden group-hover:block transition-opacity"></div>
                            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/30 hidden group-hover:block transition-opacity"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
