import React from 'react';
import Markdown from 'react-markdown';
import styled from 'styled-components';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { motion } from 'framer-motion';

import PreviewToggleButton from '../PreviewToggleButton';

type PreviewPaneProps = {
  isPreviewOpen: boolean;
  markdown: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

/**
 * The markdown converted into html is displayed here
 * @param markdown - The text that will be turned into html
 */
function PreviewPane({ markdown, onClick, isPreviewOpen }: PreviewPaneProps) {
  return (
    <Wrapper
      initial='open'
      animate={isPreviewOpen ? { x: '0%' } : { x: '100%' }}
      transition={{ duration: 0.5 }}
    >
      <Header>
        <H2>preview</H2>
        <PreviewToggleButton
          handleToggle={onClick}
          isPreviewOpen={isPreviewOpen}
        />
      </Header>
      <MarkdownWrapper>
        <Markdown
          remarkPlugins={[remarkGfm]}
          components={{
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  style={dark}
                  language={match[1]}
                  PreTag='div'
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {markdown}
        </Markdown>
      </MarkdownWrapper>
    </Wrapper>
  );
}

export default PreviewPane;

const Wrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;

  background-color: ${(props) => props.theme.editorBodyBg};
  border-bottom: 10px solid ${(props) => props.theme.editorSeparator};
  overflow: auto;
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

const MarkdownWrapper = styled.div`
  display: flex;
  flex-direction: column;

  background-color: ${(props) => props.theme.editorBodyBg};
  height: 100%;
  padding-left: 1rem;
  padding-top: 1rem;

  & * {
    color: ${(props) => props.theme.editorBodyText};
  }
`;
