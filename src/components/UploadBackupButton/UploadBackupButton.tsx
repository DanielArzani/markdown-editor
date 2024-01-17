import React from 'react';
import { useDocumentContext } from '../../contexts/DocumentsContext';
import styled from 'styled-components';

/**
 * A button component that allows users to upload a backup file (JSON)
 * containing documents and restores these documents into the application.
 * It can also upload local .md files
 */
function UploadBackupButton() {
  const { handleFileUpload } = useDocumentContext();

  return (
    <ButtonWrapper>
      <StyledLabel htmlFor='file-upload'>Upload File(s)</StyledLabel>
      <StyledInput type='file' id='file-upload' onChange={handleFileUpload} />
    </ButtonWrapper>
  );
}

export default UploadBackupButton;

// Styled components
const ButtonWrapper = styled.div`
  /* align-self: flex-end; */

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledLabel = styled.label`
  background-color: ${(props) => props.theme.saveBtnBg};
  color: ${(props) => props.theme.saveBtnText};
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.saveBtnBgHover};
    color: ${(props) => props.theme.saveBtnTextHover};
  }
`;

const StyledInput = styled.input`
  display: none;
`;
