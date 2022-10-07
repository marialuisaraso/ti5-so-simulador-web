import { useForm, Controller } from 'react-hook-form';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import Stack from '@mui/material/Stack';
import { cpuContext } from './context/CpuContext';
import React from 'react';

export default function BasicTextFields(this: any) {
  const { cpu, forceUpdate } = React.useContext(cpuContext);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      executionSize: null,
      priority: 0,
      memorySize: 4,
    },
  });
  const onSubmit = (data: any) => {
    try {
      cpu?.addProcess(data);
    } catch (e) {
      alert(e);
    }
  };
  return (
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
  );
}
