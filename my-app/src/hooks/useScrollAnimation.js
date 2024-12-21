import { useCallback } from 'react';

export const useScrollAnimation = ({ introText, scrollState, setScrollState }) => {
  const handleScroll = useCallback(
    (event) => {
      event.preventDefault();

      // Hide scroll indicator on first scroll
      if (scrollState.showScrollIndicator) {
        setScrollState((prev) => ({ ...prev, showScrollIndicator: false }));
      }

      // Determine scroll direction
      const isScrollingDown = event.deltaY > 0;
      const currentWordCount = scrollState.revealedWords.length;

      // Calculate new word count
      const newWordCount = isScrollingDown
        ? Math.min(introText.length, currentWordCount + 1)
        : Math.max(0, currentWordCount - 1);

      // Update revealed words
      const newRevealedWords = introText.slice(0, newWordCount);

      // Reset or animate text
      if (newWordCount === 0) {
        setScrollState({
          revealedWords: [],
          showWelcomeText: false,
          welcomeTextOpacity: 0,
          showAboutMeButton: false,
          showScrollIndicator: true,
          navbarOpacity: 0,
        });
      } else if (newWordCount >= introText.length) {
        animateWelcomeText(setScrollState);
      }

      // Update state
      setScrollState((prev) => ({
        ...prev,
        revealedWords: newRevealedWords,
      }));
    },
    [introText, scrollState]
  );

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
