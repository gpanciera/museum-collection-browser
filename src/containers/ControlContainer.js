/* eslint-disable default-case */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { string, func, bool } from 'prop-types';
import { TextField } from '@material-ui/core';
import styled from 'styled-components';
import DOMPurify from 'dompurify';
import mediaQueries from '../styles/mediaQueries';
import FilterPanel from '../components/FilterPanel';
import Drawer from '../components/Drawer';
import { DEPTS_DISPLAY_LIST, TYPES_DISPLAY_LIST } from '../constants/constants';

function ControlContainer({
  dispatchQueryUpdate,
  selectedMainFilter,
  deptFilter,
  typeFilter,
  isResetable }) {
  const [searchText, setSearchText] = useState('');
  const [userSubmittedSearch, setUserSubmittedSearch] = useState(false);
  const isFirstRender = useRef(true);
  const [drawerState, setDrawerState] = useState({ isOpen: false, drawerName: '' });
  // const [drawerState, setDrawerState] = useState({ isOpen: true, drawerName: 'Type' });

  const handleDrawerToggle = useCallback((drawerName) => {
    setDrawerState((prevState) => {
      // if drawer is open and we've clicked on the one that's already open, close it
      if (prevState.isOpen && prevState.drawerName === drawerName) {
        return { ...prevState, isOpen: false, drawerName: '' };
      }
      // otherwise, open drawer and set drawer name
      return { ...prevState, isOpen: true, drawerName };
    });
  }, []);

  const handleFilterChange = useCallback((name, val = '') => {
    setDrawerState({ isOpen: false, drawerName: '' });
    dispatchQueryUpdate({ type: 'UPDATE_FILTER', payload: { type: name, value: val } });
  }, []);

  const handleResetSearch = useCallback(() => {
    setSearchText('');
    setDrawerState({ isOpen: false, drawerName: '' });
    dispatchQueryUpdate({ type: 'RESET_ALL' });
  }, []);

  const handleTextChange = useCallback((e) => {
    setSearchText(e.target.value);
  }, []);

  const handleKeyDown = useCallback((e) => {
    switch (e.key) {
      case 'Escape': {
        setSearchText('');
        setUserSubmittedSearch(true);
        break;
      }
      case 'Enter': {
        setUserSubmittedSearch(true);
        break;
      }
    }
  }, []);

  // If user hit enter or cleared contents of search field, send updated search string to parent
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    }
    else {
      if (userSubmittedSearch) {
        const cleanedString = DOMPurify.sanitize(searchText);
        dispatchQueryUpdate({ type: 'UPDATE_SEARCH', payload: cleanedString });
      }
      setUserSubmittedSearch(false);
    }
  }, [searchText, userSubmittedSearch]);

  return (
    <>
      <SearchWrapper>
        <StyledTextField
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
      <Spacer>
        <FilterPanel
          selectedMainFilter={selectedMainFilter}
          deptFilter={deptFilter}
          typeFilter={typeFilter}
          handleResetSearch={handleResetSearch}
          handleDrawerToggle={handleDrawerToggle}
          handleFilterChange={handleFilterChange}
          isDrawerOpen={drawerState.isOpen}
          drawerName={drawerState.drawerName}
          isResetable={isResetable}
        />
      </Spacer>
      { drawerState.isOpen && drawerState.drawerName === 'Department' && (
        <Drawer
          itemList={DEPTS_DISPLAY_LIST}
          clickHandler={handleFilterChange}
          drawerName="Department"
        />
      )}
      { drawerState.isOpen && drawerState.drawerName === 'Type' && (
        <Drawer
          itemList={TYPES_DISPLAY_LIST}
          clickHandler={handleFilterChange}
          drawerName="Type"
          dense
        />
      )}
    </>
  );
}

export default React.memo(ControlContainer);

const Spacer = styled.div`
  margin-bottom: 1rem;
`;

const StyledTextField = styled(TextField)`
  border: '1px solid #000000';
`;

const SearchWrapper = styled.div`
  padding: 0.6em 1em 0em 1em;
  ${mediaQueries('md')`
    padding: 0.8em 2.5em 0em 2.5em;
  `};
`;

ControlContainer.propTypes = {
  dispatchQueryUpdate: func.isRequired,
  selectedMainFilter: string.isRequired,
  deptFilter: string.isRequired,
  typeFilter: string.isRequired,
  isResetable: bool.isRequired,
};
