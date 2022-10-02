import { Divider, IconButton, List, Typography, useTheme } from '@mui/material';
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
import DiscreteSlider from '../slider';
import DrawerItem from './DrawerComponents/DrawerItem';
import Drawer from './DrawerComponents/Drawer';
import DrawerHeader from './DrawerComponents/DrawerHeader';

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
          <DrawerItem key={text} isOpen={open} text={text} action={() => checkMenuText(text)}>
            <>
              {index === 0 ? <PlayCircleOutlineIcon onClick={start} /> : null}
              {index === 1 ? <StopCircleIcon onClick={stop} /> : null}
            </>
          </DrawerItem>
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
          <DrawerItem key={text} isOpen={open} text={text} action={() => checkMenuText(text)}>
            <>
              {index === 0 ? <AddIcon onClick={() => handleAddModalOpen()} /> : null}
              {index === 1 ? <HourglassTopIcon onClick={() => cpu.addProcess(null, 4, 4)} /> : null}
              {index === 2 ? <DeleteIcon onClick={() => cpu.addProcess(100000)} /> : null}
              {index === 3 ? (
                <FormatListBulletedIcon onClick={() => handleListModalOpen()} />
              ) : null}
            </>
          </DrawerItem>
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
          <DrawerItem key={text} isOpen={open} text={text} action={() => checkMenuText(text)}>
            <>{index === 0 ? <AccessTimeIcon /> : null}</>
          </DrawerItem>
        ))}
      </List>
      {open ? <DiscreteSlider /> : null}
    </Drawer>
  );
};

export default DrawerMenu;
