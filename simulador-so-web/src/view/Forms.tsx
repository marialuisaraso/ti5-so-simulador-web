import { useForm, Controller } from 'react-hook-form';
import Button from '@mui/material/Button';
import { Alert, Collapse, TextField } from '@mui/material';
import Stack from '@mui/material/Stack';
import { cpuContext } from './context/CpuContext';
import React from 'react';

export default function BasicTextFields(this: any) {
  // eslint-disable-next-line
  const { clusters, forceUpdate } = React.useContext(cpuContext);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [message, setMessage] = React.useState<any>('');
  const { control, handleSubmit } = useForm({
    defaultValues: {
      executionSize: null,
      priority: 0,
      memorySize: 4,
      ioPeriod: null,
    },
  });
  const onSubmit = (data: any) => {
    try {
      if (clusters) clusters[0]?.addProcess(data);
    } catch (e) {
      setOpenAlert(true);
      setMessage(e);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="memorySize"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              required
              type="number"
              id="outlined-basic"
              label="Tamanho de memória"
              variant="outlined"
              style={{ width: '37ch', marginBottom: 20 }}
              color="secondary"
            />
          )}
        />
        <Controller
          name="priority"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              required
              type="number"
              id="outlined-basic"
              label="Prioridade"
              variant="outlined"
              style={{ width: '37ch', marginBottom: 20 }}
              color="secondary"
            />
          )}
        />
        <Controller
          name="executionSize"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              id="outlined-basic"
              label="Tempo que vai rodar"
              variant="outlined"
              style={{ width: '37ch', marginBottom: 10 }}
              color="secondary"
            />
          )}
        />
        <Controller
          name="ioPeriod"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              id="outlined-basic"
              label="A cada quantos ciclos vai pra I/O"
              variant="outlined"
              style={{ width: '37ch', marginBottom: 10 }}
              color="secondary"
            />
          )}
        />
        <Collapse in={openAlert}>
          <Alert variant="outlined" severity="error" sx={{ marginTop: 1 }}>
            {message}
          </Alert>
        </Collapse>
        <Stack spacing={2} direction="column">
          <Button
            type="submit"
            variant="contained"
            style={{
              marginTop: 20,
              color: 'white',
              backgroundColor: '#680079',
              fontWeight: 'bold',
              width: '42ch',
            }}
          >
            ADICIONAR
          </Button>
        </Stack>
      </form>
    </>
  );
}
