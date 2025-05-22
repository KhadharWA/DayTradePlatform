import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "../Styles/Header.css";
import { useAuth } from "../hooks/useAuth.jsx";
import NotificationDropdown from "./NotificationDropDown.jsx"; // ✅ använd komponenten

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isLoggedIn, logout, token } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(() => navigate("/"));
  };

  return (
    <header className="main-header">
      <div className="container">
        <div className="header-left">
          <div className="logo">
            <i className="fa-solid fa-chart-pie"></i> Borsa
          </div>
          <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
            <a href={isLoggedIn ? "/profile" : "/"}>Home</a>
            <a href="/Stocks">Stocks</a>
            <a href="/About">About</a>
          </nav>
        </div>

        <div className="header-right">
          {isLoggedIn && <NotificationDropdown token={token} />}

          {isLoggedIn ? (
            <button className="login-btn" onClick={handleLogout}>
              Log out
            </button>
          ) : (
            <>
              <button className="login-btn" onClick={() => navigate("/login")}>
                Log in
              </button>
              <button className="signup-btn" onClick={() => navigate("/register")}>
                Sign up
              </button>
            </>
          )}

          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>
        </div>
      </div>
    </header>
  );
}