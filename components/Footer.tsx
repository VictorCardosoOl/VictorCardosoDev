
import React from 'react';
import { CONTACT_INFO } from '../constants';
import { usePageTransition } from './ui/PageTransition';

const Footer: React.FC = () => {
  const { transitionTo } = usePageTransition();
  const year = new Date().getFullYear();

  return (
    <footer id="site-footer" className="relative bg-white text-black w-full flex flex-col overflow-hidden z-20 pt-24">
      
      <div className="px-6 md:px-12 lg:px-16 w-full max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-4 mb-24">
        
        {/* Left Column: Social & Contact */}
        <div className="flex flex-col gap-2 text-xs md:text-sm font-mono tracking-tight">
          <div className="flex gap-4">
            <span className="w-24 opacity-60">social media:</span>
            <div className="flex gap-4">
              {CONTACT_INFO.socials.map((social, idx) => (
                <a key={idx} href={social.url} target="_blank" rel="noopener noreferrer" className="hover:opacity-40 transition-opacity">
                  {social.name}
                </a>
              ))}
            </div>
          </div>
          <div className="flex gap-4">
            <span className="w-24 opacity-60">say hello:</span>
            <a href={`mailto:${CONTACT_INFO.email}`} className="hover:opacity-40 transition-opacity">
              {CONTACT_INFO.email}
            </a>
          </div>
        </div>

        {/* Center Column: Policies & Copyright */}
        <div className="flex flex-col items-center text-center text-xs md:text-sm font-mono tracking-tight gap-6">
          <div className="flex flex-col gap-1">
            <a href="#" className="hover:opacity-40 transition-opacity">Refund policy</a>
            <a href="#" className="hover:opacity-40 transition-opacity">Terms of service</a>
            <a href="#" className="hover:opacity-40 transition-opacity">Privacy notice</a>
          </div>
          <div className="flex flex-col gap-1 text-[9px] md:text-[10px] opacity-60">
            <span>Copyright © {year} Victor Cardoso</span>
            <span>All rights reserved.</span>
          </div>
        </div>

        {/* Right Column: Navigation */}
        <div className="flex justify-start md:justify-end text-xs md:text-sm font-mono tracking-tight">
          <div className="flex gap-4 md:gap-6 flex-wrap md:justify-end">
            <button onClick={() => transitionTo('#home')} className="hover:opacity-40 transition-opacity">home</button>
            <button onClick={() => transitionTo('#projects')} className="hover:opacity-40 transition-opacity">projects</button>
            <button onClick={() => transitionTo('#about')} className="hover:opacity-40 transition-opacity">about</button>
            <button onClick={() => transitionTo('#services')} className="hover:opacity-40 transition-opacity">services</button>
            <button onClick={() => transitionTo('#faq')} className="hover:opacity-40 transition-opacity">FAQ</button>
          </div>
        </div>

      </div>

      {/* Huge Text at the bottom */}
      <div className="relative w-full flex justify-center items-end overflow-hidden mt-auto pb-8 md:pb-12">
        <h1 className="text-[28vw] leading-[0.8] font-serif font-light text-black tracking-tight select-none">
          Victor
        </h1>
      </div>

    </footer>
  );
};

export default Footer;
