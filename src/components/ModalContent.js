/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { string } from 'prop-types';
import ArtDetails from './ArtDetails';
import mediaQueries from '../styles/mediaQueries';

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
  flex-direction: column;
  max-height: 80vh;
  ${mediaQueries('md')`
    flex-direction: row;
  `};
`;

const Image = styled.img`
  display: none;
  ${mediaQueries('md')`
    display: block;
    margin: auto;
    max-height: 60vh;
    max-width: 60vw;
  `};
`;

const InfoContainer = styled.div`
  min-width: 30%;
  ${mediaQueries('md')`
    padding-left: 20px;
  `};
`;

ModalContent.propTypes = {
  aNum: string.isRequired,
};
