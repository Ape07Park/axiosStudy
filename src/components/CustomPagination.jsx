import React, { useState, useEffect } from 'react';
import Pagination from 'react-js-pagination';
import '../css/Paging.css';

// 리스트에서 총 아이템 수, 페이지 당 아이템 수. 페이지 변화 기능 함수, 현제 페이지 위치를 넘겨받음
function CustomPagination({ totalItemsCount, itemsCountPerPage, onPageChange, activePage }) {
  
  const handlePageChange = (pageNumber) => {
    onPageChange(pageNumber);
  };

  return (
    <div className="pagination-container">
      <Pagination
        activePage={activePage}
        itemsCountPerPage={itemsCountPerPage} // 페이지 당 아이템 수
        totalItemsCount={totalItemsCount} // 총 페이지 수
        pageRangeDisplayed={10} // 페이지 범위
        onChange={handlePageChange}
        containerClassName={'pagination'}
        activeClassName={'active'}
        prevPageText={'‹'} // 이전 페이지 그룹으로 이동
        nextPageText={'›'} // 다음 페이지 그룹으로 이동
        firstPageText={'«'} // 첫 페이지로 이동
        lastPageText={'»'} // 마지막 페이지로 이동
      />
    </div>
  );
}

export default CustomPagination;