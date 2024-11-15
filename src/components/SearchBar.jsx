import React from "react";

/**
 * 검색 조건: 영상 제목, 채널 이름, 검색 결과 없으면 없다고 하고 있으면 총 몇건 해서 나오게 하기
 * 
 * 영상 제목, 채널 이름 중 선택할 수 있게 하기
 */

export default function SearchBar(onSearch, searchTerm) {

    // 필터 함수를 이용해 필터링 조건을 검색어를 넣기 

    // 배열에 검색 분류, 검색어 담기

    const handleInputChange = (event) => {
        const term = event.target.value;
        onSearch(term);
    }
    
    return(

        <div>
            <input placeholder="검색어를 넣으세요" value={searchTerm}/>
            <button onClick={handleInputChange}>검색</button>
        </div>
    )

}