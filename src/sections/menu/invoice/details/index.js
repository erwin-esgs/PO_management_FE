// import PropTypes from 'prop-types';
import { useState } from 'react';
// import {useNavigate} from 'react-router-dom';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import {
  Box,
  // Button,
  Card,
  Grid,
  Table,
  Divider,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  Typography,
  TableContainer,
  MenuItem,
} from '@mui/material';
// utils
// import { fDate } from '../../../../utils/formatTime';
// import { fCurrency } from '../../../../utils/formatNumber';
import { TableMoreMenu } from '../../../../components/table';
// components
import Iconify from '../../../../components/Iconify';
import Label from '../../../../components/Label';
// import Image from '../../../../components/Image';
import Scrollbar from '../../../../components/Scrollbar';

// import { PATH_PAGE  } from '../../../../routes/paths';
// import InvoiceToolbar from './InvoiceToolbar';
// redux
import { useDispatch, useSelector } from '../../../../redux/store';
import { editData, getDetail } from '../../../../redux/slices/invoice';

import ButtonPopover from '../../../../components/popover/ButtonPopover';
import PaymentForm from '../form/PaymentForm';

// ----------------------------------------------------------------------

const RowResultStyle = styled(TableRow)(({ theme }) => ({
  '& td': {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

// ----------------------------------------------------------------------

// InvoiceDetails.propTypes = {
//   data: PropTypes.object,
// };

export default function InvoiceDetails() {
  const [ openMenu , setOpenMenuActions ] = useState(null);
  const [ selectedIndex , setSelectedIndex ] = useState(0);
  const theme = useTheme();
  // const navigate = useNavigate();
  const dispatch = useDispatch()

  const { invoice } = useSelector((state) =>  state.invoice );

  let subTotalPrice = 0
  
  let rows
  try {
    rows = JSON.parse(invoice.payment)
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
    if(total === (invoice.value + invoice.vat) ){
      status = "paid"
    }
  }
  
  
  const handleOpenMenu = (event,idx) => {
    setSelectedIndex(idx)
    setOpenMenuActions(event.currentTarget)
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  }; 

  

  return (
    <>
      
      <Card sx={{ pt: 5, px: 5 }}>
        <Grid container>
          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            {/* <Image disabledEffect visibleByDefault alt="logo" src="/logo/logo_full.svg" sx={{ maxWidth: 120 }} /> */}
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Box sx={{ textAlign: { sm: 'right' } }}>
              <Label
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
              </Label>

              <Typography variant="h6">{invoice.inv_number}</Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
              Vendor Name
            </Typography>
            <Typography variant="body2">{invoice.vendor_name}</Typography>
            <Typography variant="body2">Email: {invoice.email}</Typography>
            <Typography variant="body2">Phone: {invoice.phone}</Typography>
            <Typography variant="body2">Contact: {invoice.contact}</Typography>
            <Typography variant="body2">Manager: {invoice.manager}</Typography>
            <Typography variant="body2">Bank Acc: {invoice.bank_acc}</Typography>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
              Info
            </Typography>
            <Typography variant="body2">{invoice.full_name}</Typography>
            <Typography variant="body2">NPWP: {invoice.npwp ? invoice.npwp : ''}</Typography>
            <Typography variant="body2">SIUP: {invoice.siup ? invoice.siup  : ''}</Typography>
            <Typography variant="body2">{invoice.address ? invoice.address : ''}</Typography>
          </Grid>

          <Grid item xs={12} sx={{ mb: 2 }}>
            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
              Description
            </Typography>
            <Typography variant="body2">{invoice.description ? invoice.description : ''}</Typography>
          </Grid>
          <Grid item xs={12} sx={{ mb: 2 }} >
            <Box display="flex" justifyContent="flex-end">
              <ButtonPopover text='Payment' startIcon={<Iconify icon={'eva:plus-fill'}  />} >
                <PaymentForm text="Add Payment" />
              </ButtonPopover>
            </Box>
          </Grid>
          
        </Grid>

        <Scrollbar>
          <TableContainer sx={{ minWidth: 960 }}>
            <Table>
              <TableHead
                sx={{
                  borderBottom: (themes) => `solid 1px ${themes.palette.divider}`,
                  '& th': { backgroundColor: 'transparent' },
                }}
              >
                <TableRow>
                  <TableCell width={40}>#</TableCell>
                  <TableCell align="left">Description</TableCell>
                  <TableCell align="right">Payment date</TableCell>
                  <TableCell align="right">Value</TableCell>
                  <TableCell align="right">VAT</TableCell>
                  <TableCell width={40}/>
                </TableRow>
              </TableHead>

              <TableBody>
                {rows.map((row, idx) => {
                  if(row.payment_date){
                    subTotalPrice += row.payment_value
                    subTotalPrice += row.payment_vat
                  }
                  
                  return (<TableRow
                    key={idx}
                    sx={{
                      borderBottom: (themes) => `solid 1px ${themes.palette.divider}`,
                    }}
                  >
                    <TableCell >{idx + 1}</TableCell>
                    <TableCell align="left">{row.payment_description}</TableCell>
                    <TableCell align="right">
                      <Box sx={{ maxWidth: 560 }}>
                        <Typography variant="subtitle2">{row.payment_date ? row.payment_date : ''}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="right">{row.payment_value.toLocaleString()}</TableCell>
                    <TableCell align="right">{row.payment_vat.toLocaleString()}</TableCell>
                    <TableCell align="right"> {/* <Button onClick={()=>onDeleteRow( idx , row )}></Button> */}
                      <TableMoreMenu
                        open={openMenu}
                        onOpen={(e)=>handleOpenMenu(e,idx)}
                        onClose={handleCloseMenu}
                        actions={
                          <>
                            <MenuItem
                              onClick={async ( ) => {
                                rows.splice(selectedIndex, 1)
                                Promise.resolve().then( () => dispatch(editData(invoice.id, { payment: JSON.stringify(rows) })) )
                                .then( () =>  dispatch(getDetail(invoice.id))  )
                                handleCloseMenu();
                              }}
                              sx={{ color: 'error.main' }}
                            >
                              <Iconify icon={'eva:trash-2-outline'} />
                              Cancel
                            </MenuItem>
                            
                          </>
                        }
                      />
                    </TableCell>
                  </TableRow>
                )}
                )}

                <RowResultStyle>
                  <TableCell colSpan={3} />
                  <TableCell align="right">
                    <Box sx={{ mt: 2 }} />
                    <Typography>Payment</Typography>
                  </TableCell>
                  <TableCell align="right" width={120}>
                    <Box sx={{ mt: 2 }} />
                    <Typography>{subTotalPrice.toLocaleString()}</Typography>
                  </TableCell>
                </RowResultStyle>

                <RowResultStyle>
                  <TableCell colSpan={3} />
                  <TableCell align="right">
                    <Typography>Total Outstanding</Typography>
                  </TableCell>
                  <TableCell align="right" width={120}>
                    <Typography sx={{ color: 'error.main' }}>{ (invoice.value + invoice.vat - subTotalPrice).toLocaleString() }</Typography>
                  </TableCell>
                </RowResultStyle>

                

                {/* <RowResultStyle>
                  <TableCell colSpan={3} />
                  <TableCell align="right">
                    <Typography>Taxes</Typography>
                  </TableCell>
                  <TableCell align="right" width={120}>
                    <Typography>{taxes && fCurrency(taxes)}</Typography>
                  </TableCell>
                </RowResultStyle> */}

                <RowResultStyle>
                  <TableCell colSpan={3} />
                  <TableCell align="right">
                    <Typography variant="h6">Value</Typography>
                  </TableCell>
                  <TableCell align="right" width={140}>
                    <Typography variant="h6">{invoice.value.toLocaleString()}</Typography>
                  </TableCell>
                </RowResultStyle>

                <RowResultStyle>
                  <TableCell colSpan={3} />
                  <TableCell align="right">
                  <Typography variant="h6">VAT</Typography>
                  </TableCell>
                  <TableCell align="right" width={120}>
                    <Typography variant="h6">{ (invoice.vat).toLocaleString() }</Typography>
                  </TableCell>
                </RowResultStyle>

                <RowResultStyle>
                  <TableCell colSpan={3} />
                  <TableCell align="right">
                  <Typography variant="h5">Total</Typography>
                  </TableCell>
                  <TableCell align="right" width={120}>
                    <Typography variant="h5">{ (invoice.value + invoice.vat).toLocaleString() }</Typography>
                  </TableCell>
                </RowResultStyle>

              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Divider sx={{ mt: 5 }} />

        <Grid container>
          <Grid item xs={12} md={9} sx={{ py: 3 }}>
            <Typography variant="subtitle2">{""}</Typography>
            <Typography variant="body2">
            {""}
            </Typography>
          </Grid>
          <Grid item xs={12} md={3} sx={{ py: 3, textAlign: 'right' }}>
            <Typography variant="subtitle2">{""}</Typography>
            <Typography variant="body2">{""}</Typography>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}
