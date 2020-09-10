/* eslint-disable no-use-before-define */
/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';
import db from '../../db/cma-artworks-export';
import NavBar from './NavBar';
import SearchContainer from './SearchContainer';
import ResultsContainer from './ResultsContainer';
import ModalContent from '../components/ModalContent';
import indexDatabase from '../helpers/indexDatabase';
import filterResults from '../helpers/filterResults';

// WAI-ARIA standard to hide other content from screenreaders when a modal is open
Modal.setAppElement('#root');

const MainContainer = () => {
  const [filteredResults, setFilteredResults] = useState([]);
  const artworkMap = useRef(null);
  const deptMap = useRef(null);
  const dbCleaned = useRef([]);
  // const [modalStyle] = useState(getModalStyle);
  // const classes = useStyles();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const aNumForModal = useRef('-1');

  // Set dbCleaned by removing duplicates and adding all creators under a single artwork record
  // Then set initial filtered results to show all. This runs only once on app startup
  useEffect(() => {
    [artworkMap.current, deptMap.current] = indexDatabase(db);
    dbCleaned.current = Array.from(artworkMap.current.values());
    setFilteredResults(dbCleaned.current);
  }, []);

  // Update filtered (displayed) results using new searchText and tags
  const updateSearchResults = (searchText, tagFilter) => {
    setFilteredResults(filterResults(dbCleaned, searchText, tagFilter));
  };

  const handleModalOpen = (aNum) => {
    aNumForModal.current = aNum;
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // const afterOpenModal = () => {
  //   // references are now sync'd and can be accessed.
  //   subtitle.style.color = '#f00';
  // };

  // useEffect(() => {
  // }, []);

  return (
    <>
      <NavBar />
      <SearchContainer updateSearchResults={updateSearchResults} deptMap={deptMap.current} />
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        style={modalStyle}
        contentLabel="modal label"
      >
        <ModalContent aNum={aNumForModal.current} artworkMap={artworkMap} />
      </Modal>
      <ResultsContainer filteredResults={filteredResults} handleModalOpen={handleModalOpen} />
    </>
  );
};
export default MainContainer;

const modalStyle = {
  content: {
    top: '10vh',
    // left: '50%',
    // right: 'auto',
    bottom: 'auto',
    // marginRight: '-50%',
    // transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgb(233,233,233)',
    borderStyle: 'none',
    zIndex: '2',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    zIndex: '1',
  },
};
