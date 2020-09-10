/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-fallthrough */
/* eslint-disable default-case */
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import { func } from 'prop-types';
import DOMPurify from 'dompurify';

const TAGS_TO_DISPLAY = 20;

export default function SearchContainer({ updateSearchResults, deptMap }) {
  const [searchText, setSearchText] = useState('');
  const [shouldUpdateResults, setShouldUpdateResults] = useState(false);
  const [deptTags, setDeptTags] = useState(null);
  const [selectedTagName, setSelectedTagName] = useState('All');

  // Set up department tags, ordered by number of works
  useEffect(() => {
    if (deptMap) {
      const tags = Array.from(deptMap.keys())
        .filter((elem, i) => i < TAGS_TO_DISPLAY)
        .map((val) => (
          <TagButton
            key={val}
            isSelected={val === selectedTagName}
            onClick={() => {
              setSelectedTagName(val);
              updateSearchResults(searchText, val);
            }}
          >
            {val}
          </TagButton>
        ));
      tags.unshift((
        <TagButton
          key="All"
          isSelected={selectedTagName === 'All'}
          onClick={() => {
            setSelectedTagName('All');
            updateSearchResults(searchText, 'All');
          }}
        >
          All
        </TagButton>));
      setDeptTags(tags);
    }
  }, [deptMap, selectedTagName]);

  const handleTextChange = (e) => {
    setSearchText(e.target.value);
  };
  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'Escape':
        setSearchText('');
      case 'Enter':
        setShouldUpdateResults(true);
        break;
    }
  };
  useEffect(() => {
    if (shouldUpdateResults || searchText.length === 0) {
      const clean = DOMPurify.sanitize(searchText);
      updateSearchResults(clean, selectedTagName);
    }
    setShouldUpdateResults(false);
  }, [searchText, shouldUpdateResults]);

  return (
    <>
      <SearchWrapper>
        <TextField
          fullWidth
          value={searchText}
          label="Search by title, artist, country of origin, department etc..."
          margin="normal"
          variant="outlined"
          type="search"
          onChange={handleTextChange}
          onKeyDown={handleKeyDown}
        />
      </SearchWrapper>
      <TagContainer>
        {deptTags}
      </TagContainer>
    </>
  );
}

const SearchWrapper = styled.div`
  width: 60%;
  min-width: 600px;
  padding: 1em 0em 0em 2.5em;
`;

const TagContainer = styled.div`
  width: 85%;
  display: flex;
  flex-wrap: wrap;
  padding: 0.8em 0em 0em 2.5em;
`;

const TagButton = styled.button`
  display: inline-block;
  float: left;
  margin: 2px;
  padding: 0.5em;
  border: 1px solid rgb(220,220,220);
  border-radius: 2px;
  text-decoration: none;  
  display: block;
  background-color: ${(prop) => (prop.isSelected ? 'rgb(220,220,220)' : 'white')};
  font-size: 0.85em;
  color: rgb(110,110,110);
  cursor: pointer;
  transition: background 250ms ease-in-out, 
  transform 150ms ease;
  -webkit-appearance: none;
  -moz-appearance: none;
  :hover {
    color: #311e00;
  }
`;

SearchContainer.propTypes = {
  updateSearchResults: func.isRequired,
};
