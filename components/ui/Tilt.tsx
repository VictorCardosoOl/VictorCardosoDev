import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface TiltProps {
  children: React.ReactNode;
  className?: string;
  strength?: number; // Intensidade da rotação (padrão: 15)
  perspective?: number; // Perspectiva CSS (padrão: 1000)
}

const Tilt: React.FC<TiltProps> = ({ 
  children, 
  className = "", 
  strength = 15, 
  perspective = 1000 
}) => {
  const ref = useRef<HTMLDivElement>(null);

  // Motion Values for mouse position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth Physics
  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const mouseX = useSpring(x, springConfig);
  const mouseY = useSpring(y, springConfig);

  // Transform mouse position into rotation
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [strength, -strength]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-strength, strength]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate normalized mouse position from center (-0.5 to 0.5)
    const mouseXFromCenter = (e.clientX - rect.left) / width - 0.5;
    const mouseYFromCenter = (e.clientY - rect.top) / height - 0.5;

    x.set(mouseXFromCenter);
    y.set(mouseYFromCenter);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective,
        transformStyle: "preserve-3d"
      }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default Tilt;