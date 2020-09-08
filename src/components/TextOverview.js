import React from 'react';
import styled from 'styled-components';
import { string } from 'prop-types';

function TextOverview({ title, creator_description }) {
  return (
    <TextOverviewWrapper>
      <TitleText>{title}</TitleText>
      <CreatorText>{creator_description}</CreatorText>
    </TextOverviewWrapper>
  );
}

const TitleText = styled.div`
  display: block;
  margin-top: 0.8em;
  font-weight: 500;
`;

const CreatorText = styled.div`
  display: block;
  margin-top: 0.2em;
  font-weight: 300;
`;

const TextOverviewWrapper = styled.div`
  display: block;
  margin-top: 0.5em;
  ${'' /* margin: auto; */}
  max-height: 10vh;
  max-width: 100%;
`;

TextOverview.propTypes = {
  title: string.isRequired,
  creator_description: string.isRequired,
};

export default TextOverview;
