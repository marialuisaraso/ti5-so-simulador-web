import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React from 'react';
import { Process } from '../../simulator/model/process';
import { cpuContext } from '../context/CpuContext';

const columns: GridColDef[] = [
  { field: 'pId', headerName: 'Processo', width: 100 },
  { field: 'executionSize', headerName: 'Tempo a executar', width: 150 },
  { field: 'cpuTime', headerName: 'Tempo executado', width: 150 },
  { field: 'memorySize', headerName: 'Tamanho', width: 100 },
  { field: 'priority', headerName: 'Prioridade', width: 100 },
  { field: 'state', headerName: 'Status', width: 100 },
];

const ProcessesDisplay = () => {
  const [rows, setRows] = React.useState<Array<Process>>([]);
  const { cpu, forceUpdate } = React.useContext(cpuContext);

  React.useEffect(() => {
    if (cpu) setRows([...cpu.allProcess]);
  }, [forceUpdate]);
  return <DataGrid rows={rows} columns={columns} getRowId={row => row.pId} />;
};

export default ProcessesDisplay;
