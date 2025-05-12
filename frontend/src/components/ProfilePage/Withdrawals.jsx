import { useEffect, useState } from "react";
import api from "../../api"; 



export default function Withdrawals() {
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWithdrawals = async () => {
      try {
        const res = await api.get("/money/withdrawal");
        setWithdrawals(res.data);
      } catch (err) {
        console.error("Failed to fetch withdrawals", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWithdrawals();
  }, []);

  return (
    <section className="deposits-section">
      <h2>Uttag</h2>
      {loading ? (
        <p>Laddar uttag...</p>
      ) : withdrawals.length === 0 ? (
        <p>Du har inga uttag ännu.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Datum</th>
              <th>Belopp</th>
              <th>Betalmetod</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {withdrawals.map((w, i) => (
              <tr key={i}>
                <td>{new Date(w.date).toLocaleDateString()}</td>
                <td>{w.amount} kr</td>
                <td>{w.method}</td>
                <td>{w.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}