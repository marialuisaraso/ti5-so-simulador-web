import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function BasicTextFields() {
    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, marginLeft: 0, marginRight: 0, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField id="outlined-basic" label="Tamanho de memória" variant="outlined" style={{ width: '37ch' }} />
            <TextField id="outlined-basic" label="Prioridade" variant="outlined" style={{ width: '37ch' }} />
            <TextField id="outlined-basic" label="Tempo que vai rodar" variant="outlined" style={{ width: '37ch' }} />
        </Box>
    );
}