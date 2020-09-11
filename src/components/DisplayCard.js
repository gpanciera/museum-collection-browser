import React from 'react';
import styled from 'styled-components';
import { arrayOf, shape, string, func } from 'prop-types';
import ImageThumbnail from './ImageThumbnail';
import TextOverview from './TextOverview';
import mediaQueries from '../styles/mediaQueries';

const DisplayCard = ({ aNum, title, creatorsAll, handleModalOpen }) => (
  <Card onClick={() => handleModalOpen(aNum)}>
    <ImageThumbnail aNum={aNum} />
    <TextOverview
      title={title}
      creatorsAll={creatorsAll}
    />
  </Card>
);

const Card = styled.div`
  padding: 1em;
  background-color: white;
  border: 1px solid #DAE1E;
  ${mediaQueries('md')`
    border-radius: 4px;
    margin: 0.5em;
    box-shadow: 0px 4px 8px rgba(0,0,0,0.1);
  `};
`;

DisplayCard.propTypes = {
  id: string.isRequired,
  aNum: string.isRequired,
  title: string.isRequired,
  creatorsAll: arrayOf(shape({
    creatorRole: string,
    creatorDescription: string,
  })).isRequired,
  handleModalOpen: func.isRequired,
};

export default DisplayCard;
