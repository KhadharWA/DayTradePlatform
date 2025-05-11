export default function NewsletterSection() {
    return (
      <section className="newsletter-section">
        <div className="newsletter-container">
          <div className="newsletter-text">
            <h2>Stay Informed Daily</h2>
            <p>Subscribe to receive market updates, trading tips, and daily insights directly to your inbox.</p>
          </div>
  
          <form className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="newsletter-input"
            />
            <button type="submit" className="newsletter-button">Subscribe</button>
          </form>
        </div>
      </section>
    );
}