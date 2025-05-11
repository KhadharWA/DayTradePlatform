import React, { useState } from 'react';
import '../../Styles/Dashboard/WinnersLosers.css';

export default function WinnersLosers() {
  const [activeTab, setActiveTab] = useState('börshandlat');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <section className="winners-losers-card">
      <div className="wl-header">
        <h3>Mina vinnare & förlorare</h3>
        <div className="wl-tabs">
          <button
            className={activeTab === 'börshandlat' ? 'active' : ''}
            onClick={() => handleTabClick('börshandlat')}
          >
            Börshandlat
          </button>
          <button
            className={activeTab === 'fonder' ? 'active' : ''}
            onClick={() => handleTabClick('fonder')}
          >
            Fonder
          </button>
        </div>
      </div>

      <p className="wl-description">
        {activeTab === 'börshandlat' && (
          <>
            Hitta investeringar genom att söka bland aktier.
            <a href="#"> Gå till aktielistorna</a>
          </>
        )}
        {activeTab === 'fonder' && (
          <>
            Utforska populära fonder som kan passa din strategi.
            <a href="#"> Gå till fondlistorna</a>
          </>
        )}
      </p>
    </section>
  );
}