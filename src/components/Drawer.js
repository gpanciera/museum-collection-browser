/* eslint-disable indent */
/* eslint-disable arrow-parens */
/* eslint-disable react/require-default-props */
import React from 'react';
import { func, arrayOf, string, bool } from 'prop-types';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

const useStyles = makeStyles((theme) => ({
  btn: {
    padding: theme.spacing(1.5),
    textTransform: 'none',
    color: '#555',
    justifyContent: 'flex-start',
  },
  btnDense: {
    padding: theme.spacing(0.5),
    textTransform: 'none',
    color: '#555',
    justifyContent: 'flex-start',
  },
}));

function Drawer({ itemList, clickHandler, drawerName, dense = false }) {
  const classes = useStyles();

  return (
    <GridWrapper dense={dense}>
      { itemList && itemList.map((value) => (
        <Button
          key={`btn${value}`}
          className={dense ? classes.btnDense : classes.btn}
          onClick={() => clickHandler(drawerName, value)}
        >
          {value}
        </Button>
      ))}
    </GridWrapper>
  );
}

export default React.memo(Drawer);

Drawer.propTypes = {
  drawerName: string.isRequired,
  itemList: arrayOf(string).isRequired,
  clickHandler: func.isRequired,
  dense: bool,
};

const GridWrapper = styled.ul`
  display: grid;
  grid-template-columns: ${props => (props.dense
    ? 'repeat(auto-fill, minmax(180px, 1fr))'
    : 'repeat(auto-fill, minmax(275px, 1fr))')
  };
  background-color: #F5F5F6;
  margin-bottom: 1em;
  list-style: none;
  padding: 1rem 2.5rem;
`;

/* column-width: ${props => (props.dense ? '180px' : '275px')};  */
