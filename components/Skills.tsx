import React from 'react';
import { SKILLS } from '../constants';
import { Reveal } from './ui/Reveal';
import Tilt from './ui/Tilt';
import { CheckCircle2 } from 'lucide-react';
import { clsx } from 'clsx';

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 md:py-32 relative z-10 overflow-hidden">
      <div className="w-full max-w-[1920px] mx-auto px-6 md:px-12 lg:px-16">
        
        {/* Header Section */}
        <div className="text-center mb-16 md:mb-24 max-w-2xl mx-auto">
          <Reveal width="100%" variant="blur">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 block">Especialidades</span>
          </Reveal>
          <Reveal width="100%" variant="translate">
            <h2 className="text-4xl md:text-6xl font-serif font-light mb-6 text-slate-900 tracking-tight">
              Como posso agregar valor?
            </h2>
          </Reveal>
          <Reveal width="100%" variant="translate" delay={100}>
            <p className="text-slate-600 leading-relaxed font-light text-lg md:text-xl">
              Uma abordagem T-Shaped: profundo conhecimento em engenharia de software com ampla capacidade em design e produto.
            </p>
          </Reveal>
        </div>

        {/* 
            Smart Grid Layout:
            - Mobile: 1 Column
            - Tablet: 2 Columns
            - Desktop: 3 Columns
            - Aggressive gap: gap-12 lg:gap-16
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16 items-stretch">
          {SKILLS.map((skill, index) => {
            const Icon = skill.icon;
            
            const isLastItem = index === SKILLS.length - 1;
            const gridClasses = isLastItem ? "md:col-span-2 lg:col-span-1" : "";

            return (
              <div key={index} className={gridClasses}>
                <Reveal delay={index * 150} width="100%" variant="scale" className="h-full">
                  <Tilt strength={8} className="h-full">
                    <div 
                      className={clsx(
                        "h-full glass-card p-10 lg:p-12 rounded-sm border border-slate-200/60 transition-all duration-500 flex flex-col bg-white/40 relative overflow-hidden group",
                        "hover:-translate-y-2 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] hover:border-slate-300",
                        isLastItem && "md:px-16"
                      )}
                    >
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/60 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ mixBlendMode: 'soft-light' }} />

                      <div className="mb-10 transform transition-transform duration-500 group-hover:translate-z-10 relative z-10" style={{ transformStyle: 'preserve-3d' }}>
                        <div className="w-16 h-16 bg-white text-slate-900 rounded-sm flex items-center justify-center shadow-sm mb-8 border border-slate-100 group-hover:scale-110 transition-transform duration-500">
                          <Icon size={28} strokeWidth={1.5} />
                        </div>
                        
                        <h3 className="text-2xl md:text-3xl font-serif font-light mb-4 text-slate-900">
                          {skill.title}
                        </h3>
                        
                        <p className="text-base text-slate-500 leading-relaxed font-light max-w-sm">
                          {skill.description}
                        </p>
                      </div>

                      <div className="mt-auto pt-8 border-t border-slate-200/50 relative z-10">
                        <ul className={clsx(
                          "grid gap-4",
                          isLastItem ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-1" : "grid-cols-1"
                        )}>
                          {skill.items.map((item, idx) => (
                            <li key={idx} className="flex items-center gap-3 text-sm md:text-base font-medium text-slate-700">
                              <CheckCircle2 size={18} className="text-slate-400 shrink-0 group-hover:text-slate-900 transition-colors duration-300" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Tilt>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;