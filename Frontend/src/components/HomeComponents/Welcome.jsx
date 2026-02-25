import React from "react";
import "./Welcome.css";

import actImg from "../../assets/images/activities.png";
import travelImg from "../../assets/images/travel.png";
import guideImg from "../../assets/images/private.png";
import locImg from "../../assets/images/location.png";

import {
  FaTree,
  FaMapMarkedAlt,
  FaUserShield,
  FaMapSigns,
} from "react-icons/fa";

const Welcome = () => {
  return (
    <section className="welcome">
      <div className="welcome-wrapper">
        {/* LEFT GRID */}
        <div className="welcome-grid">
          <div
            className="welcome-card blue"
            style={{ backgroundImage: `url(${actImg})` }}
          >
            <div className="icon-box">
              <FaTree />
            </div>
            <h4>Activities</h4>
            <p>
              A small river named Duden flows by their place and supplies it
              with the necessary
            </p>
          </div>

          <div
            className="welcome-card green"
            style={{ backgroundImage: `url(${travelImg})` }}
          >
            <div className="icon-box">
              <FaMapMarkedAlt />
            </div>
            <h4>Travel Arrangements</h4>
            <p>
              A small river named Duden flows by their place and supplies it
              with the necessary
            </p>
          </div>

          <div
            className="welcome-card teal"
            style={{ backgroundImage: `url(${guideImg})` }}
          >
            <div className="icon-box">
              <FaUserShield />
            </div>
            <h4>Private Guide</h4>
            <p>
              A small river named Duden flows by their place and supplies it
              with the necessary
            </p>
          </div>

          <div
            className="welcome-card coral"
            style={{ backgroundImage: `url(${locImg})` }}
          >
            <div className="icon-box">
              <FaMapSigns />
            </div>
            <h4>Location Manager</h4>
            <p>
              A small river named Duden flows by their place and supplies it
              with the necessary
            </p>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="welcome-content">
          <span className="badge-title">Welcome to Pacific</span>

          <h2 className="tour-title">
            It's time to start your <br /> adventure
          </h2>

          <p>
            A small river named Duden flows by their place and supplies it with
            the necessary regelialia. It is a paradisematic country, in which
            roasted parts of sentences fly into your mouth.
          </p>

          <p>
            Far far away, behind the word mountains, far from the countries
            Vokalia and Consonantia, there live the blind texts. Separated they
            live in Bookmarksgrove right at the coast of the Semantics, a large
            language ocean.
          </p>
          <div className="d-flex welcome-btn-box">
            <button className="welcome-btn">Search Destination</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
