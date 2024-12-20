import { useEffect } from 'react';

export const useGoogleFonts = (fontName) => {
  useEffect(() => {
    const link = document.createElement('link');
    link.href = `https://fonts.googleapis.com/css2?family=${fontName}:ital,wght@1,100;1,200&display=swap`;
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [fontName]);
};
