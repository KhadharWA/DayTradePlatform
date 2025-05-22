import React, { useState } from "react";
import api from "../../api";
import "../../Styles/Settings.css";
const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (newPassword !== confirmPassword) {
      setMessage(" Lösenorden matchar inte.");
      return;
    }

    try {
      setSaving(true);
      const res = await api.put("/Profile/Updatepassword", {
        currentPassword,
        newPassword
      });

      setMessage(`${res.data?.message || "Lösenordet ändrades."}`);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setMessage(` ${err.response?.data?.error || "Fel vid ändring av lösenord."}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="change-password-form" onSubmit={handleSubmit}>
      <label htmlFor="currentPassword">Nuvarande lösenord</label>
      <input
        type="password"
        id="currentPassword"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        placeholder="********"
        required
      />

      <label htmlFor="newPassword">Nytt lösenord</label>
      <input
        type="password"
        id="newPassword"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="********"
        required
      />

      <label htmlFor="confirmPassword">Bekräfta lösenord</label>
      <input
        type="password"
        id="confirmPassword"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="********"
        required
      />

      <button className="btn-save" type="submit" disabled={saving}>
        {saving ? "Sparar..." : "Spara"}
      </button>

      {message && <p className="password-message">{message}</p>}
    </form>
  );
};

export default ChangePassword;