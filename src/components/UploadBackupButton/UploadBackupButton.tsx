import React, { ChangeEvent } from 'react';
import { useDocumentContext } from '../../contexts/DocumentsContext';
import { DocumentType } from '../../types/documentType';
import styled from 'styled-components';

/**
 * A button component that allows users to upload a backup file (JSON)
 * containing documents and restores these documents into the application.
 */
function UploadBackupButton() {
  const { handleLoadDocs } = useDocumentContext();

  /**
   * Handles the file upload event, reads the file, parses it as JSON,
   * and then loads the documents into the application.
   * @param event - The file upload event.
   */
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const contents = e.target?.result;
        try {
          const documents = JSON.parse(contents as string) as DocumentType[];
          // Using a method from context to update documents in the app's state
          handleLoadDocs(documents);
        } catch (error) {
          console.error('Error parsing the uploaded file', error);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <ButtonWrapper>
      <StyledLabel htmlFor='file-upload'>Upload Backup</StyledLabel>
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
