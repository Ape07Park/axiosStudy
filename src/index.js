import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound from './pages/NotFound';
import List from '@pages/List';
import Main from '@pages/Main';
import Detail from '@pages/Detail';
import Test from '@pages/Test';
import Error, { ErrorFallback } from './components/Error';
import { ErrorBoundary } from 'react-error-boundary';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Route settings
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <App />
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
  }
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);