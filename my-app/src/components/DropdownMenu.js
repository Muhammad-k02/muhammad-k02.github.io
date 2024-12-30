import MenuIcon from '@mui/icons-material/Menu';
import { Box, IconButton, Menu, MenuItem, useMediaQuery,useTheme } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DropdownMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
          width: { xs: 48, md: 48 },
          height: { xs: 48, md: 48 },
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
          transition: 'all 0.3s ease',
          animation: isMobile ? 'none' : 'pulse 2s infinite',
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
          '@media (hover: hover)': {
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
          }
        }}
      >
        <MenuIcon sx={{ fontSize: { xs: 24, md: 28 } }} />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)',
            minWidth: { xs: 200, sm: 220 },
            '& .MuiList-root': {
              padding: '8px 0',
            },
          },
        }}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      >
        {menuItems.map((item) => (
          <MenuItem
            key={item.link}
            onClick={() => handleNavigation(item.link)}
            sx={{
              fontFamily: 'Montserrat',
              fontSize: { xs: '1rem', sm: '1.1rem' },
              color: 'white',
              padding: { xs: '12px 24px', sm: '14px 28px' },
              minHeight: { xs: 48, sm: 56 },
              transition: 'background-color 0.3s',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default DropdownMenu;
