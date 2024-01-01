import React from 'react';

import saveIcon from '../../assets/icon-save.svg';
import styled from 'styled-components';
import media from '../../utils/mediaQueries';

/**
 * Button for saving markdown documents
 */
function SaveButton() {
  return (
    <Button>
      <img src={saveIcon} alt='Save Icon' />
      <Span>Save Changes</Span>
    </Button>
  );
}

export default SaveButton;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  background-color: ${(props) => props.theme.saveBtnBg};
  border-radius: 5px;
  height: 2.5rem;
  width: 2.5rem;

  @media ${media.md} {
    width: 9.5rem;
  }
`;

const Span = styled.span`
  display: none;

  @media ${media.md} {
    display: inline;

    color: ${(props) => props.theme.saveBtnText};
    font-family: Roboto;
    font-size: 0.9375rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;
