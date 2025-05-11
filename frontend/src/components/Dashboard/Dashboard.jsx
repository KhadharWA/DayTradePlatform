import React from "react";
import AccountCards from "./AccountCards";
import QuickChecklist from "./QuickChecklist";
import MarketOverview from "./MarketOverview";
import Overview from "./Overview";
import PortfolioChart from "./PortfolioChart";
import WinnersLosers from "./WinnerLoser";
import "../../Styles/Dashboard.css";

export default function Dashboard() {
  return (
    <main className="dashboard-main">
      <section className="top-grid">
        <AccountCards />
        <QuickChecklist />
        <MarketOverview />
      </section>

      <section className="middle-grid">
        <Overview />
        <PortfolioChart />
      </section>

      <section className="bottom-grid">
        <WinnersLosers />
      </section>
    </main>
  );
}