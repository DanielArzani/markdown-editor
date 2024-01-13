import React, { useRef, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';

import { darkTheme, lightTheme } from '../../themes/themes';
import Header from '../Header';
import Sidebar from '../Sidebar';
import ThemeToggle from '../ThemeToggle';
import { AvailableThemes } from '../../types/availableThemes';
import MarkdownEditor from '../MarkdownEditor';
import PreviewPane from '../PreviewPane';
import { useResizableEditor } from '../../hooks/useResizableEditor';

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
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(true);

  // for resizing the editor
  const resizerRef = useRef<HTMLDivElement>(null);
  const editorWidth = useResizableEditor({
    initialWidth: '50%',
    minWidth: 200,
    resizerRef: resizerRef,
    isPreviewOpen: isPreviewOpen,
  });

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

  // toggle show/hide preview pane
  const handleTogglePreview = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsPreviewOpen((val) => !val);
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
            isPreviewOpen={isPreviewOpen}
            onClick={handleTogglePreview}
          />
          <ResizeHandler ref={resizerRef} id='resizer' />
          {isPreviewOpen && (
            <PreviewPane
              isPreviewOpen={isPreviewOpen}
              onClick={handleTogglePreview}
              markdown={markdown}
            />
          )}
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
  grid-template-columns: ${(props) => props.editorWidth} 2.5px 1fr;
`;

// the thing that is clicked on and dragged in order to resize a component
const ResizeHandler = styled.div`
  grid-column: 2;
  grid-row: 1;

  align-self: stretch;
  background-color: ${(props) => props.theme.editorSeparator};
  cursor: col-resize;
  width: 2.5px;
`;
