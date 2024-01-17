import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { DocumentType } from '../types/documentType';
import createUniqueId from '../utils/createUniqueId';
import formatDate from '../utils/formatDate';
import useLocalStorage from '../hooks/useLocalStorage';
import mdCheatSheet from '../data/markdownCheatSheet';

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
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
  const [markdown, setMarkdown] = useState<string>('');
  const [docName, setDocName] = useState<string>(
    `Doc-${createUniqueId().slice(1, 5)}`
  );

  // Create new welcome.md with markdown cheat sheet as content if there're no saved files
  useEffect(() => {
    if (documents.length === 0 && markdown === '') {
      const welcomeDoc: DocumentType = {
        id: createUniqueId(),
        name: 'welcome.md',
        createdAt: formatDate(Date.now()),
        content: mdCheatSheet(),
      };

      // Update state to include the welcome document
      setDocuments([welcomeDoc]);
      setCurrentDoc(welcomeDoc);
      setMarkdown(welcomeDoc.content);
      setDocName(welcomeDoc.name);
    }
  }, [documents, markdown, setDocuments]);

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
  const handleLoadDocs = (newDocs: DocumentType[]) => {
    const prompt = window.confirm(
      'Are you sure you want to replace your current documents?'
    );
    if (prompt && newDocs.length > 0) {
      setDocuments(newDocs);
      const firstDoc = newDocs[0];
      setCurrentDoc(firstDoc);
      setMarkdown(firstDoc.content);
      setDocName(firstDoc.name);
    }
  };

  /**
   * Handles the file upload event, reads the file, parses it as JSON,
   * and then loads the documents into the application.
   * Added functionality in order for it to be able to upload .md files
   * @param event - The file upload event.
   */
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileName = file.name; // Get the file name
      const reader = new FileReader();

      reader.onload = (e) => {
        const contents = e.target?.result;

        if (file.type === 'application/json') {
          // Existing JSON file logic
          try {
            const documents = JSON.parse(contents as string) as DocumentType[];
            handleLoadDocs(documents);
          } catch (error) {
            console.error('Error parsing the JSON file', error);
          }
        } else if (
          file.type === 'text/markdown' ||
          file.type === 'text/x-markdown'
        ) {
          // Handle Markdown file
          const newDoc: DocumentType = {
            id: createUniqueId(), // Use your existing ID creation method
            name: fileName,
            createdAt: formatDate(Date.now()), // Use your existing date format method
            content: contents as string,
          };
          // Update the current document, markdown, and docName states
          setCurrentDoc(newDoc);
          setMarkdown(newDoc.content);
          setDocName(newDoc.name);
        } else {
          alert('Please select a Markdown or JSON file.');
        }
      };

      reader.readAsText(file);
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
        handleFileUpload,
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
 * @returns handleFileUpload - Handles the uploading of a .md file or a json file
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
