/* eslint-disable react/require-default-props */
import React from 'react';
import { arrayOf, shape, string, func } from 'prop-types';
import styled from 'styled-components';
import DisplayCard from '../components/DisplayCard';
import Masonry from '../components/Masonry';

const ResultsContainer = ({ filteredResults = [], handleModalOpen }) => (
  <ResultsWrapper>
    <Masonry minWidth={400} gap="0em" css="margin: 0em;">
      {filteredResults.map((val) => (
        <DisplayCard
          key={val.id}
          id={val.id}
          aNum={val.accession_number}
          title={val.title}
          creatorsAll={val.creator}
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
