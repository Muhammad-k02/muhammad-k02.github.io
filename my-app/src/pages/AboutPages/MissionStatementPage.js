import { Box, Container,Typography } from '@mui/material';
import React from 'react';

function MissionStatementPage() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        py: 4 
      }}>
        <Typography variant="h3" gutterBottom>
          Mission Statement
        </Typography>
        <Box sx={{ 
          display: 'flex', 
          gap: 4, 
          flexDirection: { xs: 'column', md: 'row' } 
        }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1" paragraph>
              My mission is to cultivate continuous learning, creative expression, 
              and meaningful contributions that inspire growth, empathy, and positive change.
            </Typography>
            <Typography variant="body1" paragraph>
              I am committed to bridging diverse disciplines, challenging conventional thinking, 
              and creating innovative solutions that have a tangible impact on individuals and communities.
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
              Insert Custom Mission Statement Image
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default MissionStatementPage;
