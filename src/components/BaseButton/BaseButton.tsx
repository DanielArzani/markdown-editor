import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';

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

type BaseButtonProps = {
  children: React.ReactNode;
  padding?: string;
  height?: string;
  width?: string;
  hasAnimation?: boolean;
  onClick?: () => void;
};

/**
 * The base for a certain kind of button, contains its own animations. To use, import it into another button component and extend its styles
 * @param children - The content of the button
 * @param padding - Padding of the button
 * @param height - Height of the button
 * @param width - Width of the button
 * @param hasAnimation - If the button has the spring animation of growing larger or not, the transition animation on the background colour will not be changed.
 * @param onClick - Any sort of handler that should perform something when the button is clicked
 * @example
 * <Button height="2rem">
 *    <img src={saveIcon} alt='Save Icon' />
 *     <Span>Save Changes</Span>
 *   </Button>
 * const Button = styled(BaseButton)``
 */
function BaseButton({
  children,
  onClick,
  padding = '',
  height = '',
  width = '',
  hasAnimation = true,
}: BaseButtonProps) {
  return (
    <Button
      onClick={onClick}
      style={{ height: height, width: width, padding: padding }}
      whileHover={hasAnimation ? hoverAnimation : {}}
      initial={hasAnimation ? unhoverAnimation : {}}
      animate={hasAnimation ? unhoverAnimation : {}}
    >
      {children}
    </Button>
  );
}

export default BaseButton;

const Button = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  background-color: ${(props) => props.theme.saveBtnBg};
  border-radius: 4px;
  color: ${(props) => props.theme.saveBtnText};
  transition:
    background-color 0.3s ease,
    color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.saveBtnBgHover};
    color: ${(props) => props.theme.saveBtnTextHover};
  }
`;
