import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

const TypeWriter = ({ visible }) => {
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

  if (!visible) return null;

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
        <span
          style={{
            opacity: showCursor ? 1 : 0,
            transition: 'opacity 0.5s ease',
          }}
        >
          |
        </span>
      </Typography>
    </Box>
  );
};

TypeWriter.propTypes = {
  visible: PropTypes.bool.isRequired,
};

export default TypeWriter;
