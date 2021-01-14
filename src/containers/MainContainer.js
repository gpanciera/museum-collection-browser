/* eslint-disable no-use-before-define */
/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect, useRef, useReducer } from 'react';
import Modal from 'react-modal';
import { Pagination } from '@material-ui/core';
import styled from 'styled-components';
import NavBar from './NavBar';
import Header from '../components/Header'
import SearchContainer from './SearchContainer';
import ResultsContainer from './ResultsContainer';
import Filters from '../components/Filters';
import ModalContent from '../components/ModalContent';
import useDataApi from '../hooks/useDataApi';
import mediaQueries from '../styles/mediaQueries';
import { ENDPOINT, OPTIONS, RESULTS_PER_PAGE, FILTERS, DEFAULT_FILTER } from '../constants/constants'

// WAI-ARIA standard to hide other content from screenreaders when a modal is open
Modal.setAppElement('#root');

const MainContainer = () => {
  // const [searchString, setSearchString] = useState('');
  // const [filterName, setFilterName] = useState('');
  // const [curPage, setCurPage] = useState(1);
  const [queryElems, setQueryElems] = useState({
    curPage: 1,
    searchString: '',
    filterName: DEFAULT_FILTER,
  });

  const artworkMap = useRef(new Map());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const idForModal = useRef(-1);

  const [{ results, numResults, isLoading, isError }, runAPIFetch] = useDataApi(ENDPOINT + OPTIONS);

  // results change => update artwork map
  useEffect(() => {
    if (results && results.length > 0) {
      results.forEach((artwork) => {
        if (!artworkMap.current.has(artwork.id)) { artworkMap.current.set(artwork.id, artwork); }
      });
    }
    // console.log('artworkMap', artworkMap.current);
    // destroy map item(s) here?
  }, [results]);

  // ****** Run the API Fetch (first time, and on page change or search change)
  useEffect(() => {
    const curFilter = queryElems.filterName;
    const filterStr = FILTERS.has(curFilter) ? FILTERS.get(curFilter) : FILTERS.get(DEFAULT_FILTER);
    const combinedSearchStr = `${filterStr}${queryElems.searchString}`;
    const offset = ((RESULTS_PER_PAGE * queryElems.curPage) - RESULTS_PER_PAGE).toString();
    const query = `${ENDPOINT + OPTIONS}&skip=${offset}${combinedSearchStr}`;

    // console.log("🚀 ~ line 50 ~ SENDING QUERY:", query);
    runAPIFetch(query);
  }, [queryElems]);

  const handlePageChange = (e, num) => {
    setQueryElems(prevState => ({ ...prevState, curPage: num }))
  };

  const handleSearchChange = (searchText) => {
    setQueryElems(prevState => ({ ...prevState, curPage: 1, searchString: searchText }));
  };
  
  const handleFilterChange = (filter) => {
    setQueryElems(prevState => ({ ...prevState, curPage: 1, filterName: filter }));
  }

  const handleModalOpen = (id) => {
    idForModal.current = id;
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="non-footer-content">
      <NavBar />
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        style={modalStyle}
        contentLabel="modal label"
      >
        <ModalContent 
          id={idForModal.current} 
          artworkMap={artworkMap}   
        />
      </Modal>
      <Header />
      <SearchContainer 
        handleSearchChange={handleSearchChange} 
      />
      <FilterAndPaginationWrapper>
        <Filters 
          handleFilterChange={handleFilterChange} 
          selectedFilter={queryElems.filterName}
        />
        <StyledPagination 
          siblingCount={1}
          count={Math.floor(numResults / RESULTS_PER_PAGE)}
          page={queryElems.curPage}
          onChange={handlePageChange}
          shape="rounded" 
          variant="outlined" 
        />
      </FilterAndPaginationWrapper>
      <ResultCountWrapper>
          { results && numResults > 0 
            ? (<Result>Found{' '}<Count>{numResults}</Count>{' '}Results</Result>) 
            : (<Result>No matches found</Result>)}
        </ResultCountWrapper>
      <ResultsContainer
        filteredResults={results}
        handleModalOpen={handleModalOpen}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
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
const ResultCountWrapper = styled.div`
  margin-left: 1rem;
  font-size: 1rem;
  ${'' /* color: rgb(110,110,110); */}
  color: black;
  font-weight: 400;
  ${'' /* border: 1px solid blue; */}
  display: flex;
  justify-content: flex-start;
  width: auto;
  ${mediaQueries('md')`
    margin: 0.5rem 0 0.5rem 2.5rem;
  `};
`;

const Result = styled.div`
  display: inline-block;
`;

const Count = styled.div`
  display: inline-block;
`;

const FilterAndPaginationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 6.5rem;
  ${mediaQueries('sm')`
    height: 4rem;
    flex-direction: row;
    justify-content: start;
  `};

  ${mediaQueries('md')`
    height: 4rem;
    flex-direction: row;
    justify-content: start;
  `};
`;

const PaginationContainer = styled.div`
`;

const StyledPagination = styled(Pagination)`
  margin: 0.5rem 0 0 0.5rem;
  ${mediaQueries('sm')`
    margin-left: auto;
    margin-right: 2.5rem;
    margin-top: 4px;
    margin-bottom: 0;
  `};
`;