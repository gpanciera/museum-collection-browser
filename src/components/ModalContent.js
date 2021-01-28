/* eslint-disable arrow-parens */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { number } from 'prop-types';
import ArtDetails from './ArtDetails';
import mediaQueries from '../styles/mediaQueries';

export default function ModalContent({ id, artworkMap }) {
  const details = artworkMap.current.get(id);
  const { url, width, height } = details.images.web;
  const aspect = width / height;
  return (
    <ModalWrapper aspect={aspect}>
      <Image src={url} alt={details.title} aspect={aspect} />
      <InfoContainer aspect={aspect}>
        <ArtDetails details={details} />
      </InfoContainer>
    </ModalWrapper>
  );
}

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 600px) {
    flex-direction: ${props => ((props.aspect < 1) ? 'row' : 'column')};
  }
`;

const Image = styled.img`
  display: none;
  @media (min-width: 600px) {
    display: block;
    ${props => ((props.aspect < 1) ? 'height: 85vh;' : 'width: 100%;')}
    margin: ${props => ((props.aspect < 1) ? '0 1em 0 0' : '0 0 1em 0')};
  }
`;

const InfoContainer = styled.div`
  @media (min-width: 600px) {
    ${props => ((props.aspect < 1) ? 'width: 20rem;' : 'column-width: 18rem;')}
    ${props => ((props.aspect < 1) ? 'min-width: 20rem;' : 'column-fill: balance-all;')}
  }
`;

ModalContent.propTypes = {
  id: number.isRequired,
};

// const ModalWrapper = styled.div`
//   display: flex;
//   flex-direction: ${props => ((props.aspect < 1) ? 'row' : 'column')};
// `;

// const Image = styled.img`
//   display: block;
//   /* max-height: calc(${props => props.aspect} * 90vw); */
//   ${props => ((props.aspect < 1) ? 'height: 85vh;' : 'width: 100%;')}
//   margin: ${props => ((props.aspect < 1) ? '0 1em 0 0' : '0 0 1em 0')};
// `;

// const InfoContainer = styled.div`
//   ${props => ((props.aspect < 1) ? 'width: 20rem;' : 'column-width: 18rem;')}
//   ${props => ((props.aspect < 1) ? 'min-width: 20rem;' : 'column-fill: balance-all;')}
// `;
