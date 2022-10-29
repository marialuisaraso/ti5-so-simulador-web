import { Divider, IconButton, List, Typography, useTheme } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import AddIcon from '@mui/icons-material/Add';
import AdbRoundedIcon from '@mui/icons-material/AdbRounded';

import MemoryIcon from '@mui/icons-material/Memory';
import QueueIcon from '@mui/icons-material/Queue';

import { start, stop } from '../../simulator/main';
import DiscreteSlider from '../slider';
import DrawerItem from './DrawerComponents/DrawerItem';
import Drawer from './DrawerComponents/Drawer';
import DrawerHeader from './DrawerComponents/DrawerHeader';
import React from 'react';
import { cpuContext } from '../context/CpuContext';

import { clusters as gambis } from '../../simulator/main';
import { Cluster } from '../../simulator/model/cluster';

type AddProcessFormProps = {
  open: boolean;
  handleClose: Function;
  handleModalOpen: Function;
  handleModeOperation: Function;
};

const DrawerMenu = ({
  open,
  handleClose,
  handleModalOpen,
  handleModeOperation,
}: AddProcessFormProps) => {
  const { clusters, forceUpdate } = React.useContext(cpuContext);
  const [roundRobin, setRoundRobin] = React.useState(1);

  React.useEffect(() => {
    if (clusters)
      clusters.forEach(c => c.cpus.forEach(cpu => cpu.setRoundRobin(roundRobin * 1000)));
  }, [roundRobin]);
  //FUNÇÃO QUE CONFERE O TEXTO DO BOTÃO DO MENU LATERAL PARA ASSOCIÁ-LO À FUNÇÃO CERTA DO SIMULADOR
  const checkMenuText = (text: string) => {
    if (text === 'Iniciar') {
      start();
    }
    if (text === 'Parar') {
      stop();
    }
    if (text === 'Processos') {
      handleModeOperation(0);
      return handleModalOpen();
    }
    if (text === 'CPUs') {
      handleModeOperation(1);
      return handleModalOpen();
    }
    if (text === 'Clusters') {
      gambis.push(new Cluster({ hook: forceUpdate }));
      forceUpdate();
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
            Adicionar
          </Typography>
        ) : null}
        {['Processos', 'CPUs', 'Clusters'].map((text, index) => (
          <DrawerItem key={text} isOpen={open} text={text} action={() => checkMenuText(text)}>
            <>
              {index === 0 ? <AddIcon /> : null}
              {index === 1 ? <MemoryIcon /> : null}
              {index === 2 ? <QueueIcon /> : null}
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
        {open ? (
          <DiscreteSlider value={roundRobin} handleChange={(val: number) => setRoundRobin(val)} />
        ) : null}
      </List>
      <DrawerItem
        isOpen={open}
        text={'Debug'}
        action={() => {
          console.log(clusters);
        }}
      >
        <AdbRoundedIcon />
      </DrawerItem>
    </Drawer>
  );
};

export default DrawerMenu;
