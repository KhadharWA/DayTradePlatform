import React, { useEffect, useState } from "react";
import api from "../api";
import "../Styles/News.css";

export default function News({ selectedSymbol }) {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await api.get(`/stocks/news/${selectedSymbol}`);
        setArticles(res.data || []);
      } catch (error) {
        console.error("News API error:", error);
      }
    };

    fetchNews();
  }, [selectedSymbol]);

  return (
    <div className="news-container">
      <h3><i className="fa-solid fa-newspaper"></i> News</h3>
      <div className="news-scroll">
        {articles.length === 0 && <p>Inga nyheter tillgängliga.</p>}
        {articles.map((item, i) => (
          <a
            key={i}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="news-item"
          >
            <div className="news-meta">
              <span className="news-date">
                {new Date(item.datetime || item.date || item.published_at).toLocaleDateString("sv-SE")}
              </span>
              <span className="news-source">{item.source}</span>
            </div>
            <div className="news-title">{item.title || item.headline}</div>
          </a>
        ))}
      </div>
    </div>
  );
}