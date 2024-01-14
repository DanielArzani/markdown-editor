import React from 'react';
import styled from 'styled-components';
import PreviewToggleButton from '../PreviewToggleButton';
import { motion } from 'framer-motion';

type MarkdownEditorProps = {
  markdown: string;
  handleMarkdownChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;

  isPreviewOpen: boolean;
  handleTogglePreview: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

/**
 * The editor body, text can be written here in markdown syntax and then the value is taken and passed into a component from the react-markdown library which will render the text as html
 * @param markdown - The markdown that should be turned into html
 * @param handleMarkdownChange - The input of the text area which is treated as our markdown
 * @param handleTogglePreview - The toggle for showing/hiding the PreviewPane
 * @param isPreviewOpen - The current state of the PreviewPane (open/closed)
 */
const MarkdownEditor = ({
  handleMarkdownChange,
  handleTogglePreview,
  markdown,
  isPreviewOpen,
}: MarkdownEditorProps) => {
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
        <StyledTextarea
          value={markdown}
          onChange={handleMarkdownChange}
          placeholder='Write your markdown here...'
          aria-label='Markdown editor'
          id='markdown-editor'
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

  height: calc(100% - 2rem);
`;

const StyledTextarea = styled.textarea`
  background-color: ${(props) => props.theme.editorBodyBg};
  color: ${(props) => props.theme.editorBodyText};
  width: 100%;
  height: 100%;
  border: none;
  padding: 1rem;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro',
    monospace;
  font-size: 1rem;
  line-height: 1.5;
  resize: none;

  &:focus {
    outline: none; // Custom focus styles can be added
  }
`;
