// UserDetail.js
import React, { useState, useEffect } from 'react';
import customFetch from '../api/fetch'; // 경로 수정
import styles from '../css/UserDetail.module.css'; // css 폴더 내의 CSS 모듈 import

function UserDetail({ userId }) {
  const [user, setUser] = useState(null); // user 상태: 데이터를 성공적으로 불러오면 user 상태에 저장되며, user 값이 null이 아닐 경우 상세 정보를 표시합니다.
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    if (!userId) {
      setUser(null);
      setLoading(false);
      return;
    }

    setLoading(true); // 데이터 요청 전 로딩 상태 설정

    customFetch(`/users/${userId}`) // userId Prop: userId는 부모 컴포넌트에서 선택된 사용자 ID를 전달받는 prop입니다.
      .then((response) => {
        setUser(response);
        setLoading(false); // 데이터 요청 완료 후 로딩 상태 해제
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
        setLoading(false); // 에러 발생 시 로딩 상태 해제
      });
  }, [userId]);

  if (!userId) return <div>Select a user to see details</div>; // userId가 없을 때는 안내 메시지를 보여줍니다.

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>User Detail</h2>
      {loading ? (
        <p>Loading...</p> // 로딩 메시지: 데이터 요청 중에는 "Loading..." 메시지가 출력됩니다.
      ) : user ? (
        <div className={styles.detail}>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Website:</strong> {user.website}</p>
        </div>
      ) : (
        <p>No user details available.</p> // user 값이 null일 경우에는 "No user details available." 메시지가 출력됩니다.
      )}
    </div>
  );
}

export default UserDetail;
