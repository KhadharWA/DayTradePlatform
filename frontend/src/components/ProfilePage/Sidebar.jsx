import React, { useEffect, useState  } from "react";
import "../../Styles/Sidebar.css";
import api from "../../api";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ setActiveSection, activeSection }) {
   const buttons = [
    { key: "dashboard", label: "Dashboard" },
    { key: "profile", label: "Profile Details" },
    { key: "deposits", label: "Deposits" },
    { key: "withdrawals", label: "Withdrawals" },
    { key: "settings", label: "Settings" },
  ];

  const [profile, setProfile] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get("/Profile/details");
      setProfile(res.data);
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    logout(() => navigate("/"));
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    console.log("📂 Fil vald:", file.name);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await api.post("/Profile/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("✅ Upload success:", res.data);
      alert("Profilbild uppdaterad!");
      window.location.reload();
    } catch (err) {
      console.error("❌ Fel vid uppladdning:", err);
    }
  };

  const userName = profile ? `${profile.firstName} ${profile.lastName}` : "Inloggad användare";

  return (
    <div className="sidebar">
      <div className="sidebar-user">
        {profile?.profileImageUrl ? (
          <img
            src={`https://localhost:7055/uploads/${profile?.profileImageUrl}`}
            alt="Profilbild"
            className="sidebar-profile-img"
          />
        ) : (
          <i className="fa fa-user" />
        )}
        <form encType="multipart/form-data">
            <input
              id="fileUploader"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              hidden
            />
            <label htmlFor="fileUploader" className="btn-refersh">
              <i className="fa-solid fa-arrows-rotate"></i>
            </label>
        </form>
        <span>{userName}</span>
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