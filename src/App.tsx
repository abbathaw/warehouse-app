import { RouterProvider } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { router } from './router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
      <HelmetProvider>
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          <Helmet titleTemplate="Warehouse - %s" defaultTitle="Warehouse">
            <title>Warehouse Home</title>
          </Helmet>
          <RouterProvider router={router} />
          <ToastContainer autoClose={3000} theme={'colored'} />
        </ErrorBoundary>
      </HelmetProvider>
    </>
  );
}

export default App;
