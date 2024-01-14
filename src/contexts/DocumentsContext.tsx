import React, { createContext, useContext, ReactNode } from 'react';
import { DocumentType } from '../types/documentType';
import useLocalStorage from '../hooks/useLocalStorage';

// shape of context data
type DocumentContextType = {
  documents: DocumentType[];
  handleSaveDoc: (newDoc: DocumentType) => void;
};

// Create the context with an initial empty state
const DocumentContext = createContext<DocumentContextType | undefined>(
  undefined
);

// Define the provider component
type DocumentProviderProps = {
  children: ReactNode;
};

/**
 * All data/functions involving documents (i.e. the users markdown files)
 */
export const DocumentProvider = ({ children }: DocumentProviderProps) => {
  const [documents, setDocuments] = useLocalStorage<DocumentType[]>('docs', []);

  // function to handle saving document
  const handleSaveDoc = (newDoc: DocumentType) => {
    setDocuments((prevDocs) => [...prevDocs, newDoc]);
  };

  return (
    <DocumentContext.Provider value={{ documents, handleSaveDoc }}>
      {children}
    </DocumentContext.Provider>
  );
};

// Hook for easy use of the context in components
/**
 * @returns documents - The list of user documents
 * @returns handleSaveDoc - Function to save a new document
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
