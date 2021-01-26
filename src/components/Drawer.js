/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { func, arrayOf, string, bool } from 'prop-types';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import mediaQueries from '../styles/mediaQueries';

const useStyles = makeStyles((theme) => ({
  btn: {
    padding: theme.spacing(1.5),
    textTransform: 'none',
    color: '#555',
  },
  btnDense: {
    padding: theme.spacing(0.5),
    width: '150px',
    // height: '1.5rem',
    textTransform: 'none',
    color: '#555',
    justifyContent: 'flex-start',
  },
}));

function Drawer({ itemList, clickHandler, drawerName, dense = false }) {
  const classes = useStyles();

  return (
    <OuterWrapper>
      <InnerWrapper dense={dense}>
        { itemList && itemList.map((value) => (
          <Button
            key={`btn${value}`}
            className={dense ? classes.btnDense : classes.btn}
            onClick={() => clickHandler(drawerName, value)}
          >
            {value}
          </Button>
        ))}
      </InnerWrapper>
    </OuterWrapper>
  );
}

export default React.memo(Drawer);

Drawer.propTypes = {
  drawerName: string.isRequired,
  itemList: arrayOf(string).isRequired,
  clickHandler: func.isRequired,
  dense: bool,
};

const OuterWrapper = styled.div`
  color: #666;
  background-color: #F5F5F6;
  /* background-color: #f5f5f5; */
  border-top: 1px solid #EBEBEB;
  border-bottom: 1px solid #EBEBEB;
  margin-bottom: 1em;
`;

const InnerWrapper = styled.ul`
  list-style: none;
  padding: 1rem 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  ${mediaQueries('sm')`
    flex-wrap: wrap;
    height: 370px;
  `};
  ${mediaQueries('md')`
    flex-wrap: wrap;
    height: 322px;
  `};
  ${mediaQueries('lg')`
    flex-wrap: wrap;
    height: 274px;
  `};
`;

// height: ${({ dense }) => (dense ? '370' : '900px')};
