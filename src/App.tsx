import { RouterProvider } from 'react-router-dom';
import { SWRConfig } from 'swr';
import { fetcher } from './api/fetcher.ts';
import { ErrorBoundary } from 'react-error-boundary';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { router } from './router';

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
