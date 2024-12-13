import React, { useState } from 'react';
import { Box, Menu, MenuItem } from '@mui/material';
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

  return (
    <Box 
      sx={{ 
        position: 'absolute', 
        top: 20, 
        right: 20,
        zIndex: 1000
      }}
    >
      <Box 
        onClick={handleMenuClick}
        sx={{ 
          cursor: 'pointer', 
          color: 'white',
          fontSize: '24px',
          userSelect: 'none'
        }}
      >
        ☰
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            backgroundColor: 'rgba(0,0,0,0.8)',
            color: 'white',
            '& .MuiMenuItem-root': {
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)'
              }
            }
          }
        }}
      >
        <MenuItem onClick={() => handleNavigation('/')}>Home</MenuItem>
        <MenuItem onClick={() => handleNavigation('/publications')}>Publications</MenuItem>
        <MenuItem onClick={() => handleNavigation('/projects')}>Projects</MenuItem>
        <MenuItem onClick={() => handleNavigation('/education')}>Education</MenuItem>
        <MenuItem onClick={() => handleNavigation('/resume')}>Resume</MenuItem>
        <MenuItem onClick={() => handleNavigation('/about')}>About</MenuItem>
      </Menu>
    </Box>
  );
};

export default DropdownMenu;
