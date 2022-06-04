import {useEffect , useState} from 'react';
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

function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3,
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1,
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const [isLoadingRow, setIsLoadingRow] = useState(false);
  const [listPo, setListPo] = useState([]);
  const { startDate , endDate } = useSelector((state) =>  state.dashboard );
  const { pts } = useSelector((state) =>  state.pt );

  async function getData(id) {
    setIsLoadingRow(true)
    const response = await axios.post('/api/dashboardPo' , {id_pt : id , startDate , endDate});
    if(response.data){
      Promise.resolve().then( () => setListPo(response.data.data) )
      .then( () => setSession(response.data.token) )
      .then( () => setIsLoadingRow(false) )
    }
  }

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
          {row}
        </TableCell>
        <TableCell align="right">{ new Intl.NumberFormat().format(parseFloat( (Math.floor(Math.random() * 10) + 1)*10000000 )) }</TableCell>
        <TableCell align="right">{ new Intl.NumberFormat().format(parseFloat( (Math.floor(Math.random() * 10) + 1)*10000000 )) }</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              { isLoadingRow ? (<SkeletonLoading isLoading={isLoadingRow} top={0.05} bot={0.05} /> ) : (
                <>
                <Typography variant="h6" gutterBottom component="div">
                  PT List
                </Typography>
                <Table size="large" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Full Name</TableCell>
                      <TableCell>Short Name</TableCell>
                      <TableCell align="right">PPN IN</TableCell>
                      <TableCell align="right">PPN OUT</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {pts?.map((row2) => 
                      <TableRow key={row2.id} >
                        <TableCell component="th" scope="row">{row2.full_name}</TableCell>
                        <TableCell>{row2.pt_name}</TableCell>
                        <TableCell align="right">{ new Intl.NumberFormat().format(parseFloat( (Math.floor(Math.random() * 10) + 1)*1000000 )) }</TableCell>
                        <TableCell align="right">{ new Intl.NumberFormat().format(parseFloat( (Math.floor(Math.random() * 10) + 1)*1000000 )) }</TableCell>
                      </TableRow>
                    )}
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
  row: PropTypes.string
  // row: PropTypes.shape({
  //   id: PropTypes.number.isRequired,
  //   full_name: PropTypes.string.isRequired,
  //   pt_name: PropTypes.string.isRequired,
  //   total_po: PropTypes.number.isRequired,
  //   total_payment: PropTypes.number.isRequired,
  //   total_vat: PropTypes.number.isRequired,
  //   history: PropTypes.arrayOf(
  //     PropTypes.shape({
  //       amount: PropTypes.number.isRequired,
  //       customerId: PropTypes.string.isRequired,
  //       date: PropTypes.string.isRequired,
  //     }),
  //   ),
  // }).isRequired,
};

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
//   createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
//   createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
//   createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
// ];

export default function TableRecapInv() {
  // const classes = useStyles();
  const { listPt } = useSelector((state)=>state.dashboard)
  const listMonth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  useEffect(()=>{
    
  },[])

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead >
          <TableRow >
            <TableCell />
            <TableCell>Month</TableCell>
            <TableCell align="right">PPN IN</TableCell>
            <TableCell align="right">PPN OUT</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { listMonth.length > 0 ? listMonth.map((row , index) => (
            <Row key={index} row={row} />
          )) : (<TableRow/>) }
        </TableBody>
      </Table>
    </TableContainer>
  );
}
