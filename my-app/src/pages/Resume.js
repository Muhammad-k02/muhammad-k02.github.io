import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import WebGLBackground from '../components/WebGLBackground';
import DropdownMenu from '../components/DropdownMenu';

const Resume = () => {
  const resumeUrl = "/path-to-your-resume.pdf";

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
            Resume
          </Typography>
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            href={resumeUrl}
            download
            sx={{
              mt: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              }
            }}
          >
            Download Resume
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default Resume;
