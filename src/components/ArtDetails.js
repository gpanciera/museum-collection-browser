/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import DOMPurify from 'dompurify';
import CreatorsText from './CreatorsText';
import mediaQueries from '../styles/mediaQueries';

const MAX_CREATORS_TO_RENDER = 8;

function sanitizeMarkup(text) {
  return { __html: DOMPurify.sanitize(text) };
}

export default function ArtDetails({
  details: {
    accession_number, department, id, title, tombstone, fun_fact, digital_description, wall_description, measurements, creators,
  } }) {
  let filteredTombstone = tombstone.replace(title, '').trim();
  filteredTombstone = filteredTombstone.replace(/(^,)|(,$)/g, '');
  return (
    <>
      <Title>{title}</Title>
      <CreatorsWrapper>
        <CreatorsText creatorsAll={creators} maxToRender={MAX_CREATORS_TO_RENDER} />
      </CreatorsWrapper>
      <Subhead>Description</Subhead>
      <Description
        dangerouslySetInnerHTML={sanitizeMarkup(digital_description || wall_description)}
      />
      { fun_fact ? (
        <>
          <Subhead>Fun Fact</Subhead>
          <FunFact
            dangerouslySetInnerHTML={sanitizeMarkup(fun_fact)}
          />
        </>
      ) : null}
      <Subhead>Details</Subhead>
      <Tombstone>{filteredTombstone}</Tombstone>
      <ANum>
        Accession Number:
        {' '}
        {accession_number}
      </ANum>
      <Department>{department}</Department>
    </>
  );
}

const CreatorsWrapper = styled.div`
  display: block;
  margin: 0.5rem 0 0.8rem 0;
  color: rgb(100,100,100);
  max-width: 100%;
  ${mediaQueries('md')`
    font-size: 1.8em;
  `};
`;

const Subhead = styled.div`
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0.2rem;
`;

const FunFact = styled.div`
  color: rgb(100,100,100);
  font-size: 0.9em;
  font-family: 'Lora';
  margin-bottom: 0.9rem;
`;

const Description = styled.div`
  color: rgb(100,100,100);
  font-size: 0.9em;
  font-family: 'Lora';
  margin-bottom: 0.9rem;
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 1.2em;
`;

const Tombstone = styled.div`
  color: rgb(100,100,100);
  font-size: 0.9em;
  font-family: 'Lora';
  margin-bottom: 1.4rem;
`;

const Department = styled.div`
  font-size: .8em;
  font-weight: 300;
  color: rgb(130,130,130);
  margin-bottom: 0.3rem;
`;

const ANum = styled.div`
  font-size: .8em;
  font-weight: 300;
  color: rgb(130,130,130);
  margin-bottom: 0.3rem;
`;
