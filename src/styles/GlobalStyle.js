import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  *{
    font-family: 'Spoqa Han Sans Neo', 'sans-serif';
    box-sizing: border-box;
  };
  `;

export default GlobalStyle;
