import React, { useEffect, useState } from "react";
import api from "../api";
import {
  LineChart,
  Line,
  ResponsiveContainer
} from "recharts";
import "../Styles/MostTraded.css";

export default function MostTradedTable({ onSelect }) {
  const [symbols] = useState(["AAPL", "TSLA", "AMZN", "NVDA", "NFLX"]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      const result = await Promise.all(
        symbols.map(async (symbol) => {
          try {
            const [quoteRes, candleRes] = await Promise.all([
              api.get(`/stocks/quote/${symbol}`),
              api.get(`/stocks/candles/${symbol}?interval=1h`)
            ]);

            return {
              symbol,
              change: quoteRes.data?.percent_change,
              prices:
                candleRes.data?.values?.map((c) => ({
                  close: parseFloat(c.close)
                })) || []
            };
          } catch (err) {
            return { symbol, change: null, prices: [] };
          }
        })
      );

      setData(result);
    };

    fetchAll();
  }, [symbols]);

  return (
    <div className="most-traded">
      <h3>🔥 Most Traded</h3>
      <table className="most-traded-table">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Change</th>
            <th>Trend</th>
          </tr>
        </thead>
        <tbody>
          {data.map((stock) => (
            <tr className="Stock-symbol" key={stock.symbol} onClick={() => onSelect(stock.symbol)}>
              <td>{stock.symbol}</td>
              <td className={Number(stock.change) >= 0 ? "green" : "red"}>
                {Number(stock.change).toFixed(2)}%
              </td>
              <td style={{ width: "100px" }}>
                <ResponsiveContainer width="100%" height={30}>
                  <LineChart data={stock.prices}>
                    <Line
                      type="monotone"
                      dataKey="close"
                      stroke={Number(stock.change) >= 0 ? "#16a34a" : "#dc2626"} // green or red
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

