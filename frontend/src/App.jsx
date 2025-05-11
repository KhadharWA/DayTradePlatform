import './Styles/core.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import React, { useState } from 'react';


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

