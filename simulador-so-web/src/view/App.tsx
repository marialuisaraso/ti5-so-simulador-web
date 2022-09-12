import { GlobalStyles } from './estilos/globalstyles'

import {
  Container, Header, Logo, Main, FirstTitle, SecondTitle, Subtitle, DivButton, SecondSubTitle, TextLogo, DivLogo, DivLogoFooter, SectionFooter, DivImageSmoke, DivFooterBottom, DivFooterMenu
} from './estilos/styles'

import Button from './components/Button'
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

          <SecondTitle>Simule um sistema operacional de maneira simples e gráfica. <span>.</span></SecondTitle>


          <DivButton>
            <Button text="COMEÇAR" fullWidth />
          </DivButton>

        </Main>

      </Container>

        <SectionFooter>
          <DivImageSmoke>
            <img src="/images/smoke.svg" alt="" />
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
