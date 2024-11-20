import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import '../css/Paging.css';

// 리스트에서 총 아이템 수, 페이지 당 아이템 수. 페이지 변화 기능 함수를 넘겨받음
function CustomPagination({ totalItemsCount, itemsCountPerPage, onPageChange }) {
  const [page, setPage] = useState(0);

  // 최초 랜더링 시 리스트의 handlePageChange의 인자로 page + 1을 넘겨 1p로 설정
  useEffect(() => {
    onPageChange(page + 1); // react-paginate는 0부터 시작하므로 1을 더하기
  }, [page, onPageChange]); // page 변수가 변하거나 페이지 번호 클릭

  // 페이지 클릭 시 페이지 재 설정
  const handlePageClick = (data) => {
    setPage(data.selected);
  };

  // 페이지 총 개수
  const pageCount = Math.ceil(totalItemsCount / itemsCountPerPage);

  return (
    <div className="pagination-container">
      <ReactPaginate
        previousLabel={'‹'}  // 이전 버튼 모양
        nextLabel={'›'} // 다음버튼 모양
        breakLabel={'...'} // 중간
        pageCount={pageCount} // 페이지의 총 개수
        marginPagesDisplayed={0} // paginator의 페이지 마진 범위
        pageRangeDisplayed={10} // paginator의 페이지 범위
        onPageChange={handlePageClick} // 페이지 변경 함수
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </div>
  );
}

export default CustomPagination;
