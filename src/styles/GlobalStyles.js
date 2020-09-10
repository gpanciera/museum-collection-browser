import { createGlobalStyle } from "styled-components";

const px2vw = (size, width = 1440) => `${(size / width) * 100}vw`;

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    ${'' /* font-size: 100%; */}
  }

  body {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-style: normal;
    color: var(--cma-purple);
  }

  :root {
    font-size: ${px2vw(24)};

    @media (min-width: 768px) {
      font-size: ${px2vw(18)};
    }

    @media (min-width: 1024px) {
      font-size: ${px2vw(16)};
    }
    --cma-green: rgb(39,121,105);
    --cma-purple: rgb(142,98,165);
    
    --cma-gray1: rgb(233,233,233);
    --cma-gray2: rgb(164,166,167);
    --cma-gray3: rgb(123,124,125);
    
    --cma-text1: rgb(136,136,136);
    --cma-text2: rgb(68,68,68);
    --cma-text3: rgb(0,0,0);
    }
`;

export default GlobalStyles;