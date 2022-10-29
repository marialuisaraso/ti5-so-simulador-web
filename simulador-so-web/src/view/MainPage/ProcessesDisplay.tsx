import { DataGrid, GridColDef, GridCellParams, GridRenderCellParams } from '@mui/x-data-grid';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton } from '@mui/material';

import { Process } from '../../simulator/model/process';
import { cpuContext } from '../context/CpuContext';
import '../estilos/processStatus.css';

type ProcessesDisplayProps = {
  clusterId?: number;
};

const ProcessesDisplay = ({ clusterId }: ProcessesDisplayProps) => {
  const [rows, setRows] = React.useState<Array<Process>>([]);
  const { clusters, forceUpdate } = React.useContext(cpuContext);
  const cluster = clusters?.find(c => c.clusterId === clusterId);

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
    {
      field: 'buttons',
      headerName: 'Ações',
      width: 150,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <div>
            <IconButton onClick={() => cluster?.excludeProcess(params.row.pId)}>
              <DeleteIcon />
            </IconButton>
            <IconButton onClick={() => cluster?.suspendProcess(params.row.pId)}>
              <HourglassTopIcon />
            </IconButton>
            <IconButton onClick={() => cluster?.wakeProcess(params.row.pId)}>
              <VisibilityIcon />
            </IconButton>
          </div>
        );
      },
    },
  ];

  React.useEffect(() => {
    if (cluster) setRows([...cluster.allProcess]);
  }, [forceUpdate]);

  return <DataGrid rows={rows} columns={columns} getRowId={row => row.pId} />;
};

export default ProcessesDisplay;
