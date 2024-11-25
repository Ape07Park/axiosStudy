import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound from '@components/NotFound';
// import List from '@pages/list/List';
import Main from '@pages/main/Main';
import MainEng from '@pages/main/MainEng';
// import Detail from '@pages/detail/Detail';
import Test from '@pages/Test';
import Error, { ErrorFallback } from '@commons/Error';
import { ErrorBoundary } from 'react-error-boundary';
import { RecoilRoot } from 'recoil';

const List = React.lazy(() => import('@pages/list/List'))
const Detail = React.lazy(() => import('@pages/detail/Detail'))

const root = ReactDOM.createRoot(document.getElementById('root'));

// Route settings
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<div>Loading...</div>}>
          <App />
        </Suspense>
      </ErrorBoundary>
    ),
    children: [
      { index: true, element: <Main /> },
      { path: 'list', element: <List /> },
      { path: 'detail', element: <Detail /> },
      { path: 'test', element: <Test /> },
    ],
  },
  {
    path: '/error',
    element: <Error />
  },
  {
    path: '*',
    element: <NotFound />
  },

  { path: '/eng', element: <MainEng /> }
]);

root.render(

  <React.StrictMode>
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  </React.StrictMode>
);