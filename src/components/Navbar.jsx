import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../styles/navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const closeMenu = () => {
    const navElement = document.getElementById("navbarNav");
    if (navElement.classList.contains("show")) {
      navElement.classList.remove("show");
    }
  };

  const handleLogout = async (e) => {
    e.prevent.default();
  };

  const handleClick = (route) => {
    if (route === '/logout') {
      handleLogout();
      return;
    }
    navigate(route);
    closeMenu();
  };

  return (
    <div className="Navbar honda-social-navbar">
      <nav className="navbar navbar-expand-lg">
        <a className="navbar-brand compressible" href="/">
          Honda Hub
        </a>
        <button
          className="navbar-toggler custom-toggler compressible"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="centered-nav-items">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <button
                  className="nav-link compressible"
                  onClick={() => handleClick("/")}
                >
                  Home
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link compressible"
                  onClick={() => handleClick("/posts")}
                >
                  Posts
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link compressible"
                  onClick={() => handleClick("/profile")}
                >
                  Profile
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link compressible"
                  onClick={() => handleClick("/login")}
                >
                  Login
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link compressible"
                  onClick={() => handleClick("/logout")}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
