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
import  VendorForm  from '../form/VendorForm';
import { useDispatch, useSelector } from '../../../../redux/store';

// ----------------------------------------------------------------------



export default function CustomTableRow({ row, selected, selectedOne, onSelectRow }) {

  const dispatch = useDispatch()
  
  const { id, vendor_name, email, phone, contact, /* manager, */ bank_acc, description, created_by, created_at } = row;

  const [ openMenu , setOpenMenuActions ] = useState(null);

  const { vendor } = useSelector((state) => state.vendor);

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

      {/* <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="subtitle2" noWrap>
        {id} 
        </Typography>
      </TableCell> */}

      <TableCell align="left" sx={{ textTransform: 'uppercase' }}>{vendor_name}</TableCell>
      <TableCell align="left" sx={{ textTransform: 'uppercase' }}>{email}</TableCell>
      <TableCell align="left" sx={{ textTransform: 'uppercase' }}>{phone}</TableCell>
      <TableCell align="left" sx={{ textTransform: 'uppercase' }}>{contact}</TableCell>
      {/* <TableCell align="left" sx={{ textTransform: 'uppercase' }}>{manager}</TableCell> */}
      <TableCell align="left" sx={{ textTransform: 'uppercase' }}>{bank_acc}</TableCell>
      <TableCell align="left" sx={{ textTransform: 'uppercase' }}>{description}</TableCell>
      <TableCell align="left" sx={{ textTransform: 'uppercase' }}>{created_by}</TableCell>

      <TableCell align="center" sx={{width: '10%'}}>
        <ButtonPopover color="warning" onPress={passSelectedOne} startIcon={<Iconify icon={'eva:edit-fill'} />} >
          <VendorForm text="Edit Vendor" formData={vendor} />
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