export const ENDPOINT = 'https://openaccess-api.clevelandart.org/api/artworks/';
export const OPTIONS = '?has_image=1&limit=20';
export const DEV_OPTIONS = '?has_image=1&limit=20&q=';
export const RESULTS_PER_PAGE = 20;
export const TAGS_TO_DISPLAY = 20;
export const FILTERS = new Map([
  ['All Results', '&q='],
  ['Artist', '&artists='],
  ['Title', '&title='],
  ['Medium', '&medium='],
  // ['Department', '&department=']
]);
export const DEFAULT_FILTER = 'All Results';
