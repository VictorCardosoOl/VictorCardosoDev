import React, { useState, useEffect } from 'react';
import { NAV_LINKS } from '../../constants';
import { motion } from 'motion/react';

const links = [
  { name: 'Início', href: '#hero' },
  ...NAV_LINKS
];

const SidebarNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('#hero');
  const [showActiveLabel, setShowActiveLabel] = useState<boolean>(true);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isSidebarHovered, setIsSidebarHovered] = useState<boolean>(false);

  useEffect(() => {
    setShowActiveLabel(true);
    const timer = setTimeout(() => {
      setShowActiveLabel(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, [activeSection]);

  useEffect(() => {
    const handleScroll = () => {
      let current = '';
      const scrollPosition = window.scrollY + window.innerHeight * 0.4;

      for (const link of links) {
        const element = document.querySelector(link.href);
        if (element) {
          const { offsetTop, offsetHeight } = element as HTMLElement;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            current = link.href;
          }
        }
      }

      if (current && current !== activeSection) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  return (
    <div 
      className="fixed left-0 top-0 h-screen w-24 bg-transparent z-[9990] hidden md:flex flex-col justify-center"
      onMouseEnter={() => setIsSidebarHovered(true)}
      onMouseLeave={() => setIsSidebarHovered(false)}
    >
      <div className={`flex flex-col gap-5 pl-6 mix-blend-difference text-white transition-all duration-700 ${
        isSidebarHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8 pointer-events-none'
      }`}>
        {links.map((link, index) => {
          const isActive = activeSection === link.href;
          const isHovered = hoveredLink === link.href;
          const isLabelVisible = (isActive && showActiveLabel) || isHovered;
          const num = String(index + 1).padStart(2, '0');
          
          return (
            <a
              key={link.href}
              href={link.href}
              onMouseEnter={() => setHoveredLink(link.href)}
              onMouseLeave={() => setHoveredLink(null)}
              className={`flex items-center text-[10px] tracking-[0.25em] transition-all duration-500 ${
                isActive ? 'opacity-100' : 'opacity-40 hover:opacity-100'
              }`}
            >
              <span className="font-sans font-medium">{num}</span>
              <motion.div
                initial={false}
                animate={{
                  width: isLabelVisible ? 'auto' : 0,
                  opacity: isLabelVisible ? 1 : 0,
                  marginLeft: isLabelVisible ? '1rem' : '0rem'
                }}
                className="overflow-hidden whitespace-nowrap font-sans font-medium uppercase"
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                {link.name}
              </motion.div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default SidebarNav;
