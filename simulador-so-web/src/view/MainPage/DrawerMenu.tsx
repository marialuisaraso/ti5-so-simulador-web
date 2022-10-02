import {
  CSSObject,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Theme,
  Typography,
  useTheme,
} from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import AddIcon from '@mui/icons-material/Add';

import { start, cpu, stop } from '../../simulator/main';
import { MenuTitles } from '../estilos/styles';
import DiscreteSlider from '../slider';

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

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

type AddProcessFormProps = {
  open: boolean;
  handleClose: Function;
  handleAddModalOpen: Function;
  handleListModalOpen: Function;
};

const DrawerMenu = ({
  open,
  handleClose,
  handleAddModalOpen,
  handleListModalOpen,
}: AddProcessFormProps) => {
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
  const theme = useTheme();
  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={() => handleClose(false)}>
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
  );
};

export default DrawerMenu;
