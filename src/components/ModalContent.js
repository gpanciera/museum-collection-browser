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
  flex-direction: ${props => ((props.aspect < 1) ? 'row' : 'column')};
`;

// ${mediaQueries('sm')`
//   width: auto;
//   max-width: 100%;
//   flex-direction: row;
//   justify-content: flex-start;
// `};
const Image = styled.img`
  display: block;
  /* max-height: calc(${props => props.aspect} * 90vw); */
  ${props => ((props.aspect < 1) ? 'height: 85vh;' : 'width: 100%;')}
  margin: ${props => ((props.aspect < 1) ? '0 1em 0 0' : '0 0 1em 0')};
`;

const InfoContainer = styled.div`
  ${props => ((props.aspect < 1) ? 'width: 20rem;' : 'column-width: 18rem;')}
  ${props => ((props.aspect < 1) ? 'min-width: 20rem;' : 'column-fill: balance-all;')}
`;

ModalContent.propTypes = {
  id: number.isRequired,
};

// const ModalWrapper = styled.div`
//   display: grid;
//   grid-template-columns: auto 20rem;
//   grid-column-gap: 1rem;
// `;

// const Image = styled.img`
//   grid-column: 1;
//   display: block;
//   width: 100%;
// `;

// const InfoContainer = styled.div`
//   grid-column: 2;
//   overflow: scroll;
// `;

// const ModalWrapper = styled.div`
//   width: 70vw;
//   display: inline-flex;
//   flex-direction: column;
//   height: 100%;
//   ${mediaQueries('sm')`
//     width: auto;
//     max-width: 100%;
//     flex-direction: row;
//     justify-content: flex-start;
//   `};
// `;

// const Image = styled.img`
//   display: none;
//   margin-bottom: 1rem;
//   ${mediaQueries('sm')`
//     display: block;
//     margin-bottom: 0;
//     margin-right: 1rem;
//     height: 100%;
//   `};
// `;

// const InfoContainer = styled.div`
//   overflow: scroll;
//   ${mediaQueries('sm')`
//     width: 20rem;
//     min-width: 20rem;
//   `};
// `;

// const AspectRatioBox = styled.div`
//   grid-column: 1;
//   &:before {
//     content: "";
//     width: 1px;
//     margin-left: -1px;
//     float: left;
//     height: 0;
//     padding-top: calc(${props => props.aspect} * 100%);
//   }
//   &:after {
//     content: "";
//     display: table;
//     clear: both;
//   }
//   `;
