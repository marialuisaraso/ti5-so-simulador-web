import { Modal, Fade, Box, Typography, Backdrop } from '@mui/material';
import { addModalStyle } from '../estilos/styles';
import BasicTextFields from '../Forms';
import SubmitButton from '../SubmitButton';

type AddProcessFormProps = {
  open: boolean;
  handleClose: Function;
};

const AddProcessForm = ({ open, handleClose }: AddProcessFormProps) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={() => handleClose(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={addModalStyle}>
          <Typography
            id="transition-modal-title"
            variant="h6"
            component="h2"
            style={{ marginBottom: 10, fontWeight: 'bold' }}
          >
            ADICIONAR NOVO PROCESSO
          </Typography>
          <BasicTextFields />
          <SubmitButton />
        </Box>
      </Fade>
    </Modal>
  );
};

export default AddProcessForm;
