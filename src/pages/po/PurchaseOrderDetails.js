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
import Invoice from '../../sections/menu/po/details';
import ButtonPopover from '../../components/popover/ButtonPopover';
import PaymentForm from '../../sections/menu/po/form/PaymentForm';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getDetail} from '../../redux/slices/po';

// ----------------------------------------------------------------------

export default function InvoiceDetails() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const [isLoadingPage, setIsLoadingPage] = useState(true);

  const { po , isLoading } = useSelector((state) =>  state.po );

  useEffect(() => {
    // dispatch(ptGetAll())
    Promise.resolve().then( () => dispatch(getDetail(id)) )
    .then( () => setIsLoadingPage(false) )
  }, []);


  return (
    <Page title="Invoice: View">
      {isLoadingPage || isLoading ? (<SkeletonLoading />) : (
      <>
      {po ? (<Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="PO Details"
          links={[
            { name: 'PO', href: PATH_PAGE.po },
            {
              name: 'Details', href: PATH_PAGE.po,
            },
            { name: id },
          ]}
        />
        <Invoice data={po} />
      </Container>) :
      <Navigate to="/po" replace /> 
      }
      </>
      )}
    </Page>
  );
}
