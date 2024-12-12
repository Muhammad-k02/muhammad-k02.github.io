import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, Typography, Container, Grid } from '@mui/material';

const Publications = () => {
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
    <Container maxWidth="lg" sx={{ pt: 12, pb: 6 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h2" component="h1" gutterBottom sx={{ color: 'white', mb: 4 }}>
          Publications
        </Typography>
        
        <Grid container spacing={3}>
          {publications.map((pub, index) => (
            <Grid item xs={12} key={index}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card sx={{ 
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  color: 'white'
                }}>
                  <CardContent>
                    <Typography variant="h6" component="h2">
                      {pub.title}
                    </Typography>
                    <Typography color="textSecondary" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      {pub.authors}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {pub.journal} ({pub.year})
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </Container>
  );
};

export default Publications;
