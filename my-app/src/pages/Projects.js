import React from 'react';
import { Container, Typography, Card, CardContent, CardActions, Button, Grid, Box } from '@mui/material';
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
    <Box sx={{ 
      minHeight: '100vh', 
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
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
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
                  >
                    Code
                  </Button>
                  <Button 
                    size="small" 
                    startIcon={<LaunchIcon />}
                    href={project.demo}
                    target="_blank"
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
  );
};

export default Projects;
