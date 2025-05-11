import React from "react";
import '../../Styles/Dashboard.css';
export default function Dashboard() {
    return (
      <aside className="dashboard-sidebar">
        <h2>👤 John Doe</h2>
        <button>Dashboard</button>
        <button>Profile Details</button>
        <button>Deposits</button>
        <button>Withdrawals</button>
        <button>Settings</button>
        <button>Logout</button>
      </aside>
    );
}
