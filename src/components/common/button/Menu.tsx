interface Props {
  onOpen: () => void;
}

function Menu({ onOpen }: Props) {
  return (
    <button className="btn btn--icon" onClick={onOpen}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={4}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 9h16.5m-16.5 6.75h16.5"
        />
      </svg>
    </button>
  );
}

export default Menu;
