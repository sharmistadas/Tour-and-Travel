import "./ServicesList.css";
import { Link } from "react-router-dom";

export default function ServicesList() {
  return (
    <section className="services-list">
      {/* decorative background */}
      <img
        src="/images/img-top-bg.png"
        alt=""
        className="services-list-bg"
      />

      <div className="services-list-container">
        {/* LEFT IMAGE */}
        <div className="services-list-image">
          <img src="/images/img-right.png" alt="Travel collage" />
        </div>

        {/* RIGHT CONTENT */}
        <div className="services-list-text">
          <h2>
            We have been in the tourism
            <br />
            industry for more than 20 years
          </h2>

          <p className="intro p-5">
            Leave your guidebooks at home and dive into the local cultures
            that make each destination so special. We'll connect you with
            our exclusive experiences.
          </p>

          <div className="service-point">
            <img src="/images/icon-01.png" alt="" />
            <div>
              <h4>Book With Confident</h4>
              <p>
                Each trip is carefully crafted to leave you free to live in
                the moment and enjoy your vacation.
              </p>
            </div>
          </div>

          <div className="service-point">
            <img src="/images/icon-02.png" alt="" />
            <div>
              <h4>Freedom to discover, confidence to explore</h4>
              <p>
                Each trip is carefully crafted to leave you free to live in
                the moment and enjoy your vacation.
              </p>
            </div>
          </div>

          <div className="service-point">
            <img src="/images/icon-03.png" alt="" />
            <div>
              <h4>Dive into Culture</h4>
              <p>
                Each trip is carefully crafted to leave you free to live in
                the moment and enjoy your vacation.
              </p>
            </div>
          </div>

          {/* CONNECT BUTTON */}
          <Link to="/contact" className="services-btn">
            Book Now!
          </Link>
        </div>
      </div>
    </section>
  );
}
