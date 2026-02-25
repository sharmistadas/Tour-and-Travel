import React from "react";
import { Helmet } from "react-helmet-async";
import "../CSS/Home.css";

import HeroAbout from "./HeroAbout";
import Testimonial from "../components/Testimonial/Testimonial";
import Welcome from "../components/HomeComponents/Welcome";
import Hero from "../components/HomeComponents/Hero";
import SelectDestination from "../components/HomeComponents/SelectDestination";
import TourDestination from "../components/HomeComponents/TourDestination";
import RecentPost from "../components/BlogComponents/RecentPost";
import CtaBanner from "../components/HomeComponents/CtaBanner";

export default function Home() {
  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Dubai Tours & Travel Packages | Pacific Travel</title>
        <meta
          name="description"
          content="Experience luxury Dubai tours with Pacific Travel. Exclusive desert safaris, city sightseeing, Burj Khalifa tickets, and customized holiday packages. Book your dream trip today!"
        />
        <meta
          name="keywords"
          content="Dubai tours, Dubai travel packages, luxury desert safari, Burj Khalifa tickets, UAE holidays, Pacific Travel, sightseeing Dubai, adventure tours"
        />
        <meta name="author" content="Pacific Travel" />
        <meta name="robots" content="index, follow" />
        <meta name="revisit-after" content="7 days" />
        <meta httpEquiv="content-language" content="en" />
        <meta name="geo.region" content="AE-DU" />
        <meta name="geo.placename" content="Dubai" />
        <meta name="geo.position" content="25.2048;55.2708" />
        <meta name="ICBM" content="25.2048, 55.2708" />
        <link rel="canonical" href="https://www.pacifictravel.com/" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Pacific Travel" />
        <meta property="og:title" content="Dubai Tours & Travel Packages | Pacific Travel" />
        <meta
          property="og:description"
          content="Curated Dubai experiences: desert safaris, city tours, and luxury stays. Book with Pacific Travel for unforgettable memories."
        />
        <meta property="og:url" content="https://www.pacifictravel.com/" />
        <meta property="og:image" content="https://www.pacifictravel.com/images/dubai-tours-og.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Dubai desert safari and skyline" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@PacificTravel" />
        <meta name="twitter:title" content="Dubai Tours & Travel Packages | Pacific Travel" />
        <meta
          name="twitter:description"
          content="Discover Dubai with expert guides. Desert adventures, modern wonders, and exclusive deals. Start your journey today!"
        />
        <meta name="twitter:image" content="https://www.pacifictravel.com/images/dubai-tours-twitter.jpg" />
        <meta name="twitter:image:alt" content="Burj Khalifa and desert dunes" />

        {/* Structured Data (JSON-LD) */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "TravelAgency",
              "name": "Pacific Travel",
              "url": "https://www.pacifictravel.com",
              "logo": "https://www.pacifictravel.com/logo.png",
              "image": "https://www.pacifictravel.com/images/dubai-tours-og.jpg",
              "description": "Premium travel agency specializing in Dubai tours and holiday packages. Offering desert safaris, city tours, and custom itineraries.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Dubai",
                "addressCountry": "AE"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 25.2048,
                "longitude": 55.2708
              },
              "telephone": "+971-4-123-4567",
              "email": "info@pacifictravel.com",
              "priceRange": "$$",
              "sameAs": [
                "https://www.facebook.com/pacifictravel",
                "https://www.instagram.com/pacifictravel",
                "https://twitter.com/PacificTravel"
              ],
              "makesOffer": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "TouristTrip",
                    "name": "Luxury Desert Safari",
                    "description": "Evening desert safari with dune bashing, BBQ dinner, and cultural performances.",
                    "touristType": "Adventure seekers",
                    "itinerary": "Dubai desert conservation area"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "TouristTrip",
                    "name": "Dubai City Tour",
                    "description": "Half-day guided tour including Burj Khalifa, Dubai Mall, and historic Al Fahidi.",
                    "touristType": "Culture & sightseeing",
                    "itinerary": "Downtown Dubai, Dubai Creek"
                  }
                }
              ]
            }
          `}
        </script>
      </Helmet>

      <div className="home">
        <div className="banner">
          <div className="hero-section">
            <Hero />
          </div>
        </div>

        {/* <section className="searchbar-section"><SearchBar /></section> */}

        <div className="content-sections">
          <Welcome />
          <SelectDestination />
          <TourDestination />
          <HeroAbout />
          <Testimonial />
          <RecentPost />
          <CtaBanner />
        </div>
      </div>
    </>
  );
}