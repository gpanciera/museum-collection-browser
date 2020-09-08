/* eslint-disable arrow-body-style */
import React from 'react';
import styled from 'styled-components';
import DisplayCard from '../components/DisplayCard';
// import PropTypes from 'prop-types';
import db from '../../db/cma-artworks-export';

const ResultsContainer = () => {
  const results = db.map((val, i) => (
    <DisplayCard
      key={val.id + i.toString()}
      id={val.id}
      accession_number={val.accession_number}
      title={val.title}
      tombstone={val.tombstone}
      creator_role={val.creator_role}
      creator_description={val.creator_description}
    />
  ));
  return (
    <StyledResultsContainer>{results}</StyledResultsContainer>
  );
};

const StyledResultsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 1em;
  padding: 1em;
  ${'' /* width: 1vw; */}
  ${'' /* height: 10vh; */}
`;

// ResultsContainer.propTypes = {

// };

export default ResultsContainer;
