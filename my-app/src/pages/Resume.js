import CloseIcon from '@mui/icons-material/Close';
import { Box, Container, Dialog, DialogContent, IconButton, Typography } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';

import DropdownMenu from '../components/DropdownMenu';

// Update this path to your actual resume PDF
const RESUME_PATH = `${process.env.PUBLIC_URL}/pdfs/Muhammad_Khan_Resume.pdf`;

const MotionDialog = motion(Dialog);

const Resume = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleClick = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <DropdownMenu />
      <Box
        sx={{
          position: 'relative',
          minHeight: '100vh',
          width: '100%',
          overflow: 'hidden',
          backgroundColor: 'transparent',
          transition: 'all 0.8s ease',
          '&::before': isHovered
            ? {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `
                  linear-gradient(
                    45deg,
                    transparent 0%,
                    rgba(255, 215, 0, 0.03) 25%,
                    rgba(255, 215, 0, 0.08) 50%,
                    rgba(255, 215, 0, 0.03) 75%,
                    transparent 100%
                  )
                `,
                backgroundSize: '200% 200%',
                animation: 'shimmer 4s linear infinite',
                zIndex: 0,
              }
            : {},
          '@keyframes shimmer': {
            '0%': {
              backgroundPosition: '0% 50%',
            },
            '50%': {
              backgroundPosition: '100% 50%',
            },
            '100%': {
              backgroundPosition: '0% 50%',
            },
          },
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            position: 'relative',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
          }}
        >
          <Box
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick}
            sx={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '400px',
              height: '400px',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              '&::before': {
                content: '""',
                position: 'absolute',
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                border: '2px solid #ffd700',
                animation: 'pulse 2s infinite',
                boxShadow: isHovered
                  ? `
                  0 0 30px rgba(255, 215, 0, 0.5),
                  0 0 60px rgba(255, 215, 0, 0.3),
                  0 0 90px rgba(255, 215, 0, 0.2),
                  inset 0 0 30px rgba(255, 215, 0, 0.5),
                  inset 0 0 60px rgba(255, 215, 0, 0.3),
                  inset 0 0 90px rgba(255, 215, 0, 0.2)
                `
                  : `
                  0 0 20px rgba(255, 215, 0, 0.3),
                  0 0 40px rgba(255, 215, 0, 0.2),
                  0 0 60px rgba(255, 215, 0, 0.1)
                `,
              },
              '@keyframes pulse': {
                '0%': {
                  transform: 'scale(1)',
                  opacity: 0.8,
                },
                '50%': {
                  transform: 'scale(1.05)',
                  opacity: 0.5,
                },
                '100%': {
                  transform: 'scale(1)',
                  opacity: 0.8,
                },
              },
              '&::after': isHovered
                ? {
                    content: '""',
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    background:
                      'radial-gradient(circle, rgba(255, 215, 0, 0.15) 0%, transparent 70%)',
                    animation: 'glow 2s infinite',
                  }
                : {},
              '@keyframes glow': {
                '0%': {
                  opacity: 0.5,
                  transform: 'scale(1)',
                },
                '50%': {
                  opacity: 0.8,
                  transform: 'scale(1.1)',
                },
                '100%': {
                  opacity: 0.5,
                  transform: 'scale(1)',
                },
              },
            }}
          >
            <Typography
              variant="h2"
              component="h1"
              sx={{
                color: isHovered ? '#ffd700' : '#E6E6E1',
                fontWeight: 300,
                textAlign: 'center',
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                textShadow: isHovered
                  ? '0 0 15px rgba(255, 215, 0, 0.8), 0 0 30px rgba(255, 215, 0, 0.6), 0 0 45px rgba(255, 215, 0, 0.4)'
                  : '0 0 5px rgba(255, 215, 0, 0.3), 0 0 10px rgba(255, 215, 0, 0.2)',
                transition: 'all 0.3s ease',
                zIndex: 1,
              }}
            >
              Resume
            </Typography>
          </Box>
        </Container>

        <AnimatePresence>
          {isDialogOpen && (
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
                open={isDialogOpen}
                onClose={handleDialogClose}
                maxWidth="xl"
                fullWidth
                PaperProps={{
                  sx: {
                    width: '90vw',
                    height: '90vh',
                    maxWidth: '1200px',
                    maxHeight: '900px',
                    borderRadius: '15px',
                    overflow: 'hidden',
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    border: '2px solid rgba(255,215,0,0.3)',
                    boxShadow: '0 0 30px rgba(255,215,0,0.2)',
                  }
                }}
                sx={{
                  zIndex: 1300,
                }}
              >
                <DialogContent 
                  sx={{
                    padding: 0,
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'transparent',
                  }}
                >
                  <iframe
                    src={RESUME_PATH}
                    width="100%"
                    height="100%"
                    title="Resume"
                    style={{
                      border: 'none',
                      borderRadius: '15px',
                    }}
                  />
                  <IconButton
                    onClick={handleDialogClose}
                    sx={{
                      position: 'absolute',
                      top: 10,
                      right: 10,
                      color: 'white',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.2)',
                      },
                      zIndex: 1310,
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </DialogContent>
              </MotionDialog>
            </>
          )}
        </AnimatePresence>
      </Box>
    </>
  );
};

export default Resume;
