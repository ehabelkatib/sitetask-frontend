import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
*,
*::before,
*::after{
    padding:0;
    margin: 0;
    box-sizing: inherit;
   
}
a{
  text-decoration:none;
  font-family: inherit;
}
html{
     min-height:100%;
    box-sizing: border-box;
}
body{
    background: #eee;
    height:100%;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    transition: all 0.50s linear;
}
`;
