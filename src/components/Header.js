import React from 'react';
import styled from 'styled-components';
import { Divider } from '@material-ui/core';
// import CMALogo from '../../public/cma-logo.svg';
import mediaQueries from '../styles/mediaQueries';

function Header() {
  return (
    <HeaderContainer>
      <StyledTextBlock>
        Greetings, I&apos;m a software engineer and art lover–I built this interface to the Cleveland Museum of Art&apos;s API for fun and demo purposes. All content is made freely available through the Museum&apos;s Open Access initiative. Please visit the CMA website for more info on these works, and explore their many other offerings. The code for this site is available on my github. Links in footer–thanks for visiting!
      </StyledTextBlock>
      <Divider variant="middle" />
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  display: flex-column;
  ${mediaQueries('md')`
    height: 10vh;
    max-height: 100px;
`};
`;

const StyledTextBlock = styled.article`
  margin: auto;
  padding: 1rem;
  max-width: 1000px;
  font-size: 0.9rem;
  font-weight: 300;
  line-height: 1.4rem;
  ${'' /* color: rgb(100,100,100); */}
  color: #838383;
  ${mediaQueries('md')`
    margin: 1.5rem 0 0.5rem 2.5rem;
    font-size: 1rem;
    padding: 0;
  `};
`;

export default Header;
