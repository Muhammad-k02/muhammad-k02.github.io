import React from 'react';
import { Box, Typography, Container } from '@mui/material';

function PhilosophyPage() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        py: 4 
      }}>
        <Typography variant="h3" gutterBottom>
          Philosophy
        </Typography>
        <Box sx={{ 
          display: 'flex', 
          gap: 4, 
          flexDirection: { xs: 'column', md: 'row' } 
        }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1" paragraph>
              Philosophy is the art of questioning, a continuous journey of intellectual exploration 
              that challenges assumptions and seeks deeper understanding of human experience.
            </Typography>
            <Typography variant="body1" paragraph>
              My philosophical approach emphasizes critical thinking, empathy, and the interconnectedness 
              of knowledge across disciplines, always seeking to broaden perspectives and challenge established norms.
            </Typography>
          </Box>
          <Box sx={{ 
            flex: 1, 
            height: { xs: 300, md: 400 }, 
            backgroundColor: 'grey.300',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            {/* Placeholder for custom image */}
            <Typography variant="h6" color="text.secondary">
              Insert Custom Philosophy Image
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default PhilosophyPage;
