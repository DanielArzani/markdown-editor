import React, { createContext, ReactNode, useContext, useState } from 'react';

import createUniqueId from '../utils/createUniqueId';
import { DocumentType } from '../types/documentType';
import formatDate from '../utils/formatDate';
import useLocalStorage from '../hooks/useLocalStorage';

// shape of context data
type DocumentContextType = {
  documents: DocumentType[];
  currentDoc?: DocumentType;
  markdown: string;
  docName: string;
  handleCreateDoc: (newDoc: DocumentType) => void;
  handleLoadDoc: (content: string) => void;
  handleSaveDoc: (updatedName: string, updatedContent: string) => void;
  handleDeleteDoc: (chosenDocId: string) => void;
  setCurrentDoc: React.Dispatch<React.SetStateAction<DocumentType | undefined>>;
  handleMarkdownChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleDocNameChange: (newName: string) => void;
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
 * @param children - The components that should receive the context data
 */
export const DocumentProvider = ({ children }: DocumentProviderProps) => {
  const [documents, setDocuments] = useLocalStorage<DocumentType[]>('docs', []);
  const [currentDoc, setCurrentDoc] = useState<DocumentType>();
  const [markdown, setMarkdown] = useState('');
  const [docName, setDocName] = useState<string>(
    `Doc-${createUniqueId().slice(1, 5)}`
  );

  // controls the text field input for writing the markdown
  const handleMarkdownChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setMarkdown(event.target.value);
  };

  const handleDocNameChange = (newName: string) => {
    setDocName(newName);
  };

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

  // function to handle loading a previous document
  const handleLoadDoc = (chosenDocId: string) => {
    //FIXME: When handleSaveDoc is called, it updates the documents state, which might not be reflected immediately due to the asynchronous nature of state updates in React. This can lead to the handleLoadDoc function not having the updated documents when it tries to load the new document.
    //! Auto-save the current document before loading a new one
    // if (currentDoc && currentDoc.name !== chosenDocId) {
    //   handleSaveDoc(currentDoc.name, currentDoc.content);
    // }

    // Load the chosen document
    const docToLoad = documents.find((doc) => doc.id === chosenDocId);
    if (docToLoad) {
      setCurrentDoc(docToLoad); // so I always have the current document to work with
      setMarkdown(docToLoad.content);
      setDocName(docToLoad.name);
    }
  };

  // function to handle deleting a document
  const handleDeleteDoc = (chosenDocId: string) => {
    const newDocuments = documents.filter((doc) => doc.id !== chosenDocId);

    setDocuments(newDocuments);
    handleLoadDoc(documents[0].name);
  };

  return (
    <DocumentContext.Provider
      value={{
        documents,
        currentDoc,
        markdown,
        docName,
        handleCreateDoc,
        handleLoadDoc,
        handleSaveDoc,
        setCurrentDoc,
        handleDeleteDoc,
        handleMarkdownChange,
        handleDocNameChange,
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
 * @returns handleDeleteDoc - Function for deleting a document
 * @returns currentDoc - The currently selected document
 * @returns setCurrentDoc - The setter function for the current document state variable
 * @returns markdown -
 * @returns handleMarkdownChange -
 * @returns docName
 * @returns handleDocNameChange
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
