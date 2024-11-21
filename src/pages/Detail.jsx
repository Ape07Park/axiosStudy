import React from 'react';
import styles from '../css/ListModal.module.css';  // 기존 CSS 모듈 사용

function VideoDetailModal({ data, onClose }) {
    if (!data) return null;
    
    return (
        <div className={styles.detailModal}>
            <div className={styles.detailModalContent}>
                <button className={styles.closeButton} onClick={onClose}>×</button>
                <h3>비디오 상세 정보</h3>
                <ul>
                    <li>아이디: {data.id}</li>
                    <li>영상 제목: {data.snippet.title}</li>
                    <li>채널 이름: {data.snippet.channelTitle}</li>
                    <li>조회수: {data.statistics.viewCount.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</li>
                    <li>게시일: {data.snippet.publishedAt.slice(0,10)}</li>
                    <li>영상 설명: {data.snippet.description}</li>
                </ul>
            </div>
        </div>
    );
}

export default VideoDetailModal;