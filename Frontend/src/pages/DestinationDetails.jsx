import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "../CSS/DestinationDetails.css";
import { getDestinationById, getDestinationsByType } from "../data/destinations";
import BookingForm from "../components/Booking/BookingForm";

export default function DestinationDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [activeImage, setActiveImage] = useState(0);
    const [relatedDestinations, setRelatedDestinations] = useState([]);
    const [activeTab, setActiveTab] = useState("itinerary");
    const [bookingEmail, setBookingEmail] = useState("");

    const destination = getDestinationById(id);

    useEffect(() => {
        if (destination) {
            const related = getDestinationsByType(destination.type)
                .filter(dest => dest.id !== destination.id)
                .slice(0, 3);
            setRelatedDestinations(related);
        }
    }, [destination]);

    const galleryImages = [
        destination?.image,
        "https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!destination) {
        return (
            <div className="container text-center py-5">
                <h2>Destination not found</h2>
                <Link to="/destinations" className="btn btn-primary mt-3">
                    Browse All Destinations
                </Link>
            </div>
        );
    }

    const handleBookingComplete = (bookingData) => {
        console.log("Booking completed:", bookingData);
        setBookingEmail(bookingData.email);
        setShowSuccessModal(true);
        document.getElementById('bookingModal').close();
    };

    const handleQuickView = (imageIndex) => {
        setActiveImage(imageIndex);
        document.getElementById('imageModal').showModal();
    };

    // Mock itinerary data
    const itineraryData = [
        {
            day: 1,
            location: "Lake Manyara National Park",
            activities: "Hot air balloon safari, champagne breakfast, evening game drive"
        },
        {
            day: 2,
            location: "Serengeti National Park",
            activities: "Transfer to Serengeti, afternoon game drive"
        },
        {
            day: 3,
            location: "Serengeti National Park",
            activities: "Full-day game drives, picnic lunch"
        },
        {
            day: 4,
            location: "Serengeti National Park",
            activities: "Hot air balloon safari, champagne breakfast, evening game drive"
        },
        {
            day: 5,
            location: "Ngorongoro Crater",
            activities: "Game drive, visit to Maasai village"
        },
        {
            day: 6,
            location: "Serengeti National Park",
            activities: "Morning game drive, leisure time at camp, bush dinner"
        },
        {
            day: 7,
            location: "Lake Manyara National Park",
            activities: "Game drive, bird watching"
        },
        {
            day: 8,
            location: "Departure from Arusha",
            activities: "Transfer to airport, departure"
        }
    ];

    // Mock included/excluded items
    const includedItems = [
        "Luxury tented camp accommodations",
        "All meals (breakfast, lunch, and dinner)",
        "Daily guided game drives",
        "Hot air balloon safari with champagne breakfast"
    ];

    const excludedItems = [
        "Visit to a Maasai village",
        "Evening sundowners and bush dinners",
        "All park fees",
        "Airport transfers",
        "Travel insurance"
    ];

    return (
        <div className="destination-details-classic">
            {/* Breadcrumb */}
            <nav className="breadcrumb-classic">
                <div className="container">
                    <ol className="breadcrumb-list">
                        <li className="breadcrumb-item-classic">
                            <Link to="/">Home</Link>
                        </li>
                        <li className="breadcrumb-separator">/</li>
                        <li className="breadcrumb-item-classic">
                            <Link to="/destinations">Destinations</Link>
                        </li>
                        <li className="breadcrumb-separator">/</li>
                        <li className="breadcrumb-item-classic active">{destination.title}</li>
                    </ol>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="hero-classic">
                <img
                    src={destination.image}
                    alt={destination.title}
                    className="hero-image-classic"
                />
                <div className="hero-overlay-classic">
                    <div className="container">
                        <div className="hero-content-classic">
                            <span className="destination-tag">{destination.content?.countryCode || "TZ"}</span>
                            <h1 className="hero-title-classic">{destination.title}</h1>
                            <div className="hero-meta-classic">
                                <div className="meta-item-classic">
                                    <i className="fas fa-map-marker-alt"></i>
                                    <span>{destination.content?.location || "Serengeti, Tanzania"}</span>
                                </div>
                                <span className="meta-separator">|</span>
                                <div className="meta-item-classic">
                                    <i className="fas fa-clock"></i>
                                    <span>{destination.content?.duration || "8 Days / 7 Nights"}</span>
                                </div>
                                <span className="meta-separator">|</span>
                                <div className="meta-item-classic">
                                    <i className="fas fa-users"></i>
                                    <span>{destination.content?.participants || "15"} participants</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container content-section-classic">
                <div className="row">
                    {/* Left Column - Details */}
                    <div className="col-lg-8">
                        <div className="details-card-classic">
                            {/* About Section */}
                            <div className="content-block">
                                <h2 className="section-title-classic">About This Journey</h2>
                                <div className="title-underline"></div>
                                <p className="description-classic">
                                    Experience the thrill of a lifetime with our Safari Adventure package.
                                    Traverse the Serengeti and witness the majestic wildlife in their natural habitat.
                                    This all-inclusive safari offers luxurious accommodations, expert-guided tours,
                                    and unforgettable experiences that will create memories to last a lifetime.
                                </p>
                            </div>

                            {/* Trip Schedule */}
                            <div className="content-block">
                                <h2 className="section-title-classic">Trip Schedule</h2>
                                <div className="title-underline"></div>
                                <div className="schedule-classic">
                                    <div className="schedule-icon">📅</div>
                                    <div className="schedule-text">
                                        <div className="schedule-label">Departure & Return</div>
                                        <div className="schedule-dates">August 5, 2028 — August 12, 2028</div>
                                    </div>
                                </div>
                            </div>

                            {/* Includes & Excludes */}
                            <div className="content-block">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="inclusion-box">
                                            <h3 className="inclusion-title included">
                                                <span className="inclusion-icon">✓</span>
                                                What's Included
                                            </h3>
                                            <ul className="inclusion-list">
                                                {includedItems.map((item, index) => (
                                                    <li key={index}>
                                                        <span className="list-marker">•</span>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="inclusion-box">
                                            <h3 className="inclusion-title excluded">
                                                <span className="inclusion-icon">✕</span>
                                                What's Excluded
                                            </h3>
                                            <ul className="inclusion-list">
                                                {excludedItems.map((item, index) => (
                                                    <li key={index}>
                                                        <span className="list-marker">•</span>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Travel Plans Tabs */}
                            <div className="content-block">
                                <div className="tabs-header-classic">
                                    <h2 className="section-title-classic mb-0">Travel Itinerary</h2>
                                    <div className="tabs-nav-classic">
                                        <button
                                            className={`tab-btn-classic ${activeTab === "itinerary" ? "active" : ""}`}
                                            onClick={() => setActiveTab("itinerary")}
                                        >
                                            Day by Day
                                        </button>
                                        <button
                                            className={`tab-btn-classic ${activeTab === "map" ? "active" : ""}`}
                                            onClick={() => setActiveTab("map")}
                                        >
                                            Route Map
                                        </button>
                                    </div>
                                </div>
                                <div className="title-underline"></div>

                                <div className="itinerary-classic">
                                    {itineraryData.map((day) => (
                                        <div className="day-card-classic" key={day.day}>
                                            <div className="day-badge">Day {day.day}</div>
                                            <div className="day-content">
                                                <h4 className="day-location-classic">{day.location}</h4>
                                                <p className="day-activities-classic">
                                                    <i className="fas fa-route"></i>
                                                    {day.activities}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Gallery Section */}
                            <div className="content-block">
                                <h2 className="section-title-classic">Photo Gallery</h2>
                                <div className="title-underline"></div>
                                <div className="gallery-classic">
                                    {galleryImages.map((img, index) => (
                                        <div
                                            key={index}
                                            className="gallery-item-classic"
                                            onClick={() => handleQuickView(index)}
                                        >
                                            <img src={img} alt={`Gallery ${index + 1}`} />
                                            <div className="gallery-overlay-classic">
                                                <i className="fas fa-search-plus"></i>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Related Destinations */}
                            {relatedDestinations.length > 0 && (
                                <div className="content-block">
                                    <h2 className="section-title-classic">You May Also Like</h2>
                                    <div className="title-underline"></div>
                                    <div className="related-classic">
                                        {relatedDestinations.map((related) => (
                                            <Link
                                                to={`/destination/${related.id}`}
                                                className="related-card-classic"
                                                key={related.id}
                                            >
                                                <div className="related-image-wrapper">
                                                    <img src={related.image} alt={related.title} />
                                                </div>
                                                <div className="related-info-classic">
                                                    <h4>{related.title}</h4>
                                                    <div className="related-meta-classic">
                                                        <span>{related.content?.duration || "5 Days"}</span>
                                                        <span>•</span>
                                                        <span>{related.content?.participants || "12"} People</span>
                                                    </div>
                                                    <div className="related-price-classic">
                                                        From ${related.content?.price?.replace('$', '') || "1299"}
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Booking Form */}
                    <div className="col-lg-4">
                        <BookingForm
                            destination={destination}
                            onBookingComplete={handleBookingComplete}
                        />
                    </div>
                </div>
            </div>

            {/* Image Modal */}
            <dialog id="imageModal" className="image-modal-classic">
                <div className="image-modal-content">
                    <button
                        className="image-modal-close"
                        onClick={() => document.getElementById('imageModal').close()}
                    >
                        ×
                    </button>
                    <img
                        src={galleryImages[activeImage]}
                        alt="Full view"
                        className="image-modal-img"
                    />
                </div>
            </dialog>

            {/* Success Modal */}
            {showSuccessModal && (
                <div className="success-overlay">
                    <div className="success-modal-classic">
                        <div className="success-icon-classic">✓</div>
                        <h2 className="success-title">Reservation Confirmed</h2>
                        <p className="success-message">
                            Your {destination.title} adventure has been successfully reserved.
                        </p>
                        <p className="success-email">
                            Confirmation details sent to <strong>{bookingEmail}</strong>
                        </p>
                        <div className="success-actions">
                            <button
                                className="btn-success-primary"
                                onClick={() => {
                                    setShowSuccessModal(false);
                                    navigate('/');
                                }}
                            >
                                Return to Home
                            </button>
                            <button
                                className="btn-success-secondary"
                                onClick={() => setShowSuccessModal(false)}
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}