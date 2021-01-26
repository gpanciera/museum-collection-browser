import React from 'react';
import styled from 'styled-components';
import CMALogo from '../../public/cma-logo.svg';
import mediaQueries from '../styles/mediaQueries';

function NavBar() {
  return (
    <NavBarContainer>
      <Logo src={CMALogo} />
      <StyledTitle>Cleveland Museum of Art</StyledTitle>
    </NavBarContainer>
  );
}

const NavBarContainer = styled.div`
  background-color: rgb(40,40,40);
  color: #F1F0F0;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: flex-end;  
  ${mediaQueries('sm')`
    justify-content: flex-start;
    padding-left: 1rem;
  `};
`;

const Logo = styled.img`
  height: 58%;
  margin: 0 7px 10px 0;
`;

const StyledTitle = styled.div`
  font-weight: 100;
  font-size: 20px;
  margin: 0 0 5px 0;
  ${mediaQueries('sm')`
    margin: 0 0 3px 10px;
    font-size: 40px;
    margin: 0 0 2px 0;
  `};
`;

export default NavBar;
