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
      // 에러 바운더리로 app을 감싸 전역 에러를 처리 할 수 있게 하였다.
      // 에러가 발생하면 FallbackComponent인 Error.jsx 페이지로 이동한다
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