import { useEffect, useState } from 'react';
import { useParams, useNavigate , Navigate} from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_PAGE } from '../../routes/paths';
// _mock_
import { _invoices } from '../../_mocks';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import SkeletonLoading from '../../components/SkeletonLoading';
import Iconify from '../../components/Iconify';
// sections
import Invoice from '../../sections/menu/invoice/details';
import ButtonPopover from '../../components/popover/ButtonPopover';
import PaymentForm from '../../sections/menu/invoice/form/PaymentForm';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getDetail} from '../../redux/slices/invoice';

// ----------------------------------------------------------------------

export default function InvoiceDetails() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const [isLoadingPage, setIsLoadingPage] = useState(true);

  const { invoice , isLoading } = useSelector((state) =>  state.invoice );

  useEffect(() => {
    // dispatch(ptGetAll())
    Promise.resolve().then( () => dispatch(getDetail(id)) )
    .then( () => setIsLoadingPage(false) )
  }, []);


  return (
    <Page title="Invoice: View">
      {isLoadingPage || isLoading ? (<SkeletonLoading />) : (
      <>
      {invoice ? (<Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Invoice Details"
          links={[
            { name: 'Invoice', href: PATH_PAGE.invoice },
            {
              name: 'Details', href: PATH_PAGE.invoice,
            },
            { name: id },
          ]}
        />
        <Invoice  />
      </Container>) :
      <Navigate to="/po" replace /> 
      }
      </>
      )}
    </Page>
  );
}
