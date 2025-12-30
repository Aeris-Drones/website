import React from 'react';
import { Play } from 'lucide-react';

const Video: React.FC = () => {
  return (
    <section className="border-b border-brutal-line bg-brutal-gray relative group cursor-pointer overflow-hidden h-[40vh] md:h-[50vh]">
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <div className="w-20 h-20 md:w-32 md:h-32 border border-white rounded-full flex items-center justify-center group-hover:bg-brutal-accent group-hover:border-brutal-accent transition-all duration-300">
            <Play className="w-8 h-8 md:w-10 md:h-10 fill-current text-white group-hover:text-black" />
          </div>
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 font-mono text-xs uppercase tracking-widest text-center whitespace-nowrap">
            Initialize Briefing
          </div>
        </div>
      </div>
    </section>
  );
};

export default Video;