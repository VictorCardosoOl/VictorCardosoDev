
import React from 'react';
import { Download, MapPin, ExternalLink, Globe, BookOpen, Camera, Award, Code, Briefcase, Terminal, Cpu, Database } from 'lucide-react';
import { Reveal } from './ui/Reveal';
import { motion } from 'framer-motion';
import { EDUCATION, WORK_EXPERIENCE, CONTACT_INFO } from '../constants';

const MotionImg = motion.img as any;

interface ResumeContentProps {
  layoutId?: string;
}

// --- HARD SKILLS DO CV ---
const HARD_SKILLS = {
    technical: [
        "Análise de Sistemas",
        "SQL & Banco de Dados",
        "Configuração de Hardware",
        "Ferramentas de Suporte Remoto",
        "SIGO WEB / W3 Ecosystem",
        "Lógica de Programação"
    ],
    management: [
        "Gestão de KPIs e SLAs",
        "Liderança de Equipes",
        "Treinamento Corporativo",
        "Gestão de Crises",
        "Documentação Técnica (KB)",
        "Key Account Management"
    ]
};

const SOFT_SKILLS = [
    "Habilidades Analíticas",
    "Liderança",
    "Comunicação Estratégica",
    "Resolução de Problemas",
    "Adaptabilidade",
    "Visão de Negócio",
    "Ensino & Mentoria"
];

export const ResumeContent: React.FC<ResumeContentProps> = ({ layoutId }) => {
  return (
    <div className="bg-[#F2F4F6] min-h-screen pb-24">
      
      {/* 1. Header Cinematic */}
      <div className="w-full bg-[#0B232E] text-[#F2F4F6] pt-32 pb-16 md:pt-40 md:pb-24 px-6 md:px-12 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/[0.03] rounded-full blur-[100px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
         
         <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 items-end">
            
            {/* Foto */}
            <div className="w-32 h-40 md:w-56 md:h-72 flex-shrink-0 relative rounded-sm overflow-hidden border border-white/20 shadow-2xl">
               <MotionImg 
                 layoutId={layoutId}
                 src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800" 
                 alt="Victor Cardoso Profile"
                 className="w-full h-full object-cover grayscale"
               />
               <div className="absolute inset-0 border-4 border-[#0B232E]/20"></div>
            </div>

            <div className="flex-1 pb-2">
               <Reveal>
                  <div className="flex items-center gap-3 mb-4">
                     <span className="px-3 py-1 bg-white/10 border border-white/10 rounded-full text-[10px] font-mono uppercase tracking-widest text-white/80">
                        Instrutor de TI & Supervisor
                     </span>
                  </div>
                  <h1 className="text-5xl md:text-7xl font-serif font-medium tracking-tight mb-4 leading-none">
                     Victor Cardoso
                  </h1>
               </Reveal>
               
               <Reveal delay={100}>
                  <p className="text-lg md:text-xl font-light text-white/70 max-w-2xl mb-8 leading-relaxed">
                     Especialista em <strong>Análise de Sistemas</strong> e <strong>Liderança Operacional</strong>. <br/>
                     Transformando complexidade técnica em eficiência de negócio.
                  </p>
                  
                  <div className="flex flex-wrap gap-x-8 gap-y-3 text-xs font-mono text-white/50 uppercase tracking-widest border-t border-white/10 pt-6">
                     <span className="flex items-center gap-2"><MapPin size={12} /> {CONTACT_INFO.location}</span>
                     <span className="flex items-center gap-2"><Globe size={12} /> Português (Nativo)</span>
                     <a href={CONTACT_INFO.socials[0].url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white hover:text-[#78909C] transition-colors decoration-1 underline-offset-4">
                        <ExternalLink size={12} /> LinkedIn
                     </a>
                  </div>
               </Reveal>
            </div>
         </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 mt-16 md:mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
              
              {/* COLUNA ESQUERDA: Experiência Profissional (Linha do Tempo) */}
              <div className="lg:col-span-8 space-y-16">
                  
                  {/* EXPERIÊNCIA */}
                  <section>
                      <Reveal width="100%">
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#0B232E]/40 mb-10 border-b border-[#0B232E]/10 pb-4 flex items-center gap-2">
                            <Briefcase size={14} /> Experiência Profissional
                        </h3>
                      </Reveal>
                      
                      <div className="relative border-l border-[#0B232E]/10 ml-3 space-y-12">
                          {WORK_EXPERIENCE.map((job, idx) => (
                             <Reveal key={idx} delay={idx * 50} width="100%">
                                <div className="pl-8 relative group">
                                    {/* Dot na linha do tempo */}
                                    <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#0B232E] border-2 border-[#F2F4F6] group-hover:scale-125 transition-transform"></div>
                                    
                                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                                        <h4 className="text-xl font-serif text-[#0B232E] font-medium">{job.role}</h4>
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#78909C]">{job.period}</span>
                                    </div>
                                    
                                    <p className="text-xs font-bold uppercase tracking-widest text-[#0B232E]/50 mb-4">{job.company} • {job.location}</p>
                                    
                                    <ul className="space-y-2">
                                        {job.description.map((desc, i) => (
                                            <li key={i} className="text-sm text-[#0B232E]/70 font-light leading-relaxed flex items-start gap-2">
                                                <span className="mt-1.5 w-1 h-1 bg-[#0B232E]/30 rounded-full shrink-0"></span>
                                                {desc}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                             </Reveal>
                          ))}
                      </div>
                  </section>

                  {/* FORMAÇÃO */}
                  <section>
                      <Reveal width="100%">
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#0B232E]/40 mb-8 border-b border-[#0B232E]/10 pb-4 flex items-center gap-2">
                            <Award size={14} /> Formação Acadêmica
                        </h3>
                      </Reveal>
                      
                      <div className="space-y-6">
                          {EDUCATION.map((edu, idx) => (
                             <Reveal key={idx} delay={idx * 100} width="100%">
                                <div className="bg-white p-6 rounded-sm border border-[#0B232E]/5">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#78909C] mb-1 block">{edu.period}</span>
                                    <h4 className="text-lg font-serif text-[#0B232E] mb-1">{edu.degree}</h4>
                                    <p className="text-xs font-bold uppercase tracking-widest text-[#0B232E]/50">{edu.institution}</p>
                                </div>
                             </Reveal>
                          ))}
                      </div>
                  </section>

              </div>

              {/* COLUNA DIREITA: Skills & Downloads */}
              <div className="lg:col-span-4 space-y-12">
                  
                  {/* HARD SKILLS */}
                  <section>
                      <Reveal width="100%">
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#0B232E]/40 mb-6 border-b border-[#0B232E]/10 pb-4 flex items-center gap-2">
                            Competências
                        </h3>
                      </Reveal>

                      <div className="space-y-6">
                          <Reveal delay={100} width="100%">
                              <div className="bg-white p-6 rounded-sm border border-[#0B232E]/5 shadow-sm hover:shadow-md transition-shadow">
                                  <div className="flex items-center gap-2 mb-4">
                                      <Terminal size={16} className="text-[#0B232E]"/>
                                      <h4 className="font-serif text-lg text-[#0B232E]">Técnicas</h4>
                                  </div>
                                  <ul className="space-y-2">
                                      {HARD_SKILLS.technical.map((skill, i) => (
                                          <li key={i} className="text-xs font-mono text-[#0B232E]/80 border-b border-[#0B232E]/5 pb-1 last:border-0">
                                              {skill}
                                          </li>
                                      ))}
                                  </ul>
                              </div>
                          </Reveal>

                          <Reveal delay={200} width="100%">
                              <div className="bg-white p-6 rounded-sm border border-[#0B232E]/5 shadow-sm hover:shadow-md transition-shadow">
                                  <div className="flex items-center gap-2 mb-4">
                                      <Cpu size={16} className="text-[#0B232E]"/>
                                      <h4 className="font-serif text-lg text-[#0B232E]">Gestão</h4>
                                  </div>
                                  <ul className="space-y-2">
                                      {HARD_SKILLS.management.map((skill, i) => (
                                          <li key={i} className="text-xs font-mono text-[#0B232E]/80 border-b border-[#0B232E]/5 pb-1 last:border-0">
                                              {skill}
                                          </li>
                                      ))}
                                  </ul>
                              </div>
                          </Reveal>
                      </div>
                  </section>

                  {/* SOFT SKILLS */}
                  <section>
                      <Reveal width="100%">
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#0B232E]/40 mb-6 border-b border-[#0B232E]/10 pb-4">
                            Soft Skills
                        </h3>
                      </Reveal>

                      <Reveal width="100%">
                          <div className="flex flex-wrap gap-2">
                              {SOFT_SKILLS.map((skill, i) => (
                                  <span 
                                    key={i}
                                    className="px-3 py-1.5 bg-white border border-[#0B232E]/10 text-[#0B232E] rounded-md text-xs hover:bg-[#0B232E] hover:text-white transition-all duration-300 cursor-default"
                                  >
                                      {skill}
                                  </span>
                              ))}
                          </div>
                      </Reveal>
                  </section>
                  
                  {/* DOWNLOAD BUTTON */}
                  <div className="pt-4 sticky top-8">
                    <a 
                        href="/assets/cv_victor_cardoso.pdf" 
                        download
                        className="flex items-center justify-center gap-3 w-full px-8 py-4 bg-[#0B232E] text-white rounded-sm hover:bg-[#153A48] transition-all text-xs font-bold uppercase tracking-widest shadow-lg group"
                    >
                        <Download size={16} className="group-hover:animate-bounce" /> Baixar CV Completo
                    </a>
                    <p className="text-[10px] text-center text-[#0B232E]/40 mt-3">
                        Formato PDF • 3 Páginas
                    </p>
                  </div>

              </div>
          </div>
      </div>
    </div>
  );
};
