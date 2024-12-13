import React from 'react';
import { Container, Typography, Card, CardContent, Box } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import DropdownMenu from '../components/DropdownMenu';
import WebGLBackground from '../components/WebGLBackground';
import { ShaderGradientCanvas, ShaderGradient } from 'shadergradient';
import * as reactSpring from '@react-spring/three';
import * as drei from '@react-three/drei';
import * as fiber from '@react-three/fiber';

function Education() {
  const education = [
    {
      school: "Loyola University Chicago",
      degree: "B.S Software Engineering",
      year: "2021 - Present",
      description: "Brief description of your studies and achievements"
    },
    // Add more education entries here
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
              Education
            </Typography>

            {education.map((edu, index) => (
              <Card key={index} sx={{ mb: 3, backgroundColor: 'transparent' }}>
                <CardContent>
                  <Box display="flex" alignItems="center" mb={2}>
                    <SchoolIcon sx={{ mr: 2, color: 'white' }} />
                    <Typography variant="h5" component="h2">
                      {edu.school}
                    </Typography>
                  </Box>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    {edu.degree}
                  </Typography>
                  <Typography color="textSecondary">
                    {edu.year}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    {edu.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default Education;
