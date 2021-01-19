/* eslint-disable no-multi-spaces */
export const ENDPOINT = 'https://openaccess-api.clevelandart.org/api/artworks/';
export const OPTIONS = '?has_image=1&limit=20';
export const DEV_OPTIONS = '?has_image=1&limit=20&q=';
export const RESULTS_PER_PAGE = 20;
export const TAGS_TO_DISPLAY = 20;

export const DEFAULT_FILTER = 'All Results';

export const MAIN_FILTER = new Map([
  ['All Results', '&q='],
  ['Artist', '&artists='],
  ['Title', '&title='],
  ['Medium', '&medium='],
]);

export const OTHER_FILTERS = new Map([
  ['Department', '&department='],
  ['Type', '&type='],
  ['Created Before', '&created_before='],     // int, year
  ['Created After', '&created_after='],       // int, year
]);

export const VALID_DEPTS = new Map([
  ['African Art', 0],
  ['American Painting and Sculpture', 0],
  ['Art of the Americas', 0],
  ['Chinese Art', 0],
  ['Contemporary Art', 0],
  ['Decorative Art and Design', 0],
  ['Drawings', 0],
  ['Egyptian and Ancient Near Eastern Art', 0],
  ['European Painting and Sculpture', 0],
  ['Greek and Roman Art', 0],
  ['Indian and South East Asian Art', 0],
  ['Islamic Art', 0],
  ['Japanese Art', 0],
  ['Korean Art', 0],
  ['Medieval Art', 0],
  ['Modern European Painting and Sculpture', 0],
  ['Oceania', 0],
  ['Performing Arts, Music, & Film', 0],
  ['Photography', 0],
  ['Prints', 0],
  ['Textiles', 0],
]);

// '&type=' // string, from list
// Amulets	Apparatus	Arms and Armor
// Basketry	Book Binding	Bound Volume
// Calligraphy	Carpet	Ceramic
// Coins	Cosmetic Objects	Drawing
// Embroidery	Enamel	Forgery
// Frame	Funerary Equipment	Furniture and woodwork
// Garment	Glass	Glyptic
// Illumination	Implements	Inlays
// Ivory	Jade	Jewelry
// Knitting	Lace	Lacquer
// Leather	Linoleum Block	Lithographic Stone
// Manuscript	Metalwork	Miniature
// Miscellaneous	Mixed Media	Monotype
// Mosaic	Musical Instrument	Netsuke
// Painting	Papyri	Photograph
// Plaque	Plate	Portfolio
// Portrait Miniature	Print	Relief
// Rock crystal	Rubbing	Sampler
// Scarabs	Sculpture	Seals
// Silver	Spindle Whorl	Stencil
// Stone	Tapestry	Textile
// Time-based Media	Tool	Velvet
// Vessels	Wood	Woodblock

// '&created_before=' // int, year
// '&created_after=' // int, year
