/* eslint-disable no-use-before-define */
/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect, useRef, useReducer } from 'react';
import Modal from 'react-modal';
import { Pagination } from '@material-ui/core';
import styled from 'styled-components';
import NavBar from './NavBar';
import SearchContainer from './SearchContainer';
import ResultsContainer from './ResultsContainer';
import ModalContent from '../components/ModalContent';
import useDataApi from '../hooks/useDataApi';
// import axios from 'axios';

const ENDPOINT = 'https://openaccess-api.clevelandart.org/api/artworks/';
const OPTIONS = '?has_image=1&limit=20';
const RESULTS_PER_PAGE = 20;

// WAI-ARIA standard to hide other content from screenreaders when a modal is open
Modal.setAppElement('#root');

const MainContainer = () => {
  const [searchString, setSearchString] = useState('');
  const [curPage, setCurPage] = useState(1);
  const artworkMap = useRef(new Map());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const idForModal = useRef(-1);

  const [{ results, numResults, isLoading, isError }, runQuery] = useDataApi(ENDPOINT + OPTIONS);

  // results change => update artwork map
  useEffect(() => {
    if (results && results.length > 0) {
      results.forEach((artwork) => {
        if (!artworkMap.current.has(artwork.id)) { artworkMap.current.set(artwork.id, artwork); }
      });
    }
    console.log('artworkMap', artworkMap.current);
    // destroy map item(s) here?
  }, [results]);

  // page or search change => update url
  useEffect(() => {
    const offset = ((RESULTS_PER_PAGE * curPage) - RESULTS_PER_PAGE).toString();
    runQuery(`${ENDPOINT + OPTIONS}&skip=${offset}${searchString}`);
  }, [curPage, searchString]);

  const updateSearchQuery = (searchText, tagFilter) => {
    // console.log('updateSearchResults ~ searchText', searchText);
    setCurPage(1);
    setSearchString(searchText.length > 0 ? `&q=${searchText}` : '');
  };

  const handleModalOpen = (id) => {
    idForModal.current = id;
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handlePageChange = (e, num) => {
    setCurPage(num);
  };

  return (
    <>
      <NavBar />
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        style={modalStyle}
        contentLabel="modal label"
      >
        <ModalContent id={idForModal.current} artworkMap={artworkMap} />
      </Modal>
      <SearchContainer updateSearchQuery={updateSearchQuery} />
      <PaginationContainer>
        <StyledPagination 
          siblingCount={1}
          count={Math.floor(numResults / RESULTS_PER_PAGE)}
          page={curPage}
          onChange={handlePageChange}
          shape="rounded" 
          variant="outlined" 
          />
      </PaginationContainer>
      <ResultsContainer
        filteredResults={results}
        handleModalOpen={handleModalOpen}
        isLoading={isLoading}
        isError={isError}
      />
    </>
  );
};
export default MainContainer;

const modalStyle = {
  content: {
    top: '10vh',
    bottom: 'auto',
    backgroundColor: 'rgb(233,233,233)',
    borderStyle: 'none',
    zIndex: '2',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    zIndex: '1',
  },
};

const PaginationContainer = styled.div`
  display: flex;
`;

const StyledPagination = styled(Pagination)`
  margin: 0 0 0.5rem 2.5rem;
  ${'' /* margin-left: auto; */}
  ${'' /* margin-right: 2rem; */}
  ${'' /* align-self: flex-end; */}
`;

// const [filteredResults, setFilteredResults] = useState([]);
// const deptMap = useRef(null);
// const dbCleaned = useRef([]);
// const [modalStyle] = useState(getModalStyle);
// const classes = useStyles();

// Set dbCleaned by removing duplicates and adding all creators under a single artwork record
// Then set initial filtered results to show all. This runs only once on app startup
// useEffect(() => {
//   [artworkMap.current, deptMap.current] = indexDatabase(db);
//   dbCleaned.current = Array.from(artworkMap.current.values());
//   console.log('artworkMap.current', artworkMap.current);
//   console.log('dbCleaned', dbCleaned.current);

//   setFilteredResults(dbCleaned.current);
// }, []);
