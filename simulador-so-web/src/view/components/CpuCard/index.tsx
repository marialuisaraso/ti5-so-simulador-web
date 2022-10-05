import * as React from 'react';
import { Card, LinearProgress, CardContent, Typography } from '@mui/material';
import { cpuContext } from '../../context/CpuContext';

type CpuCardProps = {
  cpuId?: number;
};

const CpuCard = ({ cpuId }: CpuCardProps) => {
  const { cpu, forceUpdate } = React.useContext(cpuContext);
  console.count('counter cpu');
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" component="div">
          CPU {cpu?.cpuId}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Excutando: {cpu?.runningJob?.pId}
        </Typography>
        <Typography variant="body2">
          Mémoria
          <LinearProgress variant="determinate" value={cpu?.memory.getUsageRate()} />
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CpuCard;
