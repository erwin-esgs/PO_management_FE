import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
// import MainLayout from '../layouts/main';
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';
// import RoleBasedGuard from '../guards/RoleBasedGuard';
// config
// import { PATH_AFTER_LOGIN } from '../config';
// routes
import { PATH_DASHBOARD, PATH_PAGE } from './paths';
// components
import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {

  // console.log(window.location.href)
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          ),
        },
        { path: 'login-unprotected', element: <Login /> },
        { path: 'register-unprotected', element: <Register /> },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'new-password', element: <NewPassword /> },
        { path: 'verify', element: <VerifyCode /> },
      ],
    },
    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        // { path: 'coming-soon', element: <ComingSoon /> },
        { path: 'maintenance', element: <Maintenance /> },
        // { path: 'pricing', element: <Pricing /> },
        // { path: 'payment', element: <Payment /> },
        { path: '500', element: <Page500 /> },
        { path: '404', element: <Page404 /> },
        { path: '403', element: <Page403 /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    {
      path: '/',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        // { element: <DashboardApp />, index: true },
        { element: <Navigate to={PATH_DASHBOARD.root} replace />, index: true },
        { path: PATH_DASHBOARD.root, element: <DashboardApp /> },
        { path: "dashboard/invoice", element: <DashboardInv /> },
        { 
          path: PATH_PAGE.po, 
          children: [
            { element: <Navigate to="/po/list" replace />, index: true },
            { path: 'list', element: <PurchaseOrderApp /> },
            { path: 'detail/:id', element: <PurchaseOrderDetails /> },
          ],
        },
        { 
          path: PATH_PAGE.invoice, 
          children: [
            { element: <Navigate to="/invoice/list" replace />, index: true },
            { path: 'list', element: <InvoiceApp /> },
            { path: 'detail/:id', element: <InvoiceDetails /> },
          ],
        },
        { path: PATH_PAGE.user, element: <UserList /> },
        { path: PATH_PAGE.vendor, element: <VendorList /> },
        { path: PATH_PAGE.project, element: <ProjectList /> },
        { path: PATH_PAGE.pt, element: <PtList /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

// AUTHENTICATION
const Login = Loadable(lazy(() => import('../pages/auth/Login')));
const Register = Loadable(lazy(() => import('../pages/auth/Register')));
const ResetPassword = Loadable(lazy(() => import('../pages/auth/ResetPassword')));
const NewPassword = Loadable(lazy(() => import('../pages/auth/NewPassword')));
const VerifyCode = Loadable(lazy(() => import('../pages/auth/VerifyCode')));

// DASHBOARD

// GENERAL
const DashboardApp = Loadable(lazy(() => import('../pages/dashboard/DashboardApp')));
const DashboardInv = Loadable(lazy(() => import('../pages/dashboard/DashboardInv')));
const InvoiceApp = Loadable(lazy(() => import('../pages/invoice/InvoiceApp')));
const InvoiceDetails = Loadable(lazy(() => import('../pages/invoice/InvoiceDetails')));
const PurchaseOrderApp = Loadable(lazy(() => import('../pages/po/PurchaseOrderApp')));
const PurchaseOrderDetails = Loadable(lazy(() => import('../pages/po/PurchaseOrderDetails')));
const UserList = Loadable(lazy(() => import('../pages/user/UserList')));
const ProjectList = Loadable(lazy(() => import('../pages/project/ProjectList')));
const PtList = Loadable(lazy(() => import('../pages/pt/PtList'))); 
const VendorList = Loadable(lazy(() => import('../pages/vendor/VendorList'))); 

// ECOMMERCE
// const EcommerceShop = Loadable(lazy(() => import('../pages/dashboard/EcommerceShop')));
// const EcommerceProductDetails = Loadable(lazy(() => import('../pages/dashboard/EcommerceProductDetails')));
// const EcommerceProductList = Loadable(lazy(() => import('../pages/dashboard/EcommerceProductList')));
// const EcommerceProductCreate = Loadable(lazy(() => import('../pages/dashboard/EcommerceProductCreate')));
// const EcommerceCheckout = Loadable(lazy(() => import('../pages/dashboard/EcommerceCheckout')));

// INVOICE
// const InvoiceList = Loadable(lazy(() => import('../pages/dashboard/InvoiceList')));
// const InvoiceDetails = Loadable(lazy(() => import('../pages/dashboard/InvoiceDetails')));
// const InvoiceCreate = Loadable(lazy(() => import('../pages/dashboard/InvoiceCreate')));
// const InvoiceEdit = Loadable(lazy(() => import('../pages/dashboard/InvoiceEdit')));

// BLOG
// const BlogPosts = Loadable(lazy(() => import('../pages/dashboard/BlogPosts')));
// const BlogPost = Loadable(lazy(() => import('../pages/dashboard/BlogPost')));
// const BlogNewPost = Loadable(lazy(() => import('../pages/dashboard/BlogNewPost')));

// USER
// const UserProfile = Loadable(lazy(() => import('../pages/dashboard/UserProfile')));
// const UserCards = Loadable(lazy(() => import('../pages/dashboard/UserCards')));
// const UserList = Loadable(lazy(() => import('../pages/dashboard/UserList')));
// const UserAccount = Loadable(lazy(() => import('../pages/dashboard/UserAccount')));
// const UserCreate = Loadable(lazy(() => import('../pages/dashboard/UserCreate')));

// APP
// const Chat = Loadable(lazy(() => import('../pages/dashboard/Chat')));
// const Mail = Loadable(lazy(() => import('../pages/dashboard/Mail')));
// const Calendar = Loadable(lazy(() => import('../pages/dashboard/Calendar')));
// const Kanban = Loadable(lazy(() => import('../pages/dashboard/Kanban')));

// TEST RENDER PAGE BY ROLE
// const PermissionDenied = Loadable(lazy(() => import('../pages/dashboard/PermissionDenied')));

// MAIN
// const HomePage = Loadable(lazy(() => import('../pages/Home')));
// const About = Loadable(lazy(() => import('../pages/About')));
// const Contact = Loadable(lazy(() => import('../pages/Contact')));
// const Faqs = Loadable(lazy(() => import('../pages/Faqs')));
// const ComingSoon = Loadable(lazy(() => import('../pages/ComingSoon')));
const Maintenance = Loadable(lazy(() => import('../pages/Maintenance')));
// const Pricing = Loadable(lazy(() => import('../pages/Pricing')));
// const Payment = Loadable(lazy(() => import('../pages/Payment')));
const Page500 = Loadable(lazy(() => import('../pages/Page500')));
const Page403 = Loadable(lazy(() => import('../pages/Page403')));
const Page404 = Loadable(lazy(() => import('../pages/Page404')));
