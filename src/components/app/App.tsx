import React, { useRef, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';

import { darkTheme, lightTheme } from '../../themes/themes';
import Header from '../Header';
import Sidebar from '../Sidebar';
import ThemeToggle from '../ThemeToggle';
import { AvailableThemesType } from '../../types/availableThemesType';
import MarkdownEditor from '../MarkdownEditor';
import PreviewPane from '../PreviewPane';
import { useResizableEditor } from '../../hooks/useResizableEditor';
import useLocalStorage from '../../hooks/useLocalStorage';
import { DocumentProvider } from '../../contexts/DocumentsContext';

type WrapperProps = {
  isMenuOpen: boolean;
};

type MainProps = {
  width: string;
};

/**
 * Markdown Editor App
 */
function App() {
  const [markdown, setMarkdown] = useState('');
  const [theme, setTheme] = useLocalStorage<AvailableThemesType>(
    'theme',
    'light',
    ['light', 'dark']
  );
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(true);

  // controls the menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // controls the theme
  const handleThemeChange = (newTheme: AvailableThemesType) => {
    setTheme(newTheme);
  };

  // controls the text field input for writing the markdown
  const handleMarkdownChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setMarkdown(event.target.value);
  };

  // for resizing the editor
  const resizerRef = useRef<HTMLDivElement>(null);
  const editorWidth = useResizableEditor({
    initialWidth: '50%',
    minWidth: 200,
    resizerRef: resizerRef,
    isPreviewOpen: isPreviewOpen,
  });

  // toggle show/hide preview pane
  const handleTogglePreview = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsPreviewOpen((val) => !val);
  };

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <DocumentProvider>
        <Wrapper isMenuOpen={isMenuOpen} className={`theme-${theme}`}>
          <Header
            isMenuOpen={isMenuOpen}
            toggleMenu={toggleMenu}
            markdown={markdown}
          />

          <Sidebar isMenuOpen={isMenuOpen}>
            <ThemeToggle theme={theme} onChange={handleThemeChange} />
          </Sidebar>

          <Main width={editorWidth}>
            <MarkdownEditor
              markdown={markdown}
              handleMarkdownChange={handleMarkdownChange}
              isPreviewOpen={isPreviewOpen}
              handleTogglePreview={handleTogglePreview}
            />
            {/* For resizing the component */}
            <ResizeHandler ref={resizerRef} id='resizer' />
            <PreviewPane
              markdown={markdown}
              handleTogglePreview={handleTogglePreview}
              isPreviewOpen={isPreviewOpen}
              theme={theme}
            />
          </Main>
        </Wrapper>
      </DocumentProvider>
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

  background-color: ${(props) => props.theme.editorHeaderBg};
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
  grid-template-columns: ${(props) => props.width} 2.5px 1fr;
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
