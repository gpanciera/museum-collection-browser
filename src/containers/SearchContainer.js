/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-fallthrough */
/* eslint-disable default-case */
import React, { useState, useEffect, useRef } from 'react';
import { TextField } from '@material-ui/core';
import styled from 'styled-components';
import { func } from 'prop-types';
import DOMPurify from 'dompurify';
import mediaQueries from '../styles/mediaQueries';

export default function SearchContainer({ handleSearchChange }) {
  const initialRender = useRef(true);
  const [searchText, setSearchText] = useState('');
  const [userEnteredNewSearch, setUserEnteredNewSearch] = useState(false);

  const handleTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'Escape':
        setSearchText('');
      case 'Enter':
        setUserEnteredNewSearch(true);
        break;
    }
  };

  // if user hit enter or cleared contents of search field, send updated search string to parent
  useEffect(() => {
    if (initialRender.current)
      initialRender.current = false;
    else {
      if (userEnteredNewSearch || searchText.length === 0) {
        const cleanedString = DOMPurify.sanitize(searchText);
        handleSearchChange(cleanedString);
      }
      setUserEnteredNewSearch(false);
    }
  }, [searchText, userEnteredNewSearch]);

  return (
    <>
      <SearchWrapper>
        <TextField
          fullWidth
          value={searchText}
          label="Search by title, artist, country, dept. etc..."
          margin="normal"
          variant="outlined"
          type="search"
          onChange={handleTextChange}
          onKeyDown={handleKeyDown}
        />
      </SearchWrapper>
    </>
  );
}

const SearchWrapper = styled.div`
  ${'' /* width: 60%; */}
  ${'' /* min-width: 600px; */}
  padding: 0.6em 1em 0em 1em;
  ${mediaQueries('md')`
    padding: 0.8em 2.5em 0em 2.5em;
  `};
`;


SearchContainer.propTypes = {
  handleSearchChange: func.isRequired,
};


  // Set up department tags, ordered by number of works
  // useEffect(() => {
  //   if (deptMap) {
  //     const tags = Array.from(deptMap.keys())
  //       .filter((elem, i) => i < TAGS_TO_DISPLAY)
  //       .map((val) => (
  //         <FilterButton
  //           key={val}
  //           isSelected={val === selectedTagName}
  //           onClick={() => {
  //             setSelectedTagName(val);
  //             handleSearchChange(searchText, val);
  //           }}
  //         >
  //           {val}
  //         </FilterButton>
  //       ));
  //     tags.unshift((
  //       <FilterButton
  //         key="All"
  //         isSelected={selectedTagName === 'All'}
  //         onClick={() => {
  //           setSelectedTagName('All');
  //           handleSearchChange(searchText, 'All');
  //         }}
  //       >
  //         All
  //       </FilterButton>));
  //     setDeptTags(tags);
  //   }
  // }, [deptMap, selectedTagName]);