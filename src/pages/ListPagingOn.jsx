import React, { useEffect, useRef, useState } from "react";
import axiosInstance from "../api/youtubeAxios";
import styles from '../css/UserList.module.css'; // css 폴더 내의 CSS 모듈 import
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위해 react-router-dom 사용
import CustomPagination from "../components/CustomPagination";
import SearchBar from "../components/SearchBar";


function List({ onUserClick }) {
    const [datas, setDatas] = useState([]); // 데이터의 상태 정의
    const [showModal, setShowModal] = useState(false); // 모달 상태 정의
    const [selectedUserId, setSelectedUserId] = useState(null); // 선택된 사용자 ID 상태 정의
    const navigate = useNavigate();

    // 현재 페이지 상태 정의
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 15; // 한 페이지에 보여줄 아이템 수

    const observer = useRef(null);

    useEffect(() => {
        fetchDatas(currentPage);
    }, [currentPage]); // 현재 페이지 정보가 변경될 때마다 데이터를 다시 가져옴

    const fetchDatas = async (page) => {
        try {
            const response = await axiosInstance.get('/db', {
                params: { page }
            });
            setDatas(prevDatas => [...prevDatas, ...response.data.db[0].items || []]);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleUserClick = (id) => {
        setSelectedUserId(id);
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
    // pageNumber를 넣어 현재 페이지로 만듦
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastItem = currentPage * itemsPerPage; // 현재 페이지의 마지막 아이템: 현재 페이지 * 페이지 당 아이템 ex) 2 페이지 10번 아이템
    const indexOfFirstItem = indexOfLastItem - itemsPerPage; // 현재 페이지의 첫 번째 아이템: 현재 페이지의 마지막 아이템 - 페이지 당 아이템 ex) 2페이지 6번 아이템
    const currentItems = datas.slice(indexOfFirstItem, indexOfLastItem); // 현재 페이지의 아이템들: 현재 페이지의 첫 아이템 ~ 현재 페이지의 마지막 아이템


    // TODO 검색값을 넣을 함수 만들어 넣기
    return (
        <div className={styles.container}>
            {/* <SearchBar datas/> */}

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
