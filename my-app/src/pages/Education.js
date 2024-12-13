import React from 'react';
import { Container, Typography, Card, CardContent, Box } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';

const Education = () => {
  const education = [
    {
      school: "Loyola University Chicago",
      degree: "B.S Software Engineering",
      year: "2021 - Present",
      description: "Brief description of your studies and achievements"
    },
    // Add more education entries here
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
          Education
        </Typography>

        {education.map((edu, index) => (
          <Card key={index} sx={{ mb: 3 }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <SchoolIcon sx={{ mr: 2 }} />
                <Typography variant="h5" component="h2">
                  {edu.school}
                </Typography>
              </Box>
              <Typography variant="h6" sx={{ mb: 1 }}>
                {edu.degree}
              </Typography>
              <Typography color="textSecondary">
                {edu.year}
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                {edu.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Container>
    </Box>
  );
};

export default Education;
