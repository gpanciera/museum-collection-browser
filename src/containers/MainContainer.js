/* eslint-disable no-use-before-define */
/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect, useRef, useReducer } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import NavBar from '../components/NavBar';
import Header from '../components/Header'
import ResultsContainer from './ResultsContainer';
import ModalContent from '../components/ModalContent';
import ControlContainer from './ControlContainer';
import useDataApi from '../hooks/useDataApi';
import mediaQueries from '../styles/mediaQueries';
import queryReducer from '../reducers/queryReducer';
import { ENDPOINT, DEV_OPTIONS, OPTIONS, RESULTS_PER_PAGE, FILTERS, DEFAULT_FILTER } from '../constants/constants';

// WAI-ARIA standard to hide other content from screenreaders when a modal is open
Modal.setAppElement('#root');

const MainContainer = () => {
  const [queryElems, dispatchQueryUpdate] = useReducer(queryReducer, {
    curPage: 1,
    searchString: '',
    filterName: DEFAULT_FILTER,
  });
  const artworkMap = useRef(new Map());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const idForModal = useRef(-1);
  const isFirstRender = useRef(true);
  const [{ results, numResults, isLoading, isError }, runAPIFetch] = useDataApi(ENDPOINT + OPTIONS);

  // ****** When results change add any new content to artworMap
  useEffect(() => {
    if (results && results.length > 0) {
      results.forEach((artwork) => {
        if (!artworkMap.current.has(artwork.id)) { artworkMap.current.set(artwork.id, artwork); }
      });
    };
  }, [results]);

  // ****** Run the API Fetch after any changes to query parameters
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    }
    else {
      const { filterName, searchString, curPage } = queryElems;
      const filterStr = FILTERS.has(filterName) 
        ? FILTERS.get(filterName) 
        : FILTERS.get(DEFAULT_FILTER);
      const combinedSearchStr = searchString.length > 0 ? `${filterStr}${searchString}` : '';// prod
      const offset = ((RESULTS_PER_PAGE * curPage) - RESULTS_PER_PAGE).toString();
      const query = `${ENDPOINT + OPTIONS}&skip=${offset}${combinedSearchStr}`;
      runAPIFetch(query); 
    }
  }, [queryElems]);

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
      <ControlContainer 
        dispatchQueryUpdate={dispatchQueryUpdate}
        numResults={numResults}
        filterName={queryElems.filterName}
        curPage={queryElems.curPage}
      />
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
  color: black;
  font-weight: 400;
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
