
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, Outlet } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

// TODO app에 헤더, 푸터 컴포넌트 만들어서 넣기

export default function App() { // App 컴포넌트는 사용자 선택에 따라 UserDetail에서 선택된 사용자의 정보를 보여줍니다.

  return (
    <>
    <Header/>
    {/* 아웃렛을 두어서 헤더, 푸터는 그대로 따라다니고 페이지마다의 컨텐츠를 바꿀 수 있게 한다.*/}
    <Outlet />
    <Footer />
    </>
  );
}

