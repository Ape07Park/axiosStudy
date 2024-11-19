// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound from './pages/NotFound';
import List from '@pages/List';
import Main from '@pages/Main';
import Detail from '@pages/Detail';
import Test from '@pages/Test';
import ErrorBoundary from './components/ErrorBoundary';
import Error from './components/Error';

const root = ReactDOM.createRoot(document.getElementById('root'));

// 라우트 설정
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,  // 기본 404 처리
    children: [
      { index: true, element: <Main /> },
      { path: 'list', element: <List /> },
      { path: 'detail', element: <Detail /> },
      { path: 'test', element: <Test /> },
    ],
  },
  {
    path: '/error',
    element: <Error />  // 에러 페이지 설정
  },
]);

root.render(
  <React.StrictMode>
    <ErrorBoundary> {/* 에러 바운더리로 감싸기 */}
      <RouterProvider router={router} />
    </ErrorBoundary>
  </React.StrictMode>
);

// 성능 측정을 위한 코드
reportWebVitals();
