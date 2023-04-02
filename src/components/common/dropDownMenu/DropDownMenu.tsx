interface Props<T extends { _id: string; name: string }> {
  label: string;
  cN?: string;
  xBy: string;
  onXBy: (value: string) => void;
  isXOpen: boolean;
  onXOpen: (value: boolean) => void;
  items: T[];
  limitLength: number;
}

function DropDownMenu<T extends { _id: string; name: string }>({
  label,
  cN = "",
  xBy,
  onXBy,
  isXOpen,
  onXOpen,
  items,
  limitLength,
}: Props<T>) {
  return (
    <div className={`drop-down ${cN}`}>
      <button
        type="button"
        className={`drop-down__button ${isXOpen && "u__dropDown--open"}`}
        onClick={(e) => {
          e.stopPropagation();
          if (!Boolean(items.length)) return;

          onXOpen(!isXOpen);
        }}
      >
        <span className="drop-down__current">
          <span className="drop-down__label">{label}</span>
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
      <ul
        className={`drop-down__items ${isXOpen && "u__visibility--visible"} ${
          items.length > limitLength ? "u__dropDown--height" : ""
        }`}
      >
        {items.map((item) => {
          return (
            <li
              key={item._id}
              className={`drop-down__text ${
                xBy === item.name && "u__dropDown--active"
              }`}
              onClick={() => {
                onXBy(item.name);
                onXOpen(false);
              }}
            >
              {item.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default DropDownMenu;
