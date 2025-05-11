function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = [...Array(totalPages).keys()].map((n) => n + 1);

  return (
    <div className="d-flex justify-content-center mt-4">
      <nav>
        <ul className="pagination">
          {pageNumbers.map((number) => (
            <li
              key={number}
              className={`page-item ${number === currentPage ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => onPageChange(number)}
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;
