import React from 'react';
import { motion } from 'framer-motion';
import { Container, Typography, Card, CardContent, Box } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';

const Education = () => {
  const education = [
    {
      school: "YLoyola University Chicago",
      degree: "B.S Software Engineering",
      year: "2021 - Present",
      description: "Brief description of your studies and achievements"
    },
    // Add more education entries here
  ];

  return (
    <Container maxWidth="lg" sx={{ pt: 12, pb: 6 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h2" component="h1" gutterBottom sx={{ color: 'white', mb: 4 }}>
          Education
        </Typography>

        {education.map((edu, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card 
              sx={{ 
                mb: 3,
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                color: 'white'
              }}
            >
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
                <Typography color="textSecondary" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  {edu.year}
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  {edu.description}
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </Container>
  );
};

export default Education;
