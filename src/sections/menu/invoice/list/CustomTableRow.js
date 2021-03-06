import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Checkbox, TableRow, TableCell, Typography, MenuItem, Button, Divider } from '@mui/material';
// components
// import Label from '../../../../components/Label';
import Iconify from '../../../../components/Iconify';
import Label from '../../../../components/Label';
import { TableMoreMenu } from '../../../../components/table';
import  ButtonPopover  from '../../../../components/popover/ButtonPopover';
import  InvoiceForm  from '../form/InvoiceForm';
import { PATH_PAGE  } from '../../../../routes/paths';  
import { useDispatch, useSelector } from '../../../../redux/store';

// import { getAll as poGetAll } from '../../../../redux/slices/po';
// import { getAll as ptGetAll } from '../../../../redux/slices/pt';
// import { getAll as projectGetAll } from '../../../../redux/slices/project';
// import { getAll as vendorGetAll } from '../../../../redux/slices/vendor';

// ----------------------------------------------------------------------

export default function CustomTableRow({ row, selected, selectedOne, onSelectRow }) {

  const dispatch = useDispatch()
  const theme = useTheme();
  const { id, inv_number, po_number, project_code, due_date, value, vat, total, description, payment, created_by } = row;

  const [ openMenu , setOpenMenuActions ] = useState(null);

  const { invoice } = useSelector((state) => state.invoice);
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
  // const valueString = new Intl.NumberFormat().format(parseFloat(value));
  // const vatString = new Intl.NumberFormat().format(parseFloat(vat));

  let rows
  try {
    rows = JSON.parse(payment)
  } catch (error) {
    rows = []
  }
  let status = "unpaid"
  if(rows.length > 0){
    status = "partial"
    let total = 0
    rows.forEach(element => {
      total += element.payment_value
      total += element.payment_vat
    });
    if(total === (value + vat) ){
      status = "paid"
    }
  }
  
  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell align="left" sx={{ textTransform: 'uppercase' }}>{inv_number}</TableCell>
      <TableCell align="left" sx={{ textTransform: 'uppercase' }}>{po_number} : {project_code}</TableCell>
      <TableCell align="left" sx={{ textTransform: 'uppercase' }}>{due_date}</TableCell> 
      <TableCell align="left" sx={{ textTransform: 'uppercase' , color: 'warning' }} >
        {/* <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={
            (status === 'paid' && 'success') ||
            (status === 'partial' && 'warning') ||
            (status === 'unpaid' && 'error') ||
            'default'
          }
          sx={{ textTransform: 'uppercase', mb: 1 }}
        >
          {status}
        </Label> */}
        {status}
      </TableCell> 
      <TableCell align="left" sx={{ textTransform: 'uppercase' }}>
        { new Intl.NumberFormat().format(parseFloat( value ))  }
        <Divider />
        <Typography variant="caption" sx={{ color: 'text.secondary' }} noWrap>
        { new Intl.NumberFormat().format(parseFloat( vat ))  }
        </Typography>
        <Divider />
        <Typography variant="subtitle2"  noWrap>
        { new Intl.NumberFormat().format(parseFloat( total ))  }
        </Typography>
      </TableCell>
      {/* <TableCell align="left" sx={{ textTransform: 'uppercase' }}>{valueString}</TableCell>  */}
      {/* <TableCell align="left" sx={{ textTransform: 'uppercase' }}>{vatString}</TableCell>  */}
      <TableCell align="left" sx={{ textTransform: 'uppercase' }}>{description}</TableCell> 

      <TableCell align="center" sx={{width: '15%'}}>
        <Button
          variant="contained"
          href={`${PATH_PAGE.invoice}/detail/${id}`}
          // to={`${PATH_PAGE.po}/detail/${id}`}
          startIcon={<Iconify icon={'eva:eye-fill'} />}
          color="inherit"
        />
        
        <ButtonPopover color="warning" onPress={passSelectedOne} startIcon={<Iconify icon={'eva:edit-fill'} />} >
          <InvoiceForm text="Edit Invoice" formData={invoice} />
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