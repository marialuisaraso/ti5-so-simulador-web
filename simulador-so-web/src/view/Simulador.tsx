import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/Add';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import DiscreteSlider from './slider';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import pixelToRem from './utils/pxToRem';
import { main, start, stop, cpu } from '../simulator/main';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

import { Container, SimulatorTitle, SimulatorCanvas, MenuTitles } from './estilos/styles';
import AddProcessForm from './MainPage/AddProcessForm';
import ProcessList from './MainPage/ProcessList';

//TEMA DO CSS DA PÁGINA
const darkTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

function useForceUpdate() {
  const [value, setValue] = React.useState(0); // integer state
  return () => setValue(value => value + 1); // update state to force render
  // An function that increment 👆🏻 the previous state like here
  // is better than directly setting `value + 1`
}

//CONFIGURAÇÕES DO DRAWER(MENU) LATERAL
const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: prop => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  })
);

//MENU(DRAWER) LATERAL
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

  const theme = useTheme();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  //FUNÇÃO QUE CONFERE O TEXTO DO BOTÃO DO MENU LATERAL PARA ASSOCIÁ-LO À FUNÇÃO CERTA DO SIMULADOR
  const checkMenuText = (text: string) => {
    if (text === 'Iniciar') {
      start();
    }
    if (text === 'Parar') {
      stop();
    }
    if (text === 'Adicionar') {
      handleAddModalOpen();
    }
    if (text === 'Suspender') {
      return cpu.addProcess(null, 4, 4);
    }
    if (text === 'Excluir') {
      return cpu.addProcess(100000);
    }
    if (text === 'Listar') {
      handleListModalOpen();
    }
    return 0;
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

        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />

          {/* BOTÕES DE SIMULAÇÃO LIGADOS ÀS SUAS RESPECTIVAS FUNÇÕES */}
          <List>
            {open ? (
              <Typography style={{ marginLeft: 23, marginTop: 10, fontWeight: 'bold' }}>
                SIMULAÇÃO
              </Typography>
            ) : null}
            {['Iniciar', 'Parar'].map((text, index) => (
              <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                  onClick={() => checkMenuText(text)}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 2 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {index === 0 ? <PlayCircleOutlineIcon onClick={start} /> : null}
                    {index === 1 ? <StopCircleIcon onClick={stop} /> : null}
                  </ListItemIcon>
                  <MenuTitles>{open ? text : null}</MenuTitles>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />

          {/* BOTÕES DE PROCESSO LIGADOS ÀS SUAS RESPECTIVAS FUNÇÕES */}
          <List>
            {open ? (
              <Typography style={{ marginLeft: 23, marginTop: 10, fontWeight: 'bold' }}>
                PROCESSOS
              </Typography>
            ) : null}
            {['Adicionar', 'Suspender', 'Excluir', 'Listar'].map((text, index) => (
              <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                  onClick={() => checkMenuText(text)}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 2 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {index === 0 ? <AddIcon onClick={() => handleAddModalOpen()} /> : null}
                    {index === 1 ? (
                      <HourglassTopIcon onClick={() => cpu.addProcess(null, 4, 4)} />
                    ) : null}
                    {index === 2 ? <DeleteIcon onClick={() => cpu.addProcess(100000)} /> : null}
                    {index === 3 ? (
                      <FormatListBulletedIcon onClick={() => handleListModalOpen()} />
                    ) : null}
                  </ListItemIcon>
                  <MenuTitles>{open ? text : null}</MenuTitles>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />

          {/* SLIDER DE CONFIGURAÇÃO DO TEMPO DE ROUND-ROBIN */}
          <List>
            {open ? (
              <Typography
                style={{ marginLeft: 23, marginTop: 10, marginBottom: 10, fontWeight: 'bold' }}
              >
                ROUND-ROBIN
              </Typography>
            ) : null}
            {['Ajustar tempo'].map((text, index) => (
              <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                <ListItem
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 2 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {index === 0 ? <AccessTimeIcon /> : null}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItem>
              </ListItem>
            ))}
          </List>
          {open ? <DiscreteSlider /> : null}
        </Drawer>
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
