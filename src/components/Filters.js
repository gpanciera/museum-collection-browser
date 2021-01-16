import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FILTERS, DEFAULT_FILTER } from '../constants/constants';
import mediaQueries from '../styles/mediaQueries';

export default function Filters({ dispatchQueryUpdate, selectedFilter, handleResetSearch }) {
  const filterButtons = [];

  const handleFilterChange = (filterName) => {
    dispatchQueryUpdate({ type: 'UPDATE_FILTER', payload: filterName });
  }

  FILTERS.forEach((val, key) => {
    filterButtons.push(
      <FilterButton
        key={key}
        isSelected={key === selectedFilter}
        onClick={() => handleFilterChange(key) }
      >
        {key}
      </FilterButton>
    );
  })
  filterButtons.push(
    <FilterButton
      key={"Reset Search"}
      onClick={() => handleResetSearch() }
      addLeftMargin
    >
      Reset Search
    </FilterButton>
  )

  return (
    <FilterContainer>
      {filterButtons}
    </FilterContainer>
  );
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