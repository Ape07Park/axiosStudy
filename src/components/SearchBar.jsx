import React, { useState } from "react";

export default function SearchBar({ onSearch, onCategory }) {

    const [term, setTerm] = useState("");
    const [category, setCategory] = useState("title");


    // 배열에 검색 분류, 검색어 담기

    // input에서 입력된 검색어 받기
    const handleInputChange = (event) => {
        setTerm(event.target.value);
    };

    // 카테고리, 검색어 넘기기
    const handleSearch = () => {

        onCategory(category); // 카테고리를 리스트 모달로 넘김
        onSearch(term); // 검색어를 리스트 모달로 넘김
    };

    // category 입력 세팅하기
    const handleCategory = (event) => {

        setCategory(event.target.value);
    };

    return (
        <div>
            <select onChange={handleCategory}>
                <option value='title' selected>영상 제목</option>
                <option value='channelTitle'>채널 이름</option>
            </select>
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