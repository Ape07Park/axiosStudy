// import { useState } from "react";

// export default function SearchBar() {

//     const [searchInput, setSearchInput] = useState('');
//     const [filteredResults, setFilterdResults] = useState([]);

//     const searchItems = (searchValue) => {
//         setSearchInput(searchValue);
//         // 필터링 된 걸 filteredData에 담기
//         const filteredData = datas.filter((item) => {
//             // 객체 아이템으로부터 값들을 얻기 위해 Object.values를 사용
//             return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
//         })
//         setFilterdResults(filteredData);
//     }
    
//     return
//     (
//         <>
//         <input placeholder="Search..." onChange={(e) => searchItems(e.target.value)} />
//         </>

//     );

// }