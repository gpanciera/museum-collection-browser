/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { number } from 'prop-types';
import ArtDetails from './ArtDetails';
import mediaQueries from '../styles/mediaQueries';

export default function ModalContent({ id, artworkMap }) {
  const details = artworkMap.current.get(id);
  const { url } = details.images.web;
  return (
    <ModalWrapper>
      <Image src={url} alt={details.title} />
      <InfoContainer>
        <ArtDetails details={details} />
      </InfoContainer>
    </ModalWrapper>
  );
}

const ModalWrapper = styled.div`
  width: 70vw;
  display: inline-flex;
  flex-direction: column;
  height: 100%;
  ${mediaQueries('sm')`
    width: auto;
    max-width: 100%;
    flex-direction: row;
    justify-content: flex-start;
  `};
`;
/* max-height: 90vh; */

const Image = styled.img`
  display: none;
  margin-bottom: 1rem;
  ${mediaQueries('sm')`
    display: block;
    margin-bottom: 0;
    margin-right: 1rem;
    height: 100%;
  `};
`;
// max-width: 60vw;
// max-width: calc(100% - 31rem - 120px);

/* margin: auto; */

const InfoContainer = styled.div`
  overflow: scroll;
  ${mediaQueries('sm')`
    width: 20rem;
    min-width: 20rem;
  `};
`;
  // min-width: 30%;
// column-fill: auto;
// column-width: 20rem;

ModalContent.propTypes = {
  id: number.isRequired,
};
