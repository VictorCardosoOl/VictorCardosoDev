import React from 'react';
import { PROCESS_STEPS } from '../constants';
import { Reveal } from './ui/Reveal';

interface ProcessStep {
  id: string;
  title: string;
  description: string;
}

const Process: React.FC = () => {
  if (!PROCESS_STEPS || PROCESS_STEPS.length === 0) return null;

  return (
    <section id="process" className="py-12 md:py-16 bg-white text-[#111] relative overflow-hidden z-10 min-h-[50vh] flex flex-col justify-center">
      <div className="max-w-[1920px] mx-auto px-6 lg:px-12 md:px-16">
        <div className="mb-12 md:mb-16 max-w-2xl">
           <Reveal>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif font-light text-[#111] leading-[0.9] tracking-tighter uppercase mt-4">
                 COMO EU <br/>
                 <span className="text-[#999] italic lowercase">construo</span>
              </h2>
           </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {PROCESS_STEPS.map((step: ProcessStep, index: number) => (
            <Reveal key={step.id} delay={index * 150}>
              <div className="flex flex-col h-full border-t border-[#000000]/10 pt-8 mt-8 lg:mt-0 lg:border-t-0 lg:pt-0">
                 <span className="text-[5rem] md:text-[6rem] lg:text-[7.5rem] font-serif italic text-[#000000]/10 leading-none mb-8 md:mb-12 block select-none tracking-tighter">
                   {step.id}
                 </span>
                 <h3 className="text-xl md:text-2xl font-serif text-[#111] mb-4 tracking-tight">
                   {step.title}
                 </h3>
                 <p className="text-sm text-[#333] leading-relaxed font-sans max-w-sm">
                   {step.description}
                 </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
