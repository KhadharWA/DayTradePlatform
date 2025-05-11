import React, { useState } from "react";
import Sidebar from "../components/ProfilePage/Sidebar";
import Dashboard from "../components/Dashboard/Dashboard";
import ProfileDetails from "../components/ProfilePage/ProfileDetails";
import Deposits from "../components/ProfilePage/Deposits";
import Withdrawals from "../components/ProfilePage/Withdrawals";
import Settings from "../components/ProfilePage/Settings";
import "../../src/Styles/ProfilePage.css";
import "../../src/Styles/Dashboard.css";

export default function ProfilePage() {
  const [activeSection, setActiveSection] = useState("dashboard");

  

  return (
    <div className="profile-page">
      <div className="container">
        <Sidebar setActiveSection={setActiveSection} activeSection={activeSection} />
        <main className="dashboard-main">
          {activeSection === "dashboard" && (
            <Dashboard />
          )}

          {activeSection === "profile" && <ProfileDetails />}
          {activeSection === "deposits" && <Deposits />}
          {activeSection === "withdrawals" && <Withdrawals />}
          {activeSection === "settings" && <Settings />}
        </main>
      </div>
    </div>
  );
}
