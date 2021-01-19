/* eslint-disable react/no-array-index-key */
import React from 'react';
import styled from 'styled-components';
import { string, func } from 'prop-types';
import { Select } from '@material-ui/core';
import { MAIN_FILTER } from '../constants/constants';
import mediaQueries from '../styles/mediaQueries';

export default function Filters({ dispatchQueryUpdate, selectedFilter, handleResetSearch }) {
  const handleMainFilterChange = (mainFilter) => {
    dispatchQueryUpdate({ type: 'UPDATE_MAIN_FILTER', payload: mainFilter });
  };

  return (
    <FilterContainer>
      { MAIN_FILTER.map((val, key) => {
          <FilterButton
            key={key}
            isSelected={key === selectedFilter}
            onClick={() => handleMainFilterChange(key)}
          >
            {key}
          </FilterButton>,
        }
      )}
      <FormControl className={classes.formControl}>
        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
          Age
        </InputLabel>
        <Select
          labelId="demo-simple-select-placeholder-label-label"
          id="demo-simple-select-placeholder-label"
          value={age}
          onChange={handleChange}
          displayEmpty
          className={classes.selectEmpty}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        <FormHelperText>Label + placeholder</FormHelperText>
      </FormControl>
      <FilterButton
        key="Reset Search"
        onClick={() => handleResetSearch()}
        addLeftMargin
      >
        Reset Search
     </FilterButton>
    </FilterContainer>
  );
}

Filters.propTypes = {
  selectedFilter: string.isRequired,
  dispatchQueryUpdate: func.isRequired,
  handleResetSearch: func.isRequired,
};

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 2px 0 0 1rem;
  ${mediaQueries('sm')`
    margin: 2px 0 0 1rem;
  `};
  ${mediaQueries('md')`
    margin: 2px 0 0 2.4rem;
  `};
`;

const FilterButton = styled.button`
  display: inline-block;
  float: left;
  margin: ${(prop) => (prop.addLeftMargin ? '2px 2px 2px 20px' : '2px')};
  padding: 0.5em;
  height: 2rem;
  border: 1px solid rgb(220,220,220);
  border-radius: 2px;
  text-decoration: none;  
  display: block;
  background-color: ${(prop) => (prop.isSelected ? 'rgb(220,220,220)' : 'white')};
  font-size: 0.8em;
  color: rgb(110,110,110);
  cursor: pointer;
  transition: background 250ms ease-in-out, 
  transform 150ms ease;
  -webkit-appearance: none;
  -moz-appearance: none;
  :hover {
    color: #311e00;
  }
  ${mediaQueries('md')`
    font-size: 0.85em;
  `};
`;
