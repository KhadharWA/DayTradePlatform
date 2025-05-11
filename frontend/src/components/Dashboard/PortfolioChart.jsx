import React, { useState } from "react";
import "../../Styles/Dashboard/PortfolioChart.css";
import PortfolioLineChart from "../../hooks/PortfolioLineChart";




export default function PortfolioChart() {
  const [selectedRange, setSelectedRange] = useState("1m");

  const ranges = ["1m", "3m", "6m", "1 år", "3 år", "5 år"];

  return (
    <section className="account-value-card">
      <div className="account-value-header">
        <h3>Kontovärden</h3>
        <div className="filters">
          <span>1 mån</span>
          <span>0,00%</span>
          <span>0 SEK</span>
          <button className="compare-btn">🧪 Jämför</button>
        </div>
      </div>

      <div className="account-summary">
        <div>
          <label>Eget kapital (SEK)</label>
          <p>1000</p>
        </div>
        <div>
          <label>Utveckling idag (SEK)</label>
          <p>2,60%</p>
        </div>
        <div>
          <label>Marknadsvärde (SEK)</label>
          <p>0</p>
        </div>
        <div>
          <label>Saldo (SEK)</label>
          <p>200</p>
        </div>
        <div>
          <label>Tillgängligt (SEK)</label>
          <p>500</p>
        </div>
        <div>
          <label>Kredit (SEK)</label>
          <p>1500</p>
        </div>
      </div>

      <div className="chart-placeholder">
        
        <PortfolioLineChart />
      </div>

      <div className="time-ranges">
        {ranges.map(range => (
          <button
            key={range}
            className={selectedRange === range ? "active" : ""}
            onClick={() => setSelectedRange(range)}
          >
            {range}
          </button>
        ))}
      </div>
    </section>
  );
}
  