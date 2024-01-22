import React from 'react';
import styled from 'styled-components';

import BaseButton from '../BaseButton';
import { useDocumentContext } from '../../contexts/DocumentsContext';
import createUniqueId from '../../utils/createUniqueId';
import formatDate from '../../utils/formatDate';
import { DocumentType } from '../../types/documentType';

/**
 * Button for creating a new markdown document
 */
function NewDocumentButton() {
  const { handleCreateDoc } = useDocumentContext();

  const currentDoc: DocumentType = {
    id: createUniqueId(),
    name: `Doc-${createUniqueId().slice(1, 5)}`,
    createdAt: formatDate(Date.now()),
    content: '',
  };

  return (
    <Button
      onClick={() => handleCreateDoc(currentDoc)}
      padding={'.75rem 2rem'}
      width='100%'
      hasAnimation={false}
    >
      + New Document
    </Button>
  );
}

export default NewDocumentButton;

const Button = styled(BaseButton)``;
