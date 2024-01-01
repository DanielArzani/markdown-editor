import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';

import { darkTheme, lightTheme } from '../../themes/themes';

/**
 * Markdown Editor App
 */
function App() {
  const [theme, setTheme] = useState<string>('light');

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
      <div className={theme}>
        <H1 className=''>Markdown Editor</H1>
      </div>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </ThemeProvider>
  );
}

export default App;

const H1 = styled.h1`
  color: ${(props) => props.theme.editorText};
  font-size: 78px;
`;
