/* eslint-disable prefer-const */
import React from 'react';
import styled from 'styled-components';
import { arrayOf, shape, string } from 'prop-types';

const capitalizeString = (s) => (
  s
    ? s.split(' ').map((el) => el.replace(el.charAt(0), el.charAt(0).toUpperCase())).join(' ')
    : null
);

function TextOverview({ title, creator }) {
  // console.log('TextOverview -> creator', creator);
  const creators = creator.map((val, i) => {
    let role = capitalizeString(val.creatorRole);
    if (role) { role += ': '; }

    return (
      <CreatorWrapper key={i}>
        { role && <CreatorRole>{role}</CreatorRole> }
        <CreatorDesc>{val.creatorDescription}</CreatorDesc>
      </CreatorWrapper>
    );
  });

  return (
    <TextOverviewWrapper>
      <TitleText>{title}</TitleText>
      {creators}
    </TextOverviewWrapper>
  );
}

const TextOverviewWrapper = styled.div`
  display: block;
  margin-top: 0.5em;
  ${'' /* margin: auto; */}
  max-height: 10vh;
  max-width: 100%;
`;

const TitleText = styled.div`
  display: block;
  margin-top: 0.8em;
  font-weight: 500;
`;

const CreatorWrapper = styled.div`
  display: block;
  margin-top: 0.5em;
  font-size: 0.85em;
  ${'' /* margin: auto; */}
  max-height: 10vh;
  max-width: 100%;
`;

const CreatorRole = styled.div`
  display: inline;
  ${'' /* margin-top: 0.3em; */}
  font-weight: 400;
`;

const CreatorDesc = styled.div`
  display: inline;
  ${'' /* margin-top: 0.2em; */}
  font-weight: 300;
`;

// TextOverview.defaultProps = {
//   creatorDescription: null,
// };

TextOverview.propTypes = {
  title: string.isRequired,
  creator: arrayOf(shape({
    creatorRole: string,
    creatorDescription: string,
  })).isRequired,
};

export default TextOverview;
