import styled from 'styled-components';
import pixelToRem from '../utils/pxToRem';
import { device } from './responsive';
import logo from '../imagens/escritoLogo.png';

interface GalleryFlexContainerProps {
    flex?: 'row' | 'column';
    width?: string;
    margin?: string;
    padding?: string;
    alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch';
    justifyContent?:
        | 'flex-start'
        | 'flex-end'
        | 'center'
        | 'space-between'
        | 'space-around'
        | 'space-evenly';
}

export const Container = styled.div<GalleryFlexContainerProps>`
    display: flex;
    flex-direction: ${props => props.flex};
    width: ${props => props.width};
    margin: ${props => props.margin};
    padding: ${props => props.padding};
    align-items: ${props => props.alignItems};
    justify-content: ${props => props.justifyContent};

    @media ${device.mobile} {
        margin: ${pixelToRem(17)};
        align-items: center;
        justify-content: center;
    }
`;

export const Header = styled.div`
    display: flex;
    padding-bottom: ${pixelToRem(95)};

    @media ${device.mobile} {
        padding-bottom: ${pixelToRem(78)};
    }
`;

export const LogoSuperior = styled.image<GalleryFlexContainerProps>`
    width: ${pixelToRem(480)};
    height: ${pixelToRem(100)};
    background-image: url(${logo});
    margin-top: 20px;
    margin-bottom: 1px;
    @media ${device.mobile} {
        height: ${pixelToRem(30)};
    }
`;

export const LogoInferior = styled.image<GalleryFlexContainerProps>`
    width: ${pixelToRem(480)};
    height: ${pixelToRem(100)};
    background-image: url(${logo});
    margin-top: -40px;
    margin-bottom: 40px;
    @media ${device.mobile} {
        height: ${pixelToRem(30)};
    }
`;

export const Main = styled.div`
    display: flex;
    flex-direction: column;
    max-width: ${pixelToRem(815)};
    padding-bottom: ${pixelToRem(103)};
    margin-top: -20px;

    @media ${device.mobile} {
        max-width: 100vw;
        align-items: center;
        justify-content: center;
    }
`;

export const FirstTitle = styled.div`
    color: var(--verde-claro);
    font: var(--text-4);
    text-transform: uppercase;
    letter-spacing: ${pixelToRem(5)};

    @media ${device.mobile} {
        font: var(--font-mobile-text-1);
        letter-spacing: ${pixelToRem(5)};
        padding-bottom: ${pixelToRem(11)};
    }
`;

export const SecondTitle = styled.p`
    color: var(--text);
    font: var(--font-display);

    @media ${device.mobile} {
        font: var(--font-mobile-heading-1);
        text-align: center;
    }

    span {
        color: var(--azul-claro);
    }
`;

export const SimulatorTitle = styled.div`
    color: var(--verde-claro);
    font: var(--text-4);
    text-transform: uppercase;
    letter-spacing: ${pixelToRem(5)};

    @media ${device.mobile} {
        font: var(--font-mobile-text-1);
        letter-spacing: ${pixelToRem(5)};
        padding-bottom: ${pixelToRem(11)};
    }
`;

export const SimulatorCanvas = styled.div`
  width: 100%;
  height: ${pixelToRem(800)} ;
  border: 5px solid; /* As 4 bordas sólidas com 5px de espessura */
  border-color: var(--roxo); 
  margin-top: 20px;
  margin-BOTTOM: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;

  @media ${device.mobile} {
    font: var(--font-mobile-text-1);
    letter-spacing: ${pixelToRem(5)};
    padding-bottom: ${pixelToRem(11)};
  }
  }
`;

export const Subtitle = styled.p`
    color: var(--gray-05);
    font: var(--font-heading-3);
    max-width: ${pixelToRem(728)};

    @media ${device.mobile} {
        padding: ${pixelToRem(16, 0, 32, 0)};
        text-align: center;
        max-width: ${pixelToRem(307)};
    }
`;

export const DivButton = styled.div`
    width: ${pixelToRem(264)};
    padding-top: ${pixelToRem(32)};

    @media ${device.mobile} {
        padding-bottom: ${pixelToRem(63)};
    }
`;

export const SecondSubTitle = styled.p`
    font: var(--font-heading-1);
    color: var(--text);
    padding-top: ${pixelToRem(14)};
`;

export const DivLogo = styled.div<GalleryFlexContainerProps>`
    max-width: ${pixelToRem(350)};
    margin-right: ${pixelToRem(30)};
`;

export const DivLogoFooter = styled.div`
    display: flex;
    padding-bottom: ${pixelToRem(13)};
`;

export const TextLogo = styled.p`
    font: var(--font-heading-1);
    color: var(--text);
`;

export const SectionFooter = styled.div`
    display: flex;
    flex-direction: column;

    @media ${device.mobile} {
        display: none;
    }
`;

export const DivImageSmoke = styled.div`
    width: 100%;

    & img {
        width: 100%;
    }
`;

export const DivFooterBottom = styled.div`
    display: flex;
    justify-content: space-around;
`;

export const DivFooterMenu = styled.div`
    gap: ${pixelToRem(53)};

    & ul {
        display: flex;
        list-style: none;
        gap: ${pixelToRem(53)};
    }

    & a {
        color: var(--text);
        font: var(--text-3);
        text-decoration: none;
    }
`;
