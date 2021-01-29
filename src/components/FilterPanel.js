/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import styled from 'styled-components';
import { string, func, bool } from 'prop-types';
import { ButtonGroup, Button, Chip } from '@material-ui/core';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { makeStyles } from '@material-ui/core/styles';
import { MAIN_FILTER_DISPLAY_LIST } from '../other/constants';
import mediaQueries from '../styles/mediaQueries';

const useStyles = makeStyles((theme) => ({
  btngroup: {
    marginLeft: 2,
    marginRight: 25,
  },
  btn: {
    marginTop: 6,
    height: '2.2rem',
    padding: theme.spacing(1.5),
    border: '1px solid #CBCBCB',
  },
  chips: {
    marginTop: 6,
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: '2px 8px 0 2px',
    },
  },
}));

function FilterPanel({
  selectedMainFilter,
  deptFilter,
  typeFilter,
  handleResetSearch,
  handleDrawerToggle,
  handleFilterChange,
  isDrawerOpen,
  drawerName,
  isResetable,
}) {
  const classes = useStyles();

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
            variant={filtername === selectedMainFilter ? 'contained' : 'outlined'}
            color={filtername === selectedMainFilter ? 'secondary' : 'primary'}
            onClick={() => handleFilterChange(filtername)}
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
          style={(isDrawerOpen && drawerName === 'Department')
            ? { backgroundColor: '#f5f5f5' }
            : { backgroundColor: 'transparent' }}
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
          style={(isDrawerOpen && drawerName === 'Type')
            ? { backgroundColor: '#f5f5f5' }
            : { backgroundColor: 'transparent' }}
          endIcon={isDrawerOpen && drawerName === 'Type'
            ? <KeyboardArrowDownIcon />
            : <KeyboardArrowRightIcon />}
        >
          Type
        </Button>
      </ButtonGroup>
      <div className={classes.chips}>
        { deptFilter && deptFilter.length > 0
          && (
          <Chip
            label={`Department: ${deptFilter}`}
            onDelete={() => handleFilterChange('Department', '')}
          />
          )}
        { typeFilter && typeFilter.length > 0
          && (
          <Chip
            label={`Type: ${typeFilter}`}
            onDelete={() => handleFilterChange('Type', '')}
          />
          )}
      </div>
      <Button
        style={{ marginLeft: 'auto' }}
        className={classes.btn}
        key="Reset Search"
        onClick={() => handleResetSearch()}
        variant="outlined"
        disabled={!isResetable}
      >
        Reset Search
      </Button>
    </FilterContainer>
  );
}

FilterPanel.propTypes = {
  selectedMainFilter: string.isRequired,
  deptFilter: string.isRequired,
  typeFilter: string.isRequired,
  handleResetSearch: func.isRequired,
  handleDrawerToggle: func.isRequired,
  handleFilterChange: func.isRequired,
  isDrawerOpen: bool.isRequired,
  drawerName: string.isRequired,
  isResetable: bool.isRequired,
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

export default React.memo(FilterPanel);
