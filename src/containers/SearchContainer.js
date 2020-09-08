import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import styled from 'styled-components';
import db from '../../db/cma-artworks-export';

// const records = db.map((val) => val.title);

export default function SearchContainer() {
  return (
    <SearchWrapper>
      <Autocomplete
        id="search-bar"
        freeSolo
        autoHighlight
        fullWidth
        openOnFocus={false}
        options={db.map((option) => option.title)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search by artist name, department etc..."
            margin="normal"
            variant="outlined"
            InputProps={{ ...params.InputProps, type: 'search' }}
          />
        )}
      />
    </SearchWrapper>
  );
}

const SearchWrapper = styled.div`
  width: 60%;
  min-width: 600px;
  padding: 1em 0em 0em 2.5em;
`;
