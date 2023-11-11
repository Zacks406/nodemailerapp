import Dashboard from './pages/Dashboard';
import EmailCompose from './pages/EmailCompose';
import Login from './pages/Login';
import Register from './pages/Register';
import DownloadPage from './pages/DownloadPage';

const routes = [
  {
    path: '/login',
    component: Login,
    secure: false,
  },
  {
    path: '/register',
    component: Register,
    secure: false,
  },
  {
    path: '/',
    component: Dashboard,
    secure: true,
  },
  {
    path: '/compose',
    component: EmailCompose,
    secure: true,
  },
  {
    path: '/download/:id',
    component: DownloadPage,
    secure: true,
  },
];

export default routes;
