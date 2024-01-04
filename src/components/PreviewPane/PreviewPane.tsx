import React from 'react';
import Markdown from 'react-markdown';
import styled from 'styled-components';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

type PreviewPaneProps = {
  markdown: string;
};

/**
 * The markdown converted into html is displayed here
 * @param markdown - The text that will be turned into html
 */
function PreviewPane({ markdown }: PreviewPaneProps) {
  return (
    <Wrapper>
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
    </Wrapper>
  );
}

export default PreviewPane;

const Wrapper = styled.div`
  overflow: auto;
`;
