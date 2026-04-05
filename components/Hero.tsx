import React from 'react';

const Hero: React.FC = () => {
  const portraitUrl = "/profile.jpg";

  return (
    <section
      id="hero"
      className="w-full h-[100dvh] flex flex-col md:flex-row bg-white overflow-hidden"
    >
      {/* Left Pane */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-full relative flex flex-col justify-between p-6 md:p-12 lg:p-16">

        {/* Top Title */}
        <h1 className="text-[25vw] md:text-[13vw] font-clash font-semibold leading-[0.82] tracking-[-0.04em] text-[#000000] uppercase">
          Portfólio
        </h1>

        {/* Metadata (center absolute) */}
        <div className="absolute top-1/2 -translate-y-1/2 left-6 md:left-12 lg:left-16 right-6 md:right-12 lg:right-16 flex justify-between items-start z-10">
          <p className="text-[10px] md:text-xs font-sans font-medium uppercase tracking-[0.2em] text-[#000000]/60">
            Victor Cardoso
          </p>
          <p className="text-[10px] md:text-xs font-sans font-medium uppercase tracking-[0.2em] text-[#000000]/60 max-w-[180px] md:max-w-[220px] leading-relaxed text-right">
            Engenheiro de Software & Design
          </p>
        </div>

        {/* Bottom Title */}
        <h1 className="text-[25vw] md:text-[13vw] font-serif font-light leading-[0.82] tracking-[-0.04em] text-[#000000] italic">
          Estúdio
        </h1>
      </div>

      {/* Right Pane */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-full relative">
        <img
          src={portraitUrl}
          alt="Victor Cardoso"
          className="w-full h-full object-cover grayscale"
        />
      </div>
    </section>
  );
};

export default Hero;
