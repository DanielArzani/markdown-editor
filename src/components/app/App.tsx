import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';

import { darkTheme, lightTheme } from '../../themes/themes';
import Header from '../Header';
import Sidebar from '../Sidebar';

type WrapperProps = {
  isMenuOpen: boolean;
};

/**
 * Markdown Editor App
 */
function App() {
  const [theme, setTheme] = useState<string>('light');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  // controls the menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // controls the theme
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('light');
    }
  };

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <Wrapper isMenuOpen={isMenuOpen} className={`theme-${theme}`}>
        <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        <Sidebar isMenuOpen={isMenuOpen} />
        {/* <button onClick={toggleTheme}>Toggle Theme</button> */}
      </Wrapper>
    </ThemeProvider>
  );
}

export default App;

const Wrapper = styled.div<WrapperProps>`
  display: grid;
  grid-template-rows: 74px 1fr;
  grid-template-columns: ${(props) =>
    props.isMenuOpen ? '15.625rem 1fr' : '0px 1fr'};
  transition: grid-template-columns 0.3s;

  height: 100vh;
  max-width: 90rem;
  margin: 0 auto;
  overflow-x: hidden;

  & > header {
    grid-column: 2/3;
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
