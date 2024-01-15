import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

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
 *  <Menu
        isOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        ariaControls='navigation'
      />
 */
function Menu({ isOpen, toggleMenu, ariaControls }: MenuProps) {
  const variants = {
    open: { rotate: 180, opacity: 0 },
    closed: { rotate: 0, opacity: 1 },
  };

  return (
    <MenuIconContainer
      onClick={toggleMenu}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
      aria-controls={ariaControls}
    >
      <MenuIconOpen
        as={motion.img}
        src={MenuIcon}
        alt='Menu Icon'
        animate={isOpen ? 'open' : 'closed'}
        variants={variants}
      />
      <MenuIconClose
        as={motion.img}
        src={closeIcon}
        alt='Close Icon'
        animate={isOpen ? 'closed' : 'open'}
        variants={variants}
      />
    </MenuIconContainer>
  );
}

export default Menu;

const MenuIconContainer = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  cursor: pointer;

  background-color: ${(props) => props.theme.menuBtnBg};
  height: 3.5rem;
  width: 3.5rem;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.menuBtnBgHover};
  }

  @media ${media.md} {
    height: 4.5rem;
    width: 4.5rem;
  }
`;

const MenuIconOpen = styled.img`
  position: absolute;
  height: 1rem;
  width: 1.5rem;
  transition: opacity 0.3s ease;

  @media ${media.md} {
    height: 1.125rem;
    width: 1.875rem;
  }
`;
const MenuIconClose = styled.img`
  position: absolute;
  height: 1.5rem;
  width: 1.5rem;

  transition: opacity 0.3s ease;

  @media ${media.md} {
    height: 2rem;
    width: 2rem;
  }
`;
