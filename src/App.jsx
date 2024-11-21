import { BrowserRouter as Router, Route, Routes, useNavigate, Outlet } from 'react-router-dom';

import Header from '@commons/Header';
import Footer from '@commons/Footer';

export default function App() {

  return (
    <>
    <Header/>
    {/* 아웃렛을 두어서 헤더, 푸터는 그대로 따라다니고 페이지마다의 컨텐츠를 바꿀 수 있게 한다.*/}
    <Outlet />
    <Footer />
    </>
  );
}

