// src/component/List.jsx
import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import styles from '../css/UserList.module.css'; // css 폴더 내의 CSS 모듈 import
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위해 react-router-dom 사용

function List({ onUserClick }) { // props로 onUserClick 함수 받기
    const [users, setUsers] = useState([]); // 사용자 상태 정의: 사용자 리스트 저장
    const [showModal, setShowModal] = useState(false); // 모달 상태 정의
    const [selectedUserId, setSelectedUserId] = useState(null); // 선택된 사용자 ID 상태 정의
    const navigate = useNavigate(); // useHistory 훅 사용

    useEffect(() => { // useEffect: 컴포넌트가 처음 렌더링될 때 한 번 실행되어 axios로 API에서 사용자 목록을 가져옵니다.
        axiosInstance.get('/users')
            .then(response => setUsers(response.data))
            .catch(error => console.error("Error fetching users:", error));
    }, []); // axios.get()이 성공하면 response.data가 users 상태에 저장됩니다.

    const handleUserClick = (id) => {
        setSelectedUserId(id); // 선택된 사용자 ID 설정
        setShowModal(true); // 모달 창 표시
    };

    const handleModalClose = () => {
        setShowModal(false); // 모달 창 닫기
        onUserClick(selectedUserId); // onUserClick 호출
    };

    const handleModalConfirm = () => {
        setShowModal(false); // 모달 창 닫기
        if (selectedUserId) {
            navigate(`/userDetail/${selectedUserId}`); // 페이지 이동
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>User List</h2>
            <ul>
                {users.map(user => (
                    <li
                        key={user.id}
                        onClick={() => handleUserClick(user.id)} // 각 항목을 클릭할 때 handleUserClick 호출
                        className={styles.listItem}
                    >
                        {user.name}
                    </li>
                ))}
            </ul>
            {showModal && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <p>페이지를 이동하겠습니까?</p>
                        <button onClick={handleModalConfirm}>OK</button>
                        <button onClick={handleModalClose}>No</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default List;
