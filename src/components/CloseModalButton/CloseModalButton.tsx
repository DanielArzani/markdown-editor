import React from 'react';

import styled from 'styled-components';

import BaseButton from '../BaseButton';
import { useDocumentContext } from '../../contexts/DocumentsContext';

type CloseModalButtonProps = {
  closeModal: () => void;
};

/**
 * Button for closing the modal as well as deleting the current document
 * @param closeModal - function to close the modal
 */
function CloseModalButton({ closeModal }: CloseModalButtonProps) {
  const { handleDeleteDoc, currentDoc } = useDocumentContext();

  return (
    <Button
      onClick={() => {
        if (currentDoc) {
          handleDeleteDoc(currentDoc.id);
        }
        closeModal();
      }}
      width='100%'
      padding='1rem 4rem'
    >
      Confirm & Delete
    </Button>
  );
}

export default CloseModalButton;

const Button = styled(BaseButton)``;
