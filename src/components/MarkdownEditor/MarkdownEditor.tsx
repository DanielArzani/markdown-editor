import React from 'react';
import styled from 'styled-components';

type MarkdownEditorProps = {
  markdown: string;
  handleMarkdownChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

/**
 * The editor body, text can be written here in markdown syntax and then the value is taken and passed into a component from the react-markdown library which will render the text as html
 */
const MarkdownEditor = ({
  markdown,
  handleMarkdownChange,
}: MarkdownEditorProps) => {
  return (
    <>
      <EditorContainer>
        <StyledTextarea
          value={markdown}
          onChange={handleMarkdownChange}
          placeholder='Write your markdown here...'
          aria-label='Markdown editor'
        />
      </EditorContainer>
    </>
  );
};

export default MarkdownEditor;

const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem;
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  height: 100%;
  border: none;
  padding: 1rem;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro',
    monospace;
  font-size: 1rem;
  background-color: #f7f7f7; // Choose appropriate color based on theme
  color: #333; // Choose appropriate text color based on theme
  line-height: 1.5;
  resize: none; // Optional: set to vertical, horizontal, or none

  &:focus {
    outline: none; // Custom focus styles can be added
  }
`;
