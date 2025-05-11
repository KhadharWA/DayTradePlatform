import "../Styles/Home.css";
import HeroSection from "../components/HomePage/HeroSection";
import AwardsTicker from "../components/HomePage/AwardsTicker";
import PortfolioSection from "../components/HomePage/PortfolioSection";
import CryptoSection from "../components/HomePage/CryptoSection";
import CopyTraderSection from "../components/HomePage/CopyTraderSection";
import NewsletterSection from "../components/HomePage/NewsletterSection";

export default function Home() {
  return (
    <div className="home-page">
      <HeroSection />
      <AwardsTicker />
      <PortfolioSection />
      <CryptoSection />
      <CopyTraderSection />
      <NewsletterSection />
    </div>
  );
}