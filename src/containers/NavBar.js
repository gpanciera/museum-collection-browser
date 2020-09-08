import React from 'react';
import styled from 'styled-components';
import CMALogo from '../../public/cma-logo.svg';

function NavBar() {
  return (
    <NavBarContainer>
      <Logo src={CMALogo} />
      <NavItem>explore the collection</NavItem>
    </NavBarContainer>
  );
}

const NavBarContainer = styled.div`
  background-color: rgb(39,121,105);
  color: #F1F0F0;
  height: 55px;
  display: flex;
  align-items: flex-end;  
`;

const Logo = styled.img`
    height: 62%;
    margin-bottom: 9px;
    margin-left: 1em;
`;

const NavItem = styled.div`
  margin-left: 0.5em;
  margin-bottom: 5px;
`;

export default NavBar;
