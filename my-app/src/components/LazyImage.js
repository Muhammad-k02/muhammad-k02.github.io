import React, { useEffect, useRef, useState } from 'react';

import { enableGPUAcceleration } from '../utils/performanceUtils';

const LazyImage = ({ 
  src, 
  alt, 
  className,
  width,
  height,
  loading = 'lazy',
  placeholder = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7' 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(placeholder);
  const imgRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    if (!imgRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = new Image();
            img.src = src;
            img.onload = () => {
              if (imgRef.current) {
                setCurrentSrc(src);
                setIsLoaded(true);
                observerRef.current?.disconnect();
              }
            };
          }
        });
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.01,
        root: null
      }
    );

    observerRef.current.observe(imgRef.current);
    enableGPUAcceleration(imgRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [src]);

  return (
    <img
      ref={imgRef}
      src={currentSrc}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      decoding="async"
      className={`${className} ${isLoaded ? 'lazy-loaded' : 'lazy-load'} image-optimized`}
      style={{
        transition: 'opacity 0.3s ease-in-out',
        opacity: isLoaded ? 1 : 0.5,
        contain: 'paint',
        contentVisibility: 'auto'
      }}
    />
  );
};

export default React.memo(LazyImage); 