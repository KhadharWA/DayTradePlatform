import iphoneMockup from "../../assets/cover_d.webp";

export default function HeroSection() {
  return (
    <section className="hero">
      <h1><span className="highlight">THE BEST</span> TRADING PLATFORM</h1>
      <p>Join 35M users worldwide and invest in 7,000+ instruments with advanced trading tools</p>
      <div className="hero-center">
        <button className="cta">Join trading</button>
        <img src={iphoneMockup} alt="Mockup phones" className="phones-img" />
      </div>
     
    </section>
  );
}