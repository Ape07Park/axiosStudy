import React, { useEffect, useRef, useState } from "react";
import axiosInstance from "../api/youtubeAxios";
import styles from '../css/ListModal.module.css'; // Import CSS modules from css folder
import { useNavigate } from "react-router-dom"; // Use react-router-dom for page navigation
import CustomPagination from "../components/CustomPagination";
import SearchBar from "../components/SearchBar";
import { RecoilRoot } from "recoil";
import VideoDetailModal from '../pages/Detail';

function ListModal({ onUserClick, closeModal }) {
  const [datas, setDatas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");

  const itemsPerPage = 3;
  const navigate = useNavigate();
  const totalCountRef = useRef(); // DOM 참조를 위한 useRef

  useEffect(() => {
    fetchDatas(currentPage);
  }, [currentPage]); // currentPage를 의존성 배열에 추가

  const fetchDatas = async (page) => {
    try {
      const response = await axiosInstance.get('/db', { params: { page } });
      setDatas(response.data.db[0].items || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleUserClick = (id) => {
    setSelectedUserId(id);
    setSelectedData(datas.find(data => data.id === id));
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    onUserClick(selectedUserId);
  };

  const handleModalConfirm = () => {
    setShowModal(false);
    setShowDetailModal(true);
  };

  const handleModalError = () => {
    throw new Error('User triggered error');
  };

  const handleDetailModalClose = () => {
    setShowDetailModal(false);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const onSearch = (term) => {
    setSearchTerm(term);
  };

  const onCategory = (category) => {
    setCategory(category);
  };

  // Filtered data based on search term and category
  const filteredData = datas.filter((data) => {
    if (category === 'title') {
      return data.snippet.title.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (category === 'channelTitle') {
      return data.snippet.channelTitle.toLowerCase().includes(searchTerm.toLowerCase());
    } else {
      return data.snippet.title.toLowerCase().includes(searchTerm.toLowerCase());
    }
  });

  useEffect(() => {
    if (totalCountRef.current) {
      totalCountRef.current.textContent = `Total Results: ${filteredData.length}`;
    }
  }, [filteredData]); // filteredData가 변경될 때마다 실행

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className={styles.container}>
      <button className={styles.closeButton} onClick={closeModal}>닫기</button>
      <h2 className={styles.title}>Video List Modal</h2>
      <h3 ref={totalCountRef}></h3> {/* 검색 결과 개수를 표시할 태그 */}
      <RecoilRoot>
        <div className={styles.searchContainer}>
          <div className={styles.dropdown}>
            {/* Dropdown component */}
          </div>
          <SearchBar onSearch={onSearch} onCategory={onCategory} />
        </div>
      </RecoilRoot>

      <ul className={styles.list}>
        {currentItems.length > 0 ? (
          currentItems.map((data, index) => (
            <li
              key={index}
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
        totalItemsCount={filteredData.length}
        itemsCountPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        activePage={currentPage}  // 현재 페이지 번호 전달
      />

      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <p>페이지를 이동하겠습니까?</p>
            <button className={styles.okButton} onClick={handleModalConfirm}>OK</button>
            <button className={styles.cancelButton} onClick={handleModalError}>No</button>
          </div>
        </div>
      )}

      {showDetailModal && selectedData && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <VideoDetailModal
              data={selectedData}
              onClose={handleDetailModalClose}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ListModal;
