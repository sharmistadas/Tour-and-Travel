import "./Contact.css";
// import Navbar from "../components/Navbar";
import contactImg from "../assets/images/Contact.jpg";

const Contact = () => {
  return (
    <>
      {/* BLACK HEADER BAR */}

      {/* HERO SECTION */}
      <section className="contact-section">
        <div
          className="contact-hero"
          style={{ backgroundImage: `url(${contactImg})` }}
        >
          {/* <div className="nav-section">
            <Navbar />
          </div> */}
          <div className="contact-overlay">
            <h1>CONTACT</h1>
            <p>Send me your questions, comments, or suggestions!</p>
          </div>

          <div className="torn-edge"></div>
        </div>
      </section>

      {/* TEXT SECTION */}
      <section className="contact-info">
        <span className="contact-tag">GET IN TOUCH</span>

        <h2 className="contact-title">Contact Form</h2>

        <p className="contact-subtitle">
          Send me your questions, comments, or suggestions!
        </p>

        <p className="contact-text">
          If you'd like to work with me or you have a question or comment, you
          can contact me using the form below. You can also find{" "}
          <span className="contact-link">more info about me here</span>.
        </p>

        <p className="contact-note">
          Sometimes I'm busy traveling, but I try to respond to any messages!
        </p>
      </section>

      {/* NEW CARD-STYLE FORM (THIS REPLACES THE OLD FORM) */}
      <section className="contact-form-wrapper">
        <div className="contact-form-card">
          <h2 className="form-title">
            Make Your <span>Contact</span> Through This Form
          </h2>

          <form className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label>Your Name</label>
                <input type="text" placeholder="Ex. John Smith" />
              </div>

              <div className="form-group">
                <label>Your Email</label>
                <input type="email" placeholder="Ex. john@email.com" />
              </div>
            </div>

            <div className="form-row">

              <div className="form-group">
                <label>Subject</label>
                <input type="text" placeholder="Ex. Travel Inquiry" />
              </div>


              <div className="form-group">
                <label>Contact Number</label>
                <input type="tel" placeholder="Ex. +1 234 567 890" />
              </div>

            </div>

            <div className="form-row">
              <div className="form-group full">
                <label>Your Message</label>
                <textarea rows="5" placeholder="Write your message here..." />
              </div>
            </div>

            <button type="submit" className="submit-btn">
              Submit
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Contact;
