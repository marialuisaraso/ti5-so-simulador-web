import {
  Modal,
  Backdrop,
  Fade,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import React from 'react';
import { cpuContext } from '../context/CpuContext';
import { addModalStyle } from '../estilos/styles';
import CommentIcon from '@mui/icons-material/Comment';

type AddProcessFormProps = {
  open: boolean;
  handleClose: Function;
  action: Function;
  title: string;
};

const ProcessModal = ({ open, handleClose, title, action }: AddProcessFormProps) => {
  const { cpu, forceUpdate } = React.useContext(cpuContext);
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
            {title}
          </Typography>
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {cpu?.allProcess.map(value => (
              <ListItem
                key={value.pId}
                disableGutters
                secondaryAction={
                  <IconButton
                    aria-label="comment"
                    onClick={() => {
                      action(value);
                      handleClose(false);
                    }}
                  >
                    <CommentIcon />
                  </IconButton>
                }
              >
                <ListItemText primary={`Processo ${value.pId}`} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ProcessModal;
