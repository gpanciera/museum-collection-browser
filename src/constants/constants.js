/* eslint-disable quote-props */
/* eslint-disable no-multi-spaces */
export const ENDPOINT = 'https://openaccess-api.clevelandart.org/api/artworks/';
export const OPTIONS = '?has_image=1&limit=20';
export const DEV_OPTIONS = '?has_image=1&limit=20&q=';
export const RESULTS_PER_PAGE = 20;
export const TAGS_TO_DISPLAY = 20;

export const DEFAULT_FILTER = 'All Results';

export const INIT_QUERY_STATE = {
  curPage: 1,
  searchString: '',
  selectedMainFilter: DEFAULT_FILTER,
  deptFilter: '',
  typeFilter: '',
  isResetable: false,
};

export const MAIN_FILTER_DISPLAY_LIST = [
  'All Results',
  'Artist',
  'Title',
  'Medium',
];

export const OTHER_FILTERS_DISPLAY_LIST = [
  'Department',
  'Type',
  'Created Before',
  'Created After',
];

export const DEPTS_DISPLAY_LIST = [
  'African Art',
  'American Painting and Sculpture',
  'Art of the Americas',
  'Chinese Art',
  // 'Contemporary Art',
  'Decorative Art and Design',
  'Drawings',
  'Egyptian and Ancient Near Eastern Art',
  'European Painting and Sculpture',
  'Greek and Roman Art',
  // 'Indian and South East Asian Art',
  'Islamic Art',
  'Japanese Art',
  'Korean Art',
  'Medieval Art',
  'Modern European Painting and Sculpture',
  'Oceania',
  // 'Performing Arts, Music, & Film',
  'Photography',
  'Prints',
  'Textiles',
];

// export const FILTER_QUERY_TABLE = {
//   'All Results': '&q=',
//   'Artist': '&artists=',
//   'Title': '&title=',
//   'Medium': '&medium=',
//   'Department': '&department=',
//   'Type': '&type=',
//   'Created Before': '&created_before=',     // int, year
//   'Created After': '&created_after=',       // int, year
// };

export const FILTER_QUERY_TABLE = new Map([
  ['All Results', '&q='],
  ['Artist', '&artists='],
  ['Title', '&title='],
  ['Medium', '&medium='],
  ['Department', '&department='],
  ['Type', '&type='],
  ['Created Before', '&created_before='],     // int, year
  ['Created After', '&created_after='],       // int, year
]);

// export const VALID_DEPTS = new Map([
//   ['African Art', 0],
//   ['American Painting and Sculpture', 0],
//   ['Art of the Americas', 0],
//   ['Chinese Art', 0],
//   ['Contemporary Art', 0],
//   ['Decorative Art and Design', 0],
//   ['Drawings', 0],
//   ['Egyptian and Ancient Near Eastern Art', 0],
//   ['European Painting and Sculpture', 0],
//   ['Greek and Roman Art', 0],
//   ['Indian and South East Asian Art', 0],
//   ['Islamic Art', 0],
//   ['Japanese Art', 0],
//   ['Korean Art', 0],
//   ['Medieval Art', 0],
//   ['Modern European Painting and Sculpture', 0],
//   ['Oceania', 0],
//   ['Performing Arts, Music, & Film', 0],
//   ['Photography', 0],
//   ['Prints', 0],
//   ['Textiles', 0],
// ]);

// '&type=' // string, from list
export const TYPES_DISPLAY_LIST = [
  'Amulets',
  // 'Apparatus',
  'Arms and Armor',
  'Basketry',
  'Book Binding',
  'Bound Volume',
  'Calligraphy',
  'Carpet',
  'Ceramic',
  'Coins',
  // 'Cosmetic',
  'Drawing',
  'Embroidery',
  'Enamel',
  'Forgery',
  // 'Frame',
  // 'Funerary',
  // 'Equipment',
  'Furniture and woodwork',
  'Garment',
  'Glass',
  'Glyptic',
  'Illumination',
  'Implements',
  'Inlays',
  'Ivory',
  'Jade',
  'Jewelry',
  'Knitting',
  'Lace',
  'Lacquer',
  'Leather',
  // 'Linoleum Block',
  // 'Lithographic Stone',
  'Manuscript',
  'Metalwork',
  'Miniature',
  'Miscellaneous',
  // 'Mixed',
  // 'Media',
  'Monotype',
  'Mosaic',
  'Musical Instrument',
  'Netsuke',
  // 'Objects',
  'Painting',
  // 'Papyri',
  'Photograph',
  // 'Plaque',
  'Plate',
  'Portfolio',
  // 'Portrait',
  'Print',
  // 'Relief',
  'Rock crystal',
  // 'Rubbing',
  'Sampler',
  'Scarabs',
  'Sculpture',
  'Seals',
  'Silver',
  // 'Spindle',
  // 'Stencil',
  'Stone',
  'Tapestry',
  'Textile',
  // 'Time-based Media',
  'Tool',
  'Velvet',
  'Vessels',
  // 'Whorl',
  'Wood',
  // 'Woodblock',
];

// '&created_before=' // int, year
// '&created_after=' // int, year
