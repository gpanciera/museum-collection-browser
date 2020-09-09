/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect, useRef } from 'react';
import NavBar from './NavBar';
import SearchContainer from './SearchContainer';
import ResultsContainer from './ResultsContainer';
import db from '../../db/cma-artworks-export';
import indexDatabase from '../helpers/indexDatabase';
import filterResults from '../helpers/filterResults';

const MainContainer = () => {
  const [filteredResults, setFilteredResults] = useState([]);
  const artworkMap = useRef(null);
  const deptMap = useRef(null);
  const dbCleaned = useRef([]);

  // Set dbCleaned by removing duplicates and adding all creators under a single artwork record
  // Then set initial filtered results to show all. This runs only once on app startup
  useEffect(() => {
    [artworkMap.current, deptMap.current] = indexDatabase(db);
    dbCleaned.current = Array.from(artworkMap.current.values());
    setFilteredResults(dbCleaned.current);
  }, []);

  // Update filtered (displayed) results using new searchText and tags
  const updateSearchResults = (searchText, tagFilter) => {
    setFilteredResults(filterResults(dbCleaned, searchText, tagFilter));
  };

  return (
    <>
      <NavBar />
      <SearchContainer updateSearchResults={updateSearchResults} deptMap={deptMap.current} />
      <ResultsContainer filteredResults={filteredResults} />
    </>
  );
};
export default MainContainer;
