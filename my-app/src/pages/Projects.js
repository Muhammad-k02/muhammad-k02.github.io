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
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useCallback, useState, useEffect } from 'react';

import DropdownMenu from '../components/DropdownMenu';
import StarBackground from '../components/StarBackground';
import { projects } from '../config/projectData';
import logger from '../utils/logger';

import backgroundImage from '../assets/backgrounds/file.png';

const MotionDialog = motion(Dialog);
const MotionCard = motion(Card);

const Projects = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

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

  const handleDialogOpen = useCallback((project) => {
    logger.info('Opening project dialog:', project.title);
    setSelectedProject(project);
    setDialogOpen(true);
  }, []);

  const handleDialogClose = useCallback(() => {
    logger.info('Closing project dialog');
    setDialogOpen(false);
    setSelectedProject(null);
  }, []);

  return (
    <>
      <StarBackground style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: -2, 
        pointerEvents: 'none' 
      }} />
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
      {/* Removed white bar */}
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
              fontWeight: 'normal',
              textAlign: 'center',
              mb: 6,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              color: 'transparent',
              backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.8) 30%, rgba(230, 230, 225, 0.5) 100%)`,
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            }}
          >
            Projects
          </Typography>
        </motion.div>

        {projects.map((project, index) => (
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
                  handleDialogOpen(project);
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
                {project.title}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                {project.technologies ? project.technologies.join(' | ') : 'No technologies specified'}
              </Typography>
              <Box sx={{ position: 'relative', mt: 2 }}>
                <Typography
                  variant="body1"
                  sx={{
                    display: 'inline',
                    mr: 1,
                    color: '#E6E6E1',
                  }}
                >
                  {project.shortDescription ? project.shortDescription.substring(0, 150) : 'No description available'}...
                </Typography>
                <Button
                  onClick={() => handleDialogOpen(project)}
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
        {dialogOpen && selectedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Box
                sx={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  zIndex: 1299,
                }}
              />
            </motion.div>

            <MotionDialog
              open={dialogOpen}
              onClose={handleDialogClose}
              maxWidth="md"
              fullWidth
              sx={{ zIndex: 1300 }}
              PaperProps={{
                sx: {
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(15px)',
                  WebkitBackdropFilter: 'blur(15px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '16px',
                },
              }}
            >
              {selectedProject && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <DialogTitle 
                    sx={{ 
                      textAlign: 'center', 
                      color: '#E6E6E1',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                    }}
                  >
                    {selectedProject.title}
                    <IconButton
                      aria-label="close"
                      onClick={handleDialogClose}
                      sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: '#E6E6E1',
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </DialogTitle>
                  <DialogContent 
                    sx={{ 
                      color: '#E6E6E1',
                      textAlign: 'center',
                      py: 3,
                    }}
                  >
                    <Typography variant="body1" paragraph>
                      {selectedProject.fullDescription || 'No description available'}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ mb: 2 }}>
                      Technologies: {selectedProject.technologies ? selectedProject.technologies.join(' | ') : 'No technologies specified'}
                    </Typography>
                    {selectedProject.github && (
                      <Button
                        variant="outlined"
                        href={selectedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          color: '#90caf9',
                          borderColor: '#90caf9',
                          '&:hover': {
                            backgroundColor: 'rgba(144, 202, 249, 0.1)',
                            borderColor: '#90caf9',
                          },
                        }}
                      >
                        View on GitHub
                      </Button>
                    )}
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

export default Projects;
