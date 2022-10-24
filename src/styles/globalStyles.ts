import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: Open-Sans, Helvetica, Sans-Serif,serif;
    padding: 20px;
    min-height: 100vh;
    box-sizing: border-box;
    background-image: linear-gradient(-85deg, #2C5364, #203A43, #0F2027);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50% 50%;
  }
`
