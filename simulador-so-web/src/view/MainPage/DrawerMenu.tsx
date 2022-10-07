import { Divider, IconButton, List, Typography, useTheme } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import AddIcon from '@mui/icons-material/Add';
import AdbRoundedIcon from '@mui/icons-material/AdbRounded';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { start, stop } from '../../simulator/main';
import DiscreteSlider from '../slider';
import DrawerItem from './DrawerComponents/DrawerItem';
import Drawer from './DrawerComponents/Drawer';
import DrawerHeader from './DrawerComponents/DrawerHeader';
import React from 'react';
import { cpuContext } from '../context/CpuContext';

type AddProcessFormProps = {
  open: boolean;
  handleClose: Function;
  handleAddModalOpen: Function;
  handleExcludeModalOpen: Function;
  handleModeOperation: Function;
};

const DrawerMenu = ({
  open,
  handleClose,
  handleAddModalOpen,
  handleExcludeModalOpen,
  handleModeOperation,
}: AddProcessFormProps) => {
  const { cpu, forceUpdate } = React.useContext(cpuContext);
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
      handleModeOperation(2);
      return handleExcludeModalOpen();
    }
    if (text === 'Excluir') {
      handleModeOperation(1);
      return handleExcludeModalOpen();
    }
    if (text === 'Acordar') {
      handleModeOperation(3);
      return handleExcludeModalOpen();
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
              {index === 0 ? <PlayCircleOutlineIcon /> : null}
              {index === 1 ? <StopCircleIcon /> : null}
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
        {['Adicionar', 'Suspender', 'Excluir', 'Acordar'].map((text, index) => (
          <DrawerItem key={text} isOpen={open} text={text} action={() => checkMenuText(text)}>
            <>
              {index === 0 ? <AddIcon /> : null}
              {index === 1 ? <HourglassTopIcon /> : null}
              {index === 2 ? <DeleteIcon /> : null}
              {index === 3 ? <VisibilityIcon /> : null}
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
        {open ? <DiscreteSlider /> : null}
      </List>
      <DrawerItem
        isOpen={open}
        text={'Debug'}
        action={() => {
          console.log(cpu);
        }}
      >
        <AdbRoundedIcon />
      </DrawerItem>
    </Drawer>
  );
};

export default DrawerMenu;
