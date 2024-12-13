import React, { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const Ripple = () => {
  const [ripples, setRipples] = useState([]);

  const createRipple = useCallback((e) => {
    // Get precise mouse coordinates
    const x = e.pageX;  // Use pageX/pageY to account for scrolled page
    const y = e.pageY;

    const ripple = {
      x,
      y,
      timestamp: Date.now(),
      id: Date.now(),
    };

    setRipples(prev => [...prev, ripple]);
  }, []);

  useEffect(() => {
    // Add event listener to the entire document
    document.addEventListener('click', createRipple);

    // Cleanup ripples older than 1.5 seconds
    const cleanupInterval = setInterval(() => {
      setRipples(prev => 
        prev.filter(ripple => Date.now() - ripple.timestamp < 1500)
      );
    }, 1000);

    // Cleanup event listeners
    return () => {
      document.removeEventListener('click', createRipple);
      clearInterval(cleanupInterval);
    };
  }, [createRipple]);

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    >
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{
              left: ripple.x,  // Use left/top for absolute positioning
              top: ripple.y,
              scale: 0,
              opacity: 0.8,
            }}
            animate={{
              scale: 6,
              opacity: 0,
            }}
            exit={{
              opacity: 0,
              scale: 7,
            }}
            transition={{
              duration: 1.2,
              ease: [0.4, 0, 0.2, 1],
            }}
            style={{
              position: 'absolute',  // Changed to absolute
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)',  // Center the ripple
              background: `
                radial-gradient(circle, 
                  rgba(255, 69, 0, 0.4) 0%,
                  rgba(255, 140, 0, 0.4) 35%,
                  rgba(255, 215, 0, 0.3) 60%,
                  transparent 80%
                ),
                radial-gradient(circle,
                  rgba(255, 69, 0, 0.6) 0%,
                  rgba(255, 140, 0, 0.3) 40%,
                  transparent 70%
                )
              `,
              boxShadow: '0 0 30px rgba(255, 69, 0, 0.3)',
              pointerEvents: 'none',
              mixBlendMode: 'screen',
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Ripple;