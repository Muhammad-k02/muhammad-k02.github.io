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
import backgroundImage from '../assets/backgrounds/Fletschhorn v2 TimeShifted.jpg';

const MotionDialog = motion(Dialog);
const MotionCard = motion(Card);

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

const Publications = () => {
  useEffect(() => {
    const starsContainer = createStars();
    document.body.appendChild(starsContainer);

    return () => {
      document.body.removeChild(starsContainer);
    };
  }, []);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPublication, setSelectedPublication] = useState(null);

  useEffect(() => {
    console.log('Background Image:', backgroundImage);
  }, []);

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

  const publications = [
    {
      title: 'Identification and Analysis of the Spread of {Mis}information on Social Media',
      authors: 'Muhammad Khan et al.',
      journal: 'Springer',
      year: '2023',
      doi: 'https://doi.org/10.1007/978-981-97-0669-3_33',
      abstract:
        'With unfolding crises such as the COVID-19 pandemic, it is essential that factual information is dispersed at a rapid pace. One of the major setbacks to mitigating the effects of such crises is misinformation. Advancing technologies such as transformer-based architectures that can pick up underlying patterns and correlational information that constitutes information provide tools that can be used to identify what is misinformation/information. To identify and analyze the spread of misinformation, this work performs a quantitative analysis that uses X (previously Twitter) as the data source and a BERT-based model to identify misinformation. The information of the posts, users, and followers was collected based on hashtags and then processed and manually labeled. Furthermore, we tracked the spread of misinformation related to COVID-19 during the year 2021 and determined how communities that spread information and/or misinformation on social networks interact from an analytical perspective. Our findings suggest that users tend to post more misinformation than information, possibly intentionally spreading misinformation. Our model showed good performance in classifying tweets as information/misinformation, resulting in an accuracy of 86%.',
    },
  ];

  const handleDialogOpen = (pub) => {
    setSelectedPublication(pub);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedPublication(null);
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
            Publications
          </Typography>
        </motion.div>

        {publications.map((pub, index) => (
          <MotionCard
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
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
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography
                variant="h5"
                component="a"
                onClick={(e) => {
                  e.preventDefault();
                  handleDialogOpen(pub);
                }}
                sx={{
                  color: '#E6E6E1',
                  textDecoration: 'none',
                  display: 'block',
                  mb: 2,
                  cursor: 'pointer',
                  '&:hover': {
                    color: '#90caf9',
                  },
                }}
              >
                {pub.title}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                {pub.authors}
              </Typography>
              <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                {pub.journal} ({pub.year})
              </Typography>
              <Box sx={{ position: 'relative', mt: 2 }}>
                <Typography
                  variant="body1"
                  sx={{
                    display: 'inline',
                    mr: 1,
                  }}
                >
                  {pub.abstract.substring(0, 150)}...
                </Typography>
                <Button
                  onClick={() => handleDialogOpen(pub)}
                  sx={{
                    color: '#90caf9',
                    textTransform: 'none',
                    fontWeight: 600,
                    display: 'inline',
                    padding: '0 4px',
                    minWidth: 'auto',
                    verticalAlign: 'baseline',
                    '&:hover': {
                      background: 'rgba(144, 202, 249, 0.08)',
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Read More →
                </Button>
              </Box>
            </CardContent>
          </MotionCard>
        ))}
      </Container>

      <AnimatePresence>
        {dialogOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={handleDialogClose}
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
            <MotionDialog
              open={dialogOpen}
              onClose={handleDialogClose}
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
              {selectedPublication && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <DialogTitle sx={{ pr: 6 }}>
                    {selectedPublication.title}
                    <IconButton
                      onClick={handleDialogClose}
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
                        {selectedPublication.authors}
                      </Typography>
                      <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                        {selectedPublication.journal} ({selectedPublication.year})
                      </Typography>
                      <Typography variant="body1" sx={{ mt: 2, mb: 3 }}>
                        {selectedPublication.abstract}
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          mt: 3,
                          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                          pt: 2,
                        }}
                      >
                        <Typography
                          variant="body2"
                          component="a"
                          href={selectedPublication.doi}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{
                            color: '#90caf9',
                            textDecoration: 'none',
                            '&:hover': {
                              textDecoration: 'underline',
                            },
                          }}
                        >
                          {selectedPublication.doi}
                        </Typography>
                      </Box>
                    </motion.div>
                  </DialogContent>
                </motion.div>
              )}
            </MotionDialog>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Publications;
