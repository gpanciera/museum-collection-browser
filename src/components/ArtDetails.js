/* eslint-disable arrow-body-style */
/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import styled from 'styled-components';
import CreatorsText from './CreatorsText';

const MAX_CREATORS_TO_RENDER = 8;

export default function ArtDetails({ details: { accession_number, creator, departmentName, id, title, tombstone } }) {
  let filteredTombstone = tombstone.replace(title, '').trimStart();
  filteredTombstone = filteredTombstone.replace(/(^,)|(,$)/g, '');
  return (
    <>
      <Title>{title}</Title>
      <CreatorsWrapper>
        <CreatorsText creatorsAll={creator} maxToRender={MAX_CREATORS_TO_RENDER} />
      </CreatorsWrapper>
      <Department>{departmentName}</Department>
      <Tombstone>{filteredTombstone}</Tombstone>
      <ANum>
        Accession Number:
        {' '}
        {accession_number}
      </ANum>
    </>
  );
}

const CreatorsWrapper = styled.div`
  display: block;
  margin-top: 0.5em;
  font-size: 1.8em;
  color: rgb(100,100,100);
  max-width: 100%;
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 1.2em;
`;

const Department = styled.div`
  margin: 13px 0px;
`;

const Tombstone = styled.div`
  color: rgb(100,100,100);
  font-size: 0.9em;
  font-family: 'Lora';
  margin: 13px 0px;
`;

const ANum = styled.div`
  color: rgb(100,100,100);
  margin: 13px 0px;
`;
