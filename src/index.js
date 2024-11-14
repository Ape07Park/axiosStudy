import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound from './pages/NotFound';
import List from './pages/List';
import Main from './pages/Main';
import Detail from './pages/Main';
import Test from './pages/Test';

const root = ReactDOM.createRoot(document.getElementById('root'));

// 라우트 설정
const router = createBrowserRouter([
  { path: '/',
  element: <App/>,
  errorElement: <NotFound/>,
  // index: true는 / 경로에 접근했을 때 <Main/>를 렌더링하도록 설정

  children : [
    { index: true, element: <Main /> },
    {path:'list', element:<List/> },
    {path: 'detail', element:<Detail/>},
    {path: 'test', element:<Test/>},

  ]
  }
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
