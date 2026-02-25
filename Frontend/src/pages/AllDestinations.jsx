import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../CSS/AllDestinations.css";
import { destinations, getDestinationsByType } from "../data/destinations";
import ActionButtons from "../components/ActionButtons";
import { useWishlistCart } from "../hooks/useWishlistCart";

export default function AllDestinations() {
    const location = useLocation();
    const [selectedType, setSelectedType] = useState("all");
    const [selectedCountry, setSelectedCountry] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    const {
        isInWishlist,
        toggleWishlist,
        isInCart,
        toggleCart
    } = useWishlistCart();

    // Apply incoming filters from TourDestination
    useEffect(() => {
        if (location.state?.filters) {
            const { type, price, days } = location.state.filters;
            if (type && type !== "All") {
                setSelectedType(type.toLowerCase());
            }
        }
    }, [location.state]);

    const types = [
        { value: "all", label: "All Categories" },
        { value: "beaches", label: "Beaches" },
        { value: "hiking", label: "Hiking" },
        { value: "waterfalls", label: "Waterfalls" },
        { value: "volcanoes", label: "Volcanoes" },
        { value: "monuments", label: "Monuments" },
        { value: "bucketlist", label: "Bucket List" }
    ];

    const countries = [
        { value: "all", label: "All Countries" },
        ...Array.from(new Set(destinations.map(d => d.content?.country).filter(Boolean)))
            .sort()
            .map(country => ({
                value: country,
                label: country
            }))
    ];

    const getCountryCount = (country) => {
        return destinations.filter(d => d.content?.country === country).length;
    };

    // Filter destinations
    const filteredDestinations = destinations.filter(destination => {
        const matchesType = selectedType === "all" || destination.type === selectedType;
        const matchesCountry = selectedCountry === "all" || destination.content?.country === selectedCountry;
        const matchesSearch =
            destination.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            destination.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            destination.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            destination.content?.country?.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesType && matchesCountry && matchesSearch;
    });

    const groupedByType = {
        beaches: getDestinationsByType("beaches").filter(d =>
            (selectedCountry === "all" || d.content?.country === selectedCountry) &&
            (searchQuery === "" || d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                d.description.toLowerCase().includes(searchQuery.toLowerCase()))
        ),
        hiking: getDestinationsByType("hiking").filter(d =>
            (selectedCountry === "all" || d.content?.country === selectedCountry) &&
            (searchQuery === "" || d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                d.description.toLowerCase().includes(searchQuery.toLowerCase()))
        ),
        waterfalls: getDestinationsByType("waterfalls").filter(d =>
            (selectedCountry === "all" || d.content?.country === selectedCountry) &&
            (searchQuery === "" || d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                d.description.toLowerCase().includes(searchQuery.toLowerCase()))
        ),
        volcanoes: getDestinationsByType("volcanoes").filter(d =>
            (selectedCountry === "all" || d.content?.country === selectedCountry) &&
            (searchQuery === "" || d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                d.description.toLowerCase().includes(searchQuery.toLowerCase()))
        ),
        monuments: getDestinationsByType("monuments").filter(d =>
            (selectedCountry === "all" || d.content?.country === selectedCountry) &&
            (searchQuery === "" || d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                d.description.toLowerCase().includes(searchQuery.toLowerCase()))
        ),
        bucketlist: getDestinationsByType("bucketlist").filter(d =>
            (selectedCountry === "all" || d.content?.country === selectedCountry) &&
            (searchQuery === "" || d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                d.description.toLowerCase().includes(searchQuery.toLowerCase()))
        )
    };

    const resetFilters = () => {
        setSelectedType("all");
        setSelectedCountry("all");
        setSearchQuery("");
    };

    const activeFiltersCount =
        (selectedType !== "all" ? 1 : 0) +
        (selectedCountry !== "all" ? 1 : 0) +
        (searchQuery !== "" ? 1 : 0);

    // Render destination card
    const renderDestinationCard = (destination) => (
        <Link
            to={`/destination/${destination.id}`}
            key={destination.id}
            className="destination-card-grid"
        >
            <img
                src={destination.image}
                alt={destination.title}
                onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                }}
            />

            <ActionButtons
                item={destination}
                isInWishlist={isInWishlist(destination.id)}
                isInCart={isInCart(destination.id)}
                onWishlistClick={toggleWishlist}
                onCartClick={toggleCart}
            />

            <div className="destination-ribbon">
                <span className="country-code">
                    {destination.content?.countryCode || "WW"}
                </span>
                <span>{destination.content?.country || "International"}</span>
            </div>
            <div className="destination-tours">
                {destination.content?.duration || "7 Days"}
            </div>
            <div className="destination-title-overlay">
                <h3>{destination.title}</h3>
            </div>
        </Link>
    );

    return (
        <div className="all-destinations-page">
            {/* BANNER SECTION */}
            <div className="destinations-banner">
                <div className="banner-content">
                    <h1 className="banner-title">Explore All Destinations</h1>
                    <p className="banner-subtitle">Discover Amazing Places Around the World</p>
                    <Link to="/" className="back-home-btn">
                        <svg className="back-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        Back to Home
                    </Link>
                </div>
            </div>

            {/* FILTERS SECTION */}
            <div className="destinations-filters">
                <div className="filters-container">
                    {/* SEARCH BOX */}
                    <div className="search-box">
                        <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8" />
                            <path d="M21 21l-4.35-4.35" />
                        </svg>
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search destinations, countries, or activities..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <button
                                className="clear-search"
                                onClick={() => setSearchQuery("")}
                                aria-label="Clear search"
                            >
                                ×
                            </button>
                        )}
                    </div>

                    {/* FILTER CONTROLS */}
                    <div className="filter-controls">
                        <div className="filter-group-wrapper">
                            {/* CATEGORY FILTER */}
                            <div className="filter-group">
                                <label htmlFor="type-select" className="filter-label">
                                    <svg className="filter-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                                    </svg>
                                    Category:
                                </label>
                                <div className="filter-dropdown">
                                    <select
                                        id="type-select"
                                        value={selectedType}
                                        onChange={(e) => setSelectedType(e.target.value)}
                                        className="country-select"
                                    >
                                        {types.map(type => (
                                            <option key={type.value} value={type.value}>
                                                {type.label}
                                            </option>
                                        ))}
                                    </select>
                                 
                                </div>
                            </div>

                            {/* COUNTRY FILTER */}
                            <div className="filter-group">
                                <label htmlFor="country-select" className="filter-label">
                                    <svg className="filter-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                                    </svg>
                                    Country:
                                </label>
                                <div className="filter-dropdown">
                                    <select
                                        id="country-select"
                                        value={selectedCountry}
                                        onChange={(e) => setSelectedCountry(e.target.value)}
                                        className="country-select"
                                    >
                                        {countries.map(country => (
                                            <option key={country.value} value={country.value}>
                                                {country.label} {country.value !== "all" ? `(${getCountryCount(country.value)})` : ""}
                                            </option>
                                        ))}
                                    </select>
                                  
                                </div>
                            </div>
                        </div>

                        {/* RESULTS COUNT */}
                        <div className="results-count">
                            <span className="count-number">{filteredDestinations.length}</span>
                            <span className="count-text">destinations found</span>
                        </div>
                    </div>

                    {/* ACTIVE FILTERS */}
                    {activeFiltersCount > 0 && (
                        <div className="active-filters">
                            <div className="active-filters-container">
                                <span className="active-filters-label">Active Filters:</span>
                                <div className="active-filter-tags">
                                    {selectedType !== "all" && (
                                        <span className="active-filter-tag">
                                            Category: {types.find(t => t.value === selectedType)?.label}
                                            <button className="remove-filter" onClick={() => setSelectedType("all")}>×</button>
                                        </span>
                                    )}
                                    {selectedCountry !== "all" && (
                                        <span className="active-filter-tag">
                                            Country: {selectedCountry}
                                            <button className="remove-filter" onClick={() => setSelectedCountry("all")}>×</button>
                                        </span>
                                    )}
                                    {searchQuery !== "" && (
                                        <span className="active-filter-tag">
                                            Search: "{searchQuery}"
                                            <button className="remove-filter" onClick={() => setSearchQuery("")}>×</button>
                                        </span>
                                    )}
                                </div>
                                <button className="reset-all-filters" onClick={resetFilters}>
                                    Clear All
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* DESTINATIONS GRID */}
            <div className="all-destinations-container">
                {selectedType === "all" ? (
                    // Show all categories grouped
                    Object.entries(groupedByType).map(([type, dests]) => {
                        if (dests.length === 0) return null;
                        return (
                            <div key={type} className="category-section">
                                <h2 className="category-title">
                                    {types.find(t => t.value === type)?.label || type}
                                    <span className="category-count">({dests.length})</span>
                                </h2>
                                <div className="destinations-grid">
                                    {dests.map(renderDestinationCard)}
                                </div>
                            </div>
                        );
                    })
                ) : (
                    // Show filtered results
                    <div className="category-section">
                        {filteredDestinations.length > 0 ? (
                            <>
                                <h2 className="category-title">
                                    {types.find(t => t.value === selectedType)?.label}
                                    <span className="category-count">({filteredDestinations.length})</span>
                                </h2>
                                <div className="destinations-grid">
                                    {filteredDestinations.map(renderDestinationCard)}
                                </div>
                            </>
                        ) : (
                            <div className="no-results">
                                <svg className="no-results-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="11" cy="11" r="8" />
                                    <path d="M21 21l-4.35-4.35" />
                                    <line x1="11" y1="8" x2="11" y2="14" />
                                    <line x1="8" y1="11" x2="14" y2="11" />
                                </svg>
                                <h3>No Destinations Found</h3>
                                <p>Try adjusting your search criteria or filters</p>
                                <button className="reset-filters-btn" onClick={resetFilters}>
                                    Reset All Filters
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}