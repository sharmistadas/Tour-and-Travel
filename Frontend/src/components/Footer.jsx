import "./Footer.css";
import { Container, Row, Col } from "react-bootstrap";
import { IoLogoTwitter } from "react-icons/io5";
import { FaFacebookF, FaInstagram, FaLocationDot } from "react-icons/fa6";
import { MdCall } from "react-icons/md";
import { RiSendPlaneFill } from "react-icons/ri";

function Footer() {
  return (
    <footer className="footer">
      <Container>
        <Row className="gy-5">

          {/* About */}
          <Col lg={3} md={6} sm={12}>
            <h5 className="footer-title">About</h5>
            <p className="footer-text">
              Far far away, behind the word mountains, far from the countries
              Vokalia and Consonantia, there live the blind texts.
            </p>

            <div className="footer-social">
              <span><IoLogoTwitter /></span>
              <span><FaFacebookF /></span>
              <span><FaInstagram /></span>
            </div>
          </Col>

          {/* Information */}
          <Col lg={6} md={6} sm={6} >
            <div className="footer-inner-links">

              <div >

                <h5 className="footer-title">Information</h5>
                <ul className="footer-links">
                  <li><a href="/">Home</a></li>
                  <li><a href="/about">About Us</a></li>
                  <li><a href="/contact">Contact</a></li>
                  <li><a href="/services">Services</a></li>
                  <li><a href="/blog">Blog</a></li>
                  <li><a href="#">Privacy Policy</a></li>
                  <li><a href="#">Refund Policy</a></li>
                </ul>
              </div>
              <div  >
                <h5 className="footer-title">Experience</h5>
                <ul className="footer-links">
                  <li><a href="/monuments">Monuments</a></li>
                  <li><a href="/bucket-list">Bucket List</a></li>
                  <li><a href="/beaches">Beach</a></li>
                  <li><a href="/volcanoes">Volcanoes</a></li>
                  <li><a href="/waterfalls">Waterfalls</a></li>
                  <li><a href="/hiking">Hiking</a></li>
                </ul>
              </div>
            </div>
          </Col>

          {/* Contact */}
          <Col lg={3} md={6} sm={12}>
            <h5 className="footer-title">Have a Questions?</h5>

            <div className="footer-contact">
              <FaLocationDot />
              <span>203 Fake St. Mountain View, San Francisco, USA</span>
            </div>

            <div className="footer-contact">
              <MdCall />
              <span>+2 392 3929 210</span>
            </div>

            <div className="footer-contact">
              <RiSendPlaneFill />
              <span>info@yourdomain.com</span>
            </div>
          </Col>

        </Row>

        <Row>
          <Col>
            <p className="footer-bottom text-center">
              Copyright ©2026 All rights reserved | This template is made with <span className="text-danger  fs-5">♥</span> by Colorlib
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
