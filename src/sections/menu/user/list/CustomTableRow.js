import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Checkbox, TableRow, TableCell, Typography, MenuItem } from '@mui/material';
// components
// import Label from '../../../../components/Label';
import Iconify from '../../../../components/Iconify';
import { TableMoreMenu } from '../../../../components/table';
import  ButtonPopover  from '../../../../components/popover/ButtonPopover';
import  UserForm  from '../form/UserForm';
import { useDispatch, useSelector } from '../../../../redux/store';

// ----------------------------------------------------------------------



export default function CustomTableRow({ row, selected, selectedOne, onSelectRow }) {

  const dispatch = useDispatch()
  const { id, name, email, role , last_login } = row;

  const [ openMenu , setOpenMenuActions ] = useState(null);

  const { user } = useSelector((state) => state.user);
  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
    selectedOne()
  };

  const passSelectedOne = (event) => {
    selectedOne()
  }

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  }; 

  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell >{id}</TableCell>

      <TableCell align="left" sx={{ textTransform: 'uppercase' }}>{name}</TableCell>
      <TableCell align="left" sx={{ textTransform: 'uppercase' }}>{email}</TableCell>
      <TableCell align="left" sx={{ textTransform: 'uppercase' }}>{role}</TableCell>
      <TableCell align="left" sx={{ textTransform: 'uppercase' }}>{last_login}</TableCell>

      <TableCell align="center" sx={{width: '10%'}}>
        <ButtonPopover color="warning" onPress={passSelectedOne} startIcon={<Iconify icon={'eva:edit-fill'} />} >
          <UserForm text="Edit User" formData={user} />
        </ButtonPopover>

        {/* <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem
                onClick={() => {
                  onDeleteRow();
                  handleCloseMenu();
                }}
                sx={{ color: 'error.main' }}
              >
                <Iconify icon={'eva:trash-2-outline'} />
                Delete
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onEditRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:edit-fill'} />
                Edit
              </MenuItem>
              
            </>
          }
        /> */}
      </TableCell>
    </TableRow>
  );
}

CustomTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  selectedOne: PropTypes.func,
  onSelectRow: PropTypes.func,
};