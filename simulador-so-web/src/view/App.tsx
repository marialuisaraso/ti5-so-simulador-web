import { GlobalStyles } from './estilos/globalstyles';

import {
  Container,
  Header,
  LogoSuperior,
  LogoInferior,
  Main,
  FirstTitle,
  SecondTitle,
  SimulatorTitle,
  Subtitle,
  DivButton,
  SecondSubTitle,
  TextLogo,
  DivLogo,
  DivLogoFooter,
  SectionFooter,
  DivImageSmoke,
  DivFooterBottom,
  DivFooterMenu,
  SimulatorCanvas,
} from './estilos/styles';

import { Button, CanvasButton1, CanvasButton2 } from './components/Button';
import pixelToRem from './utils/pxToRem';
import { main, start, stop } from '../simulator/main';

function App() {
  main();

  return (
    <>
      <Container flex="column" margin={pixelToRem(24, 112, 50)} id="topo">
        <GlobalStyles />

        <Header>
          <LogoSuperior />
        </Header>

        <Main>
          <FirstTitle>Finalmente é possível!</FirstTitle>
          <SecondTitle>
            Simule um sistema operacional multicore de maneira simples e gráfica <span>.</span>
          </SecondTitle>
          <DivButton>
            <a href="#simulador">
              <Button text="COMEÇAR" fullWidth />
            </a>
          </DivButton>
        </Main>

        <SimulatorTitle id="simulador">GERÊNCIA DE PROCESSOS</SimulatorTitle>
        <SimulatorCanvas>
          <CanvasButton1 text="NOVO" />
          <CanvasButton1 text="PAUSAR" />
          <CanvasButton1 text="FINALIZAR" />
        </SimulatorCanvas>

        <SimulatorTitle>GERÊNCIA DE PROCESSADOR</SimulatorTitle>
        <SimulatorCanvas>
          <div onClick={start}>
            <CanvasButton2 text="INICIAR" />
          </div>
          <div onClick={stop}>
            <CanvasButton2 text="PARAR" />
          </div>
        </SimulatorCanvas>
      </Container>

      <SectionFooter>
        <DivFooterBottom>
          <LogoInferior />

          <DivFooterMenu>
            <ul>
              <li>
                <a href="#topo">Voltar para o topo</a>
              </li>
              <li>
                <a href="#simulador">Começar</a>
              </li>
            </ul>
          </DivFooterMenu>
        </DivFooterBottom>
      </SectionFooter>
    </>
  );
}

export default App;
