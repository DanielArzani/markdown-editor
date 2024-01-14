import React from 'react';

import saveIcon from '../../assets/icon-save.svg';
import styled from 'styled-components';

import media from '../../utils/mediaQueries';
import BaseButton from '../BaseButton';
import { useDocumentContext } from '../../contexts/DocumentsContext';
import { DocumentType } from '../../types/documentType';
import formatDate from '../../utils/formatDate';
import createUniqueId from '../../utils/createUniqueId';

type SaveButtonProps = {
  markdown: string;
  name: string;
};

/**
 * Button for saving markdown documents
 * @param markdown - The users input that they wish to be saved
 * @param name - The name of the document
 */
function SaveButton({ markdown, name }: SaveButtonProps) {
  const { handleSaveDoc } = useDocumentContext();

  const currentDoc: DocumentType = {
    id: createUniqueId(),
    name: name,
    createdAt: formatDate(Date.now()),
    content: markdown,
  };

  return (
    <Button padding='.8rem' onClick={() => handleSaveDoc(currentDoc)}>
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
