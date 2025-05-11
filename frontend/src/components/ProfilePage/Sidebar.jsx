import React from "react";
import "../../Styles/Sidebar.css";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ setActiveSection, activeSection }) {
  const buttons = [
    { key: "dashboard", label: "Dashboard" },
    { key: "profile", label: "Profile Details" },
    { key: "deposits", label: "Deposits" },
    { key: "withdrawals", label: "Withdrawals" },
    { key: "settings", label: "Settings" }
  ];
    const { logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
      logout(() => navigate("/"));
    };

  
  return (
    <div className="sidebar">
      <div className="sidebar-user">
        <i className="fa fa-user" /> John Doe
      </div>
      <div className="sidebar-buttons">
        {buttons.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveSection(key)}
            className={activeSection === key ? "active" : ""}
          >
            {label}
          </button>
        ))}
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}