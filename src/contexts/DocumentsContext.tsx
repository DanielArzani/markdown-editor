import React, { createContext, useContext, ReactNode, useState } from 'react';
import { DocumentType } from '../types/documentType';
import useLocalStorage from '../hooks/useLocalStorage';

// shape of context data
type DocumentContextType = {
  documents: DocumentType[];
  currentDoc?: DocumentType;
  handleSaveDoc: (newDoc: DocumentType) => void;
  handleLoadDoc: (content: string) => void;
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
  const [currentDoc, setCurrentDocs] = useState<DocumentType>();

  // function to handle saving document
  const handleSaveDoc = (newDoc: DocumentType) => {
    setDocuments((prevDocs) => [...prevDocs, newDoc]);
  };

  const handleLoadDoc = (chosenDocName: string) => {
    const docToLoad = documents.find((doc) => doc.name === chosenDocName);
    if (docToLoad) {
      onLoadDocument(docToLoad.content); // Use the callback to send content back to App
      setCurrentDocs(docToLoad);
    }
  };

  return (
    <DocumentContext.Provider
      value={{ documents, handleSaveDoc, handleLoadDoc, currentDoc }}
    >
      {children}
    </DocumentContext.Provider>
  );
};

// Hook for easy use of the context in components
/**
 * @returns documents - The list of user documents
 * @returns handleSaveDoc - Function to save a new document
 * @returns handleLoadDoc - Function for loading a document
 * @returns currentDoc - The currently selected document
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
