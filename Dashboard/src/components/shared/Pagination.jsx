import React from 'react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const getPageNumbers = () => {
    const maxVisiblePages = 5;
    const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <nav className="pagination-style">
      <ul className="pagination">
        <li className="page-item">
          <button className="page-link" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
            Prev
          </button>
        </li>
        {currentPage > 3 && <li className="page-item"><span className="page-link">...</span></li>}
        {getPageNumbers().map((n, i) => (
          <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
            <button className="page-link" onClick={() => onPageChange(n)}>{n}</button>
          </li>
        ))}
        {currentPage < totalPages - 2 && <li className="page-item"><span className="page-link">...</span></li>}
        <li className="page-item">
          <button className="page-link" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
