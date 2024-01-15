import React, { useState } from 'react';

import { motion } from 'framer-motion';
import styled from 'styled-components';

import DeletionConfirmationModal from '../DeletionConfirmationModal';

const rotateAnimation = {
  scale: 1.1,
  rotate: [0, 20, -40],
};

/**
 * SVG Trash Can Icon wrapped in a button, moved into its own component in order to be able to easily alter its styles. Controls its associated modal.
 */
function DeleteIcon() {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <DeleteIconButton whileHover={rotateAnimation} onClick={openModal}>
        <SVG width='18' height='20' xmlns='http://www.w3.org/2000/svg'>
          <path d='M7 16a1 1 0 0 0 1-1V9a1 1 0 1 0-2 0v6a1 1 0 0 0 1 1ZM17 4h-4V3a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v1H1a1 1 0 1 0 0 2h1v11a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V6h1a1 1 0 0 0 0-2ZM7 3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1H7V3Zm7 14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6h10v11Zm-3-1a1 1 0 0 0 1-1V9a1 1 0 0 0-2 0v6a1 1 0 0 0 1 1Z' />
        </SVG>
        <span className='sr-only'>Delete Icon</span>
      </DeleteIconButton>

      <DeletionConfirmationModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
      />
    </>
  );
}

export default DeleteIcon;

const DeleteIconButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;

  background: none;
  border: none;
`;

const SVG = styled.svg`
  fill: #7c8187;

  &:hover {
    cursor: pointer;
    fill: ${(props) => props.theme.deleteIconHover};
  }
`;
