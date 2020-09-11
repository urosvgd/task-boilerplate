import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`

body,html {
  height: 100%;
}

body {
  font-family: 'Julius Sans One', sans-serif;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
}
`;

export default GlobalStyles;
