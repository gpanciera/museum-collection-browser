import React from 'react';
import styled from 'styled-components';
import { string } from 'prop-types';
import mediaQueries from '../styles/mediaQueries';

function ImageThumbnail({ imgUrl }) {
  return (
    // <Thumbnail src={`./images/${aNum}_reduced.jpg`} alt="thumbnail" />
    <Thumbnail src={imgUrl} alt="thumbnail" />
  );
}

const Thumbnail = styled.img`
  display: block;
  margin: auto;
  max-height: 60vh;
  max-width: 100%;
  ${'' /* max-height: 150px; */}
  ${'' /* height: 100%; */}
  ${'' /* ${mediaQueries('md')`
    max-width: 30vw;
    max-height: 30vh;
  `}; */}
`;

ImageThumbnail.propTypes = {
  // aNum: string.isRequired,
};

export default ImageThumbnail;
