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
import  ProjectForm  from '../form/ProjectForm';
import { useDispatch, useSelector } from '../../../../redux/store';

// ----------------------------------------------------------------------



export default function CustomTableRow({ row, selected, selectedOne, onSelectRow }) {

  const dispatch = useDispatch()
  
  const { id, client_name, project_code, start_date, end_date, contract_value, finance, project_team, list_item, created_by, created_at } = row;

  const [ openMenu , setOpenMenuActions ] = useState(null);

  const { project } = useSelector((state) => state.project);

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
  const amountString = new Intl.NumberFormat().format(parseFloat(contract_value));
  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell align="left" >{id}</TableCell>

      <TableCell align="left" sx={{ textTransform: 'uppercase' }}>{client_name}</TableCell>
      <TableCell align="left" sx={{ textTransform: 'uppercase' }}>{project_code}</TableCell>
      <TableCell align="left" sx={{ textTransform: 'uppercase' }}>{start_date}</TableCell>
      <TableCell align="left" sx={{ textTransform: 'uppercase' }}>{end_date}</TableCell>
      <TableCell align="left" sx={{ textTransform: 'uppercase' }}>{amountString}</TableCell>
      <TableCell align="left" sx={{ textTransform: 'uppercase' }}>{finance}</TableCell>
      <TableCell align="left" sx={{ textTransform: 'uppercase' }}>{project_team}</TableCell>
      {/* <TableCell align="left" sx={{ textTransform: 'uppercase' }}>{list_item}</TableCell> */}
      <TableCell align="left" sx={{ textTransform: 'uppercase' }}>{created_by}</TableCell>

      <TableCell align="center" sx={{width: '10%'}}>
        <ButtonPopover color="warning" onPress={passSelectedOne} startIcon={<Iconify icon={'eva:edit-fill'} />} >
          <ProjectForm text="Edit Project" formData={project} />
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