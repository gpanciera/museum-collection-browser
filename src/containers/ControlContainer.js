/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable default-case */
import React, { useState, useEffect, useRef } from 'react';
import { string, func, number } from 'prop-types';
import { TextField } from '@material-ui/core';
import styled from 'styled-components';
import DOMPurify from 'dompurify';
import mediaQueries from '../styles/mediaQueries';
import FilterPanel from '../components/FilterPanel';
import Drawer from '../components/Drawer';
import { DEPTS_DISPLAY_LIST, TYPES_DISPLAY_LIST } from '../constants/constants';

export default function ControlContainer({ dispatchQueryUpdate, mainFilter }) {
  const [searchText, setSearchText] = useState('');
  const [userSubmittedSearch, setUserSubmittedSearch] = useState(false);
  const isFirstRender = useRef(true);
  const [drawerState, setDrawerState] = useState({ isOpen: false, drawerName: '' });

  const handleDrawerToggle = (drawerName) => {
    setDrawerState((prevState) => {
      // if drawer is open and we've clicked on the one that's already open, close it
      if (prevState.isOpen && prevState.drawerName === drawerName) {
        return { ...prevState, isOpen: false, drawerName: '' };
      }
      // otherwise, open drawer and set drawer name
      return { ...prevState, isOpen: true, drawerName };
    });
  };

  const handleDeptSelect = (deptName) => {
    console.log('dept selected:', deptName);
    dispatchQueryUpdate({ type: 'UPDATE_DEPT_FILTER', payload: deptName });
  };

  const handleTypeSelect = (typeName) => {
    console.log('type selected:', typeName);
    dispatchQueryUpdate({ type: 'UPDATE_TYPE_FILTER', payload: typeName });
  };

  const handleResetSearch = () => {
    setSearchText('');
    setDrawerState({ isOpen: false, drawerName: '' });
    dispatchQueryUpdate({ type: 'RESET_ALL' });
  };

  const handleTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleKeyDown = (e) => {
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
  };

  // If user hit enter or cleared contents of search field, send updated search string to parent
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    }
    else {
      if (userSubmittedSearch || searchText.length === 0) {
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
          dispatchQueryUpdate={dispatchQueryUpdate}
          selectedFilter={mainFilter}
          handleResetSearch={handleResetSearch}
          handleDrawerToggle={handleDrawerToggle}
          isDrawerOpen={drawerState.isOpen}
          drawerName={drawerState.drawerName}
        />
      </Spacer>
      { drawerState.isOpen && drawerState.drawerName === 'Department' && (
        <Drawer
          itemList={DEPTS_DISPLAY_LIST}
          clickHandler={handleDeptSelect}
        />
      )}
      { drawerState.isOpen && drawerState.drawerName === 'Type' && (
        <Drawer
          itemList={TYPES_DISPLAY_LIST}
          clickHandler={handleTypeSelect}
        />
      )}
    </>
  );
}

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
  mainFilter: string.isRequired,
  dispatchQueryUpdate: func.isRequired,
};
