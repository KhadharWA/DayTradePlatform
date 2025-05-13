import { useState } from "react";
import "../../Styles/Settings.css";

const Settings = () => {
  const [autoTrade, setAutoTrade] = useState(false);
  const [threshold, setThreshold] = useState("");
  const [language, setLanguage] = useState("sv");
  const [theme, setTheme] = useState("light");

  const handleSave = () => {
    // TODO: Save logic
    alert("Inställningar sparade!");
  };

  const handleCancel = () => {
    // TODO: Reset logic
    setThreshold("");
    setAutoTrade(false);
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Är du säker på att du vill radera ditt konto?")) {
      // TODO: Delete logic
      alert("Konto raderat.");
    }
  };

  return (
    <section id="settings">
      <div className="Säkerhetbox">
        <h2>Säkerhet & Inställningar</h2>

        <label htmlFor="currentPassword">Nuvarande lösenord</label>
        <input type="password" id="currentPassword" placeholder="********" />

        <label htmlFor="newPassword">Nytt lösenord</label>
        <input type="password" id="newPassword" placeholder="********" />

        <label htmlFor="confirmPassword">Bekräfta lösenord</label>
        <input type="password" id="confirmPassword" placeholder="********" />

        <div className="checkbox-group">
          <input type="checkbox" id="2fa" disabled />
          <label htmlFor="2fa">Tvåfaktorsautentisering (inte tillgängligt ännu)</label>
        </div>

        <label htmlFor="timeout">Timeout för inaktivitet (minuter)</label>
        <input type="number" id="timeout" placeholder="10" />

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
          value={threshold}
          onChange={(e) => setThreshold(e.target.value)}
          placeholder="5"
        />

        <div className="checkbox-group">
          <input type="checkbox" id="mockData" />
          <label htmlFor="mockData">Visa mockdata istället för live</label>
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
        
        <div class="theme-toggle-container">
          <h4>Tema</h4>
          <p>Välj mellan ljust och mörkt läge för din användarupplevelse</p>
          
          <div id="theme-switch" class="btn-switch">
            <label>Light</label>
            <label class="switch" for="switch-mode">
              <input type="checkbox" id="switch-mode" />
              <span class="slider round"></span>
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