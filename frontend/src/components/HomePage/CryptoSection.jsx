import React from "react";
import StockImage from "../../assets/StockImage.png";

export default function CryptoSection() {
  return (
    <section className="crypto-section">
      <div className="container">
            <div className="crypto-icons">
                <div className="icon-grid">
                <img src={StockImage} alt="Shiba" />
                </div>
            </div>

            <div className="crypto-content">
                <h2>Crypto trading at its best</h2>
                <p>
                Trade and manage 70+ cryptoassets on a trusted global platform that offers top-tier security, powerful tools, user-friendly features, and fixed transparent fees.
                </p>
                <p className="small-note">*Other fees apply</p>
                <button className="cta-outline">Invest in Crypto</button>
                <p className="disclaimer">
                Crypto investments are risky and highly volatile. Tax may apply. Understand the risks <a href="#">here</a>.
                </p>
            </div>
      </div>
    </section>
  );
}
