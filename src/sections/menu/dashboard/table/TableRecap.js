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
import TableRecapInv from './TableRecapInv'
// redux
import { useDispatch, useSelector } from '../../../../redux/store';
import { getDatas } from '../../../../redux/slices/dashboard';
import axios from '../../../../utils/axios';
import { setSession } from '../../../../utils/jwt';


function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [isLoadingRow, setIsLoadingRow] = React.useState(false);
  // const [listPo, setListPo] = React.useState([]);
  const { startDate , endDate } = useSelector((state) =>  state.dashboard );


  // async function getData(id) {
  //   setIsLoadingRow(true)
  //   const response = await axios.post('/api/dashboardPo' , {id_pt : id , startDate , endDate});
  //   if(response.data){
  //     Promise.resolve().then( () => setListPo(response.data.data) )
  //     .then( () => setSession(response.data.token) )
  //     .then( () => setIsLoadingRow(false) )
  //   }
  // }

  let totalPoValue = 0
  let totalPaymentAllInvoice = 0
  let totalVatAllInvoice = 0

  row?.po?.forEach((row2) => {
    totalPoValue += row2.value
    row2?.invoice?.forEach((invoice) => {
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
              // getData(row.id)
            }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.full_name}
        </TableCell>
        <TableCell align="right">{row.pt_name}</TableCell>
        <TableCell align="right">{ row.po.length }</TableCell>
        <TableCell align="right">{ new Intl.NumberFormat().format(parseFloat(totalPoValue))  }</TableCell>
        <TableCell align="right">{ new Intl.NumberFormat().format(parseFloat(totalPoValue - totalPaymentAllInvoice)) }</TableCell>
        <TableCell align="right">{ new Intl.NumberFormat().format(parseFloat(totalPaymentAllInvoice)) }</TableCell>
        <TableCell align="right">{ new Intl.NumberFormat().format(parseFloat(totalVatAllInvoice)) }</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              { isLoadingRow ? (<SkeletonLoading isLoading={isLoadingRow} top={0.05} bot={0.05} /> ) : (
                <>
                <Typography variant="h6" gutterBottom component="div">
                  List PO : {row.pt_name}
                </Typography>
                <TableRecapInv data={row.po} />
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
  row: PropTypes.object.isRequired,
};

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
//   createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
//   createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
//   createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
// ];

export default function TableRecap(props) {
  // const classes = useStyles();
  // const { listPt } = useSelector((state)=>state.dashboard)
  const { data } = props; // listPt
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead >
          <TableRow >
            <TableCell />
            <TableCell>PT</TableCell>
            <TableCell align="right">PT Short</TableCell>
            <TableCell align="right">PO Count</TableCell>
            <TableCell align="right">Total PO Value</TableCell>
            <TableCell align="right">Outstanding</TableCell>
            <TableCell align="right">Paid</TableCell>
            <TableCell align="right">VAT</TableCell>
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
TableRecap.propTypes = {
  data : PropTypes.array.isRequired,
}