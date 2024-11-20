import React, { useCallback, useEffect, useRef, useState } from "react";
import axiosInstance from "../api/youtubeAxios";
import styles from '../css/UserList.module.css';
import { useNavigate } from "react-router-dom";
import ListPagingOn from "./ListModal";

function List() {
    const [datas, setDatas] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    // 변수값의 변경으로 인한 리랜더링 방지를 위해 useState가 아닌 useRef로 함
    const observer = useRef();
    const totalCountRef = useRef(); // DOM 참조를 위한 useRef

    const fetchDatas = async (pageNum) => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.get('/db', {
                params: { page: pageNum }
            });

            const newItems = response.data.db[0].items || [];
            const totalItems = response.data.db[0].pageInfo.resultsPerPage; // 응답 데이터에서 totalResults를 가져옴

            // totalCount를 DOM에 삽입
            if (totalCountRef.current) {
                totalCountRef.current.textContent = `Total Items: ${totalItems}`;
            }

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
    const lastItemRef = useCallback((node) => {
        if (isLoading) return; // 새 페이지 요청 방지

        if (observer.current) {
            observer.current.disconnect(); // 감지하는 것이 있으면 지우기
        }

        // IntersectionObserver: 현재 화면에 보여지고 있는 영역(뷰 포트)를 감지
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1);
            }
        });

        if (node) {
            observer.current.observe(node);
        }
    }, [isLoading, hasMore]); // isLoading과 hasMore가 변경될 때만 새로 생성

    const handleUserClick = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Video List</h2>
            <h3 ref={totalCountRef}></h3> {/* 총 아이템 개수를 표시할 태그 */}
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

            {isLoading && <div className={styles.loading}><img src='/img/loading.gif' alt="Loading..."/></div>}
            {!hasMore && <div className={styles.noMore}>No more videos to load</div>}

            {showModal && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <ListPagingOn closeModal={handleModalClose} />
                    </div>
                </div>
            )}

        </div>
    );
}

export default List;
