import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import DropdownMenu from '../components/DropdownMenu';
import backgroundImage from '../assets/backgrounds/Fletschhorn v2 TimeShifted-3 (dragged).jpg';

const backgroundStyles = {
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  minHeight: '100vh',
  width: '100%',
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: -1,
};

const overlayStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.6)', // Dark overlay
  zIndex: -1,
};

const createStars = () => {
  const starsContainer = document.createElement('div');
  starsContainer.id = 'stars-container';
  starsContainer.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
    overflow: hidden;
  `;

  const numStars = 250;
  for (let i = 0; i < numStars; i++) {
    const star = document.createElement('div');
    star.style.cssText = `
      position: absolute;
      background-color: white;
      border-radius: 50%;
      animation: twinkle ${Math.random() * 1 + 0.5}s infinite alternate;
    `;

    const size = Math.random() * 2;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    const x = Math.random() * 100;
    const y = Math.random() * 100;
    star.style.left = `${x}%`;
    star.style.top = `${y}%`;

    starsContainer.appendChild(star);
  }

  const style = document.createElement('style');
  style.textContent = `
    @keyframes twinkle {
      0% { opacity: 0.5; }
      100% { opacity: 1; }
    }
  `;
  document.head.appendChild(style);

  return starsContainer;
};

const Education = () => {
  useEffect(() => {
    const starsContainer = createStars();
    document.body.appendChild(starsContainer);

    return () => {
      document.body.removeChild(starsContainer);
    };
  }, []);

  const [_expandedId, setExpandedId] = useState(null);
  const [_dialogOpen, setDialogOpen] = useState(false);
  const [_selectedEducation, setSelectedEducation] = useState(null);

  useEffect(() => {
    console.log('Background Image:', backgroundImage);
    console.log('Background Image Path:', backgroundImage);
  }, []);

  const education = [
    {
      school: 'Loyola University Chicago',
      degree: 'Bachelor of Science in Computer Science',
      year: '2020-2025',
      description:
        'A comprehensive study in computer science with a focus on artificial intelligence and machine learning. Key achievements include:\n\n' +
        '• Maintained a 3.9+ GPA throughout the program\n' +
        '• Completed advanced coursework in Neural Networks and Deep Learning\n' +
        '• Conducted research on spread of misinformation and violence detection\n' +
        '• First Author of a research paper on Misinformation\n' +
        "• Received the Dean's List recognition for all semesters",
      achievements: [
        "Dean's List Scholar (All Semesters)",
        'David Prasse Scholarship (2021- 2025)',
      ],
    },
    // Add more education entries here
  ];

  const _handleExpandClick = (id) => {
    setExpandedId(_expandedId === id ? null : id);
  };

  const _handleDialogOpen = (edu) => {
    setSelectedEducation(edu);
    setDialogOpen(true);
  };

  const _handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedEducation(null);
  };

  return (
    <>
      <Box 
        sx={backgroundStyles} 
        style={{ 
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }} 
      />
      <Box sx={overlayStyles} />
      <Box 
        sx={{
          position: 'fixed',
          top: '5vh',
          left: 0,
          width: '100%',
          height: '8.5vh',
          backgroundColor: 'white',
          zIndex: 2,
        }}
      />
      <Container 
        maxWidth="lg" 
        sx={{ 
          position: 'relative', 
          zIndex: 3,
          backgroundColor: 'transparent',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '50vh',
          padding: { xs: '20px', md: '40px' },
        }}
      >
        <DropdownMenu 
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 10,
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent dark background
            backdropFilter: 'blur(5px)', // Glass-like effect
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)', // Subtle shadow
            padding: '10px 0',
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ width: '100%' }}
        >
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 600,
              textAlign: 'center',
              mb: 6,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              color: 'black',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            }}
          >
            Education
          </Typography>
        </motion.div>

        {education.map((edu, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <Card
              sx={{
                mb: 4,
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.15)',
                borderRadius: '16px',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: `
                    0 4px 30px rgba(0, 0, 0, 0.4),
                    0 0 30px rgba(255, 255, 255, 0.3)
                  `,
                  background: 'rgba(255, 255, 255, 0.35)',
                  backdropFilter: 'blur(25px)',
                  WebkitBackdropFilter: 'blur(25px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                },
              }}
            >
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  {edu.school}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                  {edu.degree}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                  {edu.year}
                </Typography>

                <Box sx={{ mt: 2 }}>
                  <Typography variant="body1" paragraph>
                    {edu.description.split('\n\n')[0]}
                  </Typography>

                  <Button
                    onClick={() => _handleDialogOpen(edu)}
                    sx={{
                      color: '#90caf9',
                      textTransform: 'none',
                      '&:hover': {
                        background: 'rgba(255, 255, 255, 0.05)',
                      },
                    }}
                  >
                    Read More
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </Container>

      <AnimatePresence>
        {_dialogOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={_handleDialogClose}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.75)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                zIndex: 1299,
              }}
            />
            <Dialog
              open={_dialogOpen}
              onClose={_handleDialogClose}
              maxWidth="md"
              fullWidth
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              PaperProps={{
                sx: {
                  background: 'rgba(23, 23, 23, 0.95)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  boxShadow: `
                    0 4px 30px rgba(0, 0, 0, 0.3),
                    inset 0 0 1px 0 rgba(255, 255, 255, 0.2)
                  `,
                  color: '#E6E6E1',
                  zIndex: 1300,
                },
              }}
            >
              {_selectedEducation && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <DialogTitle sx={{ pr: 6 }}>
                    {_selectedEducation.school}
                    <IconButton
                      onClick={_handleDialogClose}
                      sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: 'rgba(255, 255, 255, 0.7)',
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </DialogTitle>
                  <DialogContent dividers sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Typography variant="subtitle1" gutterBottom>
                        {_selectedEducation.degree}
                      </Typography>
                      <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                        {_selectedEducation.year}
                      </Typography>
                      <Typography variant="body1" sx={{ whiteSpace: 'pre-line', mt: 2 }}>
                        {_selectedEducation.description}
                      </Typography>
                      {_selectedEducation.achievements && (
                        <Box sx={{ mt: 3 }}>
                          <Typography variant="h6" gutterBottom>
                            Achievements
                          </Typography>
                          {_selectedEducation.achievements.map((achievement, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.4 + index * 0.1 }}
                            >
                              <Typography variant="body1" sx={{ mb: 1 }}>
                                • {achievement}
                              </Typography>
                            </motion.div>
                          ))}
                        </Box>
                      )}
                    </motion.div>
                  </DialogContent>
                </motion.div>
              )}
            </Dialog>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

Education.propTypes = {
  // backgroundImage: PropTypes.string.isRequired,
};

export default Education;
