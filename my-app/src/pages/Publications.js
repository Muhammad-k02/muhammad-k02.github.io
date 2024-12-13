import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, Typography, Container, Grid, Box } from '@mui/material';
import { ShaderGradientCanvas, ShaderGradient } from 'shadergradient';
import * as reactSpring from '@react-spring/three';
import * as drei from '@react-three/drei';
import * as fiber from '@react-three/fiber';

const Publications = () => {
  // Replace with your actual publications
  const publications = [
    {
      title: "Example Publication 1",
      authors: "Khan, M., et al.",
      journal: "Nature Communications",
      year: "2024",
      link: "#"
    },
    // Add more publications here
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
          urlString='https://www.shadergradient.co/customize?animate=on&axesHelper=off&brightness=0.8&cAzimuthAngle=270&cDistance=0.5&cPolarAngle=180&cameraZoom=15.1&color1=%2373bfc4&color2=%23ff810a&color3=%238da0ce&destination=onCanvas&embedMode=off&envPreset=city&format=gif&fov=45&frameRate=10&gizmoHelper=hide&grain=on&lightType=env&pixelDensity=1&positionX=-0.1&positionY=0&positionZ=0&range=enabled&rangeEnd=40&rangeStart=0&reflection=0.4&rotationX=0&rotationY=130&rotationZ=70&shader=defaults&type=sphere&uAmplitude=3.2&uDensity=0.8&uFrequency=5.5&uSpeed=0.3&uStrength=0.3&uTime=0&wireframe=false'
        />
      </ShaderGradientCanvas>

      <Container maxWidth="lg" sx={{ 
        pt: 12, 
        pb: 6,
        position: 'relative',
        zIndex: 1 
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h2" component="h1" gutterBottom sx={{ 
            color: 'white', 
            mb: 4,
            background: 'linear-gradient(45deg, #73bfc4, #ff810a)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent'
          }}>
            Publications
          </Typography>
          
          <Grid container spacing={3}>
            {publications.map((pub, index) => (
              <Grid item xs={12} key={index}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card sx={{ 
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    color: 'white',
                    border: '1px solid rgba(255, 255, 255, 0.125)',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}>
                    <CardContent>
                      <Typography variant="h6" component="h2" sx={{ color: 'white' }}>
                        {pub.title}
                      </Typography>
                      <Typography color="textSecondary" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        {pub.authors}
                      </Typography>
                      <Typography variant="body2" sx={{ 
                        mt: 1,
                        color: 'rgba(255, 255, 255, 0.9)'
                      }}>
                        {pub.journal} ({pub.year})
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Publications;
