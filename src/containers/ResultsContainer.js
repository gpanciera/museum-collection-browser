/* eslint-disable arrow-body-style */
import React from 'react';
import styled from 'styled-components';
import { arrayOf, shape, string } from 'prop-types';
import DisplayCard from '../components/DisplayCard';

const ResultsContainer = ({ filteredResults }) => {
  const results = filteredResults.map((val, i) => (
    <DisplayCard
      key={val.id + i.toString()}
      id={val.id}
      aNum={val.accession_number}
      title={val.title}
      tombstone={val.tombstone}
      creatorRole={val.creator_role}
      creatorDescription={val.creator_description}
    />
  ));
  console.log('ResultsContainer -> results', results);
  return (
    <StyledResultsContainer>{results}</StyledResultsContainer>
  );
};

const StyledResultsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 1em;
  padding: 1em;
`;

ResultsContainer.propTypes = {
  filteredResults: arrayOf(shape({
    id: string.isRequired,
    aNum: string.isRequired,
    title: string.isRequired,
    tombstone: string.isRequired,
    creatorRole: string,
    creatorDescription: string,
  })).isRequired,
};

export default ResultsContainer;
