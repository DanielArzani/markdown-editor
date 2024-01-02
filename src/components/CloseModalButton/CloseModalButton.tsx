import React from 'react';
import styled from 'styled-components';
import BaseButton from '../BaseButton';

type CloseModalButtonProps = {
  closeModal: () => void;
};

/**
 * Button for closing the modal
 * @param closeModal - function to close the modal
 * @returns
 */
function CloseModalButton({ closeModal }: CloseModalButtonProps) {
  return (
    <Button onClick={closeModal} width='100%' padding='1rem 4rem'>
      Confirm & Delete
    </Button>
  );
}

export default CloseModalButton;

const Button = styled(BaseButton)``;
