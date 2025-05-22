import { useEffect, useState } from "react";
import "../../Styles/Settings.css";
import api from "../../api";
import ChangePassword from "../Helpers/ChangePassword";
import { useAuth } from "../../hooks/useAuth";
const Settings = () => {
  const [autoTrade, setAutoTrade] = useState(false);
  const [threshold, setThreshold] = useState("");
  const [language, setLanguage] = useState("sv");
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  const [profile, setProfile] = useState(null);
  const [timeout, setTimeoutValue] = useState(() => {
    return localStorage.getItem("timeout") || 10;
  });
  const { logout } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      const profRes = await api.get("/Profile/details");
      setProfile(profRes.data);
      setAutoTrade(profRes.data.autoTradeEnabled);
      setThreshold(profRes.data.autoTradeThreshold ?? "");
      const notifRes = await api.get("/Notification/status");
      setNotificationsEnabled(
        typeof notifRes.data.enabled === "boolean" ? notifRes.data.enabled : false
      );
    };

    fetchData();
  }, []);

  const handleSave = async () => {
    try {
      const payload = {
        autoTradeEnabled: autoTrade,
        autoTradeThreshold: parseFloat(threshold),
        notificationsEnabled: notificationsEnabled
      };

      const res = await api.post("/Trade/update-settings", payload);

      // Spara dark mode till localStorage + DOM
      localStorage.setItem("theme", darkMode ? "dark" : "light");
      if (darkMode) {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }

      alert(res.data.message || "Inställningar sparade!");
    } catch (err) {
      console.error(" Fel vid sparande:", err);
      alert("Ett fel inträffade när inställningarna skulle sparas.");
    }
  };

  const handleCancel = () => {
    // TODO: Reset logic
    setThreshold("");
    setAutoTrade(false);
  };

  const handleDeleteAccount = async () => {
    const confirm = window.confirm("Är du säker på att du vill radera ditt konto?");
    if (!confirm) return;

    try {
      const res = await api.delete("/profile/delete-account");
      if (res.status === 200) {
        alert("Konto raderat.");
        logout();            // logga ut användaren
        navigate("/login");       // navigera till startsidan
      } else {
        alert("❌ Något gick fel. Försök igen.");
      }
    } catch (err) {
      console.error("Fel vid kontoradering:", err);
      alert("Ett fel uppstod: " + (err.response?.data?.error || "Okänt fel"));
    }
  };

  

  return (
    <section id="settings">
      <div className="Säkerhetbox">
        <h2>Säkerhet & Inställningar</h2>
        <ChangePassword />
        

        <div className="checkbox-group">
          <input type="checkbox" id="2fa" disabled />
          <label htmlFor="2fa">Tvåfaktorsautentisering (inte tillgängligt ännu)</label>
        </div>

        <label htmlFor="timeout">Timeout för inaktivitet (minuter)</label>
        <input type="number" id="timeout" min="1" value={timeout ?? ""} onChange={(e) => 
          { setTimeoutValue(e.target.value); 
            localStorage.setItem("timeout", e.target.value);
          }} 
          placeholder="10" 
        />

        <div className="checkbox-group">
          <input
            type="checkbox"
            id="autoTrade"
            checked={autoTrade}
            onChange={(e) => setAutoTrade(e.target.checked)}
          />
          <label htmlFor="autoTrade">Aktivera automatisk handel</label>
        </div>

        <label htmlFor="threshold">AutoTrade tröskelvärde (%)</label>
        <input
          type="number"
          id="threshold"
          value={threshold ?? ""}
          onChange={(e) => setThreshold(e.target.value)}
          placeholder={profile?.autoTradeThreshold ?? "5"} 
        />

        <div className="theme-toggle-container">
        <h4>Aktivera notiser</h4>
          <div className="btn-switch">
            <label>Av</label>
            <label className="switch" >
              <input
                type="checkbox"
                checked={notificationsEnabled}
                onChange={(e) => setNotificationsEnabled(e.target.checked)}
              />
              <span className="slider2 round"></span>
            </label>
            <label>På</label>
          </div>
        </div>

        <label htmlFor="language">Språk</label>
        <select
          id="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="sv">Svenska</option>
          <option value="en">Engelska</option>
        </select>
        
        <div className="theme-toggle-container">
          <h4>Tema</h4>
          <p>Välj mellan ljust och mörkt läge för hela plattformen</p>
          <div id="theme-switch" className="btn-switch">
            <label>Light</label>
            <label className="switch" htmlFor="switch-mode">
              <input
                type="checkbox"
                id="switch-mode"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />
              <span className="slider round"></span>
            </label>
            <label>Dark</label>
          </div>
        </div>

        <div className="form-actions">
          <button className="cancel" onClick={handleCancel}>
            Avbryt
          </button>
          <button className="save" onClick={handleSave}>
            Spara ändringar
          </button>
        </div>

        <div className="danger-zone">
          <p>⚠️ Detta kommer permanent ta bort ditt konto.</p>
          <button onClick={handleDeleteAccount}>Radera konto</button>
        </div>
      </div>
    </section>
  );
};

export default Settings;