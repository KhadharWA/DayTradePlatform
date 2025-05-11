import React from "react";

import videoThumb from "../../assets/copytraderthumb.jpg"; // fallback poster
import copyVideo from "../../assets/copytradervideo.mp4"; // your local mp4 file

export default function CopyTraderSection() {
  return (
    <section className="copy-section">
        <div className="copy-wrapper">
            <div className="copy-text">
            <h2>Copy top investors</h2>
            <p>
                With our innovative <strong>CopyTrader™</strong>, you can automatically copy the moves of other investors.
                Find investors you believe in and <strong>replicate their actions</strong> in real time.
            </p>
            <button className="cta-outline">Start Copying</button>
            <p className="disclaimer">
                Copy Trading does not amount to investment advice. The value of your investments may go up or down.
                Your capital is at risk. Past performance is not an indication of future results.
            </p>
            </div>
            
            <div className="video-cover_desktop">
            <video
                className="copy-video"
                src={copyVideo}
                autoPlay
                muted
                loop
                playsInline
            />
            </div>
        </div>
    </section>
  );
}