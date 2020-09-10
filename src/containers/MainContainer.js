/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect, useRef } from 'react';
import Modal from '@material-ui/core/Modal';
// import { makeStyles } from '@material-ui/core/styles';
import db from '../../db/cma-artworks-export';
import NavBar from './NavBar';
import SearchContainer from './SearchContainer';
import ResultsContainer from './ResultsContainer';
import indexDatabase from '../helpers/indexDatabase';
import filterResults from '../helpers/filterResults';

const modalStyle = {
  // position: 'absolute',
  // margin: 'auto',
  // width: '100%',
  // backgroundColor: 'rgb(68,68,68)',
  // border: '2px solid #000',
};

const MainContainer = () => {
  const [filteredResults, setFilteredResults] = useState([]);
  const artworkMap = useRef(null);
  const deptMap = useRef(null);
  const dbCleaned = useRef([]);
  // const [modalStyle] = useState(getModalStyle);
  // const classes = useStyles();
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const modalContent = (
    <div style={modalStyle} className="modal">
      <img src="./images/1914.726_reduced.jpg" alt="flask" />
      {/* <img src={`./images/${aNum}_reduced.jpg`} alt="image" /> */}
      <h2 id="simple-modal-title">Text in a modal</h2>
      <p id="simple-modal-description">
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p>
    </div>
  );

  return (
    <>
      <NavBar />
      <SearchContainer updateSearchResults={updateSearchResults} deptMap={deptMap.current} />
      <button type="button" onClick={handleModalOpen}>
        Open Modal
      </button>
      <Modal
        open={isModalOpen}
        onClose={handleModalClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {modalContent}
      </Modal>
      <ResultsContainer filteredResults={filteredResults} />
    </>
  );
};
export default MainContainer;
