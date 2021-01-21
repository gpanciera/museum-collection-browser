/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import styled from 'styled-components';
import { string, func } from 'prop-types';
import { ButtonGroup, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeptMenu from './DeptMenu';
import { MAIN_FILTER_DISPLAY_LIST, DEPTS_DISPLAY_LIST } from '../constants/constants';
import mediaQueries from '../styles/mediaQueries';

const useStyles = makeStyles((theme) => ({
  root: {
    // margin: theme.spacing(2),
    marginTop: 8,
    marginLeft: 2,
  },
}));

export default function Filters({ dispatchQueryUpdate, selectedFilter, handleResetSearch }) {
  const classes = useStyles();
  const handleMainFilterChange = (mainFilter) => {
    dispatchQueryUpdate({ type: 'UPDATE_MAIN_FILTER', payload: mainFilter });
  };

  return (
    <FilterContainer>
      <ButtonGroup
        className={classes.root}
        style={{ maxHeight: '2rem' }}
        // variant="contained"
        size="small"
        aria-label="outlined primary button group"
        disableElevation
      >
        { MAIN_FILTER_DISPLAY_LIST.map((filtername) => (
          <Button
            // variant={filtername === selectedFilter ? 'contained' : 'outlined'}
            variant="outlined"
            // color={filtername === selectedFilter ? 'primary' : ''}
            onClick={() => handleMainFilterChange(filtername)}
          >
            {filtername}
          </Button>
        ))}
      </ButtonGroup>
      <DeptMenu />
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
  margin: ${(prop) => (prop.addLeftMargin ? '6px 2px 3px 20px' : '3px')};
  padding: 0.5em;
  height: 2rem;
  border: 1px solid rgb(220,220,220);
  border-radius: 4px;
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

// <FilterButton
//   key={filtername}
//   isSelected={filtername === selectedFilter}
//   onClick={() => handleMainFilterChange(filtername)}
// >
//   {filtername}
// </FilterButton>
