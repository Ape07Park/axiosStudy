import React, { useState } from "react";

/**
 * 검색 조건: 영상 제목, 채널 이름, 검색 결과 없으면 없다고 하고 있으면 총 몇건 해서 나오게 하기
 * 영상 제목, 채널 이름 중 선택할 수 있게 하기
 */

export default function SearchBar({onSearch}) {

    const [term, setTerm] = useState("");

    // 배열에 검색 분류, 검색어 담기

    // input에서 입력된 검색어 받기
    const handleInputChange = (event) => {
        setTerm(event.target.value);
    };

    // 검색어 넘기기
    const handleSearch = () => {
        onSearch(term);
    };

    return (
        <div>
            {/* 드롭박스 */}
            <input
                type="text"
                placeholder="검색어를 넣으세요"
                value={term}
                onChange={handleInputChange}
            />
            <button onClick={handleSearch}>검색</button>
        </div>
    );
}