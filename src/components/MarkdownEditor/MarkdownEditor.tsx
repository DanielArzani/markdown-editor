import React from 'react';
import styled from 'styled-components';
import PreviewToggleButton from '../PreviewToggleButton';

type MarkdownEditorProps = {
  markdown: string;
  handleMarkdownChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;

  isPreviewOpen: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

/**
 * The editor body, text can be written here in markdown syntax and then the value is taken and passed into a component from the react-markdown library which will render the text as html
 */
const MarkdownEditor = ({
  markdown,
  handleMarkdownChange,
  onClick,
  isPreviewOpen,
}: MarkdownEditorProps) => {
  return (
    <Wrapper>
      <Header>
        <H2>markdown</H2>
        {!isPreviewOpen && (
          <PreviewToggleButton
            handleToggle={onClick}
            isPreviewOpen={isPreviewOpen}
          />
        )}
      </Header>
      <EditorContainer>
        <StyledTextarea
          value={markdown}
          onChange={handleMarkdownChange}
          placeholder='Write your markdown here...'
          aria-label='Markdown editor'
        />
      </EditorContainer>
    </Wrapper>
  );
};

export default MarkdownEditor;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  border-right: 1px solid ${(props) => props.theme.editorSeparator};
  border-bottom: 10px solid ${(props) => props.theme.editorSeparator};
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
