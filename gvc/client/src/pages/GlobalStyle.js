import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'SpoqaHanSansNeo-Bold';
    src: url('./fonts/SpoqaHanSansNeo-Bold.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }
  
  @font-face {
    font-family: 'SpoqaHanSansNeo-Light';
    src: url('./fonts/SpoqaHanSansNeo-Light.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'SpoqaHanSansNeo-Medium';
    src: url('./fonts/SpoqaHanSansNeo-Medium.ttf') format('truetype');
    font-weight: bold;
    font-style: normal;
  }
    @font-face {
    font-family: 'SpoqaHanSansNeo-Regular';
    src: url('./fonts/SpoqaHanSansNeo-Regular.ttf') format('truetype');
    font-weight: bold;
    font-style: normal;
  }

  body {
    font-family: 'Spoqa Han Sans Neo', 'sans-serif'; 
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

export default GlobalStyle;

/*
const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Gmarket Sans Medium';
    src: url('./fonts/GmarketSansTTFMedium.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }
  
  @font-face {
    font-family: 'Gmarket Sans Light';
    src: url('./fonts/GmarketSansTTFLight.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Gmarket Sans Bold';
    src: url('./fonts/GmarketSansTTFBold.ttf') format('truetype');
    font-weight: bold;
    font-style: normal;
  }

  body {
    font-family: 'Gmarket Sans Medium', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;
*/

