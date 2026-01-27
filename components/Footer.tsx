import React, { useState, useEffect } from 'react';
import { CONTACT_INFO } from '../constants';
import { ArrowUpRight } from 'lucide-react';
import Magnetic from './ui/Magnetic';
import { usePageTransition } from './ui/PageTransition';
import { motion, AnimatePresence } from 'framer-motion';

const Footer: React.FC = () => {
  const { transitionTo } = usePageTransition();
  const year = new Date().getFullYear();
  const [isHovered, setIsHovered] = useState(false);
  const [time, setTime] = useState('');

  // Live Time Logic
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer id="site-footer" className="relative bg-[#0B232E] text-paper w-full flex flex-col justify-between overflow-hidden">
      
      {/* Background Image Reveal on Hover (Mask Effect) */}
      <AnimatePresence>
        {isHovered && (
            <motion.div 
                initial={{ opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
                animate={{ opacity: 0.2, clipPath: 'inset(0% 0 0 0)' }}
                exit={{ opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className="absolute inset-0 z-0 pointer-events-none"
            >
                <img 
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1600&h=900" 
                    alt="Office Atmosphere" 
                    className="w-full h-full object-cover grayscale"
                />
            </motion.div>
        )}
      </AnimatePresence>

      {/* Main Container - Flexible height with generous padding */}
      <div className="container mx-auto px-6 md:px-12 xl:px-20 relative z-10 flex-1 flex flex-col py-16 md:py-24 gap-12">
         
         {/* Live Status Widget */}
         <div className="flex justify-between items-start border-b border-white/10 pb-6 shrink-0">
             <div className="flex flex-col">
                 <span className="text-micro text-white/40 mb-1">Status em Tempo Real</span>
                 <div className="flex items-center gap-3">
                     <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-20"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                     </span>
                     <span className="text-sm font-bold text-white">São Paulo, BR &mdash; {time}</span>
                 </div>
             </div>
             <div className="text-right hidden md:block">
                 <span className="text-micro text-white/40 mb-1">Disponibilidade</span>
                 <span className="text-sm font-light text-white block">Agenda Q3/Q4 Aberta</span>
             </div>
         </div>

         {/* Massive CTA Section */}
         <div className="flex-1 flex flex-col justify-center items-center text-center">
            <Magnetic strength={0.2}>
                <a 
                   href="mailto:contato@seudominio.com" 
                   onMouseEnter={() => setIsHovered(true)}
                   onMouseLeave={() => setIsHovered(false)}
                   className="group relative block"
                >
                    <span className="text-micro text-white/60 mb-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                        [ INICIAR PROTOCOLO ]
                    </span>
                    {/* Clamped Font Size to ensure it fits any screen */}
                    <h2 className="text-[clamp(3rem,9vw,7rem)] leading-[0.9] font-serif font-medium tracking-tighter text-paper mix-blend-difference z-20 relative transition-all duration-700 group-hover:tracking-normal pb-2">
                        Vamos <br/>
                        <span className="italic text-white/20 group-hover:text-white transition-colors duration-700">Trabalhar?</span>
                    </h2>
                </a>
            </Magnetic>
         </div>

         {/* Bottom Bar & Colophon */}
         <div className="w-full border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-end gap-6 shrink-0">
             
             {/* Left: Colophon */}
             <div className="flex flex-col gap-2 max-w-md">
                 <span className="text-micro text-white/40">Ficha Técnica</span>
                 <p className="text-[10px] text-white/60 font-mono leading-relaxed">
                    Tipografia: Zodiak & JetBrains Mono. <br/>
                    Stack: React, TailwindCSS & Framer Motion. <br/>
                    &copy; {year} Victor Cardoso.
                 </p>
             </div>

             {/* Right: Socials */}
             <div className="flex flex-wrap gap-6 md:gap-8">
                 {CONTACT_INFO.socials.map((social, idx) => (
                    <a 
                        key={idx}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-micro text-white hover:text-white/70 transition-colors flex items-center gap-1 group"
                    >
                        {social.name} <ArrowUpRight size={10} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                 ))}
             </div>

         </div>

      </div>
    </footer>
  );
};

export default Footer;