import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Container, 
  IconButton, 
  Menu, 
  MenuItem, 
  Button, 
  Modal, 
  Paper 
} from '@mui/material';
import { 
  KeyboardArrowDown, 
  Menu as MenuIcon, 
  Close as CloseIcon 
} from '@mui/icons-material';
import Navbar from '../components/Navbar';
import DropdownMenu from '../components/DropdownMenu';
import WebGLBackground from '../components/WebGLBackground';
import TypeWriter from '../components/TypeWriter';
import { ShaderGradientCanvas, ShaderGradient } from 'shadergradient';
import * as reactSpring from '@react-spring/three';
import * as drei from '@react-three/drei';
import * as fiber from '@react-three/fiber';

function Home() {
  const [revealedWords, setRevealedWords] = useState([]);
  const [showWelcomeText, setShowWelcomeText] = useState(false);
  const [welcomeTextOpacity, setWelcomeTextOpacity] = useState(0);
  const [backgroundOpacity, setBackgroundOpacity] = useState(0);
  const [welcomeTextAnimationComplete, setWelcomeTextAnimationComplete] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [navbarOpacity, setNavbarOpacity] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showAboutMeModal, setShowAboutMeModal] = useState(false);
  const [overlayOpacity, setOverlayOpacity] = useState(0);
  const [filterOpacity, setFilterOpacity] = useState(0);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const welcomeTextRef = useRef(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAboutMeClick = () => {
    navigate('/about');
  };

  const handleAboutMeClose = () => {
    setShowAboutMeModal(false);
  };

  const menuItems = [
    { label: 'Home', link: '/' },
    { label: 'Resume', link: '/resume' },
    { label: 'Publications', link: '/publications' },
    { label: 'Projects', link: '/projects' },
    { label: 'Education', link: '/education' }
  ];

  const introText = "Hello! My Name is Muhammad Khan, I am a Computational Researcher!".split(' ');
  const containerRef = useRef(null);

  useEffect(() => {
    // Add Google Fonts link
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@1,100;1,200&display=swap';
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

      // Update background opacity
      const newOpacity = Math.min(0.7, newWordCount / introText.length);
      setBackgroundOpacity(newOpacity);

      // Reset welcome text if going backwards
      if (newWordCount === 0) {
        setShowWelcomeText(false);
        setWelcomeTextOpacity(0);
        setWelcomeTextAnimationComplete(false);
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
            
            let navbarOpacityStep = 0;
            const navbarFadeIn = setInterval(() => {
              navbarOpacityStep += 0.1;
              setNavbarOpacity(Math.min(navbarOpacityStep, 1));
              
              if (navbarOpacityStep >= 1) {
                clearInterval(navbarFadeIn);
              }
            }, 25);
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
  }, [revealedWords, welcomeTextAnimationComplete, showScrollIndicator]);

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh', width: '100%' }}>
      <WebGLBackground isHome={true} />
      <TypeWriter />
      {/* Dark filter that appears on scroll down */}
      <Box 
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: `rgba(0, 0, 0, ${filterOpacity})`,
          pointerEvents: 'none',
          zIndex: 1,
          transition: 'background-color 0.3s ease'
        }}
      />
      {/* Scroll-based overlay */}
      <Box 
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`,
          pointerEvents: 'none',
          zIndex: 2,
          transition: 'opacity 0.3s ease'
        }}
      />
      <Box 
        sx={{
          position: 'relative',
          zIndex: 3,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#E6E6E1'
        }}
      >
        <DropdownMenu />
        {/* Menu Dropdown Button */}
        <IconButton
          sx={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            color: 'white',
            zIndex: 1100,
            backgroundColor: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.2)'
            }
          }}
          onClick={handleMenuClick}
        >
          <MenuIcon />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          PaperProps={{
            sx: {
              backgroundColor: 'rgba(255,255,255,0.2)',
              backdropFilter: 'blur(15px)',
              borderRadius: '10px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              '& .MuiMenuItem-root': {
                color: 'rgba(0,0,0,0.8)',
                fontFamily: 'Montserrat',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.3)'
                }
              }
            }
          }}
        >
          {menuItems.map((item) => (
            <MenuItem 
              key={item.label} 
              onClick={() => {
                handleMenuClose();
                window.location.href = item.link;
              }}
            >
              {item.label}
            </MenuItem>
          ))}
        </Menu>

        <Container 
          maxWidth="lg"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            height: '100%',
            padding: '20px',
            width: '100%',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)'
          }}
        >
          {/* Intro Text */}
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
              transform: 'translateY(-50%)'
            }}
          >
            {introText.map((word, index) => (
              <span 
                key={index} 
                style={{ 
                  opacity: revealedWords.includes(word) ? 1 : 0,
                  transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out',
                  transform: revealedWords.includes(word) 
                    ? 'translateY(0)' 
                    : 'translateY(20px)',
                  display: 'inline-block',
                  margin: '0 3px',
                  color: 'white'
                }}
              >
                {word}
              </span>
            ))}
          </Typography>

          {/* Welcome Text */}
          {showWelcomeText && (
            <Container ref={welcomeTextRef} sx={{ 
              textAlign: 'center', 
              maxWidth: 'md',
              px: 3 
            }}>
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
                  textAlign: 'center'
                }}
              >
                Welcome to my Website!
              </Typography>

              {/* About Me Button */}
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
                  textAlign: 'center'
                }}
              >
                <Button
                  onClick={handleAboutMeClick}
                  sx={{
                    display: 'inline-block',
                    fontFamily: '"Montserrat"',
                    fontSize: '20px',
                    letterSpacing: '5px',
                    textAlign: 'center',
                    position: 'relative',
                    minWidth: '100px',
                    minHeight: '10px',
                    margin: '20px',
                    background: 'none',
                    border: 'none',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    color: '#E6E6E1', // Soft off-white for text
                    borderRadius: '10px',
                    padding: '12px 20px',
                    boxSizing: 'content-box',
                    border: '2px solid transparent',
                    lineHeight: '30px',
                    transition: '0.75s ease',
                    '&:before, & span:before, &:after, & span:after': {
                      display: 'block',
                      content: '""',
                      width: '15px',
                      height: '15px',
                      position: 'absolute',
                      textAlign: 'center',
                      justifyContent: 'center',
                      alignItems: 'center'
                    },
                    '&:before': {
                      top: '-2px',
                      left: '-2px',
                      borderTop: '2px solid #D1CCC1', // Muted off-white border
                      borderTopLeftRadius: '8px',
                      borderLeft: '2px solid #D1CCC1',
                      transition: '0.75s all'
                    },
                    '&:after': {
                      top: '-2px',
                      right: '-2px',
                      borderTop: '2px solid #D1CCC1',
                      borderTopRightRadius: '8px',
                      borderRight: '2px solid #D1CCC1',
                      transition: '0.75s all'
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
                        transition: '0.75s all'
                      },
                      '&:after': {
                        bottom: '-2px',
                        right: '-2px',
                        borderBottom: '2px solid #D1CCC1',
                        borderBottomRightRadius: '8px',
                        borderRight: '2px solid #D1CCC1',
                        transition: '0.75s all'
                      }
                    },
                    '&:hover': {
                      color: '#FFFFFF', // Pure white on hover
                      borderRadius: '10px',
                      '&:before, &:after': {
                        borderColor: '#F0EDE5', // Lighter off-white on hover
                        width: '100%',
                        height: '100%',
                        borderRadius: '10px'
                      },
                      '& span:before, & span:after': {
                        borderColor: '#F0EDE5',
                        width: '100%',
                        height: '100%',
                        borderRadius: '10px'
                      }
                    },
                    fontWeight: 600 // Added to bolden the text
                  }}
                >
                  <span>About Me</span>
                </Button>
              </Box>
            </Container>
          )}

          {/* Navbar */}
          {navbarOpacity > 0 && (
            <Box 
              sx={{
                position: 'fixed',
                top: '65%',
                left: 0,
                right: 0,
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                opacity: navbarOpacity,
                zIndex: 1000,
                transition: 'opacity 2s cubic-bezier(0.4, 0, 0.2, 1), transform 2s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: `scale(${0.95 + (navbarOpacity * 0.05)})`
              }}
            >
              <Box
                sx={{
                  width: '100vw',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(30px) brightness(110%) contrast(120%)',
                  borderRadius: '30px',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  boxShadow: '0 10px 40px 0 rgba(31, 38, 135, 0.4)',
                  padding: '15px 0',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  overflow: 'hidden',
                  WebkitMask: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
                  mask: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
                  '& > *': {
                    color: 'rgba(0, 0, 0, 0.8)',
                    fontWeight: 'bold'
                  }
                }}
              >
                <Navbar />
              </Box>
            </Box>
          )}

          {/* Scroll Indicator */}
          {showScrollIndicator && (
            <Box
              sx={{
                position: 'absolute',
                bottom: '40px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                animation: 'bounce 2s infinite',
                '@keyframes bounce': {
                  '0%, 100%': { transform: 'translateY(0)' },
                  '50%': { transform: 'translateY(-10px)' }
                }
              }}
            >
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'white', 
                  marginBottom: '5px',
                  opacity: 0.7 
                }}
              >
                Scroll Down
              </Typography>
              <KeyboardArrowDown 
                sx={{ 
                  color: 'white', 
                  fontSize: 40,
                  opacity: 0.7
                }} 
              />
            </Box>
          )}
        </Container>

        {/* Progress Indicator */}
        <Box 
          sx={{
            position: 'absolute',
            bottom: '20px',
            width: '200px',
            height: '4px',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '1.5px'
          }}
        >
          <Box 
            sx={{
              width: `${revealedWords.length * (100 / introText.length)}%`,
              height: '100%',
              background: 'white',
              borderRadius: '1.5px',
              transition: 'width 0.3s ease'
            }}
          />
        </Box>

        {/* About Me Modal */}
        <Modal
          open={showAboutMeModal}
          onClose={handleAboutMeClose}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
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
              position: 'relative'
            }}
          >
            <IconButton
              onClick={handleAboutMeClose}
              sx={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                color: 'white'
              }}
            >
              <CloseIcon />
            </IconButton>
            
            <Typography 
              variant="h4" 
              gutterBottom 
              sx={{ 
                fontFamily: 'Montserrat', 
                marginBottom: '1rem' 
              }}
            >
              About Me
            </Typography>
            
            <Typography 
              variant="body1" 
              sx={{ 
                fontFamily: 'Montserrat', 
                lineHeight: 1.6 
              }}
            >
              Hi, I'm Muhammad Khan, a passionate computational researcher dedicated to pushing the boundaries of technology and scientific understanding. 
              My work spans across machine learning, data science, and innovative computational methodologies.

              With a strong academic background and a keen interest in solving complex problems, I strive to develop cutting-edge solutions that bridge theoretical research and practical applications.
            </Typography>
          </Paper>
        </Modal>
      </Box>
    </Box>
  );
};

export default Home;
