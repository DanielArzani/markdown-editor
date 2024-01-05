import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Resizable } from 're-resizable';

import { darkTheme, lightTheme } from '../../themes/themes';
import Header from '../Header';
import Sidebar from '../Sidebar';
import ThemeToggle from '../ThemeToggle';
import { AvailableThemes } from '../../types/availableThemes';
import MarkdownEditor from '../MarkdownEditor';
import PreviewPane from '../PreviewPane';

// styles for the re-sizable pane component
const style = {
  display: 'grid',
  'grid-template-columns': '1fr 1fr',
  'grid-template-rows': '1fr',
  height: '100%',
  overflow: 'hidden',
};

type WrapperProps = {
  isMenuOpen: boolean;
};

/**
 * Markdown Editor App
 */
function App() {
  const [markdown, setMarkdown] = useState('');
  const [theme, setTheme] = useState<AvailableThemes>('light');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

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

        <Resizable style={style}>
          <MarkdownEditor
            markdown={markdown}
            handleMarkdownChange={handleMarkdownChange}
          />

          <PreviewPane markdown={markdown} />
        </Resizable>
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

  & > :nth-child(3) {
    grid-column: 2/-1;
    grid-row: 2/3;
  }
`;
