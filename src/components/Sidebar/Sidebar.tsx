import React from 'react';
import styled from 'styled-components';
import Logo from '../Logo';
import NewDocumentButton from '../NewDocumentButton';
import DocumentsList from '../DocumentsList';

type SideBarProps = {
  isMenuOpen: boolean;
};

/**
 *  A sidebar containing saved documents, the component to create a new document and the theme controller.
 * @param isMenuOpen - Used to toggle aria-hidden in order to hide content from screen readers when menu is closed
 */
function Sidebar({ isMenuOpen }: SideBarProps) {
  return (
    <Wrapper aria-hidden={isMenuOpen ? false : true}>
      <HeadWrapper>
        <Logo />
        <AltTitle style={{ color: 'white' }}>my documents</AltTitle>
      </HeadWrapper>
      <NewDocumentButton />
      <DocumentsList />
    </Wrapper>
  );
}

export default Sidebar;

const Wrapper = styled.aside`
  /* display: flex;
  flex-direction: column; */

  background-color: ${(props) => props.theme.sidebarBg};
  height: 100%;
  overflow-x: hidden;
  padding: 1rem;
  width: 100%;

  /* DELETE LATER */
  & * {
    color: white;
  }
`;

const HeadWrapper = styled.div``;

const AltTitle = styled.h2`
  font-family: Roboto;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 0.125rem;
  text-transform: uppercase;
`;
