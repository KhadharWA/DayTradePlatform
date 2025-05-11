import React from "react";
import "../../Styles/Dashboard/AccountCards.css";

export default function AccountCards() {
  const accounts = [
    { name: "Main Account", balance: 5000 },
    { name: "Savings", balance: 15000 },
  ];

  return (
    <section className="accounts-card">
      <h3><i className="fas fa-wallet"></i> Dina konton</h3>
      <div className="account-list">
        {accounts.map((acc, i) => (
          <div key={i} className="account-box">
            <h4>{acc.name}</h4>
            <p>Saldo: {acc.balance.toLocaleString()} SEK</p>
          </div>
        ))}
      </div>
    </section>
  );
}