import React from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
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
    <AppBar 
      position="fixed" 
      sx={{ 
        background: 'transparent', 
        backdropFilter: 'none', 
        boxShadow: 'none',
        transition: 'none'
      }}
    >
      <Toolbar 
        sx={{ 
          background: 'transparent',
          transition: 'none'
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          gap: 2, 
          width: '100%', 
          justifyContent: 'center' 
        }}>
          {navItems.map((item) => (
            <Button
              key={item.path}
              component={Link}
              to={item.path}
              disableRipple
              disableFocusRipple
              sx={{
                color: 'white',
                background: 'transparent',
                transition: 'none',
                padding: '6px 16px',
                minWidth: 'auto',
                borderRadius: 0,
                '&:hover, &:active, &:focus': {
                  background: 'transparent',
                  color: 'white',
                  transform: 'none',
                  boxShadow: 'none',
                  outline: 'none'
                },
                pointerEvents: 'auto',
                cursor: 'pointer'
              }}
              onClick={(e) => {
                e.preventDefault();
                window.location.href = item.path;
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
