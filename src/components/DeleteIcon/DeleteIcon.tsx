import React from 'react';
import styled from 'styled-components';

function DeleteIcon() {
  return (
    <DeleteIconWrapper>
      <StyledSvg width='18' height='20' xmlns='http://www.w3.org/2000/svg'>
        <path d='M7 16a1 1 0 0 0 1-1V9a1 1 0 1 0-2 0v6a1 1 0 0 0 1 1ZM17 4h-4V3a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v1H1a1 1 0 1 0 0 2h1v11a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V6h1a1 1 0 0 0 0-2ZM7 3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1H7V3Zm7 14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6h10v11Zm-3-1a1 1 0 0 0 1-1V9a1 1 0 0 0-2 0v6a1 1 0 0 0 1 1Z' />
      </StyledSvg>
      <span className='sr-only'>Delete Icon</span>
    </DeleteIconWrapper>
  );
}

export default DeleteIcon;

const StyledSvg = styled.svg`
  fill: #7c8187;

  &:hover {
    cursor: pointer;
    fill: ${(props) => props.theme.deleteIconHover};
  }
`;

const DeleteIconWrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  background: none;
  border: none;
`;
