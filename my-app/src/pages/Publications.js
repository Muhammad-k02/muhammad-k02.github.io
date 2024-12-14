import React from 'react';
import { Box, Container, Typography, Card, CardContent } from '@mui/material';
import WebGLBackground from '../components/WebGLBackground';
import DropdownMenu from '../components/DropdownMenu';

const Publications = () => {
  const publications = [
    {
      title: "Identification and Analysis of the Spread of {Mis}information on Social Media",
      authors: "Muhammad Khan et al.",
      journal: "Springer",
      year: "2023",
      doi: "https://doi.org/10.1007/978-981-97-0669-3_33",
      abstract: "This study investigates the relationship between musical complexity and aesthetic pleasure..."
    },
   
  ];

  return (
    <Box sx={{ 
      position: 'relative',
      minHeight: '100vh',
      width: '100%',
      overflow: 'hidden'
    }}>
      <WebGLBackground isHome={false} />
      <DropdownMenu />
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          minHeight: '100vh',
          padding: { xs: '20px', md: '40px' },
          color: '#E6E6E1'
        }}
      >
        <Container maxWidth="lg">
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom
            sx={{
              fontWeight: 300,
              textAlign: 'center',
              mb: 6,
              fontSize: { xs: '2.5rem', md: '3.5rem' }
            }}
          >
            Publications
          </Typography>
          {publications.map((pub, index) => (
            <Card 
              key={index}
              sx={{
                mb: 4,
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                borderRadius: '16px',
                overflow: 'hidden',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: `
                    0 4px 30px rgba(0, 0, 0, 0.2),
                    0 0 20px rgba(255, 255, 255, 0.1)
                  `
                }
              }}
            >
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  {pub.title}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                  {pub.authors}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                  {pub.journal} ({pub.year})
                </Typography>
                <Typography variant="body1" paragraph>
                  {pub.abstract}
                </Typography>
                <Typography 
                  variant="body2" 
                  component="a" 
                  href={pub.doi}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: '#90caf9',
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline'
                    }
                  }}
                >
                  {pub.doi}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Container>
      </Box>
    </Box>
  );
};

export default Publications;
