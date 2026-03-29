import React, { useState } from 'react';
import { WRITING } from '../constants';
import { Reveal } from './ui/Reveal';
import { ArrowUpRight, Calendar, Clock, BookOpen } from 'lucide-react';
import ContentModal from './ui/ContentModal';

const Writing: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<typeof WRITING[0] | null>(null);

  return (
    <section id="writing" className="py-32 md:py-48 bg-paper relative z-10">
      <div className="w-full max-w-[1920px] mx-auto px-6 md:px-12 lg:px-16">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <Reveal>
                <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-petrol-base/40 mb-4 block">Diário</span>
                    <h2 className="text-5xl md:text-7xl font-serif font-medium text-petrol-base">Publicações</h2>
                </div>
            </Reveal>
            <Reveal delay={100}>
                <a href="#" className="text-xs font-bold uppercase tracking-widest text-petrol-base/50 hover:text-petrol-base transition-colors">
                    Ver todos os artigos
                </a>
            </Reveal>
        </div>

        {/* Editorial List Layout */}
        <div className="flex flex-col border-t border-petrol-base/10">
          {WRITING.map((post, index) => (
             <Reveal key={index} delay={index * 50} width="100%">
               <div 
                 onClick={() => setSelectedArticle(post)}
                 className="group cursor-pointer border-b border-petrol-base/10 py-8 md:py-10 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-500 hover:bg-white/40 hover:px-6 -mx-6 px-6"
               >
                 <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 opacity-50 group-hover:opacity-100 transition-opacity">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-petrol-base/50">{post.category}</span>
                        <span className="w-1 h-1 bg-petrol-base/20 rounded-full"></span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-petrol-base/50">{post.date}</span>
                    </div>
                    <h3 className="text-2xl md:text-4xl font-serif font-medium text-petrol-base group-hover:italic transition-all">
                        {post.title}
                    </h3>
                 </div>

                 <div className="flex items-center gap-8 md:gap-16">
                     <span className="text-xs font-mono text-petrol-base/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        {post.readTime} leitura
                     </span>
                     <div className="w-10 h-10 rounded-full border border-petrol-base/10 flex items-center justify-center text-petrol-base/30 group-hover:border-petrol-base group-hover:text-white group-hover:bg-petrol-base transition-all duration-300">
                        <ArrowUpRight size={16} />
                     </div>
                 </div>
               </div>
             </Reveal>
          ))}
        </div>

        {/* Modal de Leitura */}
        <ContentModal
          isOpen={!!selectedArticle}
          onClose={() => setSelectedArticle(null)}
          title={selectedArticle?.title}
          category="Journal"
        >
           {selectedArticle && (
             <div className="max-w-3xl mx-auto px-6 md:px-12 py-16 md:py-24">
                <div className="flex flex-wrap items-center gap-6 text-xs font-bold uppercase tracking-widest text-petrol-base/40 mb-12 pb-8 border-b border-petrol-base/10">
                   <span className="px-3 py-1 bg-paper text-petrol-base rounded-full">{selectedArticle.category}</span>
                   <span className="flex items-center gap-2"><Calendar size={14}/> {selectedArticle.date}</span>
                   <span className="flex items-center gap-2"><Clock size={14}/> {selectedArticle.readTime}</span>
                </div>

                <div className="prose prose-slate prose-lg md:prose-xl max-w-none prose-headings:font-serif prose-headings:font-medium prose-p:font-light prose-p:text-petrol-ink prose-a:text-petrol-base prose-a:no-underline hover:prose-a:underline">
                   <p className="lead text-2xl md:text-3xl font-serif text-petrol-base italic mb-10 leading-relaxed">
                     "Este é um parágrafo introdutório simulado para demonstrar a tipografia do modal de leitura. O conteúdo real do artigo seria carregado aqui."
                   </p>
                   
                   <p>
                     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                   </p>
                   
                   <h3>A Importância da Estratégia</h3>
                   <p>
                     Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                   </p>

                   <figure className="my-12">
                      <div className="aspect-video bg-paper rounded-none flex items-center justify-center text-petrol-base/20 border border-petrol-base/10">
                         <BookOpen size={48} strokeWidth={1} />
                      </div>
                      <figcaption className="text-center text-xs font-mono text-petrol-base/40 mt-4">Fig 1. Ilustração conceitual.</figcaption>
                   </figure>

                   <h3>Conclusão</h3>
                   <p>
                     Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                   </p>
                </div>

                <div className="mt-20 pt-10 border-t border-petrol-base/10 flex justify-between items-center">
                   <div>
                       <p className="text-xs font-bold uppercase tracking-widest text-petrol-base/40 mb-1">Escrito por</p>
                       <p className="font-serif text-lg text-petrol-base">Victor Cardoso</p>
                   </div>
                   <button className="text-xs font-bold uppercase tracking-widest text-petrol-base hover:text-petrol-mid transition-colors">
                      Compartilhar
                   </button>
                </div>
             </div>
           )}
        </ContentModal>

      </div>
    </section>
  );
};

export default Writing;