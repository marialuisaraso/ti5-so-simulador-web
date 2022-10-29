import { Modal, Fade, Box, Backdrop } from '@mui/material';
import { addModalStyle } from '../estilos/styles';

type MainModalProps = {
  open: boolean;
  handleClose: Function;
  children: JSX.Element;
};

const MainModal = ({ open, handleClose, children }: MainModalProps) => {
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
        <Box sx={addModalStyle}>{children}</Box>
      </Fade>
    </Modal>
  );
};

export default MainModal;
