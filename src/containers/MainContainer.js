/* eslint-disable no-restricted-syntax */
import React, { useState } from 'react';
import NavBar from './NavBar';
import SearchContainer from './SearchContainer';
import ResultsContainer from './ResultsContainer';
import db from '../../db/cma-artworks-export';

const MainContainer = () => {
  const [filteredResults, setFilteredResults] = useState(db);

  const updateSearchResults = (searchText) => {
    console.log('updateSearchResults -> searchText', searchText);
    if (searchText.length === 0) setFilteredResults(db);
    setFilteredResults(db.filter((record) => {
      for (const value of Object.values(record)) {
        if (value !== null && typeof value === 'string') {
          if (value.toLowerCase().includes(searchText.toLowerCase())) {
            // console.log('found match: ', value);
            return true;
          }
        }
      }
      return false;
    }));
  };
  console.log('MainContainer -> filteredResults', filteredResults);

  return (
    <>
      <NavBar />
      <SearchContainer
        updateSearchResults={updateSearchResults}
        clearSearch={() => setFilteredResults(db)}
      />
      <ResultsContainer filteredResults={filteredResults} />
    </>
  );
};
export default MainContainer;

// "id": "86508",
// "accession_number": "2015.584",
// "title": "Gates of the City",
// "tombstone": "New York Series: Gates of the City, 1922. John Taylor Arms (American, 1887-1953). Color etching and aquatint; platemark: 21.5 x 20.2 cm (8 7/16 x 7 15/16 in.); sheet: 31.1 x 26.2 cm (12 1/4 x 10 5/16 in.). The Cleveland Museum of Art, Gift of Carole W. and Charles B. Rosenblatt 2015.584 Courtesy of John Taylor Arms/ © Suzanne Arms Hawkins",
// "creator_role": "artist",
// "creator_description": "John Taylor Arms (American, 1887-1953)",
// "department_name": "Prints"
