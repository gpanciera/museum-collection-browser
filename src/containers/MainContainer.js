/* eslint-disable prefer-destructuring */
/* eslint-disable no-multi-spaces */
/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-use-before-define */
/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect, useRef, useReducer, useMemo } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { Pagination } from '@material-ui/lab';
import NavBar from '../components/NavBar';
import Header from '../components/Header';
import ResultsContainer from './ResultsContainer';
import ModalContent from '../components/ModalContent';
import ControlContainer from './ControlContainer';
import useDataApi from '../hooks/useDataApi';
import mediaQueries from '../styles/mediaQueries';
import queryReducer from '../reducers/queryReducer';
import { ENDPOINT, DEV_OPTIONS, OPTIONS, RESULTS_PER_PAGE, FILTER_QUERY_TABLE, DEFAULT_FILTER, INIT_QUERY_STATE, MODAL_CONTENT_PADDING_REM, remToPx } from '../other/constants';
import { calcModalSize } from '../other/helpers';
import useOptimizeLayout from '../hooks/useOptimizeLayout';

// WAI-ARIA standard to hide other content from screenreaders when a modal is open
Modal.setAppElement('#root');

const MainContainer = () => {
  const isFirstRender = useRef(true);

  const [queryElems, dispatchQueryUpdate] = useReducer(queryReducer, INIT_QUERY_STATE);
  const artworkMap = useRef(new Map());

  const [modalStatus, setModalStatus] = useState({ isOpen: false, artworkId: -1 });
  const [optimalVars, fixedLayoutParams, setFixedLayoutParams] = useOptimizeLayout();

  const [{ results, numResults, isLoading, isError }, runAPIFetch] = useDataApi(ENDPOINT + DEV_OPTIONS);

  // is triggering from layout params sketchy? it WILL be a new object every time so maybe ok
  useEffect(() => {
    if (!isFirstRender.current) {
      setModalStatus({ isOpen: true, artworkId: fixedLayoutParams.id });
    }
  }, [fixedLayoutParams]);

  // ****** When results change add any new content to artworMap
  useEffect(() => {
    if (results && results.length > 0) {
      results.forEach((artwork) => {
        if (!artworkMap.current.has(artwork.id)) { artworkMap.current.set(artwork.id, artwork); }
      });
    }
  }, [results]);

  // ****** Run the API Fetch after any changes to query parameters
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    }
    else {
      const { selectedMainFilter, searchString, curPage, deptFilter, typeFilter } = queryElems;
      const filterStr = FILTER_QUERY_TABLE.has(selectedMainFilter)
        ? FILTER_QUERY_TABLE.get(selectedMainFilter)
        : FILTER_QUERY_TABLE.get(DEFAULT_FILTER);
      // const combinedSearchStr = searchString.length > 0 ? `${filterStr}${searchString}` : '';// prod
      const combinedSearchStr = `${filterStr}${searchString}`; // dev
      const offset = ((RESULTS_PER_PAGE * curPage) - RESULTS_PER_PAGE).toString();
      let query = `${ENDPOINT + OPTIONS}&skip=${offset}${combinedSearchStr}`;
      if (deptFilter && deptFilter.length > 0) {
        query += FILTER_QUERY_TABLE.get('Department') + deptFilter;
      }
      if (typeFilter && typeFilter.length > 0) {
        query += FILTER_QUERY_TABLE.get('Type') + typeFilter;
      }
      runAPIFetch(query);
    }
  }, [queryElems]);

  const handleModalOpen = (id) => {
    const artwork = artworkMap.current.get(id);
    const width = artwork.images.web.width || 0;
    const height = artwork.images.web.height || 0;
    setFixedLayoutParams({ id, adjAR: width / height });
  };

  const handleModalClose = () => {
    setModalStatus({ isOpen: false, artworkId: -1 });
  };

  const handlePageChange = (e, num) => {
    dispatchQueryUpdate({ type: 'UPDATE_PAGE', payload: num });
  };

  let targetModalDims = { w: 0, h: 0 };
  if (optimalVars !== null) {
    const { imgDims, isRowLayout } = optimalVars;
    const padding = remToPx(MODAL_CONTENT_PADDING_REM);
    targetModalDims = calcModalSize(imgDims, isRowLayout);
    targetModalDims.w -= padding * 2;
    targetModalDims.h -= padding * 2;
  }

  return (
    <div className="non-footer-content">
      <NavBar />
      <Modal
        isOpen={modalStatus.isOpen}
        onRequestClose={handleModalClose}
        style={{
          content: {
            backgroundColor: 'rgb(233,233,233)',
            borderStyle: 'none',
            zIndex: '2',
            padding: `${MODAL_CONTENT_PADDING_REM}rem`,
            width: `${targetModalDims.w}px`,
            height: `${targetModalDims.h}px`,
            margin: 'auto',
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            zIndex: '1',
          },
        }}
        contentLabel="modal label"
      >
        <ModalContent
          id={modalStatus.artworkId}
          artworkMap={artworkMap}
          imgWidth={optimalVars && optimalVars.imgDims.w}
          imgHeight={optimalVars && optimalVars.imgDims.h}
          rowLayoutOptimal={optimalVars && optimalVars.isRowLayout}
        />
      </Modal>
      <Header />
      <ControlContainer
        dispatchQueryUpdate={dispatchQueryUpdate}
        numResults={numResults}
        selectedMainFilter={queryElems.selectedMainFilter}
        deptFilter={queryElems.deptFilter}
        typeFilter={queryElems.typeFilter}
        curPage={queryElems.curPage}
        isResetable={queryElems.isResetable}
      />
      <div style={{ marginBottom: '28px' }} />
      <ResultCountWrapper>
        { results && numResults > 0
          ? (
            <Result>
              Found
              {' '}
              <Count>{numResults}</Count>
              {' '}
              Results
            </Result>
          )
          : (<Result>No matches found</Result>)}
      </ResultCountWrapper>
      <ResultsContainer
        filteredResults={results}
        handleModalOpen={handleModalOpen}
        isLoading={isLoading}
        isError={isError}
      />
      { !isLoading
      && (
      <PaginationWrapper>
        <Pagination
          siblingCount={1}
          count={Math.floor(numResults / RESULTS_PER_PAGE)}
          page={queryElems.curPage}
          onChange={handlePageChange}
          shape="rounded"
          variant="outlined"
        />
      </PaginationWrapper>
      )}
    </div>
  );
};
export default MainContainer;

// const modalStyle = {
//   content: {
//     backgroundColor: 'rgb(233,233,233)',
//     borderStyle: 'none',
//     zIndex: '2',
//     padding: `${MODAL_CONTENT_PADDING_PX}px`,
//   },
//   overlay: {
//     backgroundColor: 'rgba(0, 0, 0, 0.85)',
//     zIndex: '1',
//   },
// };
// width: 'fit-content',
// maxWidth: '95%',
// minHeight: 'max-content',
// maxHeight: '95%',
// margin: 'auto',
// className: 'modal',

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

const PaginationWrapper = styled.div`
  display: flex;
  height: 130px;
  justify-content: center;
  align-items: center;
`;
