import React from "react";
import "../../Styles/Dashboard/Overview.css";

export default function Overview() {
  return (
    <section className="overview-card">
      <h3><i className="fas fa-chart-line"></i> Översikt</h3>
      <ul>
        <li><strong>Totalt portföljvärde:</strong> 17 500 SEK</li>
        <li><strong>Total avkastning:</strong> <span className="positive">+12% (1 890 SEK)</span></li>
        <li><strong>Tillgångar:</strong> 8</li>
        <li><strong>Aktier:</strong> 5 | <strong>Fonder:</strong> 3</li>
        <li><strong>Senaste köp:</strong> TSLA (3 st) – 2 dagar sedan</li>
        <li><strong>Senaste insättning:</strong> 500 SEK</li>
        <li><strong>Risknivå:</strong> Medium</li>
        <li><strong>Auto-trading:</strong> På (±5%)</li>
      </ul>
    </section>
  );
}
