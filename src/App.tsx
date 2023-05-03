import Layout from './layout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SWRConfig } from 'swr';
import { fetcher } from './api/fetcher.ts';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorPage from './components/ErrorPage.tsx';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Loading from './components/Loading.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Loading />,
      },
    ],
  },
]);
function App() {
  return (
    <>
      <HelmetProvider>
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          <SWRConfig
            value={{
              fetcher: fetcher,
            }}
          >
            <Helmet titleTemplate="Warehouse - %s" defaultTitle="Warehouse">
              <title>Warehouse Home</title>
            </Helmet>
            <RouterProvider router={router} />
          </SWRConfig>
        </ErrorBoundary>
      </HelmetProvider>
    </>
  );
}

export default App;
