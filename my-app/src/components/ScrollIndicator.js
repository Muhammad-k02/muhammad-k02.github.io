import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, Typography } from '@mui/material';
import { AnimatePresence,motion } from 'framer-motion';
import PropTypes from 'prop-types';
import React, { useEffect,useState } from 'react';

const ScrollIndicator = ({ targetSection = 'about-section', text = 'Scroll Down' }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const isScrollingDown = currentScrollTop > lastScrollTop;
      
      // Hide indicator when scrolling down from top
      if (currentScrollTop > 100 && isScrollingDown) {
        setIsVisible(false);
      } 
      // Show indicator when scrolling back up to top
      else if (currentScrollTop < 100) {
        setIsVisible(true);
      }
      
      setLastScrollTop(currentScrollTop);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollTop]);

  const scrollToSection = () => {
    const section = document.getElementById(targetSection);
    if (section) {
      section.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            transition: {
              type: 'spring',
              stiffness: 100,
              damping: 10,
              duration: 0.5
            }
          }}
          exit={{ 
            opacity: 0, 
            y: 40,
            transition: {
              type: 'tween',
              duration: 0.3
            }
          }}
          style={{
            position: 'fixed',
            bottom: 40,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1000,
            width: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pointerEvents: 'auto',
          }}
        >
          <Box
            onClick={scrollToSection}
            sx={{
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transition: 'transform 0.2s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
              },
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: 'white',
                opacity: 0.8,
                mb: 1,
                textAlign: 'center',
                fontSize: '0.9rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              {text}
            </Typography>
            <motion.div
              animate={{
                y: [0, 15, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <KeyboardArrowDownIcon
                sx={{
                  color: 'white',
                  fontSize: '2rem',
                  opacity: 0.8,
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
                }}
              />
            </motion.div>
            <motion.div
              style={{
                width: '2px',
                height: '60px',
                background: 'linear-gradient(to bottom, rgba(255,255,255,0.8), transparent)',
                marginTop: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              }}
              animate={{
                scaleY: [1, 0.3, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

ScrollIndicator.propTypes = {
  targetSection: PropTypes.string,
  text: PropTypes.string
};

export default ScrollIndicator;
