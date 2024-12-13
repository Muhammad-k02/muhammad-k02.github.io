import React from 'react';
import { motion } from 'framer-motion';
import { Container, Typography, Button, Box } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { ShaderGradientCanvas, ShaderGradient } from 'shadergradient';
import * as reactSpring from '@react-spring/three';
import * as drei from '@react-three/drei';
import * as fiber from '@react-three/fiber';

const Resume = () => {
  // Replace with your actual resume PDF URL
  const resumeUrl = "/path-to-your-resume.pdf";

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
          filter: 'contrast(1.2) brightness(1.2)',
          mixBlendMode: 'normal'
        }}
      >
        <ShaderGradient
          control='query'
          urlString='https://www.shadergradient.co/customize?animate=on&axesHelper=on&brightness=1.1&cAzimuthAngle=180&cDistance=3.9&cPolarAngle=115&cameraZoom=1&color1=%235606FF&color2=%23FE8989&color3=%23000000&destination=onCanvas&embedMode=off&envPreset=city&format=gif&fov=45&frameRate=10&grain=off&lightType=3d&pixelDensity=1&positionX=-0.5&positionY=0.1&positionZ=0&range=enabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=0&rotationY=0&rotationZ=235&shader=defaults&type=waterPlane&uAmplitude=0&uDensity=1.1&uFrequency=5.5&uSpeed=0.1&uStrength=2.4&uTime=0.2&wireframe=false&zoomOut=false'
        />
      </ShaderGradientCanvas>

      <Container 
        maxWidth="lg" 
        sx={{ 
          pt: 12, 
          pb: 6,
          position: 'relative',
          zIndex: 1,
          '& .MuiTypography-root': {
            color: 'white',
            textShadow: '0 2px 4px rgba(0,0,0,0.2)'
          },
          '& .MuiButton-root': {
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            '&:hover': {
              background: 'rgba(255,255,255,0.2)'
            }
          }
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom 
            sx={{ 
              mb: 4,
              background: 'linear-gradient(45deg, #ff000d, #000000)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent'
            }}
          >
            Resume
          </Typography>

          <Box sx={{ 
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            p: 4,
            borderRadius: 2,
            textAlign: 'center',
            border: '1px solid rgba(255, 0, 0, 0.125)',
            boxShadow: '0 4px 6px rgba(255, 0, 0, 0.1)'
          }}>
            <Typography variant="h6" sx={{ color: 'white', mb: 3 }}>
              View or download my complete resume
            </Typography>
            
            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              href={resumeUrl}
              target="_blank"
              sx={{
                backgroundColor: 'rgba(255, 0, 0, 0.2)',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 0, 0, 0.3)',
                }
              }}
            >
              Download Resume
            </Button>
          </Box>

          {/* You can add more sections here like Skills, Experience, etc. */}
        </motion.div>
      </Container>
    </Box>
  );
};

export default Resume;
