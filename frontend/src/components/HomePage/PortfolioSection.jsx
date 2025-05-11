import React, { useEffect, useRef } from "react";

import Spider from "../../assets/spdr-colored.svg";
import Ethereum from "../../assets/ethereum.svg";
import Shares from "../../assets/ishares-colored.svg";
import Netflix from "../../assets/netflix.svg";
import Airbnb from "../../assets/airbnb.svg";
import Bitcoin from "../../assets/bitcoin.svg";
import Apple from "../../assets/apple-colored.svg";


export default function PortfolioSection() {
    const sectionRef = useRef(null);
  
    useEffect(() => {
      const el = sectionRef.current;
      if (!el) return;
  
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add("active");
          }
        },
        { threshold: 0.3 }
      );
  
      observer.observe(el);
      return () => observer.disconnect();
    }, []);

  return (
    <section className="portfolio" >
        <div className="container">
            <div className="portfolio-text">
                <h2>Diversify your portfolio</h2>
                <p>Invest in a variety of asset classes — including 20 global stock exchanges and 100 cryptocurrencies — while managing all of your holdings in one place</p>
                <button className="cta-outline">Explore Top Markets</button>
            </div>
        
            <div id="portfolio-anim" className="portfolio-slide" ref={sectionRef}>
                <img className="portfolio-icon sl-5" src={Netflix} alt="Netflix" />
                <img className="portfolio-icon sl-3" src={Ethereum} alt="Ethereum" />
                <img className="portfolio-icon sl-1" src={Apple} alt="Apple" />
                <img className="portfolio-icon sl-2" src={Bitcoin} alt="Bitcoin" />
                
                <img className="portfolio-icon sl-4" src={Shares} alt="iShares" />
                
                <img className="portfolio-icon sl-6" src={Airbnb} alt="Airbnb" />
                <img className="portfolio-icon sl-7" src={Spider} alt="SPDR" />
            </div>
        </div>
    </section>
  );
}