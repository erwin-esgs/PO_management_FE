// @mui
import {  useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { Container, Grid, Box } from '@mui/material';
// hooks
// import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// _mock_
// import { _appFeatured, _appAuthors, _appInstalled, _appRelated, _appInvoices } from '../../_mock';
// components
import Page from '../../components/Page';
// sections
import AppWidgetSummary from '../../sections/menu/dashboard/widget/AppWidgetSummary';
import TableRecap from '../../sections/menu/dashboard/table/TableRecap';
import FilterForm from '../../sections/menu/dashboard/form/FilterForm';
// assets
// import { SeoIllustration } from '../../assets';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getDatas } from '../../redux/slices/dashboard';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  // const { user } = useAuth();
  const theme = useTheme();
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();

  const {  listPt  } = useSelector((state) =>  state.dashboard );
  // const todayDate = new Date(new Date( ).getTime() + 60 * 60 * 7 * 1000).toISOString().split('T')[0]
  // const [ dateFilter, setDateFilter ] = useState([ todayDate , todayDate ])

  useEffect(() => {
    // dispatch(ptGetAll())
    Promise.resolve().then( () => dispatch(getDatas()) )
  }, []);

  let totalPoValue = 0
  let totalPoVat = 0
  let totalPaymentAllInvoice = 0
  let totalVatAllInvoice = 0
  listPt?.forEach((pt)=>{
    pt.po?.forEach((poItem)=>{
      totalPoValue += Number(poItem.value)
      totalPoVat += Number(poItem.vat)
      poItem.invoice?.forEach((invoiceItem) => {
        let paymentEachInvoice 
        try {
          paymentEachInvoice = JSON.parse(invoiceItem.payment)
        } catch (error) {
          paymentEachInvoice = []
        }
        paymentEachInvoice.forEach((paymentItem)=>{
          totalPaymentAllInvoice += paymentItem.payment_value
          // totalPaymentAllInvoice += item.payment_vat
          totalVatAllInvoice += paymentItem.payment_vat
        })
      })
    })
  })
  

  return (
    <Page title="Dashboard: App">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="flex-end">
              <FilterForm />
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Total PO"
              percent={2.6}
              total={totalPoValue}
              subtotal={totalPoVat}
              chartColor={theme.palette.chart.blue[0]}
              chartData={[5, 18, 12, 51, 68, 11, 39, 37, 27, 20]}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Total Outstanding Value"
              percent={-0.1}
              total={totalPoValue - totalPaymentAllInvoice}
              subtotal={totalPoVat - totalVatAllInvoice}
              chartColor={theme.palette.chart.red[0]}
              chartData={[8, 9, 31, 8, 16, 37, 8, 33, 46, 31]}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Total Payment"
              percent={0.2}
              total={totalPaymentAllInvoice}
              subtotal={totalVatAllInvoice}
              chartColor={theme.palette.primary.main}
              chartData={[20, 41, 63, 33, 28, 35, 50, 46, 11, 26]}
            />
          </Grid>

          {/* <Grid item xs={12} md={3}>
            <AppWidgetSummary
              title="Total VAT"
              percent={3.1}
              total={totalPoValue}
              chartColor={theme.palette.chart.yellow[0]}
              chartData={[8, 9, 31, 8, 16, 37, 8, 33, 46, 31]}
            />
          </Grid> */}

          <Grid item xs={12} >
            <TableRecap data={listPt} />
          </Grid>

        </Grid>
      </Container>
    </Page>
  );
}
