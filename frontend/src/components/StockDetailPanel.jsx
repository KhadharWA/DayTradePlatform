import React, { useEffect, useState } from "react";
import api from "../api";
import { useAuth } from "../hooks/useAuth"; 
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid
} from "recharts";

const periods = [
  { label: "5m", interval: "5min" },
  { label: "15m", interval: "15min" },
  { label: "1h", interval: "1h" },
  { label: "1d", interval: "1day" },
  { label: "1w", interval: "1week" }
];

const exchangeFlags = {
  NASDAQ: "🇺🇸",
  NYSE: "🇺🇸",
  AMEX: "🇺🇸",
  OMXSTO: "🇸🇪",
  OMXH25: "🇫🇮",
  OMXC25: "🇩🇰",
  XETRA: "🇩🇪",
};

export default function StockDetailPanel({ selectedSymbol, section }) {
  const [quote, setQuote] = useState(null);
  const [candles, setCandles] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState("1h");
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [autoTrade, setAutoTrade] = useState(false);
  const [threshold, setThreshold] = useState(5);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!selectedSymbol) return;

    const fetchData = async () => {
      try {
        setLoading(true);  
        const quoteRes = await api.get(`/stocks/quote/${selectedSymbol}`);
        setQuote(quoteRes.data);
    
        if (section === "history") {
          const res = await api.get(`/stocks/history/${selectedSymbol}`);
          const values = res.data?.values || [];
          const sorted = [...values].sort((a, b) => new Date(a.datetime) - new Date(b.datetime));
          setCandles(sorted);
        } else {
          const selected = periods.find(p => p.label === selectedPeriod);
          const interval = selected?.interval || "1h";
    
          const res = await api.get(`/stocks/candles/${selectedSymbol}?interval=${interval}`);
          const values = res.data?.values || [];
          const metaData = res.data?.meta || {};
          setCandles([...values].sort((a, b) => new Date(a.datetime) - new Date(b.datetime)));
          setMeta(metaData);
        }
      } catch (error) {
        console.error("API error:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, [selectedSymbol, section, selectedPeriod]);


   const handleBuy = async () => {
    try {
      const res = await api.post("/trade/buy", {
        symbol: selectedSymbol,
        quantity,
        price: quote?.open
      });
      setMessage(`✅ ${res.data}`);
    } catch (err) {
      setMessage(`❌ ${err.response?.data || "Fel vid köp"}`);
    }
  };

  const handleSell = async () => {
    try {
      const res = await api.post("/trade/sell", {
        symbol: selectedSymbol,
        quantity,
        price: quote?.open
      });
      setMessage(`✅ ${res.data}`);
    } catch (err) {
      setMessage(`❌ ${err.response?.data || "Fel vid försäljning"}`);
    }
  };

  const handleAutoTrade = async () => {
    try {
      const change = Math.random() * 10 * (Math.random() < 0.5 ? -1 : 1);
      const res = await api.post("/trade/autotrade", {
        symbol: selectedSymbol,
        quantity,
        price: quote?.open,
        changePercent: change.toFixed(2),
      });
      setMessage(`✅ ${res.data}`);
    } catch (err) {
      setMessage(`❌ ${err.response?.data || "Fel vid AutoTrade"}`);
    }
  };

  if (!selectedSymbol) {
    return <div>Välj en aktie...</div>;
  }

  if (loading) {
    return <div className="loading">🔄 Laddar data...</div>;
  }

  if (section === "history") {
    return (
      <div className="stock-history-panel fade-in">
        <h3><i className="fa-solid fa-chart-pie"></i> Historisk utveckling</h3>
        {candles.length > 0 ? (
          <table className="fade-in">
            <thead>
              <tr>
                <th>Datum</th>
                <th>Utveckling</th>
                <th>Högst</th>
                <th>Lägst</th>
              </tr>
            </thead>
            <tbody>
            {candles.slice(-7).reverse().map((c, i) => {
            const change = ((c.close - c.open) / c.open) * 100;
            const changeColor = change >= 0 ? "green" : "red";
            const formattedChange = `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`;

            return (
              <tr key={i}>
                <td>{new Date(c.datetime).toLocaleDateString("sv-SE")}</td>
                <td style={{ color: changeColor }}>
                  {formattedChange}
                </td>
                <td>{parseFloat(c.high).toFixed(2)}</td>
                <td>{parseFloat(c.low).toFixed(2)}</td>
              </tr>
            );
            })}
            </tbody>
          </table>
        ) : (
          <p>Ingen historik tillgänglig.</p>
        )}
      </div>
    );
  }
  const flag = meta?.exchange ? (exchangeFlags[meta.exchange] || "") : "";
  const lineColor = quote?.percent_change > 0 ? "#00C853" : "#D50000";
  const { isLoggedIn } = useAuth();
  return (
    <div className="stock-detail animate-slide">
       <h2>{flag} {selectedSymbol}</h2>
      {quote && (
        <div className="quote-info">
          <p><strong>Pris:</strong> {quote.open ? `$${Number(quote.open).toFixed(2)}` : "N/A"}</p>
          <p>
            <strong>Förändring:</strong>{" "}
            <span style={{ color: quote.percent_change >= 0 ? "limegreen" : "red" }}>
              {quote.percent_change >= 0 ? "+" : ""}{Number(quote.percent_change).toFixed(2)}%
            </span>
          </p>
        </div>
      )}

      <div className="period-buttons">
        {periods.map(p => (
          <button
            key={p.label}
            className={selectedPeriod === p.label ? "active" : ""}
            onClick={() => setSelectedPeriod(p.label)}
          >
            {p.label}
          </button>
        ))}
      </div>

      <h3>📈 Stock data ({selectedPeriod})</h3>

      {loading ? (
      <div className="spinner-container">
        <div className="spinner" />
        </div>
      ) : candles.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={candles}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="datetime" hide />
            <YAxis domain={["dataMin - 100", "dataMax + 170"]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="close"
              stroke={lineColor}
              strokeWidth={2}
              dot={false}
              animationDuration={800}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p>Ingen grafdata tillgänglig.</p>
      )}
      {isLoggedIn && (
        <div className="trade-form">
          <div className="trade-nb">
            <label>Antal aktier</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>

          <div className="trade-buttons">
            <button className="buy" onClick={handleBuy}> Köp</button>
            <button className="sell" onClick={handleSell}> Sälj</button>
          </div>

          <div className="autotrade-section">
            <label>
              <input
                type="checkbox"
                checked={autoTrade}
                onChange={(e) => setAutoTrade(e.target.checked)}
              />
              Aktivera AutoTrade
            </label>

            {autoTrade && (
              <>
                <label>Tröskelvärde (%)</label>
                <input
                  type="number"
                  value={threshold}
                  onChange={(e) => setThreshold(e.target.value)}
                />
                <button onClick={handleAutoTrade}><i className="fa-solid fa-robot"></i> Test AutoTrade</button>
              </>
            )}
          </div>

          {message && <p className="trade-message">{typeof message === "string" ? message : message?.message || "Något gick fel"}</p>}
        </div>
        )}
    </div>
  );
}
