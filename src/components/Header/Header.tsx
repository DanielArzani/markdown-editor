import React from 'react';
import styled from 'styled-components';

import Logo from '../Logo';
import media from '../../utils/mediaQueries';
import Menu from '../MenuIcon/Menu';
import SaveButton from '../SaveButton';
import DeleteIcon from '../DeleteIcon';
import DocumentName from '../DocumentName';

type HeaderProps = {
  isMenuOpen: boolean;
  toggleMenu: () => void;
};

/**
 * The project header. Contains the components for deleting, re-naming and saving documents as well as the menu
 */
function Header({ isMenuOpen, toggleMenu }: HeaderProps) {
  return (
    <>
      <StyledHeader>
        <MinorWrapper>
          <Menu
            isOpen={isMenuOpen}
            toggleMenu={toggleMenu}
            ariaControls='navigation'
          />

          <LogoWrapper>
            <Logo />
            <Line />
          </LogoWrapper>

          <DocumentName />
        </MinorWrapper>

        <MinorWrapper>
          <DeleteIcon />
          <SaveButton />
        </MinorWrapper>
      </StyledHeader>
    </>
  );
}

export default Header;

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: ${(props) => props.theme.headerBg};
  border: 1px solid black;
  margin-inline: auto;
  padding-inline-end: 0.5rem;
  overflow-x: scroll;
  width: 100%;

  @media ${media.md} {
    padding-inline-end: 1rem;
  }
`;

const MinorWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  & > button {
    flex-shrink: 0;
  }
`;

const LogoWrapper = styled.div`
  display: none;

  @media ${media.l} {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const Line = styled.div`
  background-color: #5a6069;
  height: 2.5rem;
  margin-left: 1rem;
  width: 0.0625rem;
`;
