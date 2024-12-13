import React from 'react';
import { AppBar, Button, Box, Toolbar, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Publications', path: '/publications' },
    { label: 'Projects', path: '/projects' },
    { label: 'Education', path: '/education' },
    { label: 'Resume', path: '/resume' },
  ];

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        width: '100%',
        gap: 3
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
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'color 0.3s ease',
            '&:hover': {
              color: 'rgba(255,255,255,0.7)'
            }
          }}
          onClick={(e) => {
            e.preventDefault();
            window.location.href = item.path;
          }}
        >
          {item.label}
        </Typography>
      ))}
    </Box>
  );
};

export default Navbar;
