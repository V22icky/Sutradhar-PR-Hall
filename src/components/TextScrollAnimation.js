import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * Character Component - Animates an individual character in a string
 * driven by the scroll progress of the parent wrapper.
 */
const Character = ({ char, index, total, scrollYProgress }) => {
  const centerIndex = Math.floor(total / 2);
  const distanceFromCenter = index - centerIndex;
  
  // Stagger start and end ranges slightly for letter-by-letter reveal
  const startRange = 0.0 + (index * 0.03);
  const endRange = 0.4 + (index * 0.03);
  
  // Parallax calculations (3D rotation, depth transform, scaling, and opacity)
  const rotateX = useTransform(scrollYProgress, [startRange, endRange], [distanceFromCenter * 25, 0]);
  const rotateY = useTransform(scrollYProgress, [startRange, endRange], [distanceFromCenter * -15, 0]);
  const translateZ = useTransform(scrollYProgress, [startRange, endRange], [-150, 0]);
  const translateY = useTransform(scrollYProgress, [startRange, endRange], [40, 0]);
  const scale = useTransform(scrollYProgress, [startRange, endRange], [0.6, 1]);
  const opacity = useTransform(scrollYProgress, [startRange, endRange], [0, 1]);

  return (
    <motion.span
      style={{
        display: 'inline-block',
        transformStyle: 'preserve-3d',
        rotateX,
        rotateY,
        z: translateZ,
        y: translateY,
        scale,
        opacity,
      }}
    >
      {char === ' ' ? '\u00A0' : char}
    </motion.span>
  );
};

/**
 * TextScrollAnimation Component (Skiper31 Replica)
 * Rotates, scales, and translates text characters in 3D perspective based on scroll.
 */
export const TextScrollAnimation = ({ text }) => {
  const containerRef = useRef(null);
  
  // Capture scroll progress relative to target element entering the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  const chars = text.split("");

  return (
    <div 
      ref={containerRef} 
      style={{ 
        perspective: '1000px', 
        display: 'inline-flex', 
        gap: '0.01em',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}
    >
      {chars.map((char, index) => (
        <Character 
          key={index} 
          char={char} 
          index={index} 
          total={chars.length} 
          scrollYProgress={scrollYProgress} 
        />
      ))}
    </div>
  );
};
export default TextScrollAnimation;
