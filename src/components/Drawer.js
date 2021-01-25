/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { func, arrayOf, string } from 'prop-types';
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
}));

export default function Drawer({ itemList, clickHandler }) {
  const classes = useStyles();

  return (
    <OuterWrapper>
      <InnerWrapper>
        { itemList && itemList.map((itemName) => (
          <List key={`li${itemName}`}>
            <Button
              key={`btn${itemName}`}
              className={classes.btn}
              onClick={() => clickHandler(itemName)}
            >
              {itemName}
            </Button>
          </List>
        ))}
      </InnerWrapper>
    </OuterWrapper>
  );
}

const List = styled.ul`
  list-style: none;
`;

Drawer.propTypes = {
  itemList: arrayOf(string).isRequired,
  clickHandler: func.isRequired,
};

const OuterWrapper = styled.div`
  color: #666;
  /* background-color: #F5F5F6; */
  background-color: #f5f5f5;
  border-top: 1px solid #EBEBEB;
  border-bottom: 1px solid #EBEBEB;
  margin-bottom: 1em;
`;

const InnerWrapper = styled.ul`
  padding: 1rem 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  ${mediaQueries('sm')`
    flex-wrap: wrap;
    height: 370;
  `};
  ${mediaQueries('md')`
    flex-wrap: wrap;
    height: 322;
  `};
  ${mediaQueries('lg')`
    flex-wrap: wrap;
    height: 274px;
  `};
`;
