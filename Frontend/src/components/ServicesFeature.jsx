import "./ServicesFeature.css";

export default function ServicesFeature() {
  return (
    <section className="services-feature">
      <div className="services-feature-grid">
        <div className="feature-card">
          <img src="/images/icon-earth.png" alt="destinations" />
          <h3>700 Destinations</h3>
          <p>Our expert team handpicked all destinations in this site</p>
        </div>

        <div className="feature-card">
          <img src="/images/logo-up.png" alt="price" />
          <h3>Best Price Guarantee</h3>
          <p>Price match within 48 hours of order confirmation</p>
        </div>

        <div className="feature-card">
          <img src="/images/logo-girl.png" alt="support" />
          <h3>Top Notch Support</h3>
          <p>We are here to help, before, during, and even after your trip.</p>
        </div>
      </div>
    </section>
  );
}
