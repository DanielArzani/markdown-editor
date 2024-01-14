import React, { createContext, useContext, ReactNode, useState } from 'react';
import { DocumentType } from '../types/documentType';
import useLocalStorage from '../hooks/useLocalStorage';
import createUniqueId from '../utils/createUniqueId';
import formatDate from '../utils/formatDate';

// shape of context data
type DocumentContextType = {
  documents: DocumentType[];
  currentDoc?: DocumentType;
  handleCreateDoc: (newDoc: DocumentType) => void;
  handleLoadDoc: (content: string) => void;
  handleSaveDoc: (updatedName: string, updatedContent: string) => void;
  setCurrentDoc: React.Dispatch<React.SetStateAction<DocumentType | undefined>>;
};

// Create the context with an initial empty state
const DocumentContext = createContext<DocumentContextType | undefined>(
  undefined
);

// Define the provider component
type DocumentProviderProps = {
  children: ReactNode;
  onLoadDocument: (content: string) => void;
};

/**
 * All data/functions involving documents (i.e. the users markdown files)
 * @param children - The components that should receive the context data
 * @param onLoadDocument
 */
export const DocumentProvider = ({
  children,
  onLoadDocument,
}: DocumentProviderProps) => {
  const [documents, setDocuments] = useLocalStorage<DocumentType[]>('docs', []);
  const [currentDoc, setCurrentDoc] = useState<DocumentType>();

  // function to handle creating a new document
  const handleCreateDoc = (newDoc: DocumentType) => {
    setDocuments((prevDocs) => [...prevDocs, newDoc]);
  };

  // function to update/save a document
  const handleSaveDoc = (updatedName: string, updatedContent: string) => {
    const updatedNameWithExtension = updatedName.endsWith('.md')
      ? updatedName
      : updatedName + '.md';

    // Check if a document with the same name already exists (excluding the current document)
    const isNameTaken = documents.some(
      (doc) =>
        doc.name === updatedNameWithExtension && doc.id !== currentDoc?.id
    );

    if (isNameTaken) {
      alert(
        'A document with this name already exists. Please use a different name.'
      );
      return;
    }

    const docIndex = documents.findIndex((doc) => doc.id === currentDoc?.id);

    if (docIndex !== -1) {
      // Create a new document object with updated values
      const updatedDoc: DocumentType = {
        id: documents[docIndex].id,
        name: updatedName.endsWith('.md') ? updatedName : updatedName + '.md', // Ensure .md extension
        createdAt: documents[docIndex].createdAt,
        content: updatedContent,
      };

      // Create a new array of documents with the updated document
      const updatedDocuments = [
        ...documents.slice(0, docIndex),
        updatedDoc,
        ...documents.slice(docIndex + 1),
      ];

      // Update the documents state and the current document
      setDocuments(updatedDocuments);
      setCurrentDoc(updatedDoc);
    } else {
      // Handle creating a new document if it doesn't exist in the array
      const newDoc: DocumentType = {
        id: createUniqueId(),
        name: updatedName.endsWith('.md') ? updatedName : updatedName + '.md',
        createdAt: formatDate(Date.now()),
        content: updatedContent,
      };

      setDocuments((prevDocs) => [...prevDocs, newDoc]);
      setCurrentDoc(newDoc);
    }
  };

  const handleLoadDoc = (chosenDocName: string) => {
    const docToLoad = documents.find((doc) => doc.name === chosenDocName);
    if (docToLoad) {
      onLoadDocument(docToLoad.content); // Use the callback to send content back to App
    }
  };

  return (
    <DocumentContext.Provider
      value={{
        documents,
        handleCreateDoc,
        handleLoadDoc,
        currentDoc,
        handleSaveDoc,
        setCurrentDoc,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
};

// Hook for easy use of the context in components
/**
 * @returns documents - The list of user documents
 * @returns handleCreateDoc - Function to save a new document
 * @returns handleLoadDoc - Function for loading a document
 * @returns handleSaveDoc - Function for saving/updating a document
 * @returns currentDoc - The currently selected document
 * @returns setCurrentDoc - The setter function for the current document state variable
 */
export const useDocumentContext = () => {
  const context = useContext(DocumentContext);
  if (context === undefined) {
    throw new Error(
      'useDocumentContext must be used within a DocumentProvider'
    );
  }
  return context;
};
