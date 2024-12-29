import React, { useEffect, useRef, useState } from 'react';

import { enableGPUAcceleration } from '../utils/performanceUtils';

const OptimizedImage = ({
  src,
  alt,
  className,
  width,
  height,
  priority = false,
  quality = 75,
  sizes = '100vw',
  loading = 'lazy',
  objectFit = 'cover',
  placeholder = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(placeholder);
  const [error, setError] = useState(false);
  const imgRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    if (!imgRef.current || priority) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadImage();
            observerRef.current?.disconnect();
          }
        });
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.01
      }
    );

    observerRef.current.observe(imgRef.current);
    enableGPUAcceleration(imgRef.current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [src, priority]);

  useEffect(() => {
    if (priority) {
      loadImage();
    }
  }, [priority, src]);

  const loadImage = () => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      if (imgRef.current) {
        setCurrentSrc(src);
        setIsLoaded(true);
      }
    };
    img.onerror = () => {
      setError(true);
      setIsLoaded(true);
    };
  };

  return (
    <div
      className={`optimized-image-container ${className || ''}`}
      style={{
        position: 'relative',
        width: width || '100%',
        height: height || 'auto',
        overflow: 'hidden'
      }}
    >
      <img
        ref={imgRef}
        src={currentSrc}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : loading}
        decoding="async"
        sizes={sizes}
        className={`optimized-image ${isLoaded ? 'loaded' : 'loading'} ${error ? 'error' : ''}`}
        style={{
          width: '100%',
          height: '100%',
          objectFit,
          transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
          opacity: isLoaded ? 1 : 0,
          transform: `scale(${isLoaded ? 1 : 1.02})`,
          willChange: 'transform, opacity',
          contain: 'paint',
          contentVisibility: 'auto'
        }}
      />
      {error && (
        <div className="error-fallback" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8f9fa' }}>
          <span>Failed to load image</span>
        </div>
      )}
    </div>
  );
};

export default React.memo(OptimizedImage); 