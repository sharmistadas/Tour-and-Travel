import "./ServicesQueries.css";

export default function ServicesQueries() {
  return (
    <section className="services-queries">
      <div className="queries-wrapper">

        {/* TOP HEADING (FULL WIDTH) */}
        <h2 className="queries-title">
          Any questions? Feel free to ask us!
        </h2>

        {/* TWO COLUMN LAYOUT */}
        <div className="queries-container">

          {/* LEFT CONTENT */}
          <div className="queries-info">
            <p>
              <strong>Have a question or comment about us?</strong> We love hearing
              from you! Complete the form and a member of our Customer Care team
              will get back to you soon.
            </p>

            <p>Your Customer Care team is just a phone call away at</p>

            <a href="tel:2123437012" className="queries-phone">
              212–343–7012.
            </a>

            <p className="queries-time">
              Monday – Saturday, 9AM–5PM EST.
            </p>
          </div>

          {/* RIGHT FORM */}
          <div className="queries-form-card">
            <form>
              <input type="text" placeholder="Full Name*" required />
              <input type="email" placeholder="Email*" required />
              <input type="tel" placeholder="Contact Number*" required />
              <input type="text" placeholder="Subject*" required />
              <textarea placeholder="Message*" rows="4" required />

              <div className="queries-checkbox">
                <input type="checkbox" id="agree" />
                <label htmlFor="agree">
                  by clicking here you agree to{" "}
                  <span>our terms and policy.</span>
                </label>
              </div>

              <button type="submit">SUBMIT NOW</button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
