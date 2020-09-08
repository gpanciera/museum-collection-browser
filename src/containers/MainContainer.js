/* eslint-disable no-restricted-syntax */
import React, { useState } from 'react';
import NavBar from './NavBar';
import SearchContainer from './SearchContainer';
import ResultsContainer from './ResultsContainer';
import db from '../../db/cma-artworks-export';

const MainContainer = () => {
  const [filteredResults, setFilteredResults] = useState(db);

  const updateSearchResults = (searchText) => {
    setFilteredResults(db.filter((record) => {
      for (const value of Object.values(record)) {
        if (value !== null && typeof value === 'string') {
          if (value.toLowerCase().includes(searchText.toLowerCase())) {
            return true;
          }
        }
      }
      return false;
    }));
  };

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
