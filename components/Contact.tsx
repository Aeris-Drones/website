import React from 'react';
import { ArrowRight } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="bg-brutal-accent text-black p-6 md:p-24 pb-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mb-24">
          <div>
            <h2 className="font-sans font-black text-6xl md:text-8xl leading-[0.85] mb-8">
              DEPLOY<br />NOW.
            </h2>
            <p className="font-mono text-sm max-w-sm border-l border-black pl-4">
              We are selecting pilot partners for Q3 deployment. Fire departments and infrastructure operators priority.
            </p>
          </div>
          
          <form className="space-y-0 border border-black" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="EMAIL ADDRESS" 
              className="w-full bg-transparent border-b border-black p-6 placeholder-black font-mono focus:outline-none focus:bg-white/10" 
            />
            <textarea 
              rows={3} 
              placeholder="MISSION BRIEF" 
              className="w-full bg-transparent border-b border-black p-6 placeholder-black font-mono focus:outline-none focus:bg-white/10"
            ></textarea>
            <button className="w-full p-6 text-left font-sans font-bold text-xl hover:bg-black hover:text-white transition-colors flex justify-between items-center group">
              TRANSMIT
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </button>
          </form>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-end border-t border-black pt-6 font-mono text-xs">
          <div>
            © 2024 AERIS SYSTEMS<br />
            TOKYO / IOWA
          </div>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:underline">LEGAL</a>
            <a href="#" className="hover:underline">PRIVACY</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;