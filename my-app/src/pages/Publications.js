import React from 'react';
import { Container, Typography, Card, CardContent, Grid, Box } from '@mui/material';
import DropdownMenu from '../components/DropdownMenu';
import WebGLBackground from '../components/WebGLBackground';
import { ShaderGradientCanvas, ShaderGradient } from 'shadergradient';
import * as reactSpring from '@react-spring/three';
import * as drei from '@react-three/drei';
import * as fiber from '@react-three/fiber';

function Publications() {
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
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" gutterBottom>
            Publications
          </Typography>
          <Grid container spacing={3}>
            {publications.map((pub, index) => (
              <Grid item xs={12} key={index}>
                <Card sx={{ backgroundColor: 'transparent' }}>
                  <CardContent>
                    <Typography variant="h6" component="h2">
                      {pub.title}
                    </Typography>
                    <Typography color="textSecondary">
                      {pub.authors}
                    </Typography>
                    <Typography variant="body2">
                      {pub.journal} ({pub.year})
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Publications;
