
import React, { useRef, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

interface MagneticProps {
  children: React.ReactElement;
  strength?: number; // How far the element moves (default 0.3)
}

export const Magnetic: React.FC<MagneticProps> = ({ children, strength = 0.3 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current?.getBoundingClientRect() || { height: 0, width: 0, left: 0, top: 0 };
    
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);

    setPosition({ x: middleX * strength, y: middleY * strength });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;
  
  // Smooth spring physics
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const motionX = useSpring(x, springConfig);
  const motionY = useSpring(y, springConfig);

  return (
    <motion.div
      ref={ref}
      style={{ x: motionX, y: motionY }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
    >
      {React.cloneElement(children as React.ReactElement<any>, {
        style: { ...(children as React.ReactElement<any>).props.style } // Preserve existing styles if any
      })}
    </motion.div>
  );
};

export default Magnetic;
