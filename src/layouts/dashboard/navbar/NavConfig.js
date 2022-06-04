// routes
// import { PATH_DASHBOARD } from '../../../routes/paths';
// components
// import Label from '../../../components/Label';
// import Iconify from '../../../components/Iconify';
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  booking: getIcon('ic_booking'),
  invoice: getIcon('ic_invoice'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  menuItem: getIcon('ic_menu_item'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [
      // { title: 'dashboard invoice', path: '/dashboard/invoice', icon: ICONS.dashboard },
      { title: 'dashboard', path: '/dashboard', icon: ICONS.dashboard },
      { title: 'purchase order', path: '/po', icon: ICONS.cart },
      { title: 'invoice', path: '/invoice', icon: ICONS.invoice },
    ],
  },

  // MASTER DATA
  // ----------------------------------------------------------------------
  {
    subheader: 'master data',
    items: [

      // VENDOR
      {
        title: 'vendor',
        path: '/vendor',
        icon: ICONS.ecommerce,
      },

      // PROJECT
      {
        title: 'project',
        path: '/project',
        icon: ICONS.booking,
      },

      // PT
      {
        title: 'PT',
        path: '/pt',
        icon: ICONS.banking,
      },
      
      // USER
      {
        title: 'user',
        path: '/user',
        icon: ICONS.user,
      },
    ],
  },


 
];

export default navConfig;
