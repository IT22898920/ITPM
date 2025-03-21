import React from "react";
import logo from "./logo.png";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

const Navbar = () => {
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    // Clear the login status from localStorage
    localStorage.removeItem("loginStatus");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    // Redirect to the login page
    navigate("/login");
  };

  // Check if the user is logged in
  const isLoggedIn = localStorage.getItem("loginStatus") === "true";

  return (
    <nav
      className="navbar fixed-top navbar-expand-lg bg-dark bg-body-tertiary"
      data-bs-theme="dark"
      style={{ height: 80 }}
    >
      <div className="container-fluid">
        <Link to={"/"}>
          <img src={logo} width="220" height="50" />
        </Link>
        {/* Toggle navigation links based on login status */}
        {!isLoggedIn ? (
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/key" style={{ color: "#bdc1c6" }}>
                  Extract Keywords
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/tts" style={{ color: "#bdc1c6" }}>
                  Text to Speech
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/stt" style={{ color: "#bdc1c6" }}>
                  Speech to Text
                </a>
              </li>
              <li className="nav-item">
                <div className="dropdown">
                  <a className="nav-link" style={{ color: "#bdc1c6" }}>
                    Find Synonyms & Antonyms
                  </a>
                  <div className="dropdown-content">
                    <a href="/synonym">Synonyms</a>
                    <a href="/antonym">Antonyms</a>
                  </div>
                </div>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/addphase" style={{ color: "#bdc1c6" }}>
                  Notepad
                </a>
              </li>
            </ul>
          </div>
        ) : null}
        {isLoggedIn && (
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/extract-keywords" style={{ color: "#bdc1c6" }}>
                  Extract Keywords
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/tts" style={{ color: "#bdc1c6" }}>
                  Text to Speech
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/stt" style={{ color: "#bdc1c6" }}>
                  Speech to Text
                </a>
              </li>
              <li className="nav-item">
                <div className="dropdown">
                  <a className="nav-link" style={{ color: "#bdc1c6" }}>
                    Find Synonyms & Antonyms
                  </a>
                  <div className="dropdown-content">
                    <a href="/synonym">Synonyms</a>
                    <a href="/antonym">Antonyms</a>
                  </div>
                </div>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/addphase" style={{ color: "#bdc1c6" }}>
                  Notepad
                </a>
              </li>
            </ul>
            <div className="ml-auto"> {/* Added ml-auto class to position the button to the right */}
              <button className="btn btn-secondary btn-sm" onClick={handleLogout}>
                LOGOUT
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
export default Navbar;
