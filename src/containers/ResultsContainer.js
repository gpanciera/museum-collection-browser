/* eslint-disable arrow-body-style */
/* eslint-disable react/require-default-props */
import React from 'react';
import { arrayOf, number, shape, string, func, bool } from 'prop-types';
import styled from 'styled-components';
import { Pagination } from '@material-ui/lab';
import DisplayCard from '../components/DisplayCard';
import Masonry from '../components/Masonry';

const ResultsContainer = ({
  filteredResults = [],
  handleModalOpen,
  handlePageChange,
  numPages,
  curPage,
  isLoading,
  isError }) => {
  const pageButtons = [];
  const pageButtonsToDisplay = Math.min(10, numPages);
  const random = (Math.random() * 100).toFixed(0).toString();
  for (let i = 0; i < pageButtonsToDisplay; i++) {
    pageButtons.push(
      <PageButton
        key={random + i.toString()}
        type="button"
        onClick={() => handlePageChange(i)}
        curPage={curPage === i}
      >
        {i + 1}
      </PageButton>,
    );
  }

  return (
    <div className="results">
      {isError && <div>Something went wrong...</div>}

      {isLoading ? (<div>Loading...</div>) : (
        <div>
          <PaginationWrapper>
            {pageButtons}
          </PaginationWrapper>
          <ResultsWrapper>
            <Masonry minWidth={400} gap="0em" css="margin: 0em;">
              { filteredResults.map((item) => (
                <DisplayCard
                  key={item.id}
                  id={item.id}
                  aNum={item.accession_number}
                  imgUrl={item.images.web.url}
                  title={item.title}
                  creatorsAll={item.creators}
                  handleModalOpen={handleModalOpen}
                />
              ))}
            </Masonry>
          </ResultsWrapper>
        </div>
      )}
    </div>
  );
};

const PageButton = styled.button`
  padding: 0.5rem;
  border: none;
  outline: none;
  font: inherit;
  color: inherit;
  background: ${(props) => (props.curPage ? 'lightgrey' : 'none')};
  cursor: pointer;
  &:focus, &:hover {
    background: lightblue;
  }
`;

const PaginationWrapper = styled.div`
  margin: 0 0 0.5rem 2.5rem;
`;

const ResultsWrapper = styled.div`
  border-top: 1px solid #EBEBEB;
`;

ResultsContainer.propTypes = {
  filteredResults: arrayOf(shape({
    id: number.isRequired,
    accession_number: string.isRequired,
    title: string.isRequired,
    tombstone: string.isRequired,
    creators: arrayOf(shape({
      role: string,
      description: string,
    })).isRequired,
  })),
  handleModalOpen: func.isRequired,
  handlePageChange: func.isRequired,
  numPages: number.isRequired,
  curPage: number.isRequired,
  isLoading: bool,
  isError: bool,
};

export default ResultsContainer;
