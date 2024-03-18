import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HomeIcon, CogIcon, UserCircleIcon, DocumentTextIcon } from '@heroicons/react/solid';

export const NavBar = ({ token, setToken }) => {
  const navigate = useNavigate();
  const navbar = useRef();
  const hamburger = useRef();

  const showMobileNavbar = () => {
    hamburger.current.classList.toggle("is-active");
    navbar.current.classList.toggle("is-active");
  };

  return (
    <nav className="navbar mb-3 rounded-md w-full" role="navigation" aria-label="main navigation" style={{background: 'linear-gradient(to bottom, #808080, #000000)'}}>
      <div className="flex items-center justify-between px-4 py-2">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          onClick={showMobileNavbar}
          ref={hamburger}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div className="navbar-menu w-full" ref={navbar}>
        <div className="flex items-center justify-center">
          <div className="navbar-start flex"> 
            {token && (
              <>
                <Link to="/" className="navbar-item text-blue-500 mx-4">
                  <HomeIcon className="w-8 h-8 mr-2 -mt-1" />
                </Link>

                <Link to="/postLists" className="navbar-item text-blue-500 mx-4">
                 
                   Posts
                </Link>
                {/* <Link to="/myPosts" className="navbar-item text-blue-500 mx-4">
                 
                   My Posts
                </Link> */}
                <Link to="/skills" className="navbar-item text-blue-500 mx-4">
                
                  Skill Manager
                </Link>
              </>
            )}
          </div>

          <div className="navbar-end">
            <div className="buttons">
              {token ? (
                <button
                  className="button is-outlined text-blue-500 mx-4"
                  onClick={() => {
                    setToken("");
                    navigate("/login");
                  }}
                >
                  {"LOGOUT"}
                </button>
              ) : (
                <>
                  <Link to="/register" className="button is-link text-blue-500 mx-4">
                    Register
                  </Link>
                  <Link to="/login" className="button is-outlined text-blue-500 mx-4">
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
