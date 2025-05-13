import React from "react";
import "../../Styles/Dashboard/MarketOverview.css";

export default function MarketOverview() {
  return (
    <section className="market-card">
      <h4><i className="fas fa-chart-line"></i> Marknadsöversikt</h4>
      <p>Marknaden är stabil för tillfället.</p>
      <p>Inga större förändringar.</p>
    </section>
  );
}