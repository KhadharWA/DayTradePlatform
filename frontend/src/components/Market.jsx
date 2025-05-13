import { useEffect, useState } from "react";
import api from "../api"; // eller var du har din API-funktion

function getFlag(symbol) {
  return "🇺🇸"; // Default USA
}


export default function Market({ onSelect, selectedSymbol }) {
  const [symbols, setSymbols] = useState([]);

  useEffect(() => {
    const fetchSymbols = async () => {
      try {
        const res = await api.get("/stocks/symbols"); // <-- API-endpoint för symboler
        setSymbols(res.data); // anpassa beroende på hur datan ser ut
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
            <button onClick={() => onSelect(symbol)}>
              {getFlag(symbol)} {symbol}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}