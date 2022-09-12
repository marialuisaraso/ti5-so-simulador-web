import styled from "styled-components";
import pixelToRem from "../../utils/pxToRem";

import { ButtonProps } from ".";

export const ButtonComponent = styled.button<ButtonProps>`
  background: var(--roxo);
  width: ${({ fullWidth }) => (fullWidth ? "100%" : pixelToRem(200))};
  height: ${pixelToRem(60)};
  border: none;
  border-radius: ${pixelToRem(6)};
  color: var(--text);
  font: var(--text-3);
  font-weight: 700;

  &:hover {
    cursor: pointer;
  }
`;

export const CanvasButtonComponent = styled.button<ButtonProps>`
  background: none;
  width: ${({ fullWidth }) => (fullWidth ? "100%" : pixelToRem(200))};
  height: ${pixelToRem(40)};
  border: 2px solid; /* As 4 bordas sólidas com 5px de espessura */
  border-color: var(--azul);
  border-radius: ${pixelToRem(6)};
  color: var(--text);
  font: var(--text-3);
  font-weight: 500;
  position: relative;
  margin: auto 5px 15px 5px; 

  &:hover {
    cursor: pointer;
  }
`;