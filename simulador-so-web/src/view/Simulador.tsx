import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
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
import CloseIcon from '@mui/icons-material/Close';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import DiscreteSlider from './slider';
import DeleteIcon from '@mui/icons-material/Delete';
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
  MenuTitles
} from './estilos/styles';

import { Button, CanvasButton1, CanvasButton2 } from './components/Button';
import pixelToRem from './utils/pxToRem';
import { main, start, stop, cpu } from '../simulator/main';
import { ThemeProvider, createTheme } from '@mui/material/styles';

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
  shouldForwardProp: (prop) => prop !== 'open',
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

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
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
  }),
);

export default function MiniDrawer() {
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
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
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
            <Subtitle>
              SIMULADOR DE SISTEMA OPERACIONAL MULTICORE
            </Subtitle>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {['ADICIONAR PROCESSO', 'SUSPENDER PROCESSO', 'EXCLUIR PROCESSO'].map((text, index) => (
              <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
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
                    {index === 0 ? <AddIcon /> : null}
                    {index === 1 ? <StopCircleIcon /> : null}
                    {index === 2 ? <DeleteIcon /> : null}

                  </ListItemIcon>
                  <MenuTitles>
                    {open ? text : null}
                  </MenuTitles>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['TEMPO ROUND-ROBIN'].map((text, index) => (
              <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
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
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          {open ? <DiscreteSlider /> : null}

        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Container flex="column" margin={pixelToRem(70, 112, 50)} id="topo">
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
        </Box>
      </Box>
    </ThemeProvider>
  );
}

