import * as React from 'react';
import {
  Box,
  Toolbar,
  IconButton,
  CssBaseline,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { ThemeProvider } from '@mui/material/styles';

import { SimulatorTitle, SimulatorCanvas } from './estilos/styles';
import { darkTheme } from './estilos/globalstyles';
import DrawerMenu from './MainPage/DrawerMenu';
import AppBar from './MainPage/AppBar';
import ProcessesDisplay from './MainPage/ProcessesDisplay';
import { cpuContext } from './context/CpuContext';
import { CpuCard, MemoryUsage, IoValue } from './components/CpuCard';
import AddForm from './AddForm';
import MainModal from './MainPage/MainModal';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DeleteIcon from '@mui/icons-material/Delete';
import MemoryIcon from '@mui/icons-material/Memory';

import { removeCluster, addProcess } from '../simulator/main';

enum actionModes {
  Process = 0,
  CPU = 1,
}

export default function Simulador() {
  const { clusters, forceUpdate } = React.useContext(cpuContext);

  // ESTADO DO MENU(DRAWER) LATERAL
  const [open, setOpen] = React.useState(false);

  // ESTADO DO MODAL
  const [openMainModal, setMainModalOpen] = React.useState(false);
  const [mode, setMode] = React.useState(1);
  const [cluster, setCluster] = React.useState<number>(-1);

  const handleChange = (event: SelectChangeEvent) => {
    setCluster(Number(event.target.value));
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ py: 10, pl: 10 }}>
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
        {clusters?.map((cluster, cindex) => {
          let cpus = cluster.cpus;
          return (
            <Box component="main" sx={{ p: 2, mb: 5 }} key={cluster.clusterId + cindex}>
              <Grid container sx={{ height: '100%', 'min-height': '256px' }} columnSpacing={2}>
                <Grid item xs={9}>
                  <Grid container xs={12} alignItems="center" justifyContent={'space-between'}>
                    <Grid item>
                      <SimulatorTitle>Cluster {cluster.clusterId}</SimulatorTitle>
                    </Grid>
                    <Grid item>
                      <IconButton onClick={() => cluster.startAll()}>
                        <PlayArrowIcon />
                      </IconButton>
                      <IconButton onClick={() => cluster.stopAll()}>
                        <PauseIcon />
                      </IconButton>
                      <IconButton onClick={() => removeCluster(cluster.clusterId)}>
                        <DeleteIcon />
                      </IconButton>
                      <IconButton onClick={() => cluster.addCpu()}>
                        <MemoryIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                  <SimulatorCanvas>
                    <ProcessesDisplay clusterId={cluster.clusterId} />
                  </SimulatorCanvas>
                </Grid>
                <Grid item xs={3}>
                  <>
                    <MemoryUsage clusterId={cluster.clusterId} />
                    <IoValue clusterId={cluster.clusterId} />
                    {cpus?.map((cpu, index) => (
                      <CpuCard
                        key={cpu.cpuId + index}
                        clusterId={cluster.clusterId}
                        cpuId={cpu.cpuId}
                      />
                    ))}
                  </>
                </Grid>
              </Grid>
            </Box>
          );
        })}
      </Box>

      <MainModal open={openMainModal} handleClose={setMainModalOpen}>
        <>
          <Typography
            id="transition-modal-title"
            variant="h6"
            component="h2"
            style={{ marginBottom: 20, fontWeight: 'bold' }}
          >
            Adicionar {mode === actionModes.Process ? 'Processo' : 'CPU'}
          </Typography>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Cluster</InputLabel>
            <Select label="Cluster" onChange={handleChange} value={JSON.stringify(cluster)}>
              {[<MenuItem value={-1}>Escalonamento automático</MenuItem>].concat(
                ...(clusters || []).map(
                  cluster =>
                    <MenuItem value={cluster.clusterId}>Cluster {cluster.clusterId}</MenuItem> ?? []
                )
              )}
            </Select>
          </FormControl>

          <AddForm
            mode={mode}
            handleExternalSubmit={(data: any) => {
              let c = clusters?.find(e => e.clusterId === cluster);
              if (mode === actionModes.Process) {
                if (c) {
                  c.addProcess(data);
                } else {
                  addProcess(data);
                }
              } else {
                if (c) c.addCpu();
              }
            }}
          />
        </>
      </MainModal>

      <DrawerMenu
        open={open}
        handleClose={setOpen}
        handleModalOpen={() => setMainModalOpen(true)}
        handleModeOperation={(newMode: number) => setMode(newMode)}
      />
    </ThemeProvider>
  );
}
