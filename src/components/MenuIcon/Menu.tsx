import React from 'react';
import styled from 'styled-components';

import closeIcon from '../../assets/icon-close.svg';
import media from '../../utils/mediaQueries';
import MenuIcon from '../../assets/icon-menu.svg';

type MenuProps = {
  isOpen: boolean;
  toggleMenu: () => void;
  ariaControls: string;
};

/**
 * Generic Menu for opening and closing a component (e.g. sidebar)
 * @param isOpen - Current state (open/close) of the menu
 * @param toggleMenu - A wrapper for a setter function to toggle the menu
 * @param ariaControls - Should match the ID of the menu it controls
 * @example
 * <MenuIconContainer
      onClick={toggleMenu}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
      aria-controls='navigation' 
    >
 */
function Menu({ isOpen, toggleMenu, ariaControls }: MenuProps) {
  return (
    <MenuIconContainer
      onClick={toggleMenu}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
      aria-controls={ariaControls}
    >
      {isOpen ? (
        // X Icon for open state
        <MenuIconClose src={closeIcon} alt='Close Icon' />
      ) : (
        // Hamburger Icon for closed state
        <MenuIconOpen src={MenuIcon} alt='Menu Icon' />
      )}
    </MenuIconContainer>
  );
}

export default Menu;

const MenuIconContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  cursor: pointer;

  background-color: ${(props) => props.theme.menuBtnBg};
  height: 3.5rem;
  width: 3.5rem;

  &:hover {
    background-color: ${(props) => props.theme.menuBtnBgHover};
  }

  @media ${media.md} {
    height: 4.5rem;
    width: 4.5rem;
  }
`;

const MenuIconOpen = styled.img`
  height: 1rem;
  width: 1.5rem;

  @media ${media.md} {
    height: 1.125rem;
    width: 1.875rem;
  }
`;

const MenuIconClose = styled.img`
  height: 1.5rem;
  width: 1.5rem;

  @media ${media.md} {
    height: 2rem;
    width: 2rem;
  }
`;
