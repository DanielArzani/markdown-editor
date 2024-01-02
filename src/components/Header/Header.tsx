import React, { useState } from 'react';
import styled from 'styled-components';

import deleteIcon from '../../assets/icon-delete.svg';
import Logo from '../Logo';
import media from '../../utils/mediaQueries';
import Menu from '../MenuIcon/Menu';
import SaveButton from '../SaveButton';
import DeleteIcon from '../DeleteIcon';

/**
 * The project header. Contains the components for creating, deleting and saving documents as well as the side navbar
 */
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  // Toggles the menu open/close
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <StyledHeader>
      <h1 className='sr-only'>Markdown Editor</h1>
      <Wrapper>
        <Menu
          isOpen={isMenuOpen}
          toggleMenu={toggleMenu}
          ariaControls='navigation'
        />
        <LogoWrapper>
          <Logo />
        </LogoWrapper>
      </Wrapper>

      <Wrapper>
        <DeleteIconWrapper>
          <DeleteIcon />
        </DeleteIconWrapper>
        <SaveButton />
      </Wrapper>
    </StyledHeader>
  );
}

export default Header;

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: ${(props) => props.theme.headerBg};
  border: 1px solid black;
  max-width: 90rem;
  margin-inline: auto;
  padding-inline-end: 0.5rem;

  @media ${media.md} {
    padding-inline-end: 1rem;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const LogoWrapper = styled.div`
  display: none;

  @media ${media.l} {
    display: block;
  }
`;

const DeleteIconWrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  background: none;
  border: none;
`;
