import React from 'react';
import styled from 'styled-components';

import DocumentIcon from '../../assets/icon-document.svg';

/**
 * A saved document
 */
function SavedDocument() {
  return (
    <Li>
      <div>
        <img src={DocumentIcon} alt='Document Icon' />
      </div>
      <Button>
        <Time>01 April 2022</Time>
        <Span>untitled-document.md</Span>
      </Button>
    </Li>
  );
}

export default SavedDocument;

const Li = styled.li`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Button = styled.button`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  background-color: transparent;
  border: none;
  color: ${(props) => props.theme.sidebarText};
  cursor: pointer;
  font-family: Roboto;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Time = styled.time`
  color: ${(props) => props.theme.sidebarTime};
`;

const Span = styled.span`
  position: relative;
  cursor: pointer;
  transition:
    color 0.3s ease,
    transform 0.3s ease;

  &:hover {
    color: ${(props) => props.theme.sidebarTextHover};

    /* Add a subtle text shadow for depth */
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);

    /* Slightly lift the text to give a "raised" feeling on hover */
    transform: translateY(-2px);
  }

  /* Underline effect on hover */
  &:hover::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -2px; /* Adjust the position of the underline */
    height: 2px; /* Thickness of the underline */
    background-color: ${(props) =>
      props.theme.sidebarTextHover}; /* Color of the underline */
    transition: width 0.3s ease;
    width: 100%; /* Full width on hover */
  }

  /* Start with no underline before hover */
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -2px;
    height: 2px;
    width: 0%;
    background-color: ${(props) => props.theme.sidebarTextHover};
    transition: width 0.3s ease;
  }
`;
