export const getTextGlowStyles = (x, y, isHovering, gradientSize, isName = true) => {
  const baseStyles = {
    transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
    color: 'white',
  };

  if (!isHovering) return baseStyles;

  const primaryColor = isName ? '#ff3366' : '#3366ff';
  const secondaryColor = isName ? '#ff9933' : '#33ff99';

  return {
    ...baseStyles,
    background: `
      radial-gradient(circle ${gradientSize}px at ${x}px ${y}px, 
        ${primaryColor} 0%, 
        ${secondaryColor} 25%, 
        rgba(255,255,255,0.8) 50%, 
        rgba(255,255,255,0) 100%)
    `,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textShadow: `
      0 0 30px ${primaryColor}66,
      0 0 60px ${secondaryColor}66
    `,
    filter: 'brightness(1.4)',
  };
};

export const getBackgroundGlow = (x, y, isHovering, gradientSize) => {
  if (!isHovering) return '';
  
  return `
    radial-gradient(circle ${gradientSize * 2}px at ${x}px ${y}px, 
      rgba(255,51,102,0.15) 0%, 
      rgba(255,153,51,0.15) 30%, 
      rgba(0,0,0,0) 70%)
  `;
};

export const homeStyles = {
  container: {
    position: 'relative', 
    minHeight: '100vh', 
    width: '100%', 
    overflow: 'hidden', 
    backgroundColor: 'black'
  },
  contentWrapper: {
    position: 'relative',
    zIndex: 3,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#E6E6E1'
  },
  introContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    padding: '20px',
    width: '100%',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)'
  },
  introText: {
    display: 'flex', 
    flexWrap: 'none', 
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Montserrat',
    fontSize: '20px',
    letterSpacing: '5px',
    textAlign: 'center',
    color: 'white'
  },
  welcomeSection: {
    marginTop: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  aboutMeButton: {
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'scale(1.05)',
      color: '#61dafb'
    }
  },
  navbarContainer: (opacity) => ({
    position: 'absolute',
    bottom: '190px', 
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    opacity: opacity,
    transition: 'opacity 1s ease',
    zIndex: 10
  })
};

export const aboutMeStyles = {
  container: {
    position: 'relative',
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    borderRadius: 4,
    p: 4,
    display: 'grid',
    gridTemplateColumns: { xs: '1fr', md: '300px 1fr' },
    gap: 4,
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  imageContainer: {
    width: '100%',
    aspectRatio: '1',
    borderRadius: 2,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
  },
  text: {
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 1.8,
    fontSize: '1.1rem',
  },
  highlightBox: {
    p: 3,
    borderRadius: 2,
    textAlign: 'center',
    transition: 'all 0.3s ease',
  },
};

export const philosophyStyles = {
  container: {
    mt: 8,
    position: 'relative',
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    borderRadius: 4,
    p: 4,
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  quote: {
    fontStyle: 'italic',
    color: 'rgba(255, 255, 255, 0.8)',
    borderLeft: '4px solid #ff3366',
    pl: 3,
    my: 3,
  },
};
