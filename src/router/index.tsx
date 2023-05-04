import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layout';
import ErrorPage from '../components/ErrorPage.tsx';
import Loading from '../components/Loading.tsx';
import Home from '../pages/Home.tsx';
import Inventory from '../pages/Inventory.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/inventory',
        element: <Inventory />,
      },
      {
        path: '/products',
        element: <Loading />,
      },
      {
        path: '/sales',
        element: <Loading />,
        children: [
          {
            path: '/sales/:id',
            element: <Loading />,
          },
        ],
      },
    ],
  },
]);
