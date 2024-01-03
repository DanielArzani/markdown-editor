export const lightTheme = {
  //*********************
  //  HEADER COMPONENT
  //*********************
  headerBg: '#2B2D31',

  menuBtnBg: '#35393F',
  menuBtnBgHover: '#E46643',

  docNameLabel: '#7C8187',
  docNameInputText: '#FFFFFF',
  docNameInputBg: '#2B2D31',

  deleteIconHover: '#E46643',

  saveBtnBg: '#E46643',
  saveBtnText: '#FFFFFF',
  saveBtnBgHover: '#F39765',
  saveBtnTextHover: '#FFFFFF',

  editorBody: '#FFFFFF',
  editorText: '#35393F',

  //*********************
  // SIDEBAR COMPONENT
  //*********************
  sidebarBg: '#1D1F22',
  sidebarText: '#FFFFFF',
  sidebarTextHover: '#E46643',
  sidebarHeader: '#7C8187',
  sidebarTime: '#7C8187',

  //*********************
  //  MODAL COMPONENT
  //*********************
  modalBg: '#FFFFFF',
  modalHeaderText: '#35393F',
  modalContentText: '#7C8187',
  modalBtnText: '#FFFFFF',
  modalBtnBg: '#E46643',
};

export const darkTheme = {
  //*********************
  //  HEADER COMPONENT
  //*********************
  headerBg: '#2B2D31',

  menuBtnBg: '#35393F',
  menuBtnBgHover: '#E46643',

  docNameLabel: '#7C8187',
  docNameInputText: '#FFFFFF',
  docNameInputBg: '#2B2D31',

  deleteIconHover: '#E46643',

  saveBtnBg: '#E46643',
  saveBtnText: '#FFFFFF',
  saveBtnBgHover: '#F39765',
  saveBtnTextHover: '#FFFFFF',

  editorBody: '#1D1F22',
  editorText: '#C1C4CB',

  //*********************
  // SIDEBAR COMPONENT
  //*********************
  sidebarBg: '#1D1F22',
  sidebarHeader: '#7C8187',
  sidebarText: '#FFFFFF',
  sidebarTextHover: '#E46643',
  sidebarTime: '#7C8187',

  //*********************
  //  MODAL COMPONENT
  //*********************
  modalBg: '#1D1F22',
  modalHeaderText: '#FFFFFF',
  modalContentText: '#C1C4CB',
  modalBtnText: '#FFFFFF',
  modalBtnBg: '#E46643',
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
