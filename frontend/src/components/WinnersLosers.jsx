import React, { useEffect, useState } from "react";
import api from "../api";

export default function WinnersLosers() {
  const [data, setData] = useState({ winners: [], losers: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/stocks/winners-losers");
        setData(res.data || { winners: [], losers: [] });
      } catch (err) {
        console.error("Winners/Losers API error:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h3>🏅 Winning/Losing</h3>
      <div className="win-loss-columns">
        <div>
          <h4 style={{ color: "#4ade80" }}>Winner</h4>
          <ul>
            {data.winners.map((item, i) => (
              <li key={i}>{item.symbol} +{item.change_percent}%</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={{ color: "#f87171" }}>Loser</h4>
          <ul>
            {data.losers.map((item, i) => (
              <li key={i}>{item.symbol} {item.change_percent}%</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}