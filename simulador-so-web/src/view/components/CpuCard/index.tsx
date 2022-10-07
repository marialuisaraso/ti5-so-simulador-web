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
  const { cpu, io, forceUpdate } = React.useContext(cpuContext);

  return (
    <Card variant="outlined" style={{ marginTop: 10 }}>
      <CardContent>
        <Badge badgeContent=" " color={cpu?.active ? 'success' : 'error'} variant="dot">
          <Typography variant="h5" component="div">
            CPU {cpu?.cpuId}
          </Typography>
        </Badge>

        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Estado: {cpu?.active ? 'Ativo' : 'Inativo'}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Excutando: {cpu?.runningJob ? cpu?.runningJob?.pId : '-'}
          <LinearProgressWithLabel
            variant="determinate"
            color="success"
            value={cpu?.runningPercentage ? cpu?.runningPercentage : 0}
            style={{ height: 8 }}
          ></LinearProgressWithLabel>
        </Typography>
        <Typography variant="body2">
          Memória utilizada
          {cpu?.memory.getUsageRate() === undefined ? (
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
              value={cpu?.memory.getUsageRate()}
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
};

export default CpuCard;
