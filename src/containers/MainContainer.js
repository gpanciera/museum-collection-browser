/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect, useRef } from 'react';
import NavBar from './NavBar';
import SearchContainer from './SearchContainer';
import ResultsContainer from './ResultsContainer';
import db from '../../db/cma-artworks-export';

//   "id": "86508",
//   "accession_number": "2015.584",
//   "title": "Gates of the City",
//   "tombstone": "New York Series: Gates of the City, 1922. John Taylor Arms (American, 1887-1953). Color etching and aquatint; platemark: 21.5 x 20.2 cm (8 7/16 x 7 15/16 in.); sheet: 31.1 x 26.2 cm (12 1/4 x 10 5/16 in.). The Cleveland Museum of Art, Gift of Carole W. and Charles B. Rosenblatt 2015.584 Courtesy of John Taylor Arms/ © Suzanne Arms Hawkins",
//   "creator_role": "artist",
//   "creator_description": "John Taylor Arms (American, 1887-1953)",
//   "department_name": "Prints"

const MainContainer = () => {
  const [filteredResults, setFilteredResults] = useState([]);
  const dbMap = useRef(new Map());
  const dbCleaned = useRef([]);

  useEffect(() => {
    db.forEach((record) => {
      if (record.id && dbMap.current.has(record.id)) {
        const prevObj = dbMap.current.get(record.id);
        const newCreator = {
          creatorRole: record.creator_role,
          creatorDescription: record.creator_description,
        };
        const newObj = {
          ...prevObj,
          creator: [
            ...prevObj.creator,
            newCreator,
          ],
        };
        dbMap.current.set(record.id, newObj);
      }
      else {
        const newObj = {
          id: record.id,
          accession_number: record.accession_number,
          title: record.title,
          tombstone: record.tombstone,
          department_name: record.department_name,
          creator: [
            {
              creatorRole: record.creator_role,
              creatorDescription: record.creator_description,
            },
          ],
        };
        dbMap.current.set(record.id, newObj);
      }
    });
    dbCleaned.current = Array.from(dbMap.current.values());
    console.log('MainContainer -> dbMap.current', dbMap.current);
    console.log('MainContainer -> dbCleaned.current', dbCleaned.current);
    setFilteredResults(dbCleaned.current);
  }, []);

  const updateSearchResults = (searchText) => {
    setFilteredResults(dbCleaned.current.filter((record) => {
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
      return false;
    }));
  };

  return (
    <>
      <NavBar />
      <SearchContainer
        updateSearchResults={updateSearchResults}
        clearSearch={() => setFilteredResults(dbCleaned)}
      />
      <ResultsContainer filteredResults={filteredResults} />
    </>
  );
};
export default MainContainer;
