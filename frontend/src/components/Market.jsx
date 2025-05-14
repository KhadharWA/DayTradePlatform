import { useEffect, useState } from "react";
import api from "../api"; // eller var du har din API-funktion

function getFlag(symbol) {
  return "🇺🇸"; 
}


export default function Market({ onSelect, selectedSymbol }) {
  const [symbols, setSymbols] = useState([]);
  const [activeSymbol, setActiveSymbol] = useState(null);


  useEffect(() => {
    const fetchSymbols = async () => {
      try {
        const res = await api.get("/stocks/symbols"); 
        setSymbols(res.data); 
      } catch (error) {
        console.error("Kunde inte hämta symboler:", error);
      }
    };

    fetchSymbols();
  }, []);

  return (
    <div>
      <h3><i class="fa-solid fa-chart-simple"></i> Marknad</h3>
      <ul>
        {symbols.map((symbol) => (
          <li key={symbol}>
            <button
              className={`btn-stock ${activeSymbol === symbol ? "active" : ""}`}
              onClick={() => {
                onSelect(symbol);
                setActiveSymbol(symbol);
              }}
            >
              {getFlag(symbol)} {symbol}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}