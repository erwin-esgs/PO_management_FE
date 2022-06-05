import * as React from 'react';
import PropTypes from 'prop-types';
import {
     Box, Collapse, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper 
    } from '@mui/material';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SkeletonLoading from '../../../../components/SkeletonLoading'
// redux
import { useDispatch, useSelector } from '../../../../redux/store';
import { getDatas } from '../../../../redux/slices/dashboard';
import axios from '../../../../utils/axios';
import { setSession } from '../../../../utils/jwt';



// const useStyles = makeStyles(() => ({
//     table: {
//         backgroundColor: '#04d49f'
//     }
// }))

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.primary,
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [isLoadingRow, setIsLoadingRow] = React.useState(false);

  const [listPo, setListPo] = React.useState([]);
  const { startDate , endDate } = useSelector((state) =>  state.dashboard );
  
  async function getData(id) {
    // setIsLoadingRow(true)
    // const response = await axios.post('/api/dashboardPo' , {id_pt : id , startDate , endDate});
    // if(response.data){
    //   Promise.resolve().then( () => setListPo(response.data.data) )
    //   .then( () => setSession(response.data.token) )
    //   .then( () => setIsLoadingRow(false) )
    // }
  }

  let totalPaymentAllInvoice = 0
  let totalVatAllInvoice = 0
  row?.invoice?.forEach((invoice) => {
    let paymentEachInvoice 
    try {
      paymentEachInvoice = JSON.parse(invoice.payment)
    } catch (error) {
      paymentEachInvoice = []
    }
    paymentEachInvoice.forEach((item)=>{
      totalPaymentAllInvoice += item.payment_value
      totalPaymentAllInvoice += item.payment_vat
      totalVatAllInvoice += item.payment_vat
    })
  })

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} selected>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => {
              setOpen(!open)
              getData(row.id)
            }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.po_number}
        </TableCell>
        <TableCell align="left">{row.vendor_name}</TableCell>
        <TableCell align="right">{ row.invoice.length }</TableCell>
        <TableCell align="right">{ new Intl.NumberFormat().format(parseFloat(row.value))  }</TableCell>
        <TableCell align="right">{ new Intl.NumberFormat().format(parseFloat(row.value - totalPaymentAllInvoice)) }</TableCell>
        <TableCell align="right">{ new Intl.NumberFormat().format(parseFloat(totalPaymentAllInvoice)) }</TableCell>
        <TableCell align="right">{ new Intl.NumberFormat().format(parseFloat(totalVatAllInvoice)) }</TableCell>
        <TableCell align="right">{row.created_by}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              { isLoadingRow ? (<SkeletonLoading isLoading={isLoadingRow} top={0.05} bot={0.05} /> ) : (
                <>
                <Typography variant="h6" gutterBottom component="div">
                  List Invoice : {row.vendor_name}
                </Typography>
                <Table size="large" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Invoice Number</TableCell>
                      <TableCell align="left">Date</TableCell>
                      <TableCell align="left">Project</TableCell>
                      <TableCell align="right">Value</TableCell>
                      <TableCell align="right">Outstanding</TableCell>
                      <TableCell align="right">Paid</TableCell>
                      <TableCell align="right">VAT</TableCell>
                      <TableCell align="right">Input By</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row?.invoice?.map((row2) => {
                      let paymentEachInvoice 
                      try {
                        paymentEachInvoice = JSON.parse(row2.payment)
                      } catch (error) {
                        paymentEachInvoice = []
                      }
                      let totalPaymentEachInvoice = 0
                      paymentEachInvoice?.forEach((item)=>{
                        totalPaymentEachInvoice += item.payment_value 
                        totalPaymentEachInvoice += item.payment_vat
                      })
                      return (
                      <TableRow key={row2.id} >
                        <TableCell align="left" component="th" scope="row">{row2.inv_number}</TableCell>
                        <TableCell align="left">{row2.due_date}</TableCell>
                        <TableCell align="left">{row.project_code}</TableCell>
                        <TableCell align="right">{ new Intl.NumberFormat().format(parseFloat(row2.value)) }</TableCell>
                        <TableCell align="right">{ (row2.value + row2.vat) - totalPaymentEachInvoice }</TableCell>
                        <TableCell align="right">{ totalPaymentEachInvoice }</TableCell>
                        <TableCell align="right">{ new Intl.NumberFormat().format(parseFloat(row2.vat)) }</TableCell>
                        <TableCell align="right">{row2.created_by}</TableCell>
                      </TableRow>
                    )})}
                  </TableBody>
                </Table>
              </>
              ) }
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

Row.propTypes = {
  row: PropTypes.object.isRequired
};

export default function TableRecapInv({data}) {
  // const classes = useStyles();
  // const { listPt } = useSelector((state)=>state.dashboard)
  const listPt = []
  
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead >
          <TableRow >
            <TableCell />
            <TableCell align="left">PO Number</TableCell>
            <TableCell align="left">Vendor</TableCell>
            <TableCell align="right">Inv Count</TableCell>
            <TableCell align="right">PO Value</TableCell>
            <TableCell align="right">Outstanding</TableCell>
            <TableCell align="right">Paid</TableCell>
            <TableCell align="right">VAT</TableCell>
            <TableCell align="right">Input By</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { data.length > 0 ? data.map((row) => (
            <Row key={row.id} row={row} />
          )) : (<TableRow/>) }
        </TableBody>
      </Table>
    </TableContainer>
  );
}
TableRecapInv.propTypes = {
  data : PropTypes.array.isRequired,
}