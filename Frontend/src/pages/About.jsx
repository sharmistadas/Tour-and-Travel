import React from "react";
import { Helmet } from "react-helmet-async";
import SplitSection from "../components/SplitSection";
import Stats from "../components/Stats";
import Team from "../components/Team";
import FinalQuote from "../components/FinalQuote";
import Navbar from "../components/Navbar";

import "../CSS/About.css";

function About() {
  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>About Us – Award-Winning Architecture & Building Consultant</title>
        <meta
          name="description"
          content="We are a leading architecture firm and building consultant dedicated to innovative, sustainable design. Learn our story, meet our team, and discover how we transform visions into reality."
        />
        <meta
          name="keywords"
          content="architecture firm, building consultant, architectural design, sustainable architecture, construction consulting, project management, design-build firm"
        />
        <meta name="author" content="Your Company Name" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.yourwebsite.com/about" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Your Company Name" />
        <meta property="og:title" content="About Us – Award-Winning Architecture & Building Consultant" />
        <meta
          property="og:description"
          content="We are a leading architecture firm and building consultant dedicated to innovative, sustainable design. Learn our story, meet our team, and discover how we transform visions into reality."
        />
        <meta property="og:url" content="https://www.yourwebsite.com/about" />
        <meta property="og:image" content="https://www.yourwebsite.com/images/about-og.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Our architecture team discussing a project" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@yourhandle" />
        <meta name="twitter:title" content="About Us – Award-Winning Architecture & Building Consultant" />
        <meta
          name="twitter:description"
          content="We are a leading architecture firm and building consultant dedicated to innovative, sustainable design. Learn our story, meet our team, and discover how we transform visions into reality."
        />
        <meta name="twitter:image" content="https://www.yourwebsite.com/images/about-twitter.jpg" />
        <meta name="twitter:image:alt" content="Our architecture team discussing a project" />

        {/* Structured Data (JSON-LD) for Organization + ProfessionalService */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Your Company Name",
              "url": "https://www.yourwebsite.com",
              "logo": "https://www.yourwebsite.com/logo.png",
              "image": "https://www.yourwebsite.com/images/about-og.jpg",
              "description": "We are a leading architecture firm and building consultant dedicated to innovative, sustainable design. Learn our story, meet our team, and discover how we transform visions into reality.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "City",
                "addressRegion": "State",
                "addressCountry": "Country"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "XX.XXXX",
                "longitude": "XX.XXXX"
              },
              "telephone": "+1-123-456-7890",
              "email": "info@yourwebsite.com",
              "priceRange": "$$$",
              "sameAs": [
                "https://www.facebook.com/yourpage",
                "https://www.instagram.com/yourprofile",
                "https://www.linkedin.com/company/yourcompany"
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Architecture & Consulting Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Architectural Design",
                      "description": "Custom residential and commercial architecture tailored to your vision."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Building Consultation",
                      "description": "Expert advice on construction, materials, and project management."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Sustainable Design",
                      "description": "Eco-friendly, energy-efficient building solutions."
                    }
                  }
                ]
              }
            }
          `}
        </script>
      </Helmet>

      <div>
        <section className="about-hero">
          <div className="nav-section">
            <Navbar />
          </div>
          <div className="about-hero-content">
            <span className="badge-title">The Story</span>
            <h1>About Us</h1>
          </div>
        </section>

        <section className="intro">
          <div className="intro-container">
            <div className="intro-left">
              <h2 className="tour-title">
                We are the best architect firm  & Building Consultant
              </h2>
             
            </div>

            <div className="intro-right">
              <p>
                At <strong>Your Company Name</strong>, we believe architecture is more than just buildings—it's about creating spaces that inspire, function, and endure. For over a decade, our team has partnered with clients to transform visions into award-winning structures, from sustainable homes to iconic commercial landmarks.
              </p>
              <p>
                Our approach blends innovative design with practical building consultancy. We guide you through every phase—from initial concept and permits to material selection and construction oversight—ensuring your project is delivered on time, within budget, and beyond expectations. Whether you're dreaming of a modern residence or need expert advice on a complex development, we're here to bring your ideas to life.
              </p>
            </div>
          </div>
        </section>

        <SplitSection />
        <Stats />
        <Team />
        <FinalQuote />
      </div>
    </>
  );
}

export default About;