/* eslint-disable arrow-body-style */
import React from 'react';
import styled from 'styled-components';
import { arrayOf, shape, string, func } from 'prop-types';
import DisplayCard from '../components/DisplayCard';
import mediaQueries from '../styles/mediaQueries';

const ResultsContainer = ({ filteredResults, handleModalOpen }) => {
  const results = filteredResults.map((val) => (
    <DisplayCard
      key={val.id}
      id={val.id}
      aNum={val.accession_number}
      title={val.title}
      creatorsAll={val.creator}
      handleModalOpen={handleModalOpen}
    />
  ));
  return (
    <StyledResultsContainer>{results}</StyledResultsContainer>
  );
};

const StyledResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  ${mediaQueries('md')`
    margin: 1em;
    padding: 1em;
    align-content: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
  `};
`;

ResultsContainer.defaultProps = {
  filteredResults: [],
};

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
