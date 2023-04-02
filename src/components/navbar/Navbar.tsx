import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import logo from "../../assets/logo.png";
import keys from "../../react-query/keys";
import authService from "../../services/authService";
import notebookService from "../../services/notebookService";
import NavbarLoader from "./loaders/NavbarLoader";

function Navbar() {
  const params = useParams();
  const id = params.notebookId as string;

  const isLoggedIn = authService.isLoggedIn();
  const { pathname } = useLocation();

  const notebooks = "/notebooks";
  const notebook = "/notebooks" + "/" + id;
  const review = "/review" + "/" + id;
  const signIn = "/signin";
  const signUp = "/signup";
  const logout = "/logout";

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.addEventListener("click", close);

    return () => document.removeEventListener("click", close);
  }, []);

  function close() {
    setIsOpen(false);
  }

  function linkStyle(pageUrl: string) {
    return `links__link ${pathname === pageUrl && "u__active--page"}`;
  }

  const { data, isLoading } = useQuery([keys.notebook, id], () =>
    pathname === notebook || pathname === review
      ? notebookService.getNotebook(id)
      : () => {}
  );

  if (pathname === notebook && isLoading)
    return (
      <>
        <NavbarLoader />
        <Outlet />
      </>
    );

  return (
    <>
      <nav className="nav" onClick={(e) => e.stopPropagation()}>
        <div className="contents">
          <Link className="contents__logo" to={notebooks}>
            <img src={logo} alt="Studieux Logo" />
          </Link>
          <div className={`links ${isOpen && "u__navbar--flex"}`}>
            {!isLoggedIn ? (
              <>
                <Link
                  className={linkStyle(signUp)}
                  to={signUp}
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
                <Link
                  className={linkStyle(signIn)}
                  to={signIn}
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
              </>
            ) : (
              <>
                <div className="links__breadcrumbs">
                  <Link
                    className={linkStyle(notebooks)}
                    to={notebooks}
                    onClick={() => setIsOpen(false)}
                  >
                    Home
                  </Link>

                  {data && (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.6}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 4.5l7.5 7.5-7.5 7.5"
                        />
                      </svg>
                      <Link
                        className={linkStyle(notebook)}
                        to={notebook}
                        onClick={() => setIsOpen(false)}
                      >
                        {data.name}
                      </Link>
                    </>
                  )}

                  {data && pathname === review && (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.6}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 4.5l7.5 7.5-7.5 7.5"
                        />
                      </svg>
                      <Link
                        className={linkStyle(review)}
                        to={review}
                        onClick={() => setIsOpen(false)}
                      >
                        Review
                      </Link>
                    </>
                  )}
                </div>
                <Link
                  className="links__link"
                  to={logout}
                  onClick={() => setIsOpen(false)}
                >
                  Logout
                </Link>
              </>
            )}
          </div>
          <div className="menu" onClick={() => setIsOpen(!isOpen)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.6}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default Navbar;
