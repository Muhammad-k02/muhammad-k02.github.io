import React from 'react';
import { motion } from 'framer-motion';
import { Container, Typography, Card, CardContent, CardActions, Button, Grid } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';

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
    <Container maxWidth="lg" sx={{ pt: 12, pb: 6 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h2" component="h1" gutterBottom sx={{ color: 'white', mb: 4 }}>
          Projects
        </Typography>

        <Grid container spacing={4}>
          {projects.map((project, index) => (
            <Grid item xs={12} md={6} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    color: 'white'
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h5" component="h2" gutterBottom>
                      {project.title}
                    </Typography>
                    <Typography variant="body1" paragraph>
                      {project.description}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
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
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </Container>
  );
};

export default Projects;
