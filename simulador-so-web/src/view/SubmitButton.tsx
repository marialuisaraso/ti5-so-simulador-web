import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function SubmitButton() {
    return (
        <Stack spacing={2} direction="row">
            <Button variant="contained" style={{ marginTop: 20, color: 'white', backgroundColor: "#680079", fontWeight: "bold", width: '42ch' }}>ADICIONAR</Button>
        </Stack >
    );
}