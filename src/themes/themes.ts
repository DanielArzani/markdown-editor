export const lightTheme = {
  headerBg: '#2B2D31',

  menuBtnBg: '#35393F',
  menuBtnBgHover: '#5A6069',

  saveBtnBg: '#E46643',
  saveBtnText: '#FFFFFF',
  saveBtnBgHover: '#F39765',
  saveBtnTextHover: '#FFFFFF',

  editorBody: '#FFFFFF',
  editorText: '#35393F',
};

export const darkTheme = {
  headerBg: '#2B2D31',

  menuBtnBg: '#35393F',
  menuBtnBgHover: '#5A6069',

  saveBtnBg: '#E46643',
  saveBtnText: '#FFFFFF',
  saveBtnBgHover: '#F39765',
  saveBtnTextHover: '#FFFFFF',

  editorBody: '#1D1F22',
  editorText: '#C1C4CB',
};

// For creating global styles
/*
globalStyles.ts

import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${props => props.theme.body};
    color: ${props => props.theme.text};
    transition: all 0.50s linear;
  }
`;

  In your App.ts, include the global style

import { GlobalStyles } from './globalStyles';

  Inside your App component, before return statement
<GlobalStyles />
*/
