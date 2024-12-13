import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

const Resume = () => {
  // Replace with your actual resume PDF URL
  const resumeUrl = "/path-to-your-resume.pdf";

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
          Resume
        </Typography>

        <Box sx={{ 
          textAlign: 'center',
          p: 4,
          borderRadius: 2
        }}>
          <Typography variant="h6" sx={{ mb: 3 }}>
            View or download my complete resume
          </Typography>
          
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            href={resumeUrl}
            target="_blank"
          >
            Download Resume
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Resume;
