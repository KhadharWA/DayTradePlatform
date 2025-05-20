import './Styles/core.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import React, { useEffect,useState } from 'react';


import Market from './components/Market';
import News from './components/News';
import Header from "./components/Header";
import WinnersLosers from './components/WinnersLosers';
import MostTraded from './components/MostTraded';
import Home from './pages/Home.jsx';
import StockDetailPanel from './components/StockDetailPanel';
import Footer from './components/Footer.jsx';
import Login from './pages/AuthPages/LoginPage.jsx';
import Register from './pages/AuthPages/RegisterPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';

export default function App() {
  const [selectedStock, setSelectedStock] = useState(null);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
  // 🌓 Sätt tema
  const savedTheme = localStorage.getItem("theme");
  //console.log("🌗 Sparat tema:", savedTheme);
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  }

  // ⏱️ Timeout för inaktivitet
  const timeoutMinutes = parseInt(localStorage.getItem("timeout")) || 10;
  //console.log("⏱️ Timeout är satt till:", timeoutMinutes, "minuter");

  let timeout;

  const resetTimer = () => {
    //console.log("🔄 Inaktivitetstimern nollställd");
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      console.log("🚪 Loggar ut p.g.a. inaktivitet");
      alert("Du har varit inaktiv för länge. Du loggas nu ut.");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/";
    }, timeoutMinutes * 60 * 1000);
  };

  window.addEventListener("mousemove", resetTimer);
  window.addEventListener("keydown", resetTimer);
  resetTimer();

  return () => {
    clearTimeout(timeout);
    window.removeEventListener("mousemove", resetTimer);
    window.removeEventListener("keydown", resetTimer);
  };
  }, []);

  return (
    <div className="page-wrapper"> {/* Ny wrapper */}
      <Router>
        <Header isLoggedIn={isLoggedIn} />
          <main className="main-content"> {/* Main content som fyller höjden */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={isLoggedIn ? <ProfilePage /> : <Navigate to="/login" replace />} />
              <Route
                path="/stocks"
                element={(
                  <div className="bors-grid">
                    <div
                      className="top-section"
                      style={{
                        display: 'grid',
                        gridTemplateColumns: selectedStock ? '1fr 4fr 1fr' : '1fr',
                        gap: '1rem',
                      }}
                    >
                      {selectedStock && (
                        <div className="history animate-left">
                          <StockDetailPanel selectedSymbol={selectedStock} section="history" />
                        </div>
                      )}

                      <div className="main-graph">
                        {selectedStock ? (
                          <StockDetailPanel selectedSymbol={selectedStock} section="chart" />
                        ) : (
                          <Market onSelect={setSelectedStock} />
                        )}
                      </div>

                      {selectedStock && (
                        <div className="market animate-right">
                          <Market onSelect={setSelectedStock} selectedSymbol={selectedStock} />
                        </div>
                      )}
                    </div>

                    <div className="bottom-section">
                      <div className="most-traded"><MostTraded onSelect={setSelectedStock} /></div>
                      <div className="winners-losers"><WinnersLosers /></div>
                      <div className="news"><News selectedSymbol={selectedStock} /></div>
                    </div>
                  </div>
                )}
              />
            </Routes>
          </main>
        <Footer />
      </Router>
    </div>
  );
}

