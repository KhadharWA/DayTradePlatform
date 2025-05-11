import React, { useEffect, useState } from "react";
import api from "../../api";



export default function ProfileDetails() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/account/profile"); // ✅ rätt route
        console.log("✔️ Profile data:", res.data);
      } catch (err) {
        console.error("❌ Failed to fetch profile", err);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="profile-container">
      <div className="profile-box">
        <h2>Profilinformation</h2>
        {profile ? (
          <ul>
            <li><strong>Förnamn:</strong> {profile.firstName}</li>
            <li><strong>Efternamn:</strong> {profile.lastName}</li>
            <li><strong>Email:</strong> {profile.email}</li>
          </ul>
        ) : (
          <p>Laddar...</p>
        )}
      </div>

      <div className="address-box">
        <h3>Adress</h3>
        {/* Vi lägger till fälten när backend är klar */}
        <p>Ej angiven</p>
      </div>
    </div>
  );
}