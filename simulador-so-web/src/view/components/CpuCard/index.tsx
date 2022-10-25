import * as React from 'react';
import { Badge, Card, CardContent, Typography } from '@mui/material';
import { cpuContext } from '../../context/CpuContext';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

type CpuCardProps = {
  cpuId?: number;
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

const CpuCard = ({ cpuId }: CpuCardProps) => {
  // eslint-disable-next-line
  const { cpus, io, forceUpdate } = React.useContext(cpuContext);
  const mainCpu = cpus?.find(cpu => cpu.cpuId === cpuId);

  if (mainCpu) {
    return (
      <Card variant="outlined" style={{ marginTop: 10 }}>
        <CardContent>
          <Badge badgeContent=" " color={mainCpu?.active ? 'success' : 'error'} variant="dot">
            <Typography variant="h5" component="div">
              CPU {mainCpu?.cpuId}
            </Typography>
          </Badge>

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
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Memória utilizada
            {mainCpu?.memory.getUsageRate() === undefined ? (
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
                value={mainCpu?.memory.getUsageRate()}
                style={{ height: 8 }}
              />
            )}
          </Typography>

          <Typography variant="h5" component="div" sx={{ mt: 1.75 }}>
            IO
          </Typography>
          {io?.activeRequest == null ? (
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Processando: -
            </Typography>
          ) : (
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Processando: {io?.activeRequest.process.pId}
              {io?.runningPercentage && (
                <LinearProgressWithLabel
                  variant="determinate"
                  color="primary"
                  value={io?.runningPercentage}
                  style={{ height: 8 }}
                ></LinearProgressWithLabel>
              )}
            </Typography>
          )}
        </CardContent>
      </Card>
    );
  } else {
    return <div />;
  }
};

export default CpuCard;
