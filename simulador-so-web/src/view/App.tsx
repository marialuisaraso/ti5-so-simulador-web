import { GlobalStyles } from './estilos/globalstyles'

import {
  Container, Header, Logo, Main, FirstTitle, SecondTitle, SimulatorTitle, Subtitle, DivButton, SecondSubTitle, TextLogo, DivLogo, DivLogoFooter, SectionFooter, DivImageSmoke, DivFooterBottom, DivFooterMenu, SimulatorCanvas
} from './estilos/styles'

import { Button, CanvasButton}  from './components/Button'
import pixelToRem from './utils/pxToRem'

function App() {

  return (
    <>
      <Container flex='column' margin={pixelToRem(24, 112, 50)}>
        <GlobalStyles />

        <Header>
          <Logo />
        </Header>

        <Main>
          <FirstTitle>Finalmente é possível!</FirstTitle>
          <SecondTitle>Simule um sistema operacional multicore de maneira simples e gráfica <span>.</span></SecondTitle>
          <DivButton>
            <Button text="COMEÇAR" fullWidth />
          </DivButton>
        </Main>

        <SimulatorTitle>GERÊNCIA DE PROCESSOS</SimulatorTitle>
        <SimulatorCanvas>
            <CanvasButton text="NOVO" />
            <CanvasButton text="PAUSAR" />
            <CanvasButton text="FINALIZAR" />
        </SimulatorCanvas>

        <SimulatorTitle>GERÊNCIA DE PROCESSADOR</SimulatorTitle>
        <SimulatorCanvas>
            <CanvasButton text="APLICAR ALG. 1" />
            <CanvasButton text="APLICAR ALG. 2" />
        </SimulatorCanvas>

      </Container>

        <SectionFooter>
          <DivImageSmoke>
            <img src="/images/escritoLogo.png" alt="" />
          </DivImageSmoke>

          <DivFooterBottom>
            <DivLogoFooter>
              <Logo />
            </DivLogoFooter>

            <DivFooterMenu>
              <ul>
                <li><a href="/">Voltar para o topo</a></li>
                <li><a href="/">Começar</a></li>
              </ul>
            </DivFooterMenu>
          </DivFooterBottom>
        </SectionFooter>
    </>

  );
}

export default App;
