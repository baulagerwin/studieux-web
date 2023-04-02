function NavbarLoader() {
  return (
    <nav className="navbar-loader u__animation--pulse">
      <div className="contents">
        <div className="contents__logo"></div>
        <div className="links">
          <div className="links__link"></div>
          <div className="links__link"></div>
          <div className="links__link"></div>
          <div className="menu">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="menu__icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 9h16.5m-16.5 6.75h16.5"
              />
            </svg>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavbarLoader;
