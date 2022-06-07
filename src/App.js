// routes
import {useNavigate} from 'react-router-dom';
import axios from './utils/axios';
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ThemeSettings from './components/settings';
import { ChartStyle } from './components/chart';
import ScrollToTop from './components/ScrollToTop';
import { ProgressBarStyle } from './components/ProgressBar';
import NotistackProvider from './components/NotistackProvider';
import MotionLazyContainer from './components/animate/MotionLazyContainer';
import {  
  PATH_AUTH 
} from './routes/paths';
import useAuth from './hooks/useAuth';

// ----------------------------------------------------------------------

export default function App() {

  const { logout } = useAuth();
  
  const navigate = useNavigate();

  axios.interceptors.response.use( (response) => response , () => {
    logout();
    navigate(PATH_AUTH.login, { replace: true });
  } );

  return (
    <MotionLazyContainer>
      <ThemeProvider>
        <ThemeSettings>
          <NotistackProvider>
            <ProgressBarStyle />
            <ChartStyle />
            <ScrollToTop />
            <Router />
          </NotistackProvider>
        </ThemeSettings>
      </ThemeProvider>
    </MotionLazyContainer>
  );
}
