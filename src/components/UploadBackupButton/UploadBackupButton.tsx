import React, { ChangeEvent } from 'react';
import { useDocumentContext } from '../../contexts/DocumentsContext';
import { DocumentType } from '../../types/documentType';

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
    <div>
      <label htmlFor='file-upload'>Upload Backup</label>
      <input type='file' id='file-upload' onChange={handleFileUpload} />
    </div>
  );
}

export default UploadBackupButton;
