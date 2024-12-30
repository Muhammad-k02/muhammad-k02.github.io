import { Box, Typography, useMediaQuery,useTheme } from '@mui/material';
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const _location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const navItems = [
    { label: 'Publications', path: '/publications' },
    { label: 'Projects', path: '/projects' },
    { label: 'Education', path: '/education' },
    { label: 'Resume', path: '/resume' },
  ];

  if (isMobile) return null;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        gap: { xs: 1, sm: 2, md: 3 },
        flexWrap: 'wrap',
        padding: { xs: '8px', sm: '12px', md: '16px' },
      }}
    >
      {navItems.map((item) => (
        <Typography
          key={item.path}
          component={Link}
          to={item.path}
          sx={{
            fontFamily: 'Montserrat',
            color: 'white',
            textDecoration: 'none',
            fontSize: { xs: '0.875rem', sm: '1rem' },
            cursor: 'pointer',
            transition: 'all 1s ease',
            padding: { xs: '6px 12px', sm: '8px 16px' },
            borderRadius: '30px',
            position: 'relative',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)',
              transform: 'translateX(-100%)',
              transition: 'transform 0.6s',
            },
            '&:hover': {
              color: 'rgba(255,255,255,1)',
              textShadow: '0 0 10px rgba(255,255,255,0.5), 0 0 20px rgba(255,255,255,0.3)',
              transform: 'scale(1.05)',
              '&::before': {
                transform: 'translateX(100%)',
              },
            },
            '@media (hover: none)': {
              '&:hover': {
                transform: 'none',
              },
            },
          }}
          onClick={(e) => {
            e.preventDefault();
            navigate(item.path);
          }}
        >
          {item.label}
        </Typography>
      ))}
    </Box>
  );
};

export default Navbar;
