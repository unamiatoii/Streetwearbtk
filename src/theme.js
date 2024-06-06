// frontend/src/theme.js

import { createGlobalStyle } from 'styled-components';

import image1 from './assets/images/back.svg';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    padding: 0;
    box-sizing: border-box;
    background-color: #231f20;
    background-image: url(${image1});
  
  }
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }
  * {
    box-sizing: border-box;
  }
`;

export const theme = {
  colors: {
    primary: '#ffffff',
    primaryDark: '#231f20',
    secondary: '#1c1c1c',
    lightBackground: '#f0f2f5',
    darkText: '#333',
    lightText: '#231f20'
  },
  breakpoints: {
    mobile: '768px',
  },
};