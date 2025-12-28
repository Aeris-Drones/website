import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Solution: React.FC = () => {
  const componentRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop: Pin the section
      mm.add("(min-width: 1024px)", () => {
        ScrollTrigger.create({
          trigger: componentRef.current,
          start: "top top",
          end: "+=50%", // Hold for 50% of viewport height
          pin: true,
          pinSpacing: true,
        });
      });
      
      // Mobile: Optional animations or just let it scroll naturally
    }, componentRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={componentRef} className="lg:min-h-screen border-b border-brutal-line bg-brutal-bg text-brutal-fg relative flex flex-col justify-center overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-4 lg:h-full w-full">
        {/* Sidebar Header Column */}
        <div className="col-span-1 lg:col-span-1 p-6 sm:p-8 md:p-10 lg:p-12 border-b lg:border-b-0 lg:border-r border-brutal-line flex flex-col justify-center lg:sticky lg:top-0 lg:h-auto z-20 bg-brutal-bg min-w-0 max-w-full overflow-hidden">
          <div className="w-full max-w-full">
            <h3 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl uppercase tracking-tighter leading-tight sm:leading-none mb-4 sm:mb-6 break-words max-w-full">
              The<br/>Solution<span className="text-brutal-accent">.</span>
            </h3>
            <p className="font-mono text-gray-400 text-sm sm:text-base leading-relaxed border-l-2 border-brutal-accent pl-3 sm:pl-4 pr-2 sm:pr-0 max-w-full">
              Aeris is a drone system designed for agriculture and search-and-rescue operations. It transforms chaos into clarity through data-driven insights, fusing multi-spectral data at the edge to turn fragmented feeds into a single command map.
            </p>
          </div>
        </div>

        {/* Features Column */}
        <div className="col-span-1 lg:col-span-3 relative flex flex-col justify-center h-full min-w-0 max-w-full overflow-hidden">
          {/* Feature 1 */}
          <div className="group border-b border-brutal-line flex-1 flex flex-col justify-center transition-colors cursor-crosshair hover:bg-white hover:text-black relative py-8 sm:py-10 md:py-12 lg:py-0">
            <div className="px-6 sm:px-8 md:px-10 lg:px-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sm:gap-6 relative z-10 min-w-0 max-w-full">
                <h3 className="font-sans font-black text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl uppercase break-words min-w-0 flex-shrink max-w-full">
                    One Map.
                </h3>
                <div className="flex flex-col items-start md:items-end md:text-right opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 min-w-0 flex-shrink">
                    <span className="font-mono text-xs uppercase tracking-widest mb-2 text-brutal-accent">01 /// FUSION</span>
                    <p className="font-mono text-sm sm:text-base max-w-md text-gray-400 lg:group-hover:text-black">
                        Fuses thermal, LiDAR, and RGB into a single operational picture.
                    </p>
                </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="group border-b border-brutal-line flex-1 flex flex-col justify-center transition-colors cursor-crosshair hover:bg-white hover:text-black relative py-8 sm:py-10 md:py-12 lg:py-0">
            <div className="px-6 sm:px-8 md:px-10 lg:px-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sm:gap-6 relative z-10 min-w-0 max-w-full">
                <h3 className="font-sans font-black text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl uppercase break-words min-w-0 flex-shrink max-w-full">
                    No Cloud.
                </h3>
                <div className="flex flex-col items-start md:items-end md:text-right opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 min-w-0 flex-shrink">
                    <span className="font-mono text-xs uppercase tracking-widest mb-2 text-brutal-accent">02 /// OFFLINE</span>
                    <p className="font-mono text-sm sm:text-base max-w-md text-gray-400 lg:group-hover:text-black">
                        Works when the internet is dead. Local mesh network.
                    </p>
                </div>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="group border-b border-brutal-line flex-1 flex flex-col justify-center transition-colors cursor-crosshair hover:bg-white hover:text-black relative py-8 sm:py-10 md:py-12 lg:py-0">
            <div className="px-6 sm:px-8 md:px-10 lg:px-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sm:gap-6 relative z-10 min-w-0 max-w-full">
                <h3 className="font-sans font-black text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl uppercase break-words min-w-0 flex-shrink max-w-full">
                    Swarm IQ.
                </h3>
                <div className="flex flex-col items-start md:items-end md:text-right opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 min-w-0 flex-shrink">
                    <span className="font-mono text-xs uppercase tracking-widest mb-2 text-brutal-accent">03 /// AUTONOMY</span>
                    <p className="font-mono text-sm sm:text-base max-w-md text-gray-400 lg:group-hover:text-black">
                        Scouts search autonomously. Ranger relays the data.
                    </p>
                </div>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="group flex-1 flex flex-col justify-center transition-colors cursor-crosshair hover:bg-white hover:text-black relative py-8 sm:py-10 md:py-12 lg:py-0">
            <div className="px-6 sm:px-8 md:px-10 lg:px-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sm:gap-6 relative z-10 min-w-0 max-w-full">
                <h3 className="font-sans font-black text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl uppercase break-words min-w-0 flex-shrink max-w-full">
                    Modular Pods.
                </h3>
                <div className="flex flex-col items-start md:items-end md:text-right opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 min-w-0 flex-shrink">
                    <span className="font-mono text-xs uppercase tracking-widest mb-2 text-brutal-accent">04 /// HOT-SWAP</span>
                    <p className="font-mono text-sm sm:text-base max-w-md text-gray-400 lg:group-hover:text-black">
                        Universal frame. Mission-specific pods. Click in, auto-configure, fly.
                    </p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solution;