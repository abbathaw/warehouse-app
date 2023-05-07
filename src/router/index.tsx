import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layout';
import ErrorPage from '../components/ErrorPage.tsx';
import Home from '../pages/Home.tsx';
import Inventory from '../pages/Inventory.tsx';
import Products from '../pages/Products.tsx';
import CreateProduct from '../components/Product/CreateProduct.tsx';
import EditProduct from '../components/Product/EditProduct.tsx';
import Sales from '../pages/Sales.tsx';
import CreateSale from '../components/Sale/CreateSale.tsx';
import EditSale from '../components/Sale/EditSale.tsx';

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
        path: '/products/edit/:id',
        element: <EditProduct />,
      },
      {
        path: '/sales',
        element: <Sales />,
      },
      {
        path: '/sales/new',
        element: <CreateSale />,
      },
      {
        path: '/sales/edit/:id',
        element: <EditSale />,
      },
    ],
  },
]);
