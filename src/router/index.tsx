import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layout';
import ErrorPage from '../components/ErrorPage.tsx';
import Loading from '../components/Loading.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Loading />,
      },
      {
        path: '/inventory',
        element: <Loading />,
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
