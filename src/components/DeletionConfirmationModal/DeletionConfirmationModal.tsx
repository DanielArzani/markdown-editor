import React from 'react';

import Modal from 'react-modal';
import styled from 'styled-components';

import CloseModalButton from '../CloseModalButton';

// This line is important for screen readers to hide the main app when the modal is open
Modal.setAppElement('#root');

type DeletionConfirmationModalProps = {
  modalIsOpen: boolean;
  closeModal: () => void;
};

/**
 * An accessible modal for confirming the deletion of documents. From the library React modal
 * @param modalIsOpen - Opens the modal when true is passed in
 * @param closeModal - Setter function for closing the modal
 */
function DeletionConfirmationModal({
  modalIsOpen,
  closeModal,
}: DeletionConfirmationModalProps) {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel='Confirm Deletion Modal'
    >
      <ModalBackground>
        <H2>Delete this document?</H2>
        <P>
          Are you sure you want to delete the ‘welcome.md’ document and its
          contents? This action cannot be reversed.
        </P>
        <CloseModalButton closeModal={closeModal} />
      </ModalBackground>
    </Modal>
  );
}

export default DeletionConfirmationModal;

const customStyles = {
  content: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    border: 'none',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
};

const ModalBackground = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  right: auto;
  bottom: auto;
  margin-right: -50%;
  transform: translate(-50%, -50%);

  background-color: ${(props) => props.theme.modalBg};
  border-radius: 0.25rem;
  max-width: 21.4375rem;
  padding: 1.5rem;
`;

const H2 = styled.h2`
  color: ${(props) => props.theme.modalHeaderText};
  font-family: Roboto Slab;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const P = styled.p`
  color: ${(props) => props.theme.modalContentText};
  font-family: Roboto Slab;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5rem;
  margin-top: 1rem;
  margin-bottom: 1.62rem;
`;
