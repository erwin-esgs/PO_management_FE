// import { useSnackbar } from 'notistack';
import { useState } from 'react';
import PropTypes from 'prop-types';
// import { 
//   Link as RouterLink, 
//   useNavigate 
// } from 'react-router-dom';
// @mui
// import { alpha } from '@mui/material/styles';
import { 
  // Box, 
  // Divider, 
  // Typography, 
  Button,
  // MenuItem 
} from '@mui/material';
// import Iconify from '../Iconify';
// components
import MenuPopover from '../MenuPopover';

// ----------------------------------------------------------------------

ButtonPopover.propTypes = {
  children: PropTypes.node,
  startIcon: PropTypes.node,
  text: PropTypes.string,
  color: PropTypes.string,
  onPress: PropTypes.func,
};
export default function ButtonPopover({ children, text="", startIcon=null , color='primary' , onPress=null, ...props }) {

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
    if(onPress != null){
      onPress()
    }
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={handleOpen}
        // component={RouterLink}
        // to={PATH_DASHBOARD.user.new}
        startIcon={startIcon}
        color={color}
        {...props}
      >
        {text}
      </Button>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 2,
        }}
      >
        {children}
      </MenuPopover>
    </>
  );
}
