// @mui
import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { Container, Grid, } from '@mui/material';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// _mock_
// import { _appFeatured, _appAuthors, _appInstalled, _appRelated, _appInvoices } from '../../_mock';
// components
import Page from '../../components/Page';
// sections
// import AppWidgetSummary from '../../sections/menu/dashboard/widget/AppWidgetSummary';
import TableRecapInv from '../../sections/menu/dashboard/table/TableRecapInv';
// import FilterForm from '../../sections/menu/dashboard/form/FilterForm';
// assets
// import { SeoIllustration } from '../../assets';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getDatas } from '../../redux/slices/dashboard';
import { getAll as getAllPt } from '../../redux/slices/pt';

// ----------------------------------------------------------------------

export default function DashboardInv() {
  // const { user } = useAuth();
  // const theme = useTheme();
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();

  // const {  totalPo , totalPayment , totalOutstanding , totalVat  } = useSelector((state) =>  state.dashboard );
  const todayDate = new Date(new Date( ).getTime() + 60 * 60 * 7 * 1000).toISOString().split('T')[0]
  // const [ dateFilter, setDateFilter ] = useState([ todayDate , todayDate ])

  useEffect(() => {
    // dispatch(ptGetAll())
    Promise.resolve().then( () => dispatch(getDatas()) )
    .then( () => dispatch(getAllPt()) )
  }, []);

  return (
    <Page title="General: App">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>

          <Grid item xs={12} >
            <TableRecapInv />
          </Grid>

        </Grid>
      </Container>
    </Page>
  );
}
