// import { paramCase } from 'change-case';
import { useState, useEffect } from 'react';
// import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import {
  Box,
  // Tab,
  // Tabs,
  Card,
  Table,
  Switch,
  // Button,
  Tooltip,
  // Divider,
  TableBody,
  Container,
  IconButton,
  TableContainer,
  TablePagination,
  FormControlLabel,
  Skeleton ,
} from '@mui/material';
// routes
import { PATH_PAGE } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
import useTable, { getComparator, emptyRows } from '../../hooks/useTable';
// _mock_
// components
import Page from '../../components/Page';
import SkeletonLoading from '../../components/SkeletonLoading';
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import ButtonPopover from '../../components/popover/ButtonPopover';
import LoadingScreen from '../../components/LoadingScreen';
import PoForm from '../../sections/menu/po/form/PoForm';
import { TableEmptyRows, TableHeadCustom, TableNoData, TableSelectedActions } from '../../components/table';
// sections
import CustomTableRow  from '../../sections/menu/po/list/CustomTableRow';
import TableToolbar from '../../sections/menu/TableToolbar';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getAll, deleteData, addOneData} from '../../redux/slices/po';
import { getAll as ptGetAll } from '../../redux/slices/pt';
import { getAll as projectGetAll } from '../../redux/slices/project';
import { getAll as vendorGetAll } from '../../redux/slices/vendor';

// ----------------------------------------------------------------------

// const STATUS_OPTIONS = ['all', 'active', 'banned'];

const ROLE_OPTIONS = [
  'all',
  'ux designer',
  'full stack designer',
  'backend developer',
  'project manager',
  'leader',
  'ui designer',
  'ui/ux designer',
  'front end developer',
  'full stack developer',
];

const TABLE_HEAD = [
  { id: 'id_po', label: 'ID', align: 'left' },
  { id: 'tod', label: 'Date', align: 'left' },
  { id: 'top', label: 'TOP', align: 'left' },
  { id: 'description', label: 'Description', align: 'left' },
  { id: 'pt_project', label: 'PT / Project', align: 'left' },
  { id: 'id_vendor', label: 'Vendor', align: 'left' },
  { id: 'value', label: 'Value / VAT / Total', align: 'left' },
  { id: 'paid', label: 'Paid / Outstanding', align: 'left' },
  // { id: 'tod', label: 'Delivery Date', align: 'left' },
  // { id: 'description', label: 'Description', align: 'left' },
  // { id: 'payment', label: 'Payment', align: 'left' },
  { id: 'created_by', label: 'Created By', align: 'left' },
  { id: '#', label: '#', align: 'center' },
];

// ----------------------------------------------------------------------

export default function PurchaseOrderApp() {

  const dispatch = useDispatch();

  const [isLoadingPage, setIsLoadingPage] = useState(true);

  useEffect(() => {
    // dispatch(ptGetAll())
    Promise.resolve().then( () => dispatch(getAll()) )
    .then( () => dispatch(ptGetAll()) )
    .then( () => dispatch(projectGetAll()) )
    .then( () => dispatch(vendorGetAll()) )
    .then( () => setIsLoadingPage(false) )
  }, []);
  
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const { themeStretch } = useSettings();

  const { pos , isLoading } = useSelector((state) =>  state.po );
  const { pts } = useSelector((state) => state.pt);
  const { projects } = useSelector((state) => state.project);
  const { vendors } = useSelector((state) => state.vendor);

  let tableData = pos;
  
  const [filterName, setFilterName] = useState('');

  // useEffect(() => {
  //   setIsLoadingPage(  isLoading )
  // }, [isLoading]);

  const handleFilterName = (newFilterName) => {
    setFilterName(newFilterName);
    setPage(0);
  };

  const handleDeleteRows = (newSelected) => {
    console.log(newSelected)
    dispatch(deleteData(newSelected))
    setSelected([]);
  };

  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filterName,
  });
  const selectedOne = (data) => {
    dispatch(addOneData(data))
  }

  const denseHeight = dense ? 52 : 72;

  const isNotFound =
    (!dataFiltered.length && !!filterName) 

  return (
    <Page title="PO: List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
      {isLoadingPage || isLoading ? <LoadingScreen /> : (<SkeletonLoading isLoading={isLoadingPage} >
        <>
        <HeaderBreadcrumbs
          heading="PO List"
          links={[
            { name: 'PO', href: PATH_PAGE.po },
            { name: 'List' },
          ]}
          action={
            <ButtonPopover text='Add PO' startIcon={<Iconify icon={'eva:plus-fill'} />} >
              <PoForm text="Add PO" />
            </ButtonPopover>
          }
        />
      
        <Card>
          <TableToolbar
            filterName={filterName}
            // filterRole={filterRole}
            onFilterName={handleFilterName}
            // onFilterRole={handleFilterRole}
            optionsRole={ROLE_OPTIONS}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
              {selected.length > 0 && (
                <TableSelectedActions
                  dense={dense}
                  numSelected={selected.length}
                  rowCount={tableData.length}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row) => row.id)
                    )
                  }
                  actions={
                    <Tooltip title="Delete">
                      <IconButton color="error" onClick={() => handleDeleteRows(selected)}>
                        <Iconify icon={'eva:trash-2-outline'} />
                      </IconButton>
                    </Tooltip>
                  }
                />
              )}

              <Table size={dense ? 'small' : 'medium'}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={selected.length}
                  onSort={onSort}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row) => row.id)
                    )
                  }
                />

                <TableBody>
                  {dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                    <CustomTableRow
                      key={row.id}
                      row={row}
                      selected={selected.includes(row.id)}
                      onSelectRow={() => onSelectRow(row.id)}
                      selectedOne={()=> selectedOne(row)}
                    />
                  ))}

                  <TableEmptyRows height={denseHeight} emptyRows={emptyRows(page, rowsPerPage, tableData.length)} />

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <Box sx={{ position: 'relative' }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={dataFiltered.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={onChangePage}
              onRowsPerPageChange={onChangeRowsPerPage}
            />

            <FormControlLabel
              control={<Switch checked={dense} onChange={onChangeDense} />}
              label="Dense"
              sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
            />
          </Box>
        </Card> </>
        </SkeletonLoading>)}
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------

function applySortFilter({ tableData, comparator, filterName, filterStatus, filterRole }) {
  try{
    const stabilizedThis = tableData.map((el, index) => [el, index]);

    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    }); 
    
    tableData = stabilizedThis.map((el) => el[0]);
  
    if (filterName) {
      tableData = tableData.filter((item) => {
        
        const key = Object.keys(item)
        let result=false
        key.forEach(element => {
          let itemElement = item[element]
          try {
            if(Number.isInteger( itemElement )){
              itemElement = itemElement.toString()
            }
            result = ( itemElement.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ) || result
          } catch (error) {
            result = result || false
          }
        });
        return result
      });
    }
    if (filterStatus){
      if (filterStatus !== 'all') {
        tableData = tableData.filter((item) => item.status === filterStatus);
      }
    }
    if (filterRole){
      if (filterRole !== 'all') {
        tableData = tableData.filter((item) => item.role === filterRole);
      }
    }
  
    
  }catch(e){
    console.log(e)
  }
  return tableData;
}
