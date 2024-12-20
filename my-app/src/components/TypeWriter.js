import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

const TypeWriter = () => {
  const [text, setText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const fullText = 'Hello World!';

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setText(fullText.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 150);

    return () => clearInterval(interval);
  }, []);

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: '200px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 2,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontFamily: '"Special Elite", monospace',
          color: '#E6E6E1',
          fontSize: '5rem',
        }}
      >
        {text}
      </Typography>
      <Typography
        variant="h1"
        sx={{
          fontFamily: '"Special Elite", monospace',
          color: '#E6E6E1',
          fontSize: '5rem',
          opacity: showCursor ? 1 : 0,
          transition: 'opacity 0.1s',
          marginLeft: '4px',
        }}
      >
        |
      </Typography>
    </Box>
  );
};

export default TypeWriter;
