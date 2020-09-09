/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-fallthrough */
/* eslint-disable default-case */
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
// import Autocomplete from '@material-ui/lab/Autocomplete';
import styled from 'styled-components';
import { func } from 'prop-types';

export default function SearchContainer({ updateSearchResults }) {
  const [searchText, setSearchText] = useState('');
  const [shouldUpdateResults, setShouldUpdateResults] = useState(false);

  const handleTextChange = (e) => {
    setSearchText(e.target.value);
    console.log('handleTextChange -> e.target.value', e.target.value);
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
    if (shouldUpdateResults || searchText.length === 0) { updateSearchResults(searchText); }
    setShouldUpdateResults(false);
  }, [searchText, shouldUpdateResults]);

  return (
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
      {/* <Autocomplete
        id="search-bar"
        freeSolo
        autoHighlight
        fullWidth
        openOnFocus={false}
        options={db.map((option) => option.title)}
        renderInput={(params) => (
          <TextField
            {...params}
            value={searchText}
            onChange={handleTextChange}
            label="Search by artist name, department etc..."
            margin="normal"
            variant="outlined"
            InputProps={{ ...params.InputProps, type: 'search' }}
          />
        )}
      /> */}
    </SearchWrapper>
  );
}

const SearchWrapper = styled.div`
  width: 60%;
  min-width: 600px;
  padding: 1em 0em 0em 2.5em;
`;

SearchContainer.propTypes = {
  updateSearchResults: func.isRequired,
};
