export const breakpoints = {
  // sm: 20,
  // md: 30,
  // lg: 45,
  // xl: 60,
  sm: 600,
  // md: 30,
  lg: 1200,
  // xl: 60,
}

export const mediaQueries = key => {
  // return style => `@media (min-width: ${breakpoints[key]}em) { ${style} }`
  return style => `@media (min-width: ${breakpoints[key]}px) { ${style} }`
}