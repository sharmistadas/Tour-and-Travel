import React from "react";
import SearchBar from "./SearchBar";
import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero ">

      {/* Hero Content Section - Shows First */}
      <div className="container">
        <div className="hero-content">
          {/* Text content - appears first on mobile */}
          <div className="hero-text">
            <span className="badge-title">Welcome to Pacific</span>
            <h1 className="tour-title text-white">Discover Your Favorite Place with Us</h1>
            <p className="hero-subtitle">
              Travel to any corner of the world, without going around in circles
            </p>
          </div>

          {/* Play button - appears after text on mobile, on right side on desktop */}
          <div className="hero-video">
            <button
              className="play-btn"
              aria-label="Play video"
              onClick={() => console.log('Play video')}
            >
              <span className="play-icon">▶</span>
            </button>
          </div>
        </div>

        {/* Search Bar Section - Shows Below Hero Content */}
        
      </div>
      <div className="container search-bar-container">
        <SearchBar />
      </div>
    </section>
  );
};

export default Hero;