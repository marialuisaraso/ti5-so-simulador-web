import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { main, cpu } from '../simulator/main';
import { Container, SimulatorTitle, SimulatorCanvas } from './estilos/styles';
import pixelToRem from './utils/pxToRem';
import AddProcessForm from './MainPage/AddProcessForm';
import ProcessList from './MainPage/ProcessList';
import DrawerMenu from './MainPage/DrawerMenu';
import { darkTheme } from './estilos/globalstyles';
import AppBar from './MainPage/AppBar';

function useForceUpdate() {
  const [value, setValue] = React.useState(0); // integer state
  return () => setValue(value => value + 1); // update state to force render
  // An function that increment 👆🏻 the previous state like here
  // is better than directly setting `value + 1`
}

export default function Simulador() {
  // ESTADO DO MENU(DRAWER) LATERAL
  const [open, setOpen] = React.useState(false);

  // ESTADO DO MODAL DE ADICIONAR PROCESSO
  const [openAddModal, setAddModalOpen] = React.useState(false);
  const handleAddModalOpen = () => setAddModalOpen(true);

  // ESTADO DO MODAL DE LISTAR PROCESSOS
  const [openListModal, setListModalOpen] = React.useState(false);
  const handleListModalOpen = () => setListModalOpen(true);

  // ESTADO DA CPU
  const forceUpdate = useForceUpdate();
  const [cpuState, setCpuState] = React.useState(cpu);

  // const forceUpdate = React.useCallback(() => updateState(undefined), []);
  React.useEffect(() => {
    main(forceUpdate);
  }, []);

  React.useEffect(() => {
    setCpuState(cpu);
  });

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open} style={{ backgroundColor: '#680079' }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography>SIMULADOR DE SISTEMA OPERACIONAL MULTICORE</Typography>
          </Toolbar>
        </AppBar>
        {/* MODAL QUE ABRE EM ADICIONAR PROCESSO */}
        <AddProcessForm open={openAddModal} handleClose={setAddModalOpen} />
        {/* MODAL QUE ABRE EM LISTAR PROCESSOS */}
        <ProcessList open={openListModal} handleClose={setListModalOpen} />

        <DrawerMenu
          open={open}
          handleClose={setOpen}
          handleAddModalOpen={handleAddModalOpen}
          handleListModalOpen={handleListModalOpen}
        />

        {/* FORA DO MENU(DRAWER) - CANVAS DO SIMULADOR EM SI */}
        <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
          <Container flex="column" margin={pixelToRem(70, 112, 50)}>
            <SimulatorTitle>GERÊNCIA DE PROCESSOS</SimulatorTitle>
            <SimulatorCanvas></SimulatorCanvas>

            <SimulatorTitle>GERÊNCIA DE PROCESSADOR</SimulatorTitle>
            <SimulatorCanvas></SimulatorCanvas>
            <div>{JSON.stringify(cpu)}</div>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
