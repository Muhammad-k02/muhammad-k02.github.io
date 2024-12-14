import React, { useState } from 'react';
import { Box, Typography, Container, Dialog, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { motion, AnimatePresence } from 'framer-motion';
import DropdownMenu from '../components/DropdownMenu';

const Resume = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleClick = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <DropdownMenu />
      <Box sx={{ 
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        overflow: 'hidden',
        backgroundColor: 'transparent',
        transition: 'all 0.8s ease',
        '&::before': isHovered ? {
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
          zIndex: 0
        } : {},
        '@keyframes shimmer': {
          '0%': {
            backgroundPosition: '0% 50%'
          },
          '50%': {
            backgroundPosition: '100% 50%'
          },
          '100%': {
            backgroundPosition: '0% 50%'
          }
        }
      }}>
        <Container maxWidth="lg" sx={{ 
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1
        }}>
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
                boxShadow: isHovered ? `
                  0 0 30px rgba(255, 215, 0, 0.5),
                  0 0 60px rgba(255, 215, 0, 0.3),
                  0 0 90px rgba(255, 215, 0, 0.2),
                  inset 0 0 30px rgba(255, 215, 0, 0.5),
                  inset 0 0 60px rgba(255, 215, 0, 0.3),
                  inset 0 0 90px rgba(255, 215, 0, 0.2)
                ` : `
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
              '&::after': isHovered ? {
                content: '""',
                position: 'absolute',
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255, 215, 0, 0.15) 0%, transparent 70%)',
                animation: 'glow 2s infinite',
              } : {},
              '@keyframes glow': {
                '0%': {
                  opacity: 0.5,
                  transform: 'scale(1)'
                },
                '50%': {
                  opacity: 0.8,
                  transform: 'scale(1.1)'
                },
                '100%': {
                  opacity: 0.5,
                  transform: 'scale(1)'
                }
              }
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
                textShadow: isHovered ?
                  '0 0 15px rgba(255, 215, 0, 0.8), 0 0 30px rgba(255, 215, 0, 0.6), 0 0 45px rgba(255, 215, 0, 0.4)' :
                  '0 0 5px rgba(255, 215, 0, 0.3), 0 0 10px rgba(255, 215, 0, 0.2)',
                transition: 'all 0.3s ease',
                zIndex: 1
              }}
            >
              Resume
            </Typography>
          </Box>
        </Container>

        <AnimatePresence>
          {dialogOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={handleClose}
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'rgba(0, 0, 0, 0.75)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  zIndex: 1299
                }}
              />
              <Dialog
                open={dialogOpen}
                onClose={handleClose}
                maxWidth="lg"
                fullWidth
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                PaperProps={{
                  sx: {
                    background: 'rgba(23, 23, 23, 0.95)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 215, 0, 0.2)',
                    borderRadius: '16px',
                    boxShadow: `
                      0 4px 30px rgba(0, 0, 0, 0.3),
                      inset 0 0 1px 0 rgba(255, 215, 0, 0.2)
                    `,
                    color: '#E6E6E1',
                    height: '90vh',
                    margin: '20px',
                    position: 'relative',
                    overflow: 'hidden'
                  }
                }}
              >
                <IconButton
                  onClick={handleClose}
                  sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: 'rgba(255, 215, 0, 0.7)',
                    zIndex: 1,
                    '&:hover': {
                      color: '#ffd700',
                      background: 'rgba(255, 215, 0, 0.1)'
                    }
                  }}
                >
                  <CloseIcon />
                </IconButton>
                <iframe
                  src="/Muhammad_Khan_Resume.pdf"
                  style={{
                    width: '100%',
                    height: '100%',
                    border: 'none'
                  }}
                  title="Resume"
                />
              </Dialog>
            </>
          )}
        </AnimatePresence>
      </Box>
    </>
  );
};

export default Resume;
