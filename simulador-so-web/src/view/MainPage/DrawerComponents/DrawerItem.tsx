import { ListItem, ListItemButton, ListItemIcon } from '@mui/material';
import { MenuTitles } from '../../estilos/styles';

type DrawerItemProps = {
  isOpen: boolean;
  text: string;
  action: Function;
  children: JSX.Element;
};

const DrawerItem = ({ isOpen, text, action, children }: DrawerItemProps) => {
  return (
    <ListItem disablePadding sx={{ display: 'block' }}>
      <ListItemButton
        sx={{
          minHeight: 48,
          justifyContent: isOpen ? 'initial' : 'center',
          px: 2.5,
        }}
        onClick={() => action()}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: isOpen ? 2 : 'auto',
            justifyContent: 'center',
          }}
        >
          {children}
        </ListItemIcon>
        <MenuTitles>{isOpen ? text : null}</MenuTitles>
      </ListItemButton>
    </ListItem>
  );
};

export default DrawerItem;
