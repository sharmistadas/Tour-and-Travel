import React, { useState } from "react";
import "./SearchBar.css";

const SearchBar = () => {
  const [activeTab, setActiveTab] = useState("hotel");

  return (
    <div className="search-section">
      <div className="search-container">
        <div className="search-tabs">
          <button
            className={`tab ${activeTab === "tour" ? "active" : ""}`}
            onClick={() => setActiveTab("tour")}
          >
            Search Tour
          </button>
          <button
            className={`tab ${activeTab === "hotel" ? "active" : ""}`}
            onClick={() => setActiveTab("hotel")}
          >
            Hotel
          </button>
        </div>

        <div className="search-bar">
          <div className="field">
            <label htmlFor="destination">DESTINATION</label>
            <input
              id="destination"
              type="text"
              placeholder="Search place"
              aria-label="Search destination"
            />
          </div>

          <div className="field">
            <label htmlFor="checkin">CHECK-IN DATE</label>
            <input
              id="checkin"
              type="date"
              placeholder="dd - mm - yyyy"
              aria-label="Check-in date"
            />
          </div>

          <div className="field">
            <label htmlFor="checkout">CHECK-OUT DATE</label>
            <input
              id="checkout"
              type="date"
              placeholder="dd - mm - yyyy"
              aria-label="Check-out date"
            />
          </div>

          <div className="field">
            <label htmlFor="price">PRICE LIMIT</label>
            <input
              id="price"
              type="text"
              placeholder="$100"
              aria-label="Price limit"
            />
          </div>

          <button className="search-btn" onClick={() => console.log("Search clicked")}>
            SEARCH
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;