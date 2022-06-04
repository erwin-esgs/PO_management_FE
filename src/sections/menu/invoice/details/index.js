import PropTypes from 'prop-types';
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

// import ButtonPopover from '../../../../components/popover/ButtonPopover';
import PaymentForm from '../form/PaymentForm';

// ----------------------------------------------------------------------

const RowResultStyle = styled(TableRow)(({ theme }) => ({
  '& td': {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

// ----------------------------------------------------------------------

InvoiceDetails.propTypes = {
  data: PropTypes.object,
};

export default function InvoiceDetails({ data=null }) {
  const [ openMenu , setOpenMenuActions ] = useState(null);
  const [ selectedIndex , setSelectedIndex ] = useState(0);
  const theme = useTheme();
  // const navigate = useNavigate();
  const dispatch = useDispatch()

  const { invoice } = useSelector((state) =>  state.invoice );

  if (!data) {
    return null
  }
  console.log(data)
  // const {
  //   items,
  //   taxes,
  //   status,
  //   dueDate,
  //   discount,
  //   invoiceTo,
  //   createDate,
  //   totalPrice,
  //   invoiceFrom,
  //   invoiceNumber,
  //   subTotalPrice,
  // } = data;

  let rows
  try {
    rows = JSON.parse(data.payment)
  } catch (error) {
    rows = []
  }

  const status = "paid"
  let subTotalPrice = 0
  
  const handleOpenMenu = (event,idx) => {
    setSelectedIndex(idx)
    setOpenMenuActions(event.currentTarget)
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  }; 

  // const handlePayment = (e) => {
  //   if(selectedIndex !== null && selectedIndex !== undefined && data !== null){
  //     if(!rows[selectedIndex].payment_date){
  //       console.log(rows[selectedIndex])
  //     }
  //   }
  //   // if(selectedIndex !== null && selectedIndex !== undefined && data !== null){
  //   //   const todayDate = new Date().toISOString().split('T')[0]
  //   //   if(!rows[selectedIndex].due_date){
  //   //     rows[selectedIndex].due_date = todayDate

  //   //     Promise.resolve().then( () => dispatch(editData(data.id, { payment: JSON.stringify(rows) })) )
  //   //     .then( () =>  dispatch(getDetail(data.id))  )
  //   //   }
  //   // }
  // }; 

  // const onDeleteRow = (idx, row) => {
  //   console.log(idx)
  // }

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
                  (status === 'unpaid' && 'warning') ||
                  (status === 'overdue' && 'error') ||
                  'default'
                }
                sx={{ textTransform: 'uppercase', mb: 1 }}
              >
                {status}
              </Label>

              <Typography variant="h6">{data.inv_number}</Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
              Vendor Name
            </Typography>
            <Typography variant="body2">{data.vendor_name}</Typography>
            <Typography variant="body2">Email: {data.email}</Typography>
            <Typography variant="body2">Phone: {data.phone}</Typography>
            <Typography variant="body2">Contact: {data.contact}</Typography>
            <Typography variant="body2">Manager: {data.manager}</Typography>
            <Typography variant="body2">Bank Acc: {data.bank_acc}</Typography>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
              Info
            </Typography>
            <Typography variant="body2">{data.full_name}</Typography>
            <Typography variant="body2">NPWP: {data.npwp ? data.npwp : ''}</Typography>
            <Typography variant="body2">SIUP: {data.siup ? data.siup  : ''}</Typography>
            <Typography variant="body2">{data.address ? data.address : ''}</Typography>
          </Grid>

          <Grid item xs={12} sx={{ mb: 5 }}>
            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
              Description
            </Typography>
            <Typography variant="body2">{data.description ? data.description : ''}</Typography>
          </Grid>

          {/* <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
              Due date
            </Typography>
            <Typography variant="body2">asdasd</Typography>
          </Grid> */}

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
                  <TableCell align="left">Due date</TableCell>
                  <TableCell align="left">Payment date</TableCell>
                  <TableCell align="center">%</TableCell>
                  <TableCell align="right">Outstanding</TableCell>
                  <TableCell width={40}/>
                </TableRow>
              </TableHead>

              <TableBody>
                {rows.map((row, idx) => {
                  const amount = (row.percentage * data.value / 100)
                  if(row.payment_date){
                    subTotalPrice += amount
                  }
                  
                  return (<TableRow
                    key={idx}
                    sx={{
                      borderBottom: (themes) => `solid 1px ${themes.palette.divider}`,
                    }}
                  >
                    <TableCell >{idx + 1}</TableCell>
                    <TableCell align="left">{row.description}</TableCell>
                    <TableCell align="left">
                      <Box sx={{ maxWidth: 560 }}>
                        <Typography variant="subtitle2">{row.due_date ? row.due_date : ''}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="left">
                      <Box sx={{ maxWidth: 560 }}>
                        <Typography variant="subtitle2">{row.payment_date ? row.payment_date : ''}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="center">{row.percentage}</TableCell>
                    <TableCell align="right">{amount.toLocaleString()}</TableCell>
                    <TableCell align="right"> {/* <Button onClick={()=>onDeleteRow( idx , row )}></Button> */}
                      <TableMoreMenu
                        open={openMenu}
                        onOpen={(e)=>handleOpenMenu(e,idx)}
                        onClose={handleCloseMenu}
                        actions={
                          <>
                            {(!rows[selectedIndex].payment_date) ? 
                            (<PaymentForm text="Add Payment" selectedIndex={selectedIndex} />) : 
                            (<MenuItem
                              onClick={async ( ) => {
                                delete rows[selectedIndex].payment_date;
                                Promise.resolve().then( () => dispatch(editData(invoice.id, { payment: JSON.stringify(rows) })) )
                                .then( () =>  dispatch(getDetail(invoice.id))  )
                                handleCloseMenu();
                              }}
                              sx={{ color: 'error.main' }}
                            >
                              <Iconify icon={'eva:trash-2-outline'} />
                              Cancel
                            </MenuItem>) }
                            {/* <ButtonPopover text='Payment' startIcon={<Iconify icon={'eva:plus-fill'}  />} >
                              <PaymentForm text="Add Payment" />
                            </ButtonPopover> */}

                            {/* <MenuItem
                              onClick={( e ) => {
                                handlePayment(e);
                              }}
                              sx={{ color: 'primary.main' }}
                            >
                              <Iconify icon={'ant-design:check-outlined'} />
                              Payment
                            </MenuItem> */}
                            {/* <MenuItem
                              onClick={( e ) => {
                                handleCloseMenu();
                              }}
                              sx={{ color: 'error.main' }}
                            >
                              <Iconify icon={'eva:trash-2-outline'} />
                              Delete
                            </MenuItem> */}
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
                    <Typography sx={{ color: 'error.main' }}>{ (data.value - subTotalPrice).toLocaleString() }</Typography>
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
                    <Typography variant="h6">Total</Typography>
                  </TableCell>
                  <TableCell align="right" width={140}>
                    <Typography variant="h6">{data.value.toLocaleString()}</Typography>
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
