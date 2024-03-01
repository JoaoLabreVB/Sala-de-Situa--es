import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  * {
    padding: 0;
    margin: 0;

    box-sizing: border-box;
    outline: none;
  }

  html {
    font-size: 62.5%;
    font-family: 'Roboto', sans-serif;
  }

  body {
    width: 100vw;
    height: 100vh;

    /* Works on Firefox */
    * {
      scrollbar-width: thin;
      scrollbar-color: ${(props) => props.theme.COLORS.grey_1} transparent;
    }

    /* Works on Chrome, Edge, and Safari */
    *::-webkit-scrollbar {
      width: 4px;
      height: 4px;
      margin-left: 4px;
    }

    *::-webkit-scrollbar-track {
      width: 5px;
      background: transparent;
    }

    *::-webkit-scrollbar-thumb {
      background-color: ${(props) => props.theme.COLORS.grey};
      border-radius: 20px;
    }

    background-color: ${(props) => props.theme.COLORS.white};
  }

  a, button, input, text-area {
    font-family: 'Roboto', sans-serif;
    text-decoration: none;
  }
`
