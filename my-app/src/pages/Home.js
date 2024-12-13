import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { ShaderGradientCanvas, ShaderGradient } from 'shadergradient';
import * as reactSpring from '@react-spring/three';
import * as drei from '@react-three/drei';
import * as fiber from '@react-three/fiber';
import { Box, Typography, Container } from '@mui/material';
import Ripple from '../components/Ripple';
import ScrollIndicator from '../components/ScrollIndicator';

const Home = () => {
  const name = ["Muhammad", "Khan"];
  const welcomeText = ["Welcome", "to", "My", "Portfolio!"];
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [gradientSize, setGradientSize] = useState(0);
  const controls = useAnimation();
  const requestRef = React.useRef();
  const previousTimeRef = React.useRef();
  const targetGradientSize = React.useRef(0);

  const animate = time => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current;
      const step = deltaTime * 0.5; // Adjust speed here

      if (Math.abs(gradientSize - targetGradientSize.current) > 0.1) {
        setGradientSize(current => {
          const next = targetGradientSize.current > current
            ? Math.min(current + step, targetGradientSize.current)
            : Math.max(current - step, targetGradientSize.current);
          return next;
        });
      }
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []); // Empty dependency array

  useEffect(() => {
    targetGradientSize.current = isHovering ? 200 : 0;
  }, [isHovering]);

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
    
    controls.start({
      x: (x - rect.width / 2) * 0.02,
      y: (y - rect.height / 2) * 0.02,
      transition: { type: "spring", stiffness: 150, damping: 15 }
    });
  }, [controls]);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    controls.start({ x: 0, y: 0 });
  }, [controls]);

  const getTextGlow = useMemo(() => (x, y, isName = true) => {
    const baseStyles = {
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      color: 'white',
      opacity: 1,
      willChange: 'transform, opacity, background',
    };

    if (!isHovering) return baseStyles;
    
    const primaryColor = isName ? '#ff3366' : '#3366ff';
    const secondaryColor = isName ? '#ff9933' : '#33ff99';
    
    return {
      ...baseStyles,
      background: `
        radial-gradient(circle ${gradientSize}px at ${x}px ${y}px, 
          ${primaryColor} 0%, 
          ${secondaryColor} 25%, 
          rgba(255,255,255,0.8) 50%, 
          rgba(255,255,255,0) 100%)
      `,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      textShadow: `
        0 0 30px ${primaryColor}66,
        0 0 60px ${secondaryColor}66
      `,
      filter: 'brightness(1.4)',
    };
  }, [isHovering, gradientSize]);

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      position: 'relative',
      width: '100%',
      maxWidth: '100vw',
      overflow: 'hidden',
      background: 'transparent', 
      transition: 'background 0.5s ease-in-out'
    }}>
      <Ripple />
      <ShaderGradientCanvas
        importedFiber={{ ...fiber, ...drei, ...reactSpring }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: -2,
        }}
      >
        <ShaderGradient
          control='query'
          urlString='https://www.shadergradient.co/customize?animate=on&axesHelper=off&bgColor1=%23000000&bgColor2=%23000000&brightness=0.8&cAzimuthAngle=270&cDistance=0.5&cPolarAngle=180&cameraZoom=15.1&color1=%23b5001e&color2=%230015ff&color3=%23000000&destination=onCanvas&embedMode=off&envPreset=city&format=gif&fov=45&frameRate=10&gizmoHelper=hide&grain=on&lightType=env&pixelDensity=1&positionX=-0.1&positionY=0&positionZ=0&range=enabled&rangeEnd=40&rangeStart=0&reflection=0.4&rotationX=0&rotationY=130&rotationZ=70&shader=defaults&type=sphere&uAmplitude=3.2&uDensity=0.8&uFrequency=5.5&uSpeed=0.3&uStrength=0.3&uTime=0&wireframe=false'
        />
      </ShaderGradientCanvas>

      <Box 
        className="home-container" 
        sx={{ 
          minHeight: '100vh',
          width: '100%',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'visible',
          pointerEvents: 'none',
          '& > *': {
            pointerEvents: 'auto',
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: isHovering ? `radial-gradient(circle ${gradientSize * 2}px at ${mousePosition.x}px ${mousePosition.y}px, 
              rgba(255,51,102,0.15) 0%, 
              rgba(255,153,51,0.15) 30%, 
              rgba(0,0,0,0) 70%)` : '',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            zIndex: -1,
            willChange: 'background',
            transform: 'translateZ(0)',
            pointerEvents: 'none',
          }
        }}
      >
        <Box 
          className="welcome-text" 
          sx={{ 
            textAlign: 'center',
            transform: 'translateY(-20%)',
            padding: '40px',
          }}
        >
          <motion.div
            animate={controls}
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography 
              variant="h2" 
              component="h1" 
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              sx={{ 
                fontWeight: 'bold',
                mb: 2,
                ...getTextGlow(mousePosition.x, mousePosition.y, true),
                display: 'inline-block'
              }}
            >
              {name.map((el, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: i / 4 }}
                  style={{ marginRight: '0.3em' }}
                >
                  {el}
                </motion.span>
              ))}
            </Typography>
          </motion.div>

          <motion.div 
            animate={controls}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography 
              variant="h3" 
              component="h2"
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              sx={{ 
                ...getTextGlow(mousePosition.x, mousePosition.y, false),
                display: 'inline-block'
              }}
            >
              {welcomeText.map((el, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: name.length / 4 + i / 4 }}
                  style={{ marginRight: '0.3em' }}
                >
                  {el}
                </motion.span>
              ))}
            </Typography>
          </motion.div>
        </Box>
      </Box>

      <Container 
        id="about-section"
        maxWidth="md" 
        sx={{ 
          minHeight: '100vh',
          py: 8,
          position: 'relative',
          zIndex: 1,
          width: '100%',
          mx: 'auto',
          px: { xs: 2, sm: 3, md: 4 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'transparent', 
          transition: 'background 0.5s ease-in-out',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100vw',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.8)', 
            backdropFilter: 'blur(10px)', 
            zIndex: -1,
          }
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ 
            opacity: 1, 
            y: 0,
            transition: {
              type: "spring",
              stiffness: 80,
              damping: 10,
              duration: 0.8,
              delayChildren: 0.2,
              staggerChildren: 0.1
            }
          }}
          exit={{ 
            opacity: 0, 
            y: -50,
            transition: {
              type: "tween",
              duration: 0.5
            }
          }}
          viewport={{ 
            once: false,
            amount: 0.3,
            margin: "-100px"
          }}
          style={{
            width: '100%'
          }}
        >
          <Box sx={{ 
            textAlign: 'center',
            mb: 6 
          }}>
            <motion.div
              initial={{ 
                opacity: 0, 
                scale: 0.9,
                y: 20
              }}
              whileInView={{ 
                opacity: 1, 
                scale: 1,
                y: 0,
                transition: {
                  type: "spring",
                  stiffness: 100,
                  damping: 8
                }
              }}
              viewport={{ once: false }}
            >
              <Typography variant="h2" sx={{ 
                mb: 3,
                background: 'linear-gradient(45deg, #ff3366, #ff9933)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                fontWeight: 'bold'
              }}>
                About Me
              </Typography>
            </motion.div>

            <motion.div
              initial={{ 
                opacity: 0, 
                y: 30,
                filter: 'blur(10px)'
              }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                filter: 'blur(0px)',
                transition: {
                  type: "spring",
                  stiffness: 70,
                  damping: 10,
                  delay: 0.2
                }
              }}
              viewport={{ once: false }}
            >
              <Typography variant="body1" sx={{ 
                fontSize: '1.1rem',
                lineHeight: 1.8,
                color: 'rgba(255, 255, 255, 0.9)',
                maxWidth: '800px',
                margin: '0 auto'
              }}>
                {/* Your about me content */}
              </Typography>
            </motion.div>
          </Box>

          <motion.div
            initial={{ 
              opacity: 0, 
              y: 40,
              filter: 'blur(10px)'
            }}
            whileInView={{ 
              opacity: 1, 
              y: 0,
              filter: 'blur(0px)',
              transition: {
                type: "spring",
                stiffness: 70,
                damping: 10,
                delay: 0.4
              }
            }}
            viewport={{ once: false }}
          >
            <Box sx={{ 
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
              gap: 4,
              mt: 6
            }}>
              {/* Skills section */}
              <Box>
                <Typography variant="h5" sx={{ mb: 3, color: '#ff3366' }}>
                  Technical Skills
                </Typography>
                {/* Add your skills content */}
              </Box>

              {/* Experience section */}
              <Box>
                <Typography variant="h5" sx={{ mb: 3, color: '#ff9933' }}>
                  Experience
                </Typography>
                {/* Add your experience content */}
              </Box>
            </Box>
          </motion.div>
        </motion.div>

        <ScrollIndicator targetSection="contact-section" text="View More" />
      </Container>

      <ScrollIndicator targetSection="contact-section" />
    </Box>
  );
};

export default Home;
