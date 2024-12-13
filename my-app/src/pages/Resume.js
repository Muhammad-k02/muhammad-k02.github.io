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
        }}
      >
        <ShaderGradient
          control='query'
          urlString='https://www.shadergradient.co/customize?animate=on&axesHelper=off&bgColor1=%23000000&bgColor2=%23000000&brightness=1.4&cAzimuthAngle=250&cDistance=1.5&cPolarAngle=140&cameraZoom=12.5&color1=%23000000&color2=%23ff000d&color3=%23ff0019&destination=onCanvas&embedMode=off&envPreset=lobby&format=gif&fov=45&frameRate=10&gizmoHelper=hide&grain=off&lightType=3d&pixelDensity=2.6&positionX=0&positionY=0&positionZ=0&range=enabled&rangeEnd=40&rangeStart=0&reflection=0.5&rotationX=0&rotationY=0&rotationZ=140&shader=defaults&type=sphere&uAmplitude=7&uDensity=0.7&uFrequency=5.5&uSpeed=0.3&uStrength=3.2&uTime=0&wireframe=false'
        />
      </ShaderGradientCanvas>

      <Container 
        maxWidth="lg" 
        sx={{ 
          pt: 12, 
          pb: 6,
          position: 'relative',
          zIndex: 1 
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
