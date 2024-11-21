import React, { useEffect, useRef, useState } from "react";
import axiosInstance from "../api/youtubeAxios";
import styles from '../css/ListModal.module.css';
import CustomPagination from "../components/CustomPagination";
import SearchBar from "../components/SearchBar";
import { RecoilRoot } from "recoil";
import VideoDetailModal from '../pages/Detail';

// TODO 조회수. 게시일 별로 정렬, 게시일 날짜 만 나오게 하기 , 조회수에 3자리 마다 , 나오게 하기
function ListModal({ closeModal }) {
  const [datas, setDatas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const [align, setAlign] = useState("date")

  const [currentPage, setCurrentPage] = useState(1);

  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");

  const itemsPerPage = 3;
  const totalCountRef = useRef(); // DOM 참조를 위한 useRef

  useEffect(() => {
    fetchDatas(currentPage);
  }, [currentPage]);

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

  const handleModalConfirm = () => {
    setShowModal(false);
    setShowDetailModal(true);
  };

  // 에러 일으키기
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

  const handleAlign = (e) => {
    setAlign(e.target.value);
  }

  // 검색 카테고리에 따라 달라짐
  const filteredData = datas.filter((data) => {
    if (category === 'title') {
      return data.snippet.title.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (category === 'channelTitle') {
      return data.snippet.channelTitle.toLowerCase().includes(searchTerm.toLowerCase());
    } else {
      return datas;
    }
  });

  useEffect(() => {
    if (totalCountRef.current) {
      totalCountRef.current.textContent = `Total Results: ${filteredData.length}`;
    }
  }, [filteredData]);

  let alignedData = null;

  if (align === "date") {
    alignedData = filteredData.sort((a, b) => new Date(b.snippet.publishedAt) - new Date(a.snippet.publishedAt));
  } else if (align === "viewCount") {
    alignedData = setDatas(datas.sort((a, b) => b.statistics.viewCount - a.statistics.viewCount));
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className={styles.container}>
      <button className={styles.closeButton} onClick={closeModal}>닫기</button>
      <h2 className={styles.title}>Video List Modal</h2>

      <h3 ref={totalCountRef}></h3> {/* 검색 결과 개수를 표시할 태그 */}

      {/* 카테고리 변수 바로 전달을 위해 리코일 사용 */}
      <RecoilRoot>
        <div className={styles.searchContainer}>
          <div className={styles.dropdown}>
            {/* Dropdown component */}
          </div>
          <SearchBar onSearch={onSearch} onCategory={onCategory} />
        </div>
      </RecoilRoot>

      <div>
        <select onChange={handleAlign}>
          <option value="date">게시일 순</option>
          <option value="viewCount">조회수 순</option>
        </select>
      </div>

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
                <li>조회수: {data.statistics.viewCount.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</li>
                <li>게시일: {data.snippet.publishedAt.slice(0,10)}</li>
              </ul>
            </li>
          ))
        ) : (
          <li>데이터가 없습니다</li>
        )}
      </ul>

      {/* 페이지네이션 컴포넌트 */}
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
