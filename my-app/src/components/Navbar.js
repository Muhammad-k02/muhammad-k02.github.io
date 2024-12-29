import { Box, Typography } from '@mui/material';
import React from 'react';
import { Link, useLocation,useNavigate } from 'react-router-dom';

const Navbar = () => {
  const _location = useLocation();
  const navigate = useNavigate();

  const navItems = [
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
        gap: 3,
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
            transition: 'all 1s ease',
            padding: '8px 16px',
            borderRadius: '30px',
            position: 'relative',
            overflow: 'hidden',
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
