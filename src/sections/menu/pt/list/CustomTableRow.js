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
import  PtForm  from '../form/PtForm';
import { useDispatch, useSelector } from '../../../../redux/store';

// ----------------------------------------------------------------------



export default function CustomTableRow({ row, selected, selectedOne, onSelectRow }) {

  const dispatch = useDispatch()
  
  const { id, pt_name, full_name, npwp, siup, address, created_by, created_at } = row;

  const [ openMenu , setOpenMenuActions ] = useState(null);

  const { pt } = useSelector((state) => state.pt);

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

      <TableCell align="left" >{id}</TableCell>

      <TableCell align="left" sx={{ textTransform: 'uppercase' }}>{pt_name}</TableCell>
      <TableCell align="left" sx={{ textTransform: 'uppercase' }}>{full_name}</TableCell>
      <TableCell align="left" sx={{ textTransform: 'uppercase' }}>{npwp}</TableCell>
      <TableCell align="left" sx={{ textTransform: 'uppercase' }}>{siup}</TableCell>
      <TableCell align="left" sx={{ textTransform: 'uppercase' }}>{address}</TableCell>

      <TableCell align="center" sx={{width: '10%'}}>
        <ButtonPopover color="warning" onPress={passSelectedOne} startIcon={<Iconify icon={'eva:edit-fill'} />} >
          <PtForm text="Edit PT" formData={pt} />
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