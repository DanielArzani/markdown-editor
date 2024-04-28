import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import PreviewToggleButton from '../PreviewToggleButton';
import { useDocumentContext } from '../../contexts/DocumentsContext';
import useSaveShortcut from '../../hooks/useSaveShortcut';
import FontSelect from '../FontSelect';

type MarkdownEditorProps = {
  isPreviewOpen: boolean;
  handleTogglePreview: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

/**
 * The editor body, text can be written here in markdown syntax and then the value is taken and passed into a component from the react-markdown library which will render the text as html
 * @param handleTogglePreview - The toggle for showing/hiding the PreviewPane
 * @param isPreviewOpen - The current state of the PreviewPane (open/closed)
 */
const MarkdownEditor = ({
  handleTogglePreview,
  isPreviewOpen,
}: MarkdownEditorProps) => {
  const { currentDoc, markdown, handleSaveDoc, handleMarkdownChange, docName } =
    useDocumentContext();

  const [fontFamily, setFontFamily] = useState<string>('Dancing Script'); // default font

  const handleFontChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFontFamily(event.target.value);
  };

  const saveDocument = () => {
    if (currentDoc) {
      handleSaveDoc(docName, markdown);
    }
  };
  // Use the custom hook for save shortcut
  useSaveShortcut(saveDocument);

  return (
    <Wrapper>
      <Header>
        <H2>markdown</H2>
        {/* only show the toggle button here if the PreviewPane is closed */}
        {!isPreviewOpen && (
          <PreviewToggleButton
            handleToggle={handleTogglePreview}
            isPreviewOpen={isPreviewOpen}
          />
        )}
      </Header>
      <EditorContainer>
        <label htmlFor='markdown-editor' className='sr-only'>
          Markdown Editor
        </label>
        <FontSelect
          fontFamily={fontFamily}
          handleFontChange={handleFontChange}
        />
        <StyledTextarea
          value={markdown}
          onChange={handleMarkdownChange}
          aria-label='Markdown editor'
          placeholder='Write your markdown here...'
          id='markdown-editor'
          style={{ fontFamily }}
        />
      </EditorContainer>
    </Wrapper>
  );
};

export default MarkdownEditor;

const Wrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;

  border-right: 1px solid ${(props) => props.theme.editorSeparator};
  border-bottom: 2.5px solid ${(props) => props.theme.editorSeparator};
  height: 100%;
  height: calc(100vh - 5rem);
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: ${(props) => props.theme.editorHeaderBg};
  height: 1rem;
  padding: 1.5rem;
`;

const H2 = styled.h2`
  color: ${(props) => props.theme.editorHeaderText};
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 2px;
  text-transform: uppercase;
`;

const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;
`;

const StyledTextarea = styled.textarea`
  background-color: ${(props) => props.theme.editorBodyBg};
  color: ${(props) => props.theme.editorBodyText};
  width: 100%;
  height: 100%;
  border: none;
  padding: 1rem;
  /* font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro',
    monospace; */
  font-size: 1.5rem;
  line-height: 1.5;
  resize: none;
  word-wrap: break-word; // Ensures that long words will break and wrap onto the next line
  overflow-wrap: break-word; // This is the standard version of the same property

  &:focus {
    outline: none; // Custom focus styles can be added
  }
`;
