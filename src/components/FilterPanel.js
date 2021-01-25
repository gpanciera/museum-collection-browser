/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import styled from 'styled-components';
import { string, func, bool } from 'prop-types';
import { ButtonGroup, Button, Chip } from '@material-ui/core';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { makeStyles } from '@material-ui/core/styles';
import { MAIN_FILTER_DISPLAY_LIST } from '../constants/constants';
import mediaQueries from '../styles/mediaQueries';

const useStyles = makeStyles((theme) => ({
  btngroup: {
    marginLeft: 2,
    marginRight: 25,
  },
  btn: {
    marginTop: 6,
    height: '2.5rem',
    padding: theme.spacing(1.5),
    border: '1px solid #CBCBCB',
  },
}));

export default function FilterPanel({
  dispatchQueryUpdate,
  selectedFilter,
  handleResetSearch,
  handleDrawerToggle,
  isDrawerOpen,
  drawerName,
}) {
  const classes = useStyles();
  const handleMainFilterChange = (mainFilter) => {
    dispatchQueryUpdate({ type: 'UPDATE_MAIN_FILTER', payload: mainFilter });
  };

  return (
    <FilterContainer>
      <ButtonGroup
        className={classes.btngroup}
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
      <ButtonGroup
        className={classes.btngroup}
        size="small"
        disableElevation
        disableRipple
      >
        <Button
          className={classes.btn}
          key="Department"
          onClick={() => handleDrawerToggle('Department')}
          variant="outlined"
          endIcon={isDrawerOpen && drawerName === 'Department'
            ? <KeyboardArrowDownIcon />
            : <KeyboardArrowRightIcon />}
        >
          Department
        </Button>
        <Button
          className={classes.btn}
          key="Type"
          onClick={() => handleDrawerToggle('Type')}
          variant="outlined"
          endIcon={isDrawerOpen && drawerName === 'Type'
            ? <KeyboardArrowDownIcon />
            : <KeyboardArrowRightIcon />}
        >
          Type
        </Button>
      </ButtonGroup>
      <Button
        style={{ marginLeft: 'auto' }}
        className={classes.btn}
        key="Reset Search"
        onClick={() => handleResetSearch()}
        variant="outlined"
      >
        Reset Search
      </Button>
    </FilterContainer>
  );
}

FilterPanel.propTypes = {
  selectedFilter: string.isRequired,
  dispatchQueryUpdate: func.isRequired,
  handleResetSearch: func.isRequired,
  handleDrawerToggle: func.isRequired,
  isDrawerOpen: bool.isRequired,
  drawerName: string.isRequired,
};

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 2px 1rem 0 1rem;
  ${mediaQueries('sm')`
    margin: 2px 1rem 0 1rem;
  `};
  ${mediaQueries('md')`
    margin: 2px 2.4rem 0 2.4rem;
  `};
`;
