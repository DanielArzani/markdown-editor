import React from 'react';

import saveIcon from '../../assets/icon-save.svg';
import styled from 'styled-components';

import media from '../../utils/mediaQueries';
import BaseButton from '../BaseButton';
import { useDocumentContext } from '../../contexts/DocumentsContext';

/**
 * Button for saving markdown documents
 * @param name - The name of the document
 */
function SaveButton() {
  const { markdown, handleSaveDoc, docName } = useDocumentContext();

  return (
    <Button
      padding='.8rem'
      onClick={() =>
        handleSaveDoc(
          docName.endsWith('.md') ? docName : docName + '.md',
          markdown
        )
      }
    >
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
