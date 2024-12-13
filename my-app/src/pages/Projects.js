import React from 'react';
import { Container, Typography, Card, CardContent, CardActions, Button, Grid, Box } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import DropdownMenu from '../components/DropdownMenu';
import WebGLBackground from '../components/WebGLBackground';
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
    <>
      <WebGLBackground />
      <Box 
        sx={{
          position: 'relative',
          zIndex: 1,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'black',
          padding: '20px'
        }}
      >
        <DropdownMenu />
        <Box sx={{ 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <Container maxWidth="lg">
            <Typography variant="h2" component="h1" gutterBottom>
              Projects
            </Typography>

            <Grid container spacing={4}>
              {projects.map((project, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Card sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    backgroundColor: 'transparent',
                    color: 'white',
                    border: '1px solid rgba(255,255,255,0.12)'
                  }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h5" component="h2" gutterBottom>
                        {project.title}
                      </Typography>
                      <Typography variant="body1" paragraph>
                        {project.description}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Technologies: {project.technologies.join(', ')}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button 
                        size="small" 
                        startIcon={<GitHubIcon />}
                        href={project.github}
                        target="_blank"
                        sx={{ color: 'white' }}
                      >
                        Code
                      </Button>
                      <Button 
                        size="small" 
                        startIcon={<LaunchIcon />}
                        href={project.demo}
                        target="_blank"
                        sx={{ color: 'white' }}
                      >
                        Demo
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default Projects;