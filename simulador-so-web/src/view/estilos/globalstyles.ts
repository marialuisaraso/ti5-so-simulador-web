import { createGlobalStyle } from "styled-components";

import pixelToRem from "../utils/pxToRem";
import { device } from "./responsive";

export const GlobalStyles = createGlobalStyle`
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
 }

html {
    scroll-behavior: smooth;
 }

body{
  font-family: "Montserrat", sans-serif;
  -webkit-font-smoothing: antialiased;
  background-color: var(--background);
 }

:root {
  /* Colors */

  --space: #0B1E8A;
  --space-ligth: #3D68B2;
  --space-dark: #040327;
  --gray-01: #0D0E13;
  --gray-02: #2C2D3A;
  --gray-03: #60616F;
  --gray-04: #898A93;
  --gray-05: #D5D5DB;
  --roxo: #C100CC;
  --azul: #6157DD;
  --verde-claro: #00FFFF;
  --azul-claro: #00AFEF;
  --text: #FFF;
  --background: #504050;
  --background-section: linear-gradient(180deg, #040327 0%, #0D0E13 24.49%);
  --background-form: #808080;
  
  /* Fonts */
    --font-display: 500 ${pixelToRem(60)}/${pixelToRem(90)} "Montserrat", sans-serif;

    --font-heading-1: 400 ${pixelToRem(32)}/${pixelToRem(
  48
)} "Montserrat", sans-serif;

    --font-heading-2: 500 ${pixelToRem(24)}/${pixelToRem(
  32
)} "Montserrat", sans-serif;

    --font-heading-3: 400 ${pixelToRem(20)}/${pixelToRem(
  24
)} "Montserrat", sans-serif;


--font-mobile-heading-1: 500 ${pixelToRem(36)}/${pixelToRem(
  50
)} "Montserrat", sans-serif;

--font-mobile-text-1: 400 ${pixelToRem(14)}/${pixelToRem(
  24
)} "Montserrat", sans-serif;


--text-4: 500 ${pixelToRem(18)}/${pixelToRem(32)} "Montserrat", sans-serif;
--text-3: 500 ${pixelToRem(18)}/${pixelToRem(24)} "Montserrat", sans-serif;
--text-2: 500 ${pixelToRem(14)}/${pixelToRem(20)} "Montserrat", sans-serif;
--text-1: 400 ${pixelToRem(16)}/${pixelToRem(24)} "Montserrat", sans-serif;
--text-0: 400 ${pixelToRem(14)}/${pixelToRem(24)} "Montserrat", sans-serif;

}`;
