import React, { useRef, useState } from 'react';

import styled, { ThemeProvider } from 'styled-components';

import { AvailableThemesType } from '../../types/availableThemesType';
import { darkTheme, lightTheme } from '../../themes/themes';
import Header from '../Header';
import MarkdownEditor from '../MarkdownEditor';
import PreviewPane from '../PreviewPane';
import Sidebar from '../Sidebar';
import ThemeToggle from '../ThemeToggle';
import useLocalStorage from '../../hooks/useLocalStorage';
import { useResizableEditor } from '../../hooks/useResizableEditor';
import { DocumentType } from '../../types/documentType';
import { useDocumentContext } from '../../contexts/DocumentsContext';
import UploadBackupButton from '../UploadBackupButton';

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
  const { documents } = useDocumentContext();
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

  // for downloading documents as a backup
  const downloadBackup = (documents: DocumentType[]) => {
    const dataStr = JSON.stringify(documents);
    const blob = new Blob([dataStr], { type: 'text/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'backup.json';
    link.click();
  };

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <Wrapper isMenuOpen={isMenuOpen} className={`theme-${theme}`}>
        <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        <Sidebar isMenuOpen={isMenuOpen}>
          <ThemeToggle theme={theme} onChange={handleThemeChange} />
          <button onClick={() => downloadBackup(documents)}>
            Download Backup Files
          </button>

          <UploadBackupButton />
        </Sidebar>

        <Main width={editorWidth}>
          <MarkdownEditor
            isPreviewOpen={isPreviewOpen}
            handleTogglePreview={handleTogglePreview}
          />
          {/* For resizing the component */}
          <ResizeHandler ref={resizerRef} id='resizer' />
          <PreviewPane
            handleTogglePreview={handleTogglePreview}
            isPreviewOpen={isPreviewOpen}
            theme={theme}
          />
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
