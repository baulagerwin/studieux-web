interface Props {
  label: string;
  isXOpen: boolean;
  onXOpen: (value: boolean) => void;
  xBy: string;
}

function FilterByButton({ label, isXOpen, onXOpen, xBy }: Props) {
  return (
    <button
      type="button"
      className={`filter-by__button ${isXOpen && "u__dropDown--open"}`}
      onClick={(e) => {
        e.stopPropagation();
        onXOpen(!isXOpen);
      }}
    >
      <span className="filter-by__current">
        <span>{label}</span>
        <span>{xBy}</span>
      </span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
        />
      </svg>
    </button>
  );
}

export default FilterByButton;
