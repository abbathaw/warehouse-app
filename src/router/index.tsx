import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layout';
import ErrorPage from '../components/ErrorPage.tsx';
import Loading from '../components/Loading.tsx';
import Home from '../pages/Home.tsx';
import Inventory from '../pages/Inventory.tsx';
import Products from '../pages/Products.tsx';
import CreateProduct from '../components/Product/CreateProduct.tsx';

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
        element: <Products />,
      },
      {
        path: '/products/new',
        element: <CreateProduct />,
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
