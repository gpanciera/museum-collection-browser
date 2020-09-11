/* eslint-disable prefer-const */
import React from 'react';
import styled from 'styled-components';
import { arrayOf, shape, string } from 'prop-types';
import CreatorsText from './CreatorsText';
import mediaQueries from '../styles/mediaQueries';

const MAX_CREATORS_TO_RENDER = 3;

function TextOverview({ title, creatorsAll }) {
  return (
    <TextOverviewWrapper>
      <TitleText>{title}</TitleText>
      <CreatorsWrapper>
        <CreatorsText creatorsAll={creatorsAll} maxToRender={MAX_CREATORS_TO_RENDER} />
      </CreatorsWrapper>
    </TextOverviewWrapper>
  );
}

const TextOverviewWrapper = styled.div`
  display: block;
  margin-top: 0.7em;
  max-width: 100%;
  ${mediaQueries('md')`
    max-width: 30vh;
    max-height: 30vh;
  `};
`;
const TitleText = styled.div`
  display: block;
  font-size: 1.25em;
  font-weight: 400;
  color: rgb(30,30,30);
`;

const CreatorsWrapper = styled.div`
  display: block;
  font-size: 1.05em;
  color: rgb(100,100,100);
  ${'' /* max-height: 10vh; */}
  max-width: 100%;
`;

TextOverview.propTypes = {
  title: string.isRequired,
  creatorsAll: arrayOf(shape({
    creatorRole: string,
    creatorDescription: string,
  })).isRequired,
};

export default TextOverview;
