
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, Outlet } from 'react-router-dom';


import Detail from './pages/Detail';
import Header from './components/Header';
import Footer from './components/Footer';

// TODO app에 헤더, 푸터 컴포넌트 만들어서 넣기

export default function App() { // App 컴포넌트는 사용자 선택에 따라 UserDetail에서 선택된 사용자의 정보를 보여줍니다.
  const [selectedUserId, setSelectedUserId] = useState(null); // selectedUserId 상태: 사용자가 선택한 사용자의 ID를 저장하는 상태입니다.
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleUserClick = (userId) => {
    setSelectedUserId(userId);
  };

  return (
    // <div className={styles.App}>
    //   <h1 className={styles.title}>Video Management</h1>
    //   <List onUserClick={handleUserClick} /> {/* UserList에서 onUserClick 이벤트가 발생하면 handleUserClick 호출 */}
    //   {!window.confirmNavigation && selectedUserId && <Detail userId={selectedUserId} />} {/* 선택된 사용자 ID를 UserDetail 컴포넌트에 전달 */}
    // </div>

    <>
    <Header/>
    <Outlet />
    <Footer />
    </>
  );
}

