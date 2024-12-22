import React, { useEffect, useRef } from 'react';

const GlitchCanvas = () => {
  const canvasRef = useRef(null);
  const hiddenCanvasRef = useRef(null);

  useEffect(() => {
    const canvasShown = canvasRef.current;
    const canvasHidden = hiddenCanvasRef.current;
    const ctxShown = canvasShown.getContext('2d');
    const ctxHidden = canvasHidden.getContext('2d');

    canvasShown.width = 800;
    canvasShown.height = 400;
    canvasHidden.width = 800;
    canvasHidden.height = 400;

    function init() {
      ctxHidden.clearRect(0, 0, ctxHidden.width, ctxHidden.height);
      ctxHidden.textAlign = 'center';
      ctxHidden.textBaseline = 'middle';
      ctxHidden.font = 'bold 100px VT323, monospace';
      ctxHidden.fillStyle = '#F44';

      ctxHidden.fillText('HELLO WORLD', canvasHidden.width/2, canvasHidden.height/2);
      
      ctxShown.clearRect(0, 0, canvasShown.width, canvasShown.height);
      ctxShown.drawImage(canvasHidden, 0, 0);
      
      let i = 10;
      while(i--) { glitch(); }
    }

    function glitch() {
      const width = 100 + Math.random()*100;
      const height = 50 + Math.random()*50;

      const x = Math.random()*canvasHidden.width;
      const y = Math.random()*canvasHidden.height;

      const dx = x + (Math.random() * 40 - 20);
      const dy = y + (Math.random() * 30 - 15);

      ctxShown.clearRect(x, y, width, height);
      ctxShown.fillStyle = '#4a6';
      ctxShown.drawImage(canvasHidden, x, y, width, height, dx, dy, width, height);
    }

    const intervalId = setInterval(init, 1000/15);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      <canvas 
        ref={canvasRef} 
        style={{
          background: 'none',
          margin: 'auto',
          position: 'fixed',
          left: '50%',
          top: '50%',
          transform: 'translateX(-50%) translateY(-50%)',
        }}
      />
      <canvas 
        ref={hiddenCanvasRef} 
        style={{ display: 'none' }}
      />
    </>
  );
};

export default GlitchCanvas;
