import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const MotionDiv = motion.div as any;
const MotionNav = motion.nav as any;
const MotionA = motion.a as any;

interface MenuItem {
  label: string;
  link: string;
}

interface SocialItem {
  label: string;
  link: string;
}

interface StaggeredMenuProps {
  isOpen: boolean;
  onClose: () => void;
  items: MenuItem[];
  socialItems: SocialItem[];
  onNavClick: (href: string) => void;
  activeSection?: string;
}

const StaggeredMenu: React.FC<StaggeredMenuProps> = ({ 
  isOpen, 
  onClose, 
  items, 
  socialItems, 
  onNavClick, 
  activeSection 
}) => {

  // Lock scroll on body when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleLinkClick = (href: string) => {
    onClose();
    onNavClick(href);
  };

  return (
    <div className={`staggered-menu-wrapper fixed top-0 left-0 w-full h-full pointer-events-none z-[9990] ${isOpen ? 'pointer-events-auto' : ''}`}>
      
      {/* Backdrop (Darkens the background) */}
      <AnimatePresence>
        {isOpen && (
          <MotionDiv 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#000000]/40 backdrop-blur-sm z-30 cursor-pointer"
          />
        )}
      </AnimatePresence>

      {/* Main Sliding Panel - Now Full Height & Centered Layout */}
      <AnimatePresence>
        {isOpen && (
           <>
             {/* Decorative Prelayer for visual stagger effect */}
             <MotionDiv 
                initial={{ x: "100%" }}
                animate={{ x: "0%" }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                className="absolute top-0 right-0 h-full w-full md:w-[480px] bg-[#111111] z-35 pointer-events-none"
             />

             {/* Content Panel */}
             <MotionNav 
                initial={{ x: "100%" }}
                animate={{ x: "0%" }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
                className="absolute top-0 right-0 h-full w-full md:w-[480px] bg-[#000000] flex flex-col z-40 shadow-2xl border-l border-white/5"
             >
                {/* 
                    LAYOUT ARCHITECTURE:
                    We use a flex-col layout with `justify-between` or `justify-center`.
                    Instead of fixed padding-top (which cuts content on small screens), 
                    we use safe flex spacing.
                */}
                <div className="flex flex-col h-full w-full px-8 md:px-16 pt-24 pb-8 md:pb-12 overflow-y-auto custom-scrollbar relative">
                   
                   {/* Background Detail */}
                   <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

                   {/* 1. Main Navigation Links (Centered vertically) */}
                   <div className="flex-1 flex flex-col justify-center min-h-[400px]">
                       <ul className="flex flex-col gap-2 md:gap-4 lg:gap-6 counter-reset-list" style={{ counterReset: 'smItem' }}>
                          {items.map((item, i) => (
                             <li key={i} className="overflow-hidden relative group">
                                 <MotionA 
                                   href={item.link}
                                   onClick={(e: any) => { e.preventDefault(); handleLinkClick(item.link); }}
                                   className={`block relative font-serif font-light leading-[0.9] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] no-underline select-none group-hover:pl-8 md:group-hover:pl-12 ${activeSection === item.link.replace('#', '') ? 'text-white' : 'text-white/30 hover:text-white'}`}
                                   // Responsive Giant Fonts: Clamped to avoid cutoff on short screens
                                   style={{ fontSize: 'clamp(3rem, 10vh, 7rem)' }}
                                   initial={{ y: "100%", opacity: 0 }}
                                   animate={{ y: "0%", opacity: 1 }}
                                   transition={{ delay: 0.3 + (i * 0.08), duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                 >
                                    {/* Number indicator - Editorial style */}
                                    <span className="absolute -left-4 md:-left-8 top-1/2 -translate-y-1/2 text-[10px] font-mono text-white/20 opacity-0 group-hover:opacity-100 transition-all duration-500 tracking-[0.3em]">
                                       {(i + 1).toString().padStart(2, '0')}
                                    </span>
                                    {item.label}
                                 </MotionA>
                             </li>
                          ))}
                       </ul>
                   </div>

                   {/* 2. Footer Section (Socials & Info) - Anchored at bottom but flexible */}
                   <MotionDiv 
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      className="mt-12 border-t border-white/5 pt-10 shrink-0 relative z-10"
                   >
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
                          <div className="space-y-6">
                            <span className="text-[9px] font-mono uppercase tracking-[0.4em] text-white/30 block">Conexão</span>
                            <div className="flex flex-wrap gap-x-10 gap-y-4">
                                {socialItems.map((social, i) => (
                                    <a 
                                        key={i} 
                                        href={social.link} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 hover:text-white transition-all duration-500 border-b border-transparent hover:border-white/30 pb-1"
                                    >
                                    {social.label}
                                    </a>
                                ))}
                            </div>
                          </div>

                          <div className="text-right hidden md:block">
                             {/* Footer copyright removido */}
                          </div>
                      </div>
                  </MotionDiv>

                </div>
             </MotionNav>
           </>
        )}
      </AnimatePresence>
      
    </div>
  );
};

export default StaggeredMenu;