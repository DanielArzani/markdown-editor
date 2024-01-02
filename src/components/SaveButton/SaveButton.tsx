import React from 'react';
import { motion } from 'framer-motion';

import saveIcon from '../../assets/icon-save.svg';
import styled from 'styled-components';
import media from '../../utils/mediaQueries';

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

/**
 * Button for saving markdown documents
 */
function SaveButton() {
  return (
    <Button
      whileHover={hoverAnimation}
      initial={unhoverAnimation}
      animate={unhoverAnimation}
    >
      <img src={saveIcon} alt='Save Icon' />
      <Span>Save Changes</Span>
    </Button>
  );
}

export default SaveButton;

const Button = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  background-color: ${(props) => props.theme.saveBtnBg};
  border-radius: 5px;
  color: ${(props) => props.theme.saveBtnText};
  height: 2.5rem;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
  width: 2.5rem;

  &:hover {
    background-color: ${(props) => props.theme.saveBtnBgHover};
    color: ${(props) => props.theme.saveBtnTextHover};
  }

  @media ${media.md} {
    width: 9.5rem;
  }
`;

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
