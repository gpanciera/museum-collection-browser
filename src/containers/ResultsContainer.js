/* eslint-disable react/require-default-props */
import React from 'react';
import { arrayOf, shape, string, func } from 'prop-types';
import styled from 'styled-components';
import DisplayCard from '../components/DisplayCard';
import Masonry from '../components/Masonry';

const ResultsContainer = ({ filteredResults = [], handleModalOpen, isLoading, isError }) => (
  <ResultsWrapper>
    <Masonry minWidth={400} gap="0em" css="margin: 0em;">
      {/* { isLoading && (<span>Loading...</span>) } */}
      { !isLoading && filteredResults.map((item) => (
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
);

const ResultsWrapper = styled.div`
  border-top: 1px solid #EBEBEB;
`;

ResultsContainer.propTypes = {
  filteredResults: arrayOf(shape({
    id: string.isRequired,
    accession_number: string.isRequired,
    title: string.isRequired,
    tombstone: string.isRequired,
    creator: arrayOf(shape({
      creatorRole: string,
      creatorDescription: string,
    })).isRequired,
  })),
  handleModalOpen: func.isRequired,
};

export default ResultsContainer;
