import React from 'react';
import styled from 'styled-components';

import SaveButton from '../SaveButton';
import media from '../../utils/mediaQueries';

/**
 * The project header. Contains the components for creating, deleting and saving documents as well as the side navbar
 */
function Header() {
  return (
    <StyledHeader>
      <div>
        <PlaceHolder3 />
        <PlaceHolder2 />
      </div>

      <div>
        <PlaceHolder1 />
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

const PlaceHolder1 = styled.div`
  width: 1.125rem;
  height: 1.125rem;
  background-color: green;
`;

const PlaceHolder2 = styled.div`
  width: 7.25rem;
  height: 1.13rem;
  background-color: red;
`;

const PlaceHolder3 = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  background-color: blue;
`;
