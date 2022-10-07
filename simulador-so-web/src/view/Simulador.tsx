import * as React from 'react';
import { Box, Toolbar, IconButton, CssBaseline, Typography, Grid } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { ThemeProvider } from '@mui/material/styles';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';

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
import { Process } from '../simulator/model/process';

enum actionModes {
  Exclude = 1,
  Suspend = 2,
  Wake = 3,
}

export default function Simulador() {
  const { cpu, forceUpdate } = React.useContext(cpuContext);

  // ESTADO DO MENU(DRAWER) LATERAL
  const [open, setOpen] = React.useState(false);

  // ESTADO DO MODAL DE ADICIONAR PROCESSO
  const [openAddModal, setAddModalOpen] = React.useState(false);

  // ESTADO DO MODAL DE EXCLUIR PROCESSO
  const [openExcludeModal, setExcludeModalOpen] = React.useState(false);
  const [mode, setMode] = React.useState(1);

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
      <ProcessModal
        open={openExcludeModal}
        handleClose={setExcludeModalOpen}
        title={
          mode === actionModes.Exclude
            ? 'Excluir'
            : mode === actionModes.Suspend
            ? 'Suspender'
            : 'Acordar'
        }
        action={(e: Process) => {
          if (mode === actionModes.Exclude) cpu?.excludeProcess(e.pId);
          else if (mode === actionModes.Suspend) cpu?.suspendProcess(e.pId);
          else cpu?.wakeProcess(e.pId);
        }}
        displayIcon={
          mode === actionModes.Exclude ? (
            <DeleteIcon />
          ) : mode === actionModes.Suspend ? (
            <HourglassTopIcon />
          ) : (
            <VisibilityIcon />
          )
        }
      />

      <DrawerMenu
        open={open}
        handleClose={setOpen}
        handleAddModalOpen={() => setAddModalOpen(true)}
        handleExcludeModalOpen={() => setExcludeModalOpen(true)}
        handleModeOperation={(newMode: number) => setMode(newMode)}
      />
    </ThemeProvider>
  );
}
