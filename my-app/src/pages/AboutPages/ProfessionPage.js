import { Box, Container,Typography } from '@mui/material';
import React from 'react';

function ProfessionPage() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        py: 4 
      }}>
        <Typography variant="h3" gutterBottom>
          Profession
        </Typography>
        <Box sx={{ 
          display: 'flex', 
          gap: 4, 
          flexDirection: { xs: 'column', md: 'row' } 
        }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1" paragraph>
              My professional journey is defined by technical expertise, creative problem-solving, 
              and a passion for developing innovative solutions that bridge technology, design, and human experience.
            </Typography>
            <Typography variant="body1" paragraph>
              I leverage interdisciplinary skills to create meaningful, user-centered technologies 
              that address complex challenges and drive positive transformation.
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
              Insert Custom Profession Image
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default ProfessionPage;
