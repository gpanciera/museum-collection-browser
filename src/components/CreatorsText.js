import React from 'react';
import styled from 'styled-components';
// import { arrayOf, shape, string } from 'prop-types';

const safeCapitalize = (s) => (
  s ? s.replace(s.charAt(0), s.charAt(0).toUpperCase()) : null
);

export default function CreatorsText({ creatorsAll, maxToRender }) {
  const creatorsToRender = creatorsAll.slice(0, maxToRender);
  const creators = creatorsToRender.map((val, i) => {
    const role = safeCapitalize(val.creatorRole);
    let creatorName = null;
    let creatorBg = null;
    if (val.creatorDescription) {
      [creatorName, creatorBg] = val.creatorDescription.split('(').map((el) => (el ? el.trim() : null));
      if (creatorBg) {
        creatorBg = `, ${creatorBg.slice(0, creatorBg.indexOf(')'))}`;
      }
    }

    return (
      <div key={i}>
        <CreatorName>{creatorName}</CreatorName>
        <CreatorRole>{role}</CreatorRole>
        <CreatorBg>{creatorBg}</CreatorBg>
      </div>
    );
  });
  return (creators);
}

const CreatorName = styled.div`
  display: block;
  font-weight: 300;
  margin-top: 0.3em;
`;

const CreatorRole = styled.div`
  display: inline-block;
  font-size: .8em;
  font-weight: 300;
`;

const CreatorBg = styled.div`
  display: inline-block;
  font-style: italic;
  font-size: .8em;
  font-weight: 300;
`;
