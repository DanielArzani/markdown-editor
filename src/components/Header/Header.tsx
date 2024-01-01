import React, { useState } from 'react';
import styled from 'styled-components';

// import menuIcon from '../../assets/icon-menu.svg';
import media from '../../utils/mediaQueries';
import SaveButton from '../SaveButton';
import deleteIcon from '../../assets/icon-delete.svg';
import Menu from '../MenuIcon/Menu';

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
      <div>
        <Menu
          isOpen={isMenuOpen}
          toggleMenu={toggleMenu}
          ariaControls='navigation'
        />
        <PlaceHolder2 />
      </div>

      <div>
        <img src={deleteIcon} alt='Delete Icon' />
        <SaveButton />
      </div>
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

  & > div {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`;

const PlaceHolder2 = styled.div`
  width: 7.25rem;
  height: 1.13rem;
  background-color: red;
`;
