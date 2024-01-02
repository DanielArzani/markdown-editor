import React from 'react';

import saveIcon from '../../assets/icon-save.svg';
import styled from 'styled-components';
import media from '../../utils/mediaQueries';
import BaseButton from '../BaseButton';

/**
 * Button for saving markdown documents
 */
function SaveButton() {
  return (
    <Button padding='.8rem'>
      <img src={saveIcon} alt='Save Icon' />
      <Span>Save Changes</Span>
    </Button>
  );
}

export default SaveButton;

const Button = styled(BaseButton)``;

const Span = styled.span`
  display: none;

  @media ${media.md} {
    display: inline;

    color: inherit;
    font-family: Roboto;
    font-size: 0.9375rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;
