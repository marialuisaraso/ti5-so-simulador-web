import * as React from 'react';
import { Box, Toolbar, IconButton, CssBaseline, Typography, Grid } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { ThemeProvider } from '@mui/material/styles';

import { Container, SimulatorTitle, SimulatorCanvas } from './estilos/styles';
import { darkTheme } from './estilos/globalstyles';
import pixelToRem from './utils/pxToRem';
import AddProcessForm from './MainPage/AddProcessForm';
import ProcessModal from './MainPage/ProcessModal';
import DrawerMenu from './MainPage/DrawerMenu';
import AppBar from './MainPage/AppBar';
import ProcessesDisplay from './MainPage/ProcessesDisplay';
import { cpuContext } from './context/CpuContext';
import CpuCard from './components/CpuCard';

export default function Simulador() {
  const { cpu, forceUpdate } = React.useContext(cpuContext);

  // ESTADO DO MENU(DRAWER) LATERAL
  const [open, setOpen] = React.useState(false);

  // ESTADO DO MODAL DE ADICIONAR PROCESSO
  const [openAddModal, setAddModalOpen] = React.useState(false);

  // ESTADO DO MODAL DE EXCLUIR PROCESSO
  const [openExcludeModal, setExcludeModalOpen] = React.useState(false);

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open} style={{ backgroundColor: '#680079' }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => setOpen(true)}
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

        {/* FORA DO MENU(DRAWER) - CANVAS DO SIMULADOR EM SI */}
        <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
          <Container flex="column" margin={pixelToRem(70, 112, 50)}>
            <SimulatorTitle>GERÊNCIA DE PROCESSOS</SimulatorTitle>
            <Grid container sx={{ height: '100%' }} columnSpacing={2}>
              <Grid item xs={9}>
                <SimulatorCanvas>
                  <ProcessesDisplay />
                </SimulatorCanvas>
              </Grid>
              <Grid item xs={3}>
                <CpuCard />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
      {/* MODAL QUE ABRE EM ADICIONAR PROCESSO */}
      <AddProcessForm open={openAddModal} handleClose={setAddModalOpen} />
      {/* MODAL QUE ABRE EM EXCLUIR PROCESSO */}
      <ProcessModal open={openExcludeModal} handleClose={setExcludeModalOpen} />

      <DrawerMenu
        open={open}
        handleClose={setOpen}
        handleAddModalOpen={() => setAddModalOpen(true)}
        handleExcludeModalOpen={() => setExcludeModalOpen(true)}
      />
    </ThemeProvider>
  );
}
