

import "./ServicesHero.css";
import { Link } from "react-router-dom";
import React from "react";

function ServicesHero() {
  return (
    <section className="services-hero">
      {/* decorative claw background */}
      <img
        src="/images/image-top-bg.png"
        alt=""
        className="hero-bg-shape"
      />

      <div className="services-hero-container">
        {/* LEFT CONTENT */}
        <div className="hero-text">
          <span className="hero-pill">Great Service, Great Price!</span>

          <h1>
            Freedom to discover,
            <br />
            confidence to explore
          </h1>

          <p>
            Leave your guidebooks at home and dive into the local cultures that
            make each destination so special. We'll connect you with our
            exclusive experiences. Each trip is carefully crafted to let enjoy
            your vacation.
          </p>

          {/* ✅ CONNECTED TO CONTACT PAGE */}
          <Link to="/contact" className="hero-btn">
            Contact Us
          </Link>
        </div>

        {/* RIGHT IMAGE */}
        <div className="hero-image-wrapper">
          <div className="hero-play">
            <img src="/images/play.png" alt="Play video" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServicesHero;
