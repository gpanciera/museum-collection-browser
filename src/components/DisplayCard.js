import React from 'react';
import styled from 'styled-components';
import ImageThumbnail from './ImageThumbnail';
import TextOverview from './TextOverview';

const DisplayCard = ({ id, accession_number, title, tombstone, creator_role, creator_description }) => (
  <Card>
    <ImageThumbnail aNum={accession_number} />
    <TextOverview title={title} creator_description={creator_description} />
  </Card>
);

// const ThumbContainer = styled.div`
//   width: 100%;
//   ${'' /* height: 10vh; */}
//   max-height: 20vh;
// `;

const Card = styled.div`
  padding: 1em;
  margin: 0.5em;
  min-width: 300px;
  max-width: 25vw;

  background-color: white;
  border: 1px solid #DAE1E;
  border-radius: 4px;
  box-shadow: 0px 4px 8px rgba(0,0,0,0.1);
`;

export default DisplayCard;
