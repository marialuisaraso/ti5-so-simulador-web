import * as React from 'react';
import { Badge, Card, CardContent, IconButton, Typography, Grid } from '@mui/material';
import { cpuContext } from '../../context/CpuContext';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';

type CpuCardProps = {
  cpuId: number;
  clusterId?: number;
};

type ProgressProps = {
  clusterId?: number;
};

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

function MemoryUsage({ clusterId }: ProgressProps) {
  const { clusters, forceUpdate } = React.useContext(cpuContext);
  const cluster = clusters?.find(c => c.clusterId === clusterId);
  return (
    <Typography sx={{ mb: 1.5 }} color="text.secondary">
      Memória utilizada
      {cluster?.memory.getUsageRate() === undefined ? (
        <LinearProgressWithLabel
          variant="determinate"
          color="secondary"
          value={0}
          style={{ height: 8 }}
        />
      ) : (
        <LinearProgressWithLabel
          variant="determinate"
          color="secondary"
          value={cluster?.memory.getUsageRate()}
          style={{ height: 8 }}
        />
      )}
    </Typography>
  );
}

function IoValue({ clusterId }: ProgressProps) {
  const { clusters, forceUpdate } = React.useContext(cpuContext);
  const io = clusters?.find(c => c.clusterId === clusterId)?.io;
  return (
    <>
      <Typography sx={{ mb: 0 }} color="text.secondary">
        IO
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        Processando: {io?.activeRequest ? io?.activeRequest.process.pId : '-'}
        <LinearProgressWithLabel
          variant="determinate"
          color={io?.activeRequest ? 'primary' : 'secondary'}
          value={io?.activeRequest ? io?.runningPercentage : 0}
          style={{ height: 8 }}
        />
      </Typography>
    </>
  );
}

const CpuCard = ({ cpuId, clusterId }: CpuCardProps) => {
  // eslint-disable-next-line
  const { clusters, forceUpdate } = React.useContext(cpuContext);
  const cluster = clusters?.find(c => c.clusterId === clusterId);
  const io = cluster?.io;
  const mainCpu = cluster?.cpus?.find(cpu => cpu.cpuId === cpuId);

  if (mainCpu) {
    return (
      <Card variant="outlined" style={{ marginTop: 10 }}>
        <CardContent>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Badge badgeContent=" " color={mainCpu?.active ? 'success' : 'error'} variant="dot">
                <Typography variant="h5" component="div">
                  CPU {mainCpu?.cpuId}
                </Typography>
              </Badge>
            </Grid>
            <Grid item>
              <IconButton
                onClick={() => clusters?.find(e => e.clusterId === clusterId)?.startCpu(cpuId)}
              >
                <PlayArrowIcon />
              </IconButton>
              <IconButton
                onClick={() => clusters?.find(e => e.clusterId === clusterId)?.stopCpu(cpuId)}
              >
                <PauseIcon />
              </IconButton>
              <IconButton
                onClick={() => clusters?.find(e => e.clusterId === clusterId)?.removeCPU(cpuId)}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>

          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Estado: {mainCpu?.active ? 'Ativo' : 'Inativo'}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Executando: {mainCpu?.runningJob ? mainCpu?.runningJob?.pId : '-'}
            <LinearProgressWithLabel
              variant="determinate"
              color="success"
              value={mainCpu?.runningPercentage ? mainCpu?.runningPercentage : 0}
              style={{ height: 8 }}
            ></LinearProgressWithLabel>
          </Typography>
        </CardContent>
      </Card>
    );
  } else {
    return <div />;
  }
};

export { CpuCard, MemoryUsage, IoValue };
