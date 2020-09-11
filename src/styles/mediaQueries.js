export const breakpoints = {
  // sm: 20,
  // md: 30,
  // lg: 45,
  // xl: 60,
  // md: 30,
  // xl: 60,
  sm: 600,
  md: 800,
  lg: 1200,
};

const mediaQueries = (key) => (style) => `@media (min-width: ${breakpoints[key]}px) { ${style} }`;

export default mediaQueries;
