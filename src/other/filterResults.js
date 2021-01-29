/* eslint-disable array-callback-return */
/* eslint-disable max-len */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-restricted-syntax */
export default function filterResults(dbCleaned, searchText, tagFilter = 'All') {
  return dbCleaned.current.filter((record) => {
    let isRelevantDept = false;
    let isSearchEmpty = true;
    if (tagFilter.includes('All')
    || record.departmentName.includes(tagFilter)) {
      isRelevantDept = true;
    }

    isSearchEmpty = (searchText === '') ? true : false;

    if (isRelevantDept && isSearchEmpty) return true;
    if (!isSearchEmpty) {
      if (isRelevantDept) {
        for (const [key, value] of Object.entries(record)) {
          if (key !== 'creator' && value !== null && typeof value === 'string') {
            if (value.toLowerCase().includes(searchText.toLowerCase())) {
              return true;
            }
          }
          else if (key === 'creator' && Array.isArray(value)) {
            for (const creatorItem of value) {
              if (creatorItem.creatorDescription) {
                if (creatorItem.creatorDescription.toLowerCase().includes(searchText.toLowerCase())) {
                  return true;
                }
              }
              if (creatorItem.creatorRole) {
                if (creatorItem.creatorRole.toLowerCase().includes(searchText.toLowerCase())) {
                  return true;
                }
              }
            }
          }
        }
      }
      return false;
    }
  });
}
