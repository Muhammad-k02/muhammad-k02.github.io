import React from 'react';
import { motion } from 'framer-motion';
import { Container, Typography, Card, CardContent, Box } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import { ShaderGradientCanvas, ShaderGradient } from 'shadergradient';
import * as reactSpring from '@react-spring/three';
import * as drei from '@react-three/drei';
import * as fiber from '@react-three/fiber';

const Education = () => {
  const education = [
    {
      school: "YLoyola University Chicago",
      degree: "B.S Software Engineering",
      year: "2021 - Present",
      description: "Brief description of your studies and achievements"
    },
    // Add more education entries here
  ];

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
          urlString='https://www.shadergradient.co/customize?animate=on&axesHelper=on&bgColor1=%23000000&bgColor2=%23000000&brightness=1.5&cAzimuthAngle=60&cDistance=7.1&cPolarAngle=90&cameraZoom=15.3&color1=%23ff7a33&color2=%2333a0ff&color3=%23ffc53d&destination=onCanvas&embedMode=off&envPreset=dawn&format=gif&fov=45&frameRate=10&grain=off&http%3A%2F%2Flocalhost%3A3002%2Fcustomize%3Fanimate=on&lightType=3d&pixelDensity=1&positionX=0&positionY=-0.15&positionZ=0&range=enabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=0&rotationY=0&rotationZ=0&shader=defaults&type=sphere&uAmplitude=1.4&uDensity=1.1&uFrequency=5.5&uSpeed=0.1&uStrength=0.4&uTime=0&wireframe=false'
        />
      </ShaderGradientCanvas>

      <Box 
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
            background: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.3) 100%)',
            pointerEvents: 'none'
          }
        }}
      >
        <Container maxWidth="lg" sx={{ pt: 12, pb: 6 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h2" component="h1" gutterBottom sx={{ color: 'white', mb: 4 }}>
              Education
            </Typography>

            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card 
                  sx={{ 
                    mb: 3,
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    color: 'white'
                  }}
                >
                  <CardContent>
                    <Box display="flex" alignItems="center" mb={2}>
                      <SchoolIcon sx={{ mr: 2 }} />
                      <Typography variant="h5" component="h2">
                        {edu.school}
                      </Typography>
                    </Box>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      {edu.degree}
                    </Typography>
                    <Typography color="textSecondary" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      {edu.year}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 2 }}>
                      {edu.description}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

export default Education;
