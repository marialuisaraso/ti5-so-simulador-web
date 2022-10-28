import { Box } from '@mui/material';
import { DataGrid, GridColDef, GridCellParams } from '@mui/x-data-grid';
import React from 'react';
import { Process } from '../../simulator/model/process';
import { processState } from '../../simulator/model/shared/processState';
import { cpuContext } from '../context/CpuContext';
import '../estilos/processStatus.css';

const columns: GridColDef[] = [
  { field: 'pId', headerName: 'Processo', width: 100 },
  { field: 'executionSize', headerName: 'Tempo a executar', width: 150 },
  { field: 'cpuTime', headerName: 'Tempo executado', width: 150 },
  { field: 'memorySize', headerName: 'Tamanho', width: 100 },
  { field: 'priority', headerName: 'Prioridade', width: 100 },
  {
    field: 'state',
    headerName: 'Status',
    width: 100,
    cellClassName: (params: GridCellParams<string>) => {
      if (params.value == null) {
        return '';
      }

      return params.value.toLocaleLowerCase();
    },
  },
];

type ProcessesDisplayProps = {
  clusterId?: number;
};

const ProcessesDisplay = ({ clusterId }: ProcessesDisplayProps) => {
  const [rows, setRows] = React.useState<Array<Process>>([]);
  const { clusters, forceUpdate } = React.useContext(cpuContext);
  const cluster = clusters?.find(c => c.clusterId === clusterId);

  React.useEffect(() => {
    if (cluster) setRows([...cluster.allProcess]);
  }, [forceUpdate]);

  return <DataGrid rows={rows} columns={columns} getRowId={row => row.pId} />;
};

export default ProcessesDisplay;
