import { useCallback } from 'react';

export const useScrollAnimation = ({ introText, scrollState, setScrollState }) => {
  const handleScroll = useCallback(() => {
    const scrolled = window.scrollY;
    setScrollState(scrolled);
  }, [setScrollState]);

  return { handleScroll };
};

const animateWelcomeText = (setScrollState) => {
  let start = null;

  const animate = (timestamp) => {
    if (!start) start = timestamp;

    const progress = Math.min((timestamp - start) / 400, 1);
    const smoothProgress = progress * progress * (3 - 2 * progress);

    setScrollState((prev) => ({
      ...prev,
      showWelcomeText: true,
      welcomeTextOpacity: smoothProgress,
      showAboutMeButton: true,
      navbarOpacity: smoothProgress,
    }));

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };

  requestAnimationFrame(animate);
};
