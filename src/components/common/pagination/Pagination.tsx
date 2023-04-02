interface Props {
  isXOpen: boolean;
  onXOpen: (value: boolean) => void;
  currentPage: number;
  onCurrentPage: (value: number) => void;
  onPrevPage: () => void;
  onNextPage: () => void;
  pages: number[];
}

function Pagination({
  isXOpen,
  onXOpen,
  currentPage,
  onCurrentPage,
  onPrevPage,
  onNextPage,
  pages,
}: Props) {
  return (
    <div className="pagination">
      <div
        className={`pagination__items-container u__box--shadow ${
          isXOpen && "u__visibility--visible"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <ul className="pagination__items">
          {pages.map((page) => {
            return (
              <li
                key={page}
                className={`pagination__item ${
                  currentPage === page && "u__page-number--active"
                }`}
                onClick={() => {
                  onXOpen(false);
                  onCurrentPage(page);
                }}
              >
                {page}
              </li>
            );
          })}
        </ul>
      </div>
      <button
        type="button"
        className="pagination__menu"
        onClick={(e) => {
          e.stopPropagation();
          if (!Boolean(pages.length)) return;

          onXOpen(!isXOpen);
        }}
      >
        <div className="pagination__details">
          <span>{currentPage}</span>
          <span className="pagination__divider">/</span>
          <span className="pagination__length">{pages.length}</span>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={3}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>
      <button type="button" className="pagination__button" onClick={onPrevPage}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={3}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>
      <button type="button" className="pagination__button" onClick={onNextPage}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={3}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </div>
  );
}

export default Pagination;
