import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Checkbox, TableRow, TableCell, Typography, MenuItem, Button, Link } from '@mui/material';
// components
// import Label from '../../../../components/Label';
import Iconify from '../../../../components/Iconify';
import { TableMoreMenu } from '../../../../components/table';
import  ButtonPopover  from '../../../../components/popover/ButtonPopover';
import  PoForm  from '../form/PoForm';
import { PATH_PAGE  } from '../../../../routes/paths';  
import { useDispatch, useSelector } from '../../../../redux/store';

// import { getAll as poGetAll } from '../../../../redux/slices/po';
// import { getAll as ptGetAll } from '../../../../redux/slices/pt';
// import { getAll as projectGetAll } from '../../../../redux/slices/project';
// import { getAll as vendorGetAll } from '../../../../redux/slices/vendor';

// ----------------------------------------------------------------------

export default function CustomTableRow({ row, selected, selectedOne, onSelectRow }) {

  const dispatch = useDispatch()
  
  const { id, po_number, pt_name, project_code, vendor_name, value, tod, top, description, payment, created_by } = row;

  const [ openMenu , setOpenMenuActions ] = useState(null);

  const { po } = useSelector((state) => state.po);
  // const { project } = useSelector((state) => state.project);
  // const { vendor } = useSelector((state) => state.vendor);

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
  const amountString = new Intl.NumberFormat().format(parseFloat(value));
  let paidPercentage = 0
  const arrPayment = payment? JSON.parse(payment) : null
  if(Array.isArray(arrPayment)){
    arrPayment.forEach(element => {
      if("payment_date" in element){
        paidPercentage += element.percentage
      }
    });
  }
  
  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell align="left" sx={{ textTransform: 'uppercase' }}>{po_number}</TableCell>
      <TableCell align="left" sx={{ textTransform: 'uppercase' }}>{tod}</TableCell>
      <TableCell align="left" sx={{ textTransform: 'uppercase' }}>{top}</TableCell>
      <TableCell align="left" sx={{ textTransform: 'uppercase' }}>{description}</TableCell> 
      <TableCell align="left" sx={{ textTransform: 'uppercase' }}>{amountString}</TableCell>
      <TableCell align="left" sx={{ textTransform: 'uppercase' }}>{pt_name} / {project_code}</TableCell>
      <TableCell align="left" sx={{ textTransform: 'uppercase' }}>{vendor_name}</TableCell>
      <TableCell align="left" sx={{ textTransform: 'uppercase' }}>{ new Intl.NumberFormat().format(parseFloat( paidPercentage * value / 100 ))  }</TableCell>
      <TableCell align="left" sx={{ textTransform: 'uppercase' }}>{ new Intl.NumberFormat().format(parseFloat( value-(paidPercentage * value / 100) ))  }</TableCell>
      {/* <TableCell align="left" sx={{ textTransform: 'uppercase' }}>{tod}</TableCell> */}
      {/* <TableCell align="left" sx={{ textTransform: 'uppercase' }}>{payment}</TableCell> */}
      <TableCell align="left" sx={{ textTransform: 'uppercase' }}>{created_by}</TableCell>

      <TableCell align="center" sx={{width: '15%'}}>
        {/* <Button
          variant="contained"
          href={`${PATH_PAGE.po}/detail/${id}`}
          // to={`${PATH_PAGE.po}/detail/${id}`}
          startIcon={<Iconify icon={'eva:eye-fill'} />}
          color="inherit"
        /> */}
        
        <ButtonPopover color="warning" onPress={passSelectedOne} startIcon={<Iconify icon={'eva:edit-fill'} />} >
          <PoForm text="Edit Header PO" formData={po} />
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