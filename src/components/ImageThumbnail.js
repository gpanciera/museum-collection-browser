import React from 'react';
import styled from 'styled-components';
import { string } from 'prop-types';

function ImageThumbnail({ aNum }) {
  return (
    <Thumbnail src={`./images/${aNum}_reduced.jpg`} alt="thumbnail" />
  );
}

const Thumbnail = styled.img`
  display: block;
  margin: auto;
  max-height: 50vh;
  max-width: 100%;
`;































ImageThumbnail.propTypes = {
  aNum: string.isRequired,
};

export default ImageThumbnail;
