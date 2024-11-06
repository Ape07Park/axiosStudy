import React, { useEffect, useState } from "react";
import axiosInstance from "../api/youtubeAxios";
import styles from '../css/UserList.module.css'; // css 폴더 내의 CSS 모듈 import
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위해 react-router-dom 사용
import CustomPagination from "./CustomPagination";

function List({ onUserClick }) {
    const [datas, setDatas] = useState([]); // 사용자 상태 정의: 사용자 리스트 저장
    const [showModal, setShowModal] = useState(false); // 모달 상태 정의
    const [selectedUserId, setSelectedUserId] = useState(null); // 선택된 사용자 ID 상태 정의
    const navigate = useNavigate(); // useHistory 훅 사용

    // 현재 페이지 상태 정의
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 5; // 한 페이지에 보여줄 아이템 수

    useEffect(() => {
        axiosInstance.get('/db')
            .then(response => {
                console.log("API Response:", response); // 응답을 콘솔에 출력
                setDatas(response.data.db[0].items || []); // 빈 배열로 초기화하여 데이터가 없는 경우에도 안전하게 처리
            })
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

    // 페이징
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = datas.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className={styles.container}>

            <h2 className={styles.title}>Video List</h2>
            <ul className={styles.list}>
                {currentItems.length > 0 ? ( // 데이터가 있을 때만 map 함수 호출
                    currentItems.map(data => (
                        <li
                            key={data.id}
                            onClick={() => handleUserClick(data.id)} // 각 항목을 클릭할 때 handleUserClick 호출
                            className={styles.listItem}
                        >
                            <ul>
                                <li>아이디: {data.id}</li>
                                <li>영상 제목: {data.snippet.title}</li>
                                <li>채널 이름: {data.snippet.channelTitle}</li>
                                <li>조회수: {data.statistics.viewCount}</li>
                                <li>게시일: {data.snippet.publishedAt}</li>
                            </ul>
                        </li>
                    ))
                ) : (
                    <li>Loading...</li> // 데이터가 없을 때 표시할 내용
                )}
            </ul>
            <CustomPagination
                totalItemsCount={datas.length}
                itemsCountPerPage={itemsPerPage}
                onPageChange={handlePageChange}
            />
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
