import React from 'react';
import Markdown from 'react-markdown';
import { motion } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  dark,
  duotoneLight,
} from 'react-syntax-highlighter/dist/esm/styles/prism';
import styled from 'styled-components';

import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkToc from 'remark-toc';
import emoji from 'remark-emoji';
import remarkBreaks from 'remark-breaks';
import codeTitle from 'remark-code-title';
import remarkImages from 'remark-images';
import smartypants from 'remark-smartypants';

import rehypeKatex from 'rehype-katex';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import rehypeSanitize from 'rehype-sanitize';
import rehypeMeta from 'rehype-meta';
import rehypeReact from 'rehype-react';

import { AvailableThemesType } from '../../types/availableThemesType';
import PreviewToggleButton from '../PreviewToggleButton';
import { useDocumentContext } from '../../contexts/DocumentsContext';

type PreviewPaneProps = {
  isPreviewOpen: boolean;
  handleTogglePreview: (event: React.MouseEvent<HTMLButtonElement>) => void;
  theme: AvailableThemesType;
};

/**
 * The markdown converted into html is displayed here
 * @param handleTogglePreview - The toggle for showing/hiding the PreviewPane
 * @param isPreviewOpen - The current state of the PreviewPane (open/closed)
 * @param theme - The current theme, used to change some styles that wouldn't be easily legible depending on the current theme (i.e. dark code blocks on dark backgrounds)
 */
function PreviewPane({
  handleTogglePreview,
  isPreviewOpen,
  theme,
}: PreviewPaneProps) {
  const { markdown } = useDocumentContext();

  return (
    <Wrapper
      initial='open'
      animate={isPreviewOpen ? { x: '0%' } : { x: '100%' }}
      transition={{ duration: 0.5 }}
    >
      <Header>
        <H2>preview</H2>
        <PreviewToggleButton
          handleToggle={handleTogglePreview}
          isPreviewOpen={isPreviewOpen}
        />
      </Header>
      <MarkdownWrapper>
        <Markdown
          remarkPlugins={[
            remarkGfm,
            remarkMath,
            [remarkToc, { heading: 'TOC' }],
            emoji,
            remarkBreaks,
            codeTitle,
            remarkImages,
            smartypants,
          ]}
          rehypePlugins={[
            rehypeKatex,
            rehypeAutolinkHeadings,
            rehypeSlug,
            rehypeSanitize,
            rehypeMeta,
            rehypeReact,
          ]}
          components={{
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  style={theme === 'dark' ? dark : duotoneLight}
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
  border-bottom: 2.5px solid ${(props) => props.theme.editorSeparator};
  height: calc(100vh - 5rem);
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 1rem;
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
  gap: 1rem;

  background-color: ${(props) => props.theme.editorBodyBg};
  height: 100%;
  padding-left: 1rem;
  padding-top: 1rem;
  overflow: auto;

  //*********************
  //  PREVIEW STYLES
  //*********************

  & * {
    color: ${(props) => props.theme.editorBodyText};
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro',
      monospace;
  }

  & h1,
  & h2,
  & h3,
  & h4,
  & h5,
  & h6 {
    color: ${(props) => props.theme.previewHeaders};
  }

  & h1 {
    font-size: 2.85rem;
  }

  & h2 {
    font-size: 2.64rem;
    text-decoration: underline;
    text-decoration-thickness: 2px;
    text-underline-offset: 1rem;
    text-decoration-color: ${(props) => props.theme.previewHeaders};
  }

  & h3 {
    font-size: 1.84rem;
  }

  & h4 {
    font-size: 1.43rem;
  }

  & h5 {
    font-size: 1.01rem;
  }

  & h6 {
    font-size: 0.9rem;
  }

  & p {
    color: ${(props) => props.theme.previewParagraph};
    font-size: 1.5rem;
  }

  & ul,
  & ol {
    padding-left: 40px;
  }

  & li {
    margin-top: 0.75rem;
  }

  & ul,
  & ol,
  & li {
    font-size: 1.5rem;

    & li::before {
      color: ${(props) => props.theme.previewLi};
    }
  }

  & a {
    color: ${(props) => props.theme.previewAnchor};
  }
`;
