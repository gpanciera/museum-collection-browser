/* eslint-disable react/require-default-props */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { number, string } from 'prop-types';
import useEventListener from '../hooks/useEventListener';

const fillCols = (children, cols) => {
  console.log('fillCols ~ cols', cols);
  console.log('fillCols ~ children', children);
  children.forEach((child, i) => cols[i % cols.length].push(child));
};

export default function Masonry({ children, gap = '1em', minWidth = 500, ...rest }) {
  const ref = useRef();
  const [numCols, setNumCols] = useState(3);

  const cols = [...Array(numCols)].map(() => []);
  fillCols(children, cols);
  console.log('Masonry ~ cols', cols);

  // UseEffect calculates columns on first render only. Thereafter, event listener catches changes
  // to offsetWidth in MasonryDiv ref, firing resizeHandler which updates state via setNumCols
  const resizeHandler = () => setNumCols(Math.ceil(ref.current.offsetWidth / minWidth));
  useEffect(resizeHandler, [minWidth]);
  useEventListener('resize', resizeHandler);

  return (
    <MasonryDiv ref={ref} gap={gap} {...rest}>
      {[...Array(numCols)].map((_, i) => (
        <Col key={i} gap={gap}>
          {cols[i]}
        </Col>
      ))}
    </MasonryDiv>
  );
}

const MasonryDiv = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: ${(props) => props.gap || '1em'};
`;

const Col = styled.div`
  display: grid;
  grid-gap: ${(props) => props.gap || '1em'};
  &:nth-child(n+1) {
    border-left: 1px solid #EBEBEB;
  }
`;

Masonry.propTypes = {
  gap: string,
  minWidth: number,
};
