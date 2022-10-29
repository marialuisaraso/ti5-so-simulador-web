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
  const [cluster, setCluster] = React.useState<number>(0);

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
            <Box component="main" sx={{ p: 2 }} key={cluster.clusterId + cindex}>
              <SimulatorTitle>Cluster {cindex + 1}</SimulatorTitle>
              <Grid container sx={{ height: '100%' }} columnSpacing={2}>
                <Grid item xs={9}>
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
              {clusters?.map((cluster, idx) => (
                <MenuItem value={cluster.clusterId}>Cluster {idx + 1}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <AddForm
            mode={mode}
            handleExternalSubmit={(data: any) => {
              let clusterIdx = clusters?.findIndex(e => e.clusterId === cluster);
              if (mode === actionModes.Process) {
                if (clusters)
                  clusters[clusterIdx === -1 || !clusterIdx ? 0 : clusterIdx]?.addProcess(data);
              } else {
                if (clusters) clusters[clusterIdx === -1 || !clusterIdx ? 0 : clusterIdx]?.addCpu();
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
