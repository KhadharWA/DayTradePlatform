import React from "react";
import "../Styles/About.css";

const About = () => {
  return (
    <section className="about-page">
      <div className="container">
        <div className="about-hero">
            <h1>Om Borsa</h1>
            <p>
            Borsa är en modern handelsplattform för aktieintresserade. Här kan du
            följa marknaden, utföra manuella och automatiska affärer och få
            realtidsnotiser när det händer något viktigt.
            </p>
        </div>

        <div className="about-features">
            <h2>Funktioner</h2>
            <ul className="feature-list">
            <li>Automatisk handel med tröskelvärde</li>
            <li>Realtidsnotiser via SignalR</li>
            <li>Interaktiva grafer och historik</li>
            <li>Detaljerad översikt av transaktioner</li>
            <li>Målbaserad portföljstyrning</li>
            </ul>
        </div>

        <div className="about-tech">
            <h2>Teknikstack</h2>
            <p><strong>Frontend:</strong> React, CSS/SCSS, Axios</p>
            <p><strong>Backend:</strong> ASP.NET Core, Entity Framework</p>
            <p><strong>Live-data:</strong> SignalR, Twelve Data API</p>
            <p><strong>Databas:</strong> SQL Server</p>
        </div>

        <div className="about-contact">
            <h2>Kontakta oss</h2>
            <Contact />
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="name">Namn</label>
      <input type="text" id="name" placeholder="Ditt namn" required />

      <label htmlFor="email">E-post</label>
      <input type="email" id="email" placeholder="din@email.com" required />

      <label htmlFor="message">Meddelande</label>
      <textarea id="message" rows="5" placeholder="Skriv ditt meddelande här..." required></textarea>

      <button type="submit">Skicka</button>
    </form>
  );
};

export default About;