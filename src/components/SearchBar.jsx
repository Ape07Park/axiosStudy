import React, { useState } from "react";
import Dropdown from "./DropDown";

/**
 * 검색 조건: 영상 제목, 채널 이름, 검색 결과 없으면 없다고 하고 있으면 총 몇건 해서 나오게 하기
 * 영상 제목, 채널 이름 중 선택할 수 있게 하기
 */


export default function SearchBar({onSearch, onCategory}) {

    const [term, setTerm] = useState("");
    const [category, setCategory] = useState("");


    // 배열에 검색 분류, 검색어 담기

    // input에서 입력된 검색어 받기
    const handleInputChange = (event) => {
        setTerm(event.target.value);
    };

    // 검색어 넘기기
    const handleSearch = () => {
        onSearch(term);
    };

    // TODO 여기로 카테고리 값이 잘 넘어오는지 확인하기
    // category 넘기기
    const handleCategory = (data) => {
        setCategory(data);
        
        onCategory(data);
    };

    return (
        <div>
           <Dropdown onCategory={handleCategory}/>
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