import { useEffect, useState } from "react";
import api from "../../api";
import "../../Styles/Deposits.css";


export default function DepositHistory() {
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchDeposits = async () => {
    try {
      const res = await api.get("/money/deposits");
      setDeposits(res.data);
    } catch (err) {
      console.error("Failed to fetch deposits", err);
    } finally {
      setLoading(false);
    }
  };

    fetchDeposits();
  }, []);

  return (
     <section className="deposits-section">
      <h2>Insättningar</h2>
      {loading ? (
        <p>Laddar insättningar...</p>
      ) : deposits.length === 0 ? (
        <p>Du har inga insättningar ännu.</p>
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
            {deposits.map((d, i) => (
              <tr key={i}>
                <td>{new Date(d.date).toLocaleDateString()}</td>
                <td>{d.amount} kr</td>
                <td>{d.method}</td>
                <td>{d.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
