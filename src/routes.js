import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import { useSelector } from 'react-redux';
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import Blog from './pages/Blog';
import UserTypes from './pages/UserTypes';
import User from './pages/User';
import NotFound from './pages/Page404';
import Newspaper from "./pages/Newspaper";

// ----------------------------------------------------------------------

export default function Router() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  return useRoutes([
    {
      path: '/dashboard',
      element: isLoggedIn ? <DashboardLayout /> : <Navigate to="/auth" />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'publications', element: <Newspaper /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },
        { path: 'usertypes', element: <UserTypes /> }
      ]
    },
    {
      path: '/auth',
      element: !isLoggedIn ? <LogoOnlyLayout /> : <Navigate to="/dashboard" />,
      children: [
        { element: <Navigate to="login" replace /> },
        { path: 'login', element: <Login /> },
        { path: 'forgotpassword', element: <ForgotPassword /> },
        { path: 'register', element: <Register /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
        { path: '/', element: <Navigate to="/dashboard" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
