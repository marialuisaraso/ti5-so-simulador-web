import * as React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
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
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}
const CpuCard = ({ cpuId }: CpuCardProps) => {
  const { cpu, forceUpdate } = React.useContext(cpuContext);
  console.count('counter cpu');
  const [progress, setProgress] = React.useState(cpu?.memory.getUsageRate());

  return (
    <Card variant="outlined" style={{ marginTop: 10 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          CPU {cpu?.cpuId}
        </Typography>
        {cpu?.runningJob == null ?
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Excutando: 0
          </Typography>
          :
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Excutando: {cpu?.runningJob?.pId}
          </Typography>
        }
        <Typography variant="body2">
          Memória utilizada
          {cpu?.memory.getUsageRate() === undefined ? <LinearProgressWithLabel variant="determinate" color="secondary" value={0} style={{ height: 8 }} />
            : <LinearProgressWithLabel variant="determinate" color="secondary" value={cpu?.memory.getUsageRate()} style={{ height: 8 }} />
          }
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CpuCard;