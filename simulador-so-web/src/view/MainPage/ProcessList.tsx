import { Modal, Backdrop, Fade, Box, Typography } from '@mui/material';
import { addModalStyle } from '../estilos/styles';

type AddProcessFormProps = {
  open: boolean;
  handleClose: Function;
};

const ProcessList = ({ open, handleClose }: AddProcessFormProps) => {
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
            LISTA DE PROCESSOS
          </Typography>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ProcessList;
