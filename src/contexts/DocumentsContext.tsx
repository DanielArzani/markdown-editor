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
  handleLoadDocs: (listOfDocs: DocumentType[]) => void;
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

  // function to upload documents from users side
  const handleLoadDocs = (listOfDocs: DocumentType[]) => {
    const prompt = window.confirm(
      'Are you sure you want to replace your current documents?'
    );
    if (prompt) {
      setDocuments(listOfDocs);
    }
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
    // Check if there's a current document and if it's different from the chosen one
    if (currentDoc && currentDoc.id !== chosenDocId) {
      // Auto-save the current document if there are unsaved changes
      if (currentDoc.content !== markdown || currentDoc.name !== docName) {
        handleSaveDoc(docName, markdown);
      }
    }

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
    setCurrentDoc(documents[0]);
    setMarkdown('');
    setDocName('Welcome.md');
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
        handleLoadDocs,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
};

// Hook for easy use of the context in components
/**
 * @returns currentDoc - The currently selected document
 * @returns documents - The list of user documents
 * @returns docName - The current documents name
 * @returns markdown - The markdown content
 * @returns handleCreateDoc - Function to save a new document
 * @returns handleDeleteDoc - Function for deleting a document
 * @returns handleLoadDoc - Function for loading a document
 * @returns handleSaveDoc - Function for saving/updating a document
 * @returns handleMarkdownChange - For setting the new markdown state
 * @returns handleDocNameChange - For setting the new document name state
 * @returns setCurrentDoc - The setter function for the current document state variable
 * @returns handleLoadDocs - Loads a json file from the users side and replaces the current documents with it
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
