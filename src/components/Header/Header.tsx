import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';

import Logo from '../Logo';
import media from '../../utils/mediaQueries';
import Menu from '../MenuIcon/Menu';
import SaveButton from '../SaveButton';
import DeleteIcon from '../DeleteIcon';
import DocumentName from '../DocumentName';
import { motion } from 'framer-motion';

const hoverAnimation = {
  scale: 1.1, // Slightly increase the size on hover
  transition: {
    type: 'spring',
    stiffness: 300,
    damping: 10,
  },
};

const unhoverAnimation = {
  scale: 1.0, // Return to normal size when not hovered
  transition: {
    type: 'spring',
    stiffness: 300,
    damping: 15, // Slightly more damping for a smoother return
  },
};

// This line is important for screen readers to hide the main app when the modal is open
Modal.setAppElement('#root');

/**
 * The project header. Contains the components for creating, deleting and saving documents as well as the side navbar. Also holds the logic for opening/closing the toggle menu and the confirm deletion modal
 */
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <StyledHeader>
        <MinorWrapper>
          <Menu
            isOpen={isMenuOpen}
            toggleMenu={toggleMenu}
            ariaControls='navigation'
          />

          <LogoWrapper>
            <Logo />
            <Line />
          </LogoWrapper>

          <DocumentNameWrapper>
            <DocumentName />
          </DocumentNameWrapper>
        </MinorWrapper>

        <MinorWrapper>
          <DeleteIcon openModal={openModal} />
          <SaveButton />
        </MinorWrapper>
      </StyledHeader>

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
          <Button
            onClick={closeModal}
            whileHover={hoverAnimation}
            initial={unhoverAnimation}
            animate={unhoverAnimation}
          >
            Confirm & Delete
          </Button>
        </ModalBackground>
      </Modal>
    </>
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
`;

const MinorWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const DocumentNameWrapper = styled.div``;

const LogoWrapper = styled.div`
  display: none;

  @media ${media.l} {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const Line = styled.div`
  background-color: #5a6069;
  height: 2.5rem;
  margin-left: 1rem;
  width: 0.0625rem;
`;

// MODAL STYLES

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

const Button = styled(motion.button)`
  color: ${(props) => props.theme.modalBtnText};
  background-color: ${(props) => props.theme.modalBtnBg};
  border-radius: 4px;
  font-family: Roboto;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding: 1rem 4rem;
  text-align: center;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
  width: 100%;

  &:hover {
    background-color: ${(props) => props.theme.saveBtnBgHover};
    color: ${(props) => props.theme.saveBtnTextHover};
  }
`;
