import React, { useState } from 'react';
import styled from 'styled-components';

import Logo from '../Logo';
import media from '../../utils/mediaQueries';
import Menu from '../MenuIcon/Menu';
import SaveButton from '../SaveButton';
import DeleteIcon from '../DeleteIcon';
import DocumentName from '../DocumentName';

type HeaderProps = {
  isMenuOpen: boolean;
  markdown: string;
  toggleMenu: () => void;
};

/**
 * The project header. Contains the components for deleting, re-naming and saving documents as well as the menu
 * @param isMenuOpen - Indicates whether the menu is currently open or not
 * @param markdown - The users input, to be passed down to the save button
 * @param toggleMenu - Function for opening/closing the menu
 */
function Header({ isMenuOpen, markdown, toggleMenu }: HeaderProps) {
  const [docName, setDocName] = useState<string>('Welcome.md');

  // ensure that the document name always has a .md extension
  // const ensureMdExtension = (name: string) => {
  //   return name.endsWith('.md') ? name : `${name}.md`;
  // };

  // const handleDocName = () => {

  // }

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

          <DocumentName docName={docName} setDocName={setDocName} />
        </MinorWrapper>

        <MinorWrapper>
          <DeleteIcon />
          <SaveButton markdown={markdown} name={docName} />
        </MinorWrapper>
      </StyledHeader>
    </>
  );
}

export default React.memo(Header);

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
