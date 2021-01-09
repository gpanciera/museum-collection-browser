import React from 'react';
import styled from 'styled-components';
import { arrayOf, shape, string, func } from 'prop-types';
import ImageThumbnail from './ImageThumbnail';
import TextOverview from './TextOverview';
import mediaQueries from '../styles/mediaQueries';

const DisplayCard = ({ id, aNum, imgUrl, title, creatorsAll, handleModalOpen }) => (
  <>
    <Card onClick={() => handleModalOpen(id)}>
      <ImageThumbnail imgUrl={imgUrl} />
      <TextOverview
        title={title}
        creatorsAll={creatorsAll}
      />
    </Card>
  </>
);

// const TopLine = styled.hr`
//   ${'' /* margin: 0em 2em; */}
//   color: #dfdfdf;
// `;

const Card = styled.div`
  padding: 1.3em 1.3em 0em 1.3em;
  ${'' /* border: 1px solid red; */}
  &:first-child {
    border-top: none;
  } */}
  ${mediaQueries('md')`

  `};
`;

DisplayCard.propTypes = {
  aNum: string.isRequired,
  title: string.isRequired,
  creatorsAll: arrayOf(shape({
    creatorRole: string,
    creatorDescription: string,
  })).isRequired,
  handleModalOpen: func.isRequired,
};

export default DisplayCard;
