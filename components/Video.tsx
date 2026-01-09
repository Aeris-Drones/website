import React, { useState } from 'react';
import { Play, X } from 'lucide-react';

const Video: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleOpenVideo = () => {
    setIsPlaying(true);
  };

  const handleCloseVideo = () => {
    setIsPlaying(false);
  };

  return (
    <>
      <section 
        className="border-b border-brutal-line bg-brutal-gray relative group cursor-pointer overflow-hidden"
        onClick={handleOpenVideo}
      >
        {/* Container with 16:9 aspect ratio */}
        <div className="aspect-video relative w-full">
          {/* YouTube Thumbnail */}
          <img 
            src="https://img.youtube.com/vi/yvtbelz4szg/maxresdefault.jpg"
            alt="Video thumbnail"
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300"></div>

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
        </div>
      </section>

      {/* Full Screen Video Modal */}
      {isPlaying && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center animate-in fade-in duration-300">
          <button
            onClick={handleCloseVideo}
            className="absolute top-8 right-8 text-white hover:text-[#FF2A00] transition-all z-50 p-3 bg-black/80 border-2 border-white/30 hover:border-[#FF2A00] rounded-sm backdrop-blur-sm"
          >
            <X size={32} strokeWidth={2.5} />
          </button>

          <div className="w-full h-full p-4 md:p-12 flex items-center justify-center">
            <iframe
              className="w-full h-full max-h-[90vh] object-contain shadow-2xl shadow-[#FF2A00]/20 rounded-sm bg-black border border-[#222]"
              src="https://www.youtube.com/embed/yvtbelz4szg?autoplay=1"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Video;