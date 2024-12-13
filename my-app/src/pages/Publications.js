import React from 'react';
import { Container, Typography, Card, CardContent, Grid, Box } from '@mui/material';

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
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <Container maxWidth="lg">
        <Typography variant="h2" component="h1" gutterBottom>
          Publications
        </Typography>
        
        <Grid container spacing={3}>
          {publications.map((pub, index) => (
            <Grid item xs={12} key={index}>
              <Card>
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
  );
};

export default Publications;
