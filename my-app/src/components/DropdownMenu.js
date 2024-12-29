import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DropdownMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (path) => {
    navigate(path);
    handleMenuClose();
  };

  const menuItems = [
    { label: 'Home', link: '/' },
    { label: 'Publications', link: '/publications' },
    { label: 'Projects', link: '/projects' },
    { label: 'Education', link: '/education' },
    { label: 'Resume', link: '/resume' }
  ];

  return (
    <Box
      sx={{
        position: 'fixed',
        top: { xs: 16, md: 20 },
        left: { xs: 16, md: 20 },
        zIndex: 1000,
      }}
    >
      <IconButton
        onClick={handleMenuClick}
        sx={{
          width: { xs: 40, md: 48 },
          height: { xs: 40, md: 48 },
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: `
            0 4px 30px rgba(0, 0, 0, 0.1),
            0 0 10px rgba(255, 255, 255, 0.1),
            0 0 20px rgba(255, 255, 255, 0.05)
          `,
          color: 'rgba(255, 255, 255, 0.9)',
          fontSize: '1.5rem',
          transition: 'all 0.3s ease',
          animation: 'pulse 2s infinite',
          '@keyframes pulse': {
            '0%': {
              boxShadow: `
                0 4px 30px rgba(0, 0, 0, 0.1),
                0 0 10px rgba(255, 255, 255, 0.1),
                0 0 20px rgba(255, 255, 255, 0.05)
              `,
            },
            '50%': {
              boxShadow: `
                0 4px 30px rgba(0, 0, 0, 0.15),
                0 0 15px rgba(255, 255, 255, 0.15),
                0 0 30px rgba(255, 255, 255, 0.1),
                0 0 40px rgba(255, 255, 255, 0.05)
              `,
            },
            '100%': {
              boxShadow: `
                0 4px 30px rgba(0, 0, 0, 0.1),
                0 0 10px rgba(255, 255, 255, 0.1),
                0 0 20px rgba(255, 255, 255, 0.05)
              `,
            },
          },
          '&:hover': {
            background: 'rgba(255, 255, 255, 0.1)',
            transform: 'scale(1.05)',
            boxShadow: `
              0 4px 30px rgba(0, 0, 0, 0.2),
              0 0 20px rgba(255, 255, 255, 0.2),
              0 0 40px rgba(255, 255, 255, 0.1),
              0 0 60px rgba(255, 255, 255, 0.05)
            `,
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '-2px',
            left: '-2px',
            right: '-2px',
            bottom: '-2px',
            borderRadius: '50%',
            background: 'linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0))',
            zIndex: -1,
            animation: 'rotate 6s linear infinite',
          },
          '@keyframes rotate': {
            '0%': {
              transform: 'rotate(0deg)',
            },
            '100%': {
              transform: 'rotate(360deg)',
            },
          },
        }}
      >
        ☰
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            mt: 2,
            background: 'rgba(23, 23, 23, 0.6)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            boxShadow: `
              0 4px 30px rgba(0, 0, 0, 0.3),
              inset 0 0 1px 0 rgba(255, 255, 255, 0.2),
              0 0 20px rgba(255, 255, 255, 0.05)
            `,
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
            },
            '& .MuiList-root': {
              padding: '8px',
            },
            '& .MuiMenuItem-root': {
              borderRadius: '8px',
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: '0.95rem',
              margin: '4px',
              padding: '12px 20px',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              background: 'rgba(255, 255, 255, 0.02)',
              transition: 'all 0.2s ease',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background:
                  'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)',
                transform: 'translateX(-100%)',
                transition: 'transform 0.6s',
              },
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.05)',
                transform: 'translateX(4px)',
                boxShadow: `
                  0 0 10px rgba(255, 255, 255, 0.1),
                  inset 0 0 1px 0 rgba(255, 255, 255, 0.2)
                `,
                '&::before': {
                  transform: 'translateX(100%)',
                },
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      >
        {menuItems.map((item) => (
          <MenuItem key={item.label} onClick={() => handleNavigation(item.link)}>
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default DropdownMenu;
