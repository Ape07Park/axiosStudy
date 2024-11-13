import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import '../css/Paging.css';

function CustomPagination({ totalItemsCount, itemsCountPerPage, onPageChange }) {
  const [page, setPage] = useState(0);

  useEffect(() => {
    onPageChange(page + 1); // react-paginate는 0부터 시작하므로 1을 더해줍니다.
  }, [page, onPageChange]);

  const handlePageClick = (data) => {
    setPage(data.selected);
  };

  const pageCount = Math.ceil(totalItemsCount / itemsCountPerPage);

  return (
    <div className="pagination-container">
      <ReactPaginate
        previousLabel={'‹'}
        nextLabel={'›'}
        breakLabel={'...'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </div>
  );
}

export default CustomPagination;
