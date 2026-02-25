import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./SelectDestination.css";
import destinations from "../../data/destinations";
import ActionButtons from "../ActionButtons";
import { useWishlistCart } from "../../hooks/useWishlistCart";

export default function SelectDestination() {
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(4);
  const containerRef = useRef(null);
  const cardRef = useRef(null);

  const {
    isInWishlist,
    toggleWishlist,
    isInCart,
    toggleCart
  } = useWishlistCart();

  // Get unique countries
  const countries = [
    "All",
    ...new Set(destinations.map((d) => d.content?.country).filter(Boolean))
  ].sort();

  const getToursCount = (country) => {
    return destinations.filter(d => d.content?.country === country).length;
  };

  const filteredDestinations =
    selectedCountry === "All"
      ? destinations
      : destinations.filter((d) => d.content?.country === selectedCountry);

  const totalSlides = Math.max(
    1,
    Math.ceil(filteredDestinations.length / slidesToShow)
  );

  // Handle responsive slides
  useEffect(() => {
    const updateSlides = () => {
      if (window.innerWidth >= 1100) setSlidesToShow(4);
      else if (window.innerWidth >= 600) setSlidesToShow(2);
      else setSlidesToShow(1);
    };

    updateSlides();
    window.addEventListener("resize", updateSlides);
    return () => window.removeEventListener("resize", updateSlides);
  }, []);

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  useEffect(() => {
    if (containerRef.current && cardRef.current && filteredDestinations.length > 0) {
      const cardWidth = cardRef.current.offsetWidth + 28;
      containerRef.current.scrollTo({
        left: currentSlide * slidesToShow * cardWidth,
        behavior: "smooth",
      });
    }
  }, [currentSlide, slidesToShow, filteredDestinations]);

  const handleImageError = (e) => {
    e.target.src = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
  };

  return (
    <section
      className="destination-section"
      style={{ backgroundImage: "url(/images/bg_3.png)" }}
      aria-label="Destination selection section"
    >
      {/* HEADER */}
      <div className="destination-header">
        <div className="container">
          <div className="text-center">
            <p className="badge-title">
              Pacific Provide Places
            </p>
            <h2 className="destination-title mb-0">
              Select Your Destination
            </h2>
          </div>
        </div>
      </div>

      {/* FILTER + NAVIGATION */}
      <div className="container">
        <div className="row align-items-center py-5">
          {/* COUNTRY FILTER */}
          <div className="col-12 col-md-6">
            <div className="country-filter d-flex flex-column flex-sm-row align-items-sm-center gap-2">
              <label htmlFor="country-select" className="filter-label mb-0">
                Filter by Country:
              </label>

              <select
                id="country-select"
                value={selectedCountry}
                onChange={(e) => {
                  setSelectedCountry(e.target.value);
                  setCurrentSlide(0);
                }}
                className="form-select country-select w-auto"
                aria-label="Select country to filter destinations"
              >
                {countries.map((country, index) => (
                  <option key={index} value={country}>
                    {country} {country !== "All" && `(${getToursCount(country)} tours)`}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* NAVIGATION BUTTONS */}
          <div className="col-12 col-md-6 text-center text-md-end">
            <button
              className={`carousel-btn prev-btn ${currentSlide === 0 ? "disabled" : ""}`}
              onClick={prevSlide}
              disabled={currentSlide === 0}
              aria-label="Previous destinations"
            >
              ←
            </button>

            <button
              className={`carousel-btn next-btn ${currentSlide >= totalSlides - 1 ? "disabled" : ""}`}
              onClick={nextSlide}
              disabled={currentSlide >= totalSlides - 1}
              aria-label="Next destinations"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* DESTINATIONS CAROUSEL */}
      <div className="carousel-wrapper">
        <div className="destination-carousel" ref={containerRef}>
          <div className="destination-container">
            {filteredDestinations.length > 0 ? (
              filteredDestinations.map((item, index) => (
                <div
                  key={item.id}
                  className="destination-card"
                  ref={index === 0 ? cardRef : null}
                >
                  <Link to={`/destination/${item.id}`}>
                    <img
                      src={item.image}
                      alt={item.title}
                      onError={handleImageError}
                      loading="lazy"
                    />

                    <ActionButtons
                      item={item}
                      isInWishlist={isInWishlist(item.id)}
                      isInCart={isInCart(item.id)}
                      onWishlistClick={toggleWishlist}
                      onCartClick={toggleCart}
                    />

                    <div className="destination-ribbon">
                      <span className="country-code">{item.content?.countryCode || "WW"}</span>
                      <span>{item.content?.country || item.content?.location?.split(',')[0] || "International"}</span>
                    </div>

                    <div className="destination-title-overlay">
                      <h3>{item.title}</h3>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <div className="no-destinations-message">
                <p>No destinations found for the selected country.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* VIEW ALL BUTTON */}
      <div className="container text-end mt-4">
        <div>
          <Link
            to="/destinations"
            className="view-all-btn"
            aria-label="View all destinations"
          >
            View All Destinations →
          </Link>
        </div>
      </div>
    </section>
  );
}