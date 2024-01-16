import React from 'react';
import styled from 'styled-components';

import Logo from '../Logo';
import NewDocumentButton from '../NewDocumentButton';
import DocumentsList from '../DocumentsList';
import media from '../../utils/mediaQueries';

type LogoHeaderProps = {
  isMenuOpen: boolean;
};

type SideBarProps = {
  isMenuOpen: boolean;
  children: React.ReactNode;
};

/**
 *  A sidebar containing saved documents, the component to create a new document and the theme controller.
 * @param isMenuOpen - Used to toggle aria-hidden in order to hide content from screen readers when menu is closed
 * @param children - Mainly for the abs positioned theme toggle
 */
function Sidebar({ isMenuOpen, children }: SideBarProps) {
  if (!isMenuOpen) {
    return <Wrapper aria-hidden={isMenuOpen ? false : true}></Wrapper>;
  }

  return (
    <Wrapper aria-hidden={isMenuOpen ? false : true}>
      <LogoHeader isMenuOpen={isMenuOpen}>
        <Logo />
      </LogoHeader>
      <Nav>
        <H2>MY DOCUMENTS</H2>
        <NewDocumentButton />
        <DocumentsList />
      </Nav>
      <ChildrenContainer>{children}</ChildrenContainer>
    </Wrapper>
  );
}

export default Sidebar;

const Wrapper = styled.aside`
  background-color: ${(props) => props.theme.sidebarBg};
  height: 100%;
  overflow-x: hidden;
  padding-inline: 1rem;
  position: relative;
  width: 100%;
`;

const LogoHeader = styled.header<LogoHeaderProps>`
  margin-top: 1.8rem;

  @media ${media.l} {
    display: none;
  }
`;

const H2 = styled.h2`
  margin-top: 1.8rem;

  color: ${(props) => props.theme.sidebarHeader};
  font-family: Roboto;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.125rem;
  line-height: normal;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;

  height: 80%;
  overflow-y: scroll;
`;

const ChildrenContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
`;
