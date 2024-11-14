import React, { useCallback, useEffect, useRef, useState } from "react";
import axiosInstance from "../api/youtubeAxios";
import styles from '../css/UserList.module.css';
import { useNavigate } from "react-router-dom";

function List({ onUserClick }) {
    const [datas, setDatas] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

     // 변수값의 변경으로 인한 리랜더링 방지를 위해 useState가 아닌 useRef로 함
    const observer = useRef();

    const fetchDatas = async (pageNum) => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.get('/db', {
                params: { page: pageNum }
            });

            const newItems = response.data.db[0].items || [];

            if (newItems.length === 0) {
                setHasMore(false);
            } else {
                setDatas(prevDatas => [...prevDatas, ...newItems]);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDatas(page);
    }, [page]);

    // node는 관찰대상
    // 컴포넌트가 다시 렌더링될 때마다 동일한 함수 인스턴스를 재사용
    // 랜더링 시 첫 인자인 캐싱한 함수 반환 그 뒤로는 의존성 배열 즉 두 번째 인자의 값이 바뀔 때만 함수 계속 반환
    // 로딩 중이거나 데이터가 더 있는지 판별하기 전까진 같은 함수 사용
    const lastItemRef = useCallback((node) => {

        if (isLoading) return; // 새 패이지 요청 방지
        
        if (observer.current) {
            observer.current.disconnect(); // 감지하는 것이 있으면 지우기
        }

         // IntersectionObserver: 현재 화면에 보여지고 있는 영역(뷰 포트)를 감지. 화면에 나오는 것과 내가 보고 있는 화면이 일치하는지 감지
         // 감지기 생성
        observer.current = new IntersectionObserver(entries => {
             // 첫 번째 관찰 대상이 지금 보는 것과 같은지
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1);
            }
        });

        if (node) {
            observer.current.observe(node);
        }
    }, [isLoading, hasMore]); // isLoading과 hasMore가 변경될 때만 새로 생성

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

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Video List</h2>
            <ul className={styles.list}>
                {datas.map((data, index) => (
                    <li
                        key={data.id}
                        onClick={() => handleUserClick(data.id)}
                        className={styles.listItem}
                        ref={index === datas.length - 1 ? lastItemRef : null}
                    >
                        <ul>
                            <li>아이디: {data.id}</li>
                            <li>영상 제목: {data.snippet.title}</li>
                            <li>채널 이름: {data.snippet.channelTitle}</li>
                            <li>조회수: {data.statistics.viewCount}</li>
                            <li>게시일: {data.snippet.publishedAt}</li>
                        </ul>
                    </li>
                ))}
            </ul>

            {isLoading && <div className={styles.loading}><img src='/img/loading.gif'></img></div>}
            {!hasMore && <div className={styles.noMore}>No more videos to load</div>}

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