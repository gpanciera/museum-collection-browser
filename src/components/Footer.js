import React from 'react';
import styled from 'styled-components';
import { Divider } from '@material-ui/core';
import CMALogo from '../../public/cma-logo-black.svg';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import CopyrightIcon from '@material-ui/icons/Copyright';
import mediaQueries from '../styles/mediaQueries';

function Footer() {
  return (
    <FooterContainer>
      <Divider variant="middle" />
      <FooterContentWrapper>
        {/* <Logo src={CMALogo} /> */}
        <StyledLinkWrapper>
          <a href="https://www.clevelandart.org/" title="Cleveland Museum of Art" target="_blank" rel="noreferrer">Cleveland Museum of Art Home Page</a>
        </StyledLinkWrapper>
        <StyledLinkWrapper>  
          <a href="https://www.clevelandart.org/open-access" title="CMA Open Access" target="_blank" rel="noreferrer">CMA Open Access</a>
        </StyledLinkWrapper>  
        <StyledLinkWrapper>  
          <strong>site design</strong> Greg Panciera
          <StyledIconWrapper>
            <StyledIconA href="https://github.com/gpanciera" title="Greg Panciera - Github" target="_blank" rel="noreferrer"><GitHubIcon style={{ verticalAlign: "bottom", fontSize: 20 }}/></StyledIconA>
          </StyledIconWrapper>
          <StyledIconWrapper>
            <StyledIconA2 href="https://www.linkedin.com/in/gregpanciera" title="Greg Panciera - LinkedIn" target="_blank" rel="noreferrer"><LinkedInIcon style={{ verticalAlign: "bottom", fontSize: 26 }}/></StyledIconA2>
          </StyledIconWrapper>
        </StyledLinkWrapper>
      </FooterContentWrapper>
    </FooterContainer>
  );
}


const FooterContainer = styled.footer`
  height: 6rem;           
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-bottom: 2rem;
  ${mediaQueries('md')`
    height: 4rem;
    padding-bottom: 0.5rem;
  `};
`;

const FooterContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 300;
  font-size: 1rem;
  color: rgb(100,100,100);
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  ${mediaQueries('md')`
    flex-direction: row;
    justify-content: center;
    margin-top: auto;
    margin-bottom: 1rem;
  `};
`;

const StyledLinkWrapper = styled.div`
  display: inline-block;
  margin: auto 1.5rem 0 1.5rem;
  ${'' /* border: 1px solid red; */}
  height: 1.2rem;
  text-align: bottom;
  ${mediaQueries('md')`
    height: auto;
  `};
`;

const StyledIconWrapper = styled.div`
  display: inline-block;
  ${'' /* margin: 0 0.5rem 0 0.5rem; */}
  ${'' /* border: 1px solid green; */}
`;


const StyledIconA = styled.a`
  display: inline-block;
  position: relative;
  top: 3px;
  margin-left: 6px;
`;

const StyledIconA2 = styled.a`
  display: inline-block;
  position: relative;
  top: 6px;
  margin-left: 6px;
`; 

const Logo = styled.svg`
    display: inline-block;
    margin: auto 1.5rem 0 1.5rem;
    height: 15%;
    border: 1px solid red;
`;

export default Footer;
