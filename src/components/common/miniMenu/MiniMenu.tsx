interface Props<
  T extends { _id: string; name: string; whenClicked: () => void }
> {
  cN?: string;
  isXOpen: boolean;
  onXOpen: (value: boolean) => void;
  items: T[];
}

function MiniMenu<
  T extends { _id: string; name: string; whenClicked: () => void }
>({ cN = "", isXOpen, onXOpen, items }: Props<T>) {
  return (
    <div className={`mini-menu ${cN}`}>
      <button
        type="button"
        className={`mini-menu__button ${isXOpen && "u__dropDown--open"}`}
        onClick={(e) => {
          e.stopPropagation();
          onXOpen(!isXOpen);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 9h16.5m-16.5 6.75h16.5"
          />
        </svg>
      </button>
      <ul className={`mini-menu__items ${isXOpen && "u__visibility--visible"}`}>
        {items.map((item) => {
          return (
            <li
              key={item._id}
              className="mini-menu__item"
              onClick={() => item.whenClicked()}
            >
              {item.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default MiniMenu;
