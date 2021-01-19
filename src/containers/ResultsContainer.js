/* eslint-disable arrow-body-style */
/* eslint-disable react/require-default-props */
import React from 'react';
import { arrayOf, number, shape, string, func, bool } from 'prop-types';
import styled from 'styled-components';
import { CircularProgress, Divider } from '@material-ui/core';
import DisplayCard from '../components/DisplayCard';
import Masonry from '../components/Masonry';

const ResultsContainer = ({ filteredResults = [], handleModalOpen, isLoading, isError }) => {
  return (
    <StyledResultsContainer>
      {isError && <div style={{ marginLeft: '2.5rem' }}>Something went wrong...</div>}
      <Divider variant="middle" />
      {isLoading ? (<StyledCircularProgress size="5rem" />) : (
        <div>
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
    </StyledResultsContainer>
  );
};

const StyledResultsContainer = styled.div`
  ${'' /* width: 100%; */}
  ${'' /* height: 100%; */}
  ${'' /* border: 1px solid red; */}
  margin-bottom: 2.5em;
`;

const StyledCircularProgress = styled(CircularProgress)`
  position: fixed;
  margin-left: 4rem;
`;

const ResultsWrapper = styled.div`
  ${'' /* border-top: 1px solid #EBEBEB; */}
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
  isLoading: bool,
  isError: bool,
};

export default ResultsContainer;
