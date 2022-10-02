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
  DivButton,
  SectionFooter,
  DivFooterBottom,
  DivFooterMenu,
  SimulatorCanvas,
} from './estilos/styles';

import { Button, CanvasButton1, CanvasButton2 } from './components/Button';
import pixelToRem from './utils/pxToRem';
import { main, start, stop, cpu } from '../simulator/main';
import React from 'react';

function useForceUpdate() {
  const [value, setValue] = React.useState(0); // integer state
  return () => setValue(value => value + 1); // update state to force render
  // An function that increment 👆🏻 the previous state like here
  // is better than directly setting `value + 1`
}

function App() {
  const forceUpdate = useForceUpdate();
  const [cpuState, setCpuState] = React.useState(cpu);
  // const forceUpdate = React.useCallback(() => updateState(undefined), []);
  React.useEffect(() => {
    main(forceUpdate);
  }, []);

  React.useEffect(() => {
    setCpuState(cpu);
  });

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
          <div onClick={() => cpu.addProcess(10000, 30)}>
            <CanvasButton1 text="NOVO" />
          </div>
          <div onClick={() => cpu.addProcess(null, 4, 4)}>
            <CanvasButton1 text="PAUSAR" />
          </div>
          <div onClick={() => cpu.addProcess(100000)}>
            <CanvasButton1 text="FINALIZAR" />
          </div>
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
        <div>{JSON.stringify(cpu)}</div>
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
