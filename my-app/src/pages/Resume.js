import React from 'react';
import { motion } from 'framer-motion';
import { Container, Typography, Button, Box } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

const Resume = () => {
  // Replace with your actual resume PDF URL
  const resumeUrl = "/path-to-your-resume.pdf";

  return (
    <Container maxWidth="lg" sx={{ pt: 12, pb: 6 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h2" component="h1" gutterBottom sx={{ color: 'white', mb: 4 }}>
          Resume
        </Typography>

        <Box sx={{ 
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          p: 4,
          borderRadius: 2,
          textAlign: 'center'
        }}>
          <Typography variant="h6" sx={{ color: 'white', mb: 3 }}>
            View or download my complete resume
          </Typography>
          
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            href={resumeUrl}
            target="_blank"
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
              }
            }}
          >
            Download Resume
          </Button>
        </Box>

        {/* You can add more sections here like Skills, Experience, etc. */}
      </motion.div>
    </Container>
  );
};

export default Resume;
