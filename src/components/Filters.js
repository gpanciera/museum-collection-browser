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
    margin: theme.spacing(2),
    marginTop: 6,
    marginLeft: 2,
  },
  btn: {
    maxHeight: '2.2rem',
    padding: theme.spacing(1.5),
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
        size="small"
        disableElevation
      >
        { MAIN_FILTER_DISPLAY_LIST.map((filtername) => (
          <Button
            className={classes.btn}
            aria-label="outlined primary button"
            key={filtername}
            variant={filtername === selectedFilter ? 'contained' : 'outlined'}
            color={filtername === selectedFilter ? 'secondary' : 'primary'}
            onClick={() => handleMainFilterChange(filtername)}
          >
            {filtername}
          </Button>
        ))}
      </ButtonGroup>
      <DeptMenu />
      <Button
        style={{ marginTop: 6, marginLeft: 10 }}
        className={classes.btn}
        size="small"
        disableElevation
        key="Reset Search"
        onClick={() => handleResetSearch()}
        variant="outlined"
      >
        Reset Search
      </Button>
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
