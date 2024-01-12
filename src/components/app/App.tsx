import React, { useEffect, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';

import { darkTheme, lightTheme } from '../../themes/themes';
import Header from '../Header';
import Sidebar from '../Sidebar';
import ThemeToggle from '../ThemeToggle';
import { AvailableThemes } from '../../types/availableThemes';
import MarkdownEditor from '../MarkdownEditor';
import PreviewPane from '../PreviewPane';

type WrapperProps = {
  isMenuOpen: boolean;
};

type MainProps = {
  editorWidth: string;
};

/**
 * Markdown Editor App
 */
function App() {
  const [markdown, setMarkdown] = useState('');
  const [theme, setTheme] = useState<AvailableThemes>('light');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [editorWidth, setEditorWidth] = useState<string>('50%'); // Initial editor width

  useEffect(() => {
    const handleResize = (e: MouseEvent) => {
      const newWidth = e.clientX - (document.body.offsetLeft || 0);
      // minimum width that the editor and can shrink to
      const minWidth = 200;
      if (newWidth > minWidth) {
        setEditorWidth(`${newWidth}px`);
      }
    };

    const startResizing = (e: MouseEvent) => {
      e.preventDefault();
      window.addEventListener('mousemove', handleResize);
      window.addEventListener('mouseup', stopResizing);
    };

    const stopResizing = () => {
      window.removeEventListener('mousemove', handleResize);
      window.removeEventListener('mouseup', stopResizing);
    };

    const resizer = document.getElementById('resizer');
    if (resizer) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      resizer.addEventListener('mousedown', startResizing as any);

      return () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        resizer.removeEventListener('mousedown', startResizing as any);
      };
    }
  }, []);

  // controls the menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // controls the theme
  const handleThemeChange = (newTheme: AvailableThemes) => {
    setTheme(newTheme);
  };

  // controls the text field input for writing the markdown
  const handleMarkdownChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setMarkdown(event.target.value);
  };

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <Wrapper isMenuOpen={isMenuOpen} className={`theme-${theme}`}>
        <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />

        <Sidebar isMenuOpen={isMenuOpen}>
          <ThemeToggle theme={theme} onChange={handleThemeChange} />
        </Sidebar>

        <Main editorWidth={editorWidth}>
          <MarkdownEditor
            markdown={markdown}
            handleMarkdownChange={handleMarkdownChange}
          />
          <ResizeHandler id='resizer' />
          <PreviewPane markdown={markdown} />
        </Main>
      </Wrapper>
    </ThemeProvider>
  );
}

export default App;

const Wrapper = styled.div<WrapperProps>`
  display: grid;
  grid-template-rows: 74px 1fr;
  grid-template-columns: ${(props) =>
    props.isMenuOpen ? `15.625rem 1fr` : '0px 1fr'};
  transition: grid-template-columns 0.3s;

  height: 100vh;
  max-width: 90rem;
  margin: 0 auto;
  position: relative;
  overflow-x: hidden;

  & > header {
    grid-column: 2/-1;
    grid-row: 1/2;
  }

  & > aside {
    grid-column: 1/2;
    grid-row: 1/-1;
    width: 15.625rem;
    transform: translateX(${(props) => (props.isMenuOpen ? '0' : '-100%')});
    transition: transform 0.3s ease-in-out;
  }
`;

const Main = styled.main<MainProps>`
  grid-column: 2/-1;
  grid-row: 2/3;

  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: ${(props) => props.editorWidth} 1px 1fr;
`;

const ResizeHandler = styled.div`
  background-color: ${(props) => props.theme.editorSeparator};
  width: 5px;
  cursor: col-resize;
  align-self: stretch;
  grid-column: 2;
  grid-row: 1;
`;
