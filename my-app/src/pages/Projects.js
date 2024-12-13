import React from 'react';
import { motion } from 'framer-motion';
import { Container, Typography, Card, CardContent, CardActions, Button, Grid, Box } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import { ShaderGradientCanvas, ShaderGradient } from 'shadergradient';
import * as reactSpring from '@react-spring/three';
import * as drei from '@react-three/drei';
import * as fiber from '@react-three/fiber';

const Projects = () => {
  const projects = [
    {
      title: "Project Name",
      description: "Brief description of the project, its purpose, and the technologies used.",
      github: "https://github.com/yourusername/project",
      demo: "https://project-demo.com",
      technologies: ["React", "Node.js", "MongoDB"]
    },
    // Add more projects here
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
          urlString='https://www.shadergradient.co/customize?animate=on&axesHelper=off&brightness=1.2&cAzimuthAngle=170&cDistance=4.4&cPolarAngle=70&cameraZoom=1&color1=%2394ffd1&color2=%236bf5ff&color3=%23ffffff&destination=onCanvas&embedMode=off&envPreset=city&format=gif&fov=45&frameRate=10&gizmoHelper=hide&grain=off&lightType=3d&pixelDensity=1&positionX=0&positionY=0.9&positionZ=-0.3&range=enabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=45&rotationY=0&rotationZ=0&shader=defaults&type=waterPlane&uAmplitude=0&uDensity=1.2&uFrequency=0&uSpeed=0.2&uStrength=3.4&uTime=0&wireframe=false'
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
              background: 'linear-gradient(45deg, #32ff7e, #000000)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent'
            }}
          >
            Projects
          </Typography>

          <Grid container spacing={4}>
            {projects.map((project, index) => (
              <Grid item xs={12} md={6} key={index}>
                <motion.div
                  initial={{ 
                    opacity: 0, 
                    y: 20,
                    scale: 0.9
                  }}
                  whileInView={{ 
                    opacity: 1, 
                    y: 0,
                    scale: 1,
                    transition: {
                      type: "spring",
                      stiffness: 100,
                      damping: 10
                    }
                  }}
                  viewport={{ once: false }}
                >
                  <Card 
                    sx={{ 
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      background: 'rgba(50, 255, 126, 0.1)',
                      backdropFilter: 'blur(10px)',
                      color: 'white',
                      border: '1px solid rgba(50, 255, 126, 0.2)',
                      boxShadow: '0 4px 6px rgba(50, 255, 126, 0.1)'
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#32ff7e' }}>
                        {project.title}
                      </Typography>
                      <Typography variant="body1" paragraph>
                        {project.description}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(50, 255, 126, 0.7)' }}>
                        Technologies: {project.technologies.join(', ')}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button 
                        size="small" 
                        startIcon={<GitHubIcon />}
                        href={project.github}
                        target="_blank"
                        sx={{ 
                          color: '#32ff7e',
                          '&:hover': {
                            backgroundColor: 'rgba(50, 255, 126, 0.1)'
                          }
                        }}
                      >
                        Code
                      </Button>
                      <Button 
                        size="small" 
                        startIcon={<LaunchIcon />}
                        href={project.demo}
                        target="_blank"
                        sx={{ 
                          color: '#32ff7e',
                          '&:hover': {
                            backgroundColor: 'rgba(50, 255, 126, 0.1)'
                          }
                        }}
                      >
                        Demo
                      </Button>
                    </CardActions>
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

export default Projects;
