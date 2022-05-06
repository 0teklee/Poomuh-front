import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  body{
    font-family: 'Spoqa Han Sans Neo', 'sans-serif';
    box-sizing: border-box;
  }
  * {
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
  display: none;
    }
  }

  `;

export default GlobalStyle;
