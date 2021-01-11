/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { number } from 'prop-types';
import ArtDetails from './ArtDetails';
import mediaQueries from '../styles/mediaQueries';

export default function ModalContent({ id, artworkMap }) {
  const details = artworkMap.current.get(id);
  const imgUrl = details.images.web.url;
  return (
    <ModalWrapper>
      <Image src={imgUrl} alt="picture" />
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
  id: number.isRequired,
};
