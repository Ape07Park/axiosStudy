import { BrowserRouter as Router, Route, Routes, useNavigate, Outlet } from 'react-router-dom';

import Header from '@commons/Header';
import Footer from '@commons/Footer';
import i18n from '../src/lang/i18n';
import { I18nextProvider } from 'react-i18next';
export default function App() {

  return (
    <I18nextProvider i18n={i18n}>
    <Header/>
    {/* 아웃렛을 두어서 헤더, 푸터는 그대로 따라다니고 페이지마다의 컨텐츠를 바꿀 수 있게 한다.*/}
    <Outlet />
    <Footer />
    </I18nextProvider>
  );
}

