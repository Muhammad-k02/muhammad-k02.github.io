// Default home page colors
export const defaultColors = {
  r: 1.5,
  g: 1.3,
  b: 1.4
};

// Color schemes for other pages
const colorSchemes = [
  { r: 2.0, g: 0.8, b: 0.6 },  // Orange-Red
  { r: 0.6, g: 1.8, b: 2.0 },  // Cyan
  { r: 1.8, g: 0.6, b: 1.8 },  // Purple
  { r: 0.6, g: 2.0, b: 0.8 },  // Green
  { r: 1.8, g: 1.6, b: 0.4 },  // Yellow
  { r: 0.4, g: 0.8, b: 2.0 }   // Blue
];

// Get a random color scheme for non-home pages
export const getRandomColors = () => {
  const randomIndex = Math.floor(Math.random() * colorSchemes.length);
  return colorSchemes[randomIndex];
};
