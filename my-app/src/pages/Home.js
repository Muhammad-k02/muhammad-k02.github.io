import { Close as CloseIcon } from '@mui/icons-material';
import { Box, Button, Container, IconButton, Modal, Paper, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import DropdownMenu from '../components/DropdownMenu';
import GlitchCanvas from '../components/GlitchCanvas';
import Navbar from '../components/Navbar';
import TypeWriter from '../components/TypeWriter';

function Home() {
  const [revealedWords, setRevealedWords] = useState([]);
  const [showWelcomeText, setShowWelcomeText] = useState(false);
  const [welcomeTextOpacity, setWelcomeTextOpacity] = useState(0);
  const [welcomeTextAnimationComplete, setWelcomeTextAnimationComplete] = useState(false);
  const [showAboutMeButton, setShowAboutMeButton] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [navbarOpacity, setNavbarOpacity] = useState(0);
  const [_overlayOpacity, setOverlayOpacity] = useState(0);
  const [_filterOpacity, setFilterOpacity] = useState(0);
  const [showTypeWriter, setShowTypeWriter] = useState(true);
  const [showGlitchCanvas, setShowGlitchCanvas] = useState(false);
  const navigate = useNavigate();
  const welcomeTextRef = useRef(null);
  const _containerRef = useRef(null);

  const handleAboutMeClick = () => {
    navigate('/about');
  };

  const handleAboutMeClose = () => {
    // Placeholder for any future modal close logic
  };

  const _menuItems = [
    { label: 'Home', link: '/' },
    { label: 'Resume', link: '/resume' },
    { label: 'Publications', link: '/publications' },
    { label: 'Projects', link: '/projects' },
    { label: 'Education', link: '/education' },
  ];

  const introText = 'Hello! My Name is Muhammad Khan, I am a Computational Researcher!'.split(' ');

  useEffect(() => {
    // Add Google Fonts link
    const link = document.createElement('link');
    link.href =
      'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@1,100;1,200&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Disable default scrolling for custom scroll effect
    document.body.style.overflow = 'hidden';

    const handleWheel = (event) => {
      event.preventDefault();

      // Hide scroll indicator on first scroll
      if (showScrollIndicator) {
        setShowScrollIndicator(false);
      }

      // Determine scroll direction
      const isScrollingDown = event.deltaY > 0;

      // Calculate words to reveal
      const currentWordCount = revealedWords.length;
      let newWordCount;

      if (isScrollingDown) {
        // Scrolling down: reveal more words
        newWordCount = Math.min(introText.length, currentWordCount + 1);
      } else {
        // Scrolling up: remove words
        newWordCount = Math.max(0, currentWordCount - 1);
      }

      // Update revealed words
      const newRevealedWords = introText.slice(0, newWordCount);
      setRevealedWords(newRevealedWords);

      // Reset welcome text if going backwards
      if (newWordCount === 0) {
        setShowWelcomeText(false);
        setWelcomeTextOpacity(0);
        setWelcomeTextAnimationComplete(false);
        setShowAboutMeButton(false);
        setNavbarOpacity(0);
      }

      // Show welcome text only when fully revealed and not already animated
      if (newWordCount >= introText.length && !welcomeTextAnimationComplete) {
        setShowWelcomeText(true);

        let start = null;
        const animateFadeIn = (timestamp) => {
          if (!start) start = timestamp;

          const progress = Math.min((timestamp - start) / 400, 1);
          const smoothProgress = progress * progress * (3 - 2 * progress);

          setWelcomeTextOpacity(smoothProgress);

          if (progress < 1) {
            requestAnimationFrame(animateFadeIn);
          } else {
            setWelcomeTextAnimationComplete(true);

            // Trigger About Me button appearance after welcome text
            setShowAboutMeButton(true);

            // Trigger navbar appearance after About Me button
            setTimeout(() => {
              setNavbarOpacity(1);
            }, 500); // Reduced delay from 1000 to 500
          }
        };

        requestAnimationFrame(animateFadeIn);
      }

      // Update filter opacity based on scroll direction
      setFilterOpacity(isScrollingDown ? 0.5 : 0);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      document.body.style.overflow = 'auto';
    };
  }, [revealedWords, welcomeTextAnimationComplete, showScrollIndicator, introText]);

  useEffect(() => {
    let timeoutId;
    if (navbarOpacity > 0) {
      timeoutId = setTimeout(() => {
        setShowTypeWriter(false);
      }, 2000);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [navbarOpacity]);

  useEffect(() => {
    let timeoutId;
    if (!showTypeWriter) {
      timeoutId = setTimeout(() => {
        setShowGlitchCanvas(true);
      }, 500); // Short delay after TypeWriter disappears
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [showTypeWriter]);

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        overflow: 'hidden',
        backgroundColor: 'black',
      }}
    >
      {showTypeWriter && <TypeWriter visibility={showTypeWriter} />}
      {showGlitchCanvas && <GlitchCanvas />}
      {/* Dark filter that appears on scroll down */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 3,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#E6E6E1',
        }}
      >
        <DropdownMenu />
        <Container
          maxWidth="lg"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            padding: '20px',
            width: '100%',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              display: 'flex',
              flexWrap: 'none',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '5px',
              height: '100px',
              marginBottom: '0px',
              textAlign: 'center',
              width: '100%',
              overflow: 'hidden',
              fontFamily: 'Montserrat',
              fontSize: '2rem',
              lineHeight: 1.2,
              whiteSpace: 'nowrap',
              position: 'absolute',
              top: '40%',
              transform: 'translateY(-50%)',
            }}
          >
            {introText.map((word, index) => (
              <span
                key={index}
                style={{
                  opacity: revealedWords.includes(word) ? 1 : 0,
                  transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out',
                  transform: revealedWords.includes(word) ? 'translateY(0)' : 'translateY(20px)',
                  display: 'inline-block',
                  margin: '0 3px',
                  color: 'white',
                }}
              >
                {word}
              </span>
            ))}
          </Typography>

          {/* Welcome Text */}
          {showWelcomeText && (
            <Container
              ref={welcomeTextRef}
              sx={{
                textAlign: 'center',
                maxWidth: 'md',
                px: 3,
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  position: 'absolute',
                  top: '47%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  color: 'white',
                  opacity: welcomeTextOpacity,
                  transition: 'opacity 0.4s ease-out, transform 0.4s ease-out',
                  fontFamily: 'Montserrat',
                  fontSize: '2rem',
                  willChange: 'opacity',
                  textAlign: 'center',
                }}
              >
                Welcome to my Website!
              </Typography>

              {/* About Me Button */}
              {showAboutMeButton && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: '58%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    opacity: welcomeTextOpacity,
                    transition: 'opacity 0.4s ease-out',
                    willChange: 'opacity',
                    maxWidth: '80%',
                    textAlign: 'center',
                  }}
                >
                  <Button
                    onClick={handleAboutMeClick}
                    sx={{
                      display: 'inline-block',
                      fontFamily: 'Montserrat',
                      fontSize: '20px',
                      letterSpacing: '5px',
                      textAlign: 'center',
                      position: 'relative',
                      minWidth: '100px',
                      minHeight: '10px',
                      margin: '20px',
                      background: 'none',
                      textDecoration: 'none',
                      cursor: 'pointer',
                      color: '#E6E6E1', // Soft off-white for text
                      borderRadius: '10px',
                      padding: '12px 20px',
                      boxSizing: 'content-box',
                      '&:before, & span:before, &:after, & span:after': {
                        display: 'block',
                        content: '""',
                        width: '15px',
                        height: '15px',
                        position: 'absolute',
                        textAlign: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                      },
                      '&:before': {
                        top: '-2px',
                        left: '-2px',
                        borderTop: '2px solid #D1CCC1', // Muted off-white border
                        borderTopLeftRadius: '8px',
                        borderLeft: '2px solid #D1CCC1',
                        transition: '0.75s all',
                      },
                      '&:after': {
                        top: '-2px',
                        right: '-2px',
                        borderTop: '2px solid #D1CCC1',
                        borderTopRightRadius: '8px',
                        borderRight: '2px solid #D1CCC1',
                        transition: '0.75s all',
                      },
                      '& span': {
                        display: 'block',
                        textAlign: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: '8px',
                        '&:before': {
                          bottom: '-2px',
                          left: '-2px',
                          borderBottom: '2px solid #D1CCC1',
                          borderBottomLeftRadius: '8px',
                          borderLeft: '2px solid #D1CCC1',
                          transition: '0.75s all',
                        },
                        '&:after': {
                          bottom: '-2px',
                          right: '-2px',
                          borderBottom: '2px solid #D1CCC1',
                          borderBottomRightRadius: '8px',
                          borderRight: '2px solid #D1CCC1',
                          transition: '0.75s all',
                        },
                      },
                      '&:hover': {
                        color: '#FFFFFF', // Pure white on hover
                        borderRadius: '10px',
                        '&:before, &:after': {
                          borderColor: '#F0EDE5', // Lighter off-white on hover
                          width: '100%',
                          height: '100%',
                          borderRadius: '10px',
                        },
                        '& span:before, & span:after': {
                          borderColor: '#F0EDE5',
                          width: '100%',
                          height: '100%',
                          borderRadius: '10px',
                        },
                      },
                      fontWeight: 600, // Added to bolden the text
                      lineHeight: '30px',
                    }}
                  >
                    <span>About Me</span>
                  </Button>
                </Box>
              )}
            </Container>
          )}

          {/* Scroll Indicator */}
          {showScrollIndicator && (
            <Box
              sx={{
                position: 'absolute',
                bottom: '5%',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                opacity: 0.8,
                transition: 'all 0.3s ease',
                '&:hover': {
                  opacity: 1,
                  transform: 'translateX(-50%) scale(1.1)',
                },
              }}
              onClick={() => {
                const aboutSection = document.getElementById('about-section');
                if (aboutSection) {
                  aboutSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <motion.div
                animate={{
                  y: [0, 10, 0],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: 'white',
                    fontFamily: 'Montserrat',
                    marginBottom: '8px',
                    textShadow: '0 0 10px rgba(255,255,255,0.5)',
                  }}
                >
                  Scroll Down
                </Typography>
                <Box
                  sx={{
                    width: '30px',
                    height: '50px',
                    border: '2px solid white',
                    borderRadius: '20px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    boxShadow: '0 0 15px rgba(255,255,255,0.3)',
                  }}
                >
                  <motion.div
                    animate={{
                      y: [0, 15, 0],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: 'white',
                      position: 'absolute',
                    }}
                  />
                </Box>
              </motion.div>
            </Box>
          )}

          {/* Progress Indicator */}
          <Box
            sx={{
              position: 'absolute',
              bottom: '20px',
              width: '200px',
              height: '4px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '1.5px',
            }}
          >
            <Box
              sx={{
                width: `${revealedWords.length * (100 / introText.length)}%`,
                height: '100%',
                background: 'white',
                borderRadius: '1.5px',
                transition: 'width 0.3s ease',
              }}
            />
          </Box>

          {/* About Me Modal */}
          <Modal
            open={false}
            onClose={handleAboutMeClose}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Paper
              sx={{
                width: '80%',
                maxWidth: '600px',
                maxHeight: '80vh',
                overflowY: 'auto',
                padding: '2rem',
                backgroundColor: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(15px)',
                borderRadius: '15px',
                color: 'white',
                position: 'relative',
              }}
            >
              <IconButton
                onClick={handleAboutMeClose}
                sx={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  color: 'white',
                }}
              >
                <CloseIcon />
              </IconButton>

              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  fontFamily: 'Montserrat',
                  marginBottom: '1rem',
                }}
              >
                About Me
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  fontFamily: 'Montserrat',
                  lineHeight: 1.6,
                }}
              >
                Hi, I&apos;m Muhammad Khan, a passionate computational researcher dedicated to
                pushing the boundaries of technology and scientific understanding. My work spans
                across machine learning, data science, and innovative computational methodologies.
                With a strong academic background and a keen interest in solving complex problems, I
                strive to develop cutting-edge solutions that bridge theoretical research and
                practical applications.
              </Typography>
            </Paper>
          </Modal>

          {/* Navbar positioned below About Me section */}
          {navbarOpacity > 0 && (
            <Box
              sx={{
                position: 'absolute',
                bottom: '190px',
                left: 0,
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                opacity: navbarOpacity,
                transition: 'opacity 1s ease, transform 0.5s ease',
                transform: navbarOpacity > 0 ? 'translateY(0)' : 'translateY(20px)',
                zIndex: 10,
              }}
            >
              <Navbar />
            </Box>
          )}
        </Container>
      </Box>
    </Box>
  );
}

export default Home;
