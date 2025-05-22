import "../Styles/Footer.css";



export default function Footer() {
    return (
      <footer className="site-footer">
        <div className="footer-container">
          <div className="footer-links">
            <a href="/About">About</a>
            <a href="/contact">Contact</a>
            <a href="/terms">Terms</a>
            <a href="/privacy">Privacy</a>
          </div>
  
          <div className="footer-copy">
            <p>&copy; {new Date().getFullYear()} DayTrader Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
}