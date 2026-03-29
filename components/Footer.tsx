
import React from 'react';
import { CONTACT_INFO } from '../constants';
import { usePageTransition } from './ui/PageTransition';

const Footer: React.FC = () => {
  const { transitionTo } = usePageTransition();
  const year = new Date().getFullYear();

  return (
    <footer id="site-footer" className="relative bg-[#F6F4EE] text-[#2A2A2A] w-full flex flex-col overflow-hidden z-20">
      
      {/* Huge Text */}
      <div className="w-full flex justify-center items-center pt-16 pb-12 md:pt-24 md:pb-16 px-6">
        <h1 className="text-[26vw] leading-[0.7] font-sans font-normal tracking-[-0.06em] text-[#2A2A2A] uppercase transform scale-y-[1.8] origin-bottom select-none">
          VICTOR
        </h1>
      </div>

      <div className="px-6 md:px-12 lg:px-16 w-full max-w-[1920px] mx-auto">
        {/* Top Divider */}
        <div className="w-full h-px bg-[#2A2A2A] opacity-20"></div>

        {/* 4 Columns Section */}
        <div className="w-full pt-8 pb-20 md:pb-32 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 md:gap-4">
          
          {/* Col 1 */}
          <div className="flex flex-col">
            <span className="text-[10px] font-sans mb-6 text-[#2A2A2A] opacity-80">Index</span>
            <ul className="flex flex-col gap-1.5">
              <li className="flex items-center gap-2 -ml-3">
                <span className="text-lg md:text-xl font-medium text-[#2A2A2A]">•</span>
                <button onClick={() => transitionTo('#home')} className="text-lg md:text-xl font-sans font-medium text-[#2A2A2A] hover:opacity-60 transition-opacity">
                  Home
                </button>
              </li>
              <li><button onClick={() => transitionTo('#about')} className="text-lg md:text-xl font-sans font-medium text-[#2A2A2A] hover:opacity-60 transition-opacity">Sobre</button></li>
              <li><button onClick={() => transitionTo('#projects')} className="text-lg md:text-xl font-sans font-medium text-[#2A2A2A] hover:opacity-60 transition-opacity">Projetos</button></li>
              <li><button onClick={() => transitionTo('#contact')} className="text-lg md:text-xl font-sans font-medium text-[#2A2A2A] hover:opacity-60 transition-opacity">Contato</button></li>
            </ul>
          </div>

          {/* Col 2 */}
          <div className="flex flex-col">
            <span className="text-[10px] font-sans mb-6 text-[#2A2A2A] opacity-80">Serviços</span>
            <ul className="flex flex-col gap-1.5">
              <li><span className="text-lg md:text-xl font-sans font-medium text-[#2A2A2A]">Análise de Sistemas</span></li>
              <li><span className="text-lg md:text-xl font-sans font-medium text-[#2A2A2A]">Liderança Operacional</span></li>
              <li><span className="text-lg md:text-xl font-sans font-medium text-[#2A2A2A]">Treinamento Corporativo</span></li>
              <li><span className="text-lg md:text-xl font-sans font-medium text-[#2A2A2A]">Gestão de KPIs</span></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="flex flex-col">
            <span className="text-[10px] font-sans mb-6 text-[#2A2A2A] opacity-80">Info</span>
            <ul className="flex flex-col gap-1.5">
              <li><button onClick={() => transitionTo('#faq')} className="text-lg md:text-xl font-sans font-medium text-[#2A2A2A] hover:opacity-60 transition-opacity">FAQ</button></li>
              <li><a href="/assets/cv_victor_cardoso.pdf" target="_blank" rel="noopener noreferrer" className="text-lg md:text-xl font-sans font-medium text-[#2A2A2A] hover:opacity-60 transition-opacity">Currículo</a></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="flex flex-col">
            <span className="text-[10px] font-sans mb-6 text-[#2A2A2A] opacity-80">Social</span>
            <ul className="flex flex-col gap-1.5">
              {CONTACT_INFO.socials.map((social, idx) => (
                <li key={idx}>
                  <a href={social.url} target="_blank" rel="noopener noreferrer" className="text-lg md:text-xl font-sans font-medium text-[#2A2A2A] hover:opacity-60 transition-opacity">
                    {social.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Divider */}
        <div className="w-full h-px bg-[#2A2A2A] opacity-20"></div>

        {/* Bottom Bar */}
        <div className="w-full py-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="text-[9px] md:text-[10px] font-sans text-[#2A2A2A] opacity-80">
            &copy; {year} VICTOR CARDOSO - {CONTACT_INFO.location} . Brasil
          </div>
          <div className="flex items-center gap-4 md:gap-6 text-[9px] md:text-[10px] font-sans text-[#2A2A2A] opacity-80">
            <div className="w-2 h-2 rounded-full bg-[#E5E0D8] hidden md:block"></div>
            <a href="#" className="hover:opacity-60 transition-opacity">Termos e Condições</a>
            <a href="#" className="hover:opacity-60 transition-opacity">Privacy Policy</a>
            <a href="#" className="hover:opacity-60 transition-opacity">Política de Cookies</a>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
