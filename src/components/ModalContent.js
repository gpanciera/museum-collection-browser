/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { string } from 'prop-types';
import ArtDetails from './ArtDetails';

export default function ModalContent({ aNum, artworkMap }) {
  const details = artworkMap.current.get(aNum);

  return (
    <ModalWrapper>
      <Image src={`./images/${aNum}_reduced.jpg`} alt="picture" />
      <InfoContainer>
        <ArtDetails details={details} />
      </InfoContainer>
    </ModalWrapper>
  );
}

const ModalWrapper = styled.div`
  display: flex;
`;

const Image = styled.img`
  display: block;
  margin: auto;
  max-height: 70vh;
  max-width: 70vw;
`;

const InfoContainer = styled.div`
  padding-left: 20px;
`;

ModalContent.propTypes = {
  aNum: string.isRequired,
};
