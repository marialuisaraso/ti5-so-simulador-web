import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import React from 'react';
import { Process } from '../../simulator/model/process';
import { cpuContext } from '../context/CpuContext';

const columns: GridColDef[] = [
  { field: 'pId', headerName: 'Id do Processo', width: 150 },
  { field: 'executionSize', headerName: 'Tempo a executar', width: 150 },
  { field: 'cpuTime', headerName: 'Tempo executado', width: 150 },
  { field: 'memorySize', headerName: 'Tamanho', width: 150 },
  { field: 'priority', headerName: 'Prioridade', width: 150 },
  { field: 'state', headerName: 'Status', width: 150 }
];

type ProcessesDisplayProps = {
  processes: Array<Process>;
};

const ProcessesDisplay = () => {
  const [rows, setRows] = React.useState<Array<Process>>([]);
  const { cpu, forceUpdate } = React.useContext(cpuContext);

  React.useEffect(() => {
    if (cpu) setRows([...cpu.allProcess]);
  }, [forceUpdate]);
  return <DataGrid rows={rows} columns={columns} getRowId={row => row.pId} />;

};

export default ProcessesDisplay;