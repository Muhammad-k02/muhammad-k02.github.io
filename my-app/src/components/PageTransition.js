import React from 'react';
import { motion } from 'framer-motion';

const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ 
        clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
        opacity: 0,
        filter: 'blur(20px)',
        scale: 0.95
      }}
      animate={{ 
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        opacity: 1,
        filter: 'blur(0px)',
        scale: 1
      }}
      exit={{ 
        clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
        opacity: 0,
        filter: 'blur(20px)',
        scale: 0.95
      }}
      transition={{ 
        duration: 0.4,
        ease: [0.4, 0.0, 0.2, 1],
        opacity: { duration: 0.3 },
        filter: { duration: 0.3 },
        scale: { duration: 0.3 }
      }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 10,
        pointerEvents: 'none',
        background: 'transparent'
      }}
    >
      <div style={{
        width: '100%',
        height: '100%',
        background: 'transparent',
        pointerEvents: 'auto'
      }}>
        {children}
      </div>
    </motion.div>
  );
};

export default PageTransition;
