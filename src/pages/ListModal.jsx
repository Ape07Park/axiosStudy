import React, { useEffect, useRef, useState } from "react";
import axiosInstance from "../api/youtubeAxios";
import styles from '../css/ListModal.module.css'; // css 폴더 내의 CSS 모듈 import
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위해 react-router-dom 사용
import CustomPagination from "../components/CustomPagination";
import SearchBar from "../components/SearchBar";

// TODO 검색 만들기
function ListModal({ onUserClick, closeModal }) {
    const [datas, setDatas] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");

    // const smapleData = ['title', 'channelTitle'];

    const itemsPerPage = 4;

    const navigate = useNavigate();

    useEffect(() => {
        fetchDatas(currentPage);
    }, []);

    const fetchDatas = async (page) => {
        try {
            const response = await axiosInstance.get('/db', { params: { page } });
            setDatas(prevDatas => [...prevDatas, ...response.data.db[0].items || []]);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleUserClick = (id) => {
        setSelectedUserId(id);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        onUserClick(selectedUserId);
    };

    const handleModalConfirm = () => {
        setShowModal(false);
        if (selectedUserId) {
            navigate(`/userDetail/${selectedUserId}`);
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // 검색어를 업데이트 해주는 함수
    const onSearch = (term) => {
        setSearchTerm(term)
    }

    const filteredData = datas.filter((data) =>
        data.snippet.title.toLowerCase().includes(searchTerm.toLowerCase())
        // data.snippet.channelTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className={styles.container}>
            <button className={styles.closeButton} onClick={closeModal}>닫기</button>
            <h2 className={styles.title}>Video List Modal</h2>

            {/* <Dropdown props={smapleData} /> */}
            <SearchBar searchTerm={searchTerm} onSearch={onSearch} />

            <ul className={styles.list}>
                {currentItems.length > 0 ? (
                    currentItems.map(data => (
                        <li
                            key={data.id}
                            onClick={() => handleUserClick(data.id)}
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
                    <li>Loading...</li>
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
                        <button className={`${styles.okButton}`} onClick={handleModalConfirm}>OK</button>
                        <button className={`${styles.cancelButton}`} onClick={handleModalClose}>No</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ListModal;
